"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ArticleImageGalleryProps {
  images: string[];
  alt: string;
}

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const ZOOM_STEP = 0.15;

export function ArticleImageGallery({ images, alt }: ArticleImageGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const translateStart = useRef({ x: 0, y: 0 });

  const resetZoom = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  const openModal = (index: number) => {
    setActiveIndex(index);
    resetZoom();
    setModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setModalOpen(false);
    resetZoom();
  }, [resetZoom]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
    resetZoom();
  }, [images.length, resetZoom]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    resetZoom();
  }, [images.length, resetZoom]);

  // 마우스 휠 줌
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.stopPropagation();
      e.preventDefault();

      setScale((prev) => {
        const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
        const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev + delta));
        // 1x로 돌아가면 위치도 리셋
        if (next <= 1) {
          setTranslate({ x: 0, y: 0 });
        }
        return next;
      });
    },
    []
  );

  // 드래그 시작
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (scale <= 1) return;
      e.preventDefault();
      setIsDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY };
      translateStart.current = { ...translate };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [scale, translate]
  );

  // 드래그 중
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setTranslate({
        x: translateStart.current.x + dx,
        y: translateStart.current.y + dy,
      });
    },
    [isDragging]
  );

  // 드래그 종료
  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 키보드 이벤트
  useEffect(() => {
    if (!modalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen, closeModal, goNext, goPrev]);

  return (
    <>
      {/* 이미지 리스트 */}
      {images.map((src, i) => (
        <div
          key={i}
          className="mb-10 border border-slate-100 shadow-sm cursor-pointer group relative overflow-hidden"
          onClick={() => openModal(i)}
        >
          <img
            src={src}
            alt={`${alt}${images.length > 1 ? ` - ${i + 1}` : ""}`}
            className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            loading={i === 0 ? "eager" : "lazy"}
          />
          {/* 호버 시 확대 아이콘 */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
              <ZoomIn size={20} className="text-slate-700" />
            </div>
          </div>
        </div>
      ))}

      {/* 모달 */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 z-[110] p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X size={24} />
          </button>

          {/* 이미지 카운터 + 줌 레벨 */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[110] flex items-center gap-3">
            {images.length > 1 && (
              <span className="text-white/70 text-sm font-medium bg-black/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
                {activeIndex + 1} / {images.length}
              </span>
            )}
            {scale > 1 && (
              <span className="text-white/70 text-sm font-medium bg-black/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
                {Math.round(scale * 100)}%
              </span>
            )}
          </div>

          {/* 줌 리셋 버튼 */}
          {scale > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetZoom();
              }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] text-white/70 text-xs font-medium bg-black/30 hover:bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm transition-colors cursor-pointer"
            >
              원본 크기로 돌아가기
            </button>
          )}

          {/* 이전 버튼 */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 md:left-8 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="이전 이미지"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* 확대 이미지 — 스크롤 줌 + 드래그 이동 */}
          <div
            className="overflow-hidden flex items-center justify-center"
            style={{ width: "90vw", height: "85vh" }}
            onWheel={handleWheel}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[activeIndex]}
              alt={`${alt} - 확대 ${activeIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none transition-transform duration-100 ease-out"
              style={{
                transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
                cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onDoubleClick={() => {
                if (scale > 1) resetZoom();
                else setScale(2.5);
              }}
              draggable={false}
            />
          </div>

          {/* 다음 버튼 */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 md:right-8 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="다음 이미지"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
