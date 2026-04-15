"use client";

import { useState, useEffect } from "react";

/**
 * 상단 우측에 누적 방문자 수를 표시하는 컴포넌트.
 * 마운트 시 API를 호출하여 최신 카운트를 가져옴.
 */
export function ViewCountBadge() {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/count/get", { method: "POST" })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setViewCount(result.data.GetAccumulatedVisitCount);
        }
      })
      .catch(() => {});
  }, []);

  if (viewCount === null) return null;

  return (
    <div className="absolute top-6 right-6 md:top-10 md:right-12 z-20">
      <p className="text-[10px] md:text-xs text-slate-300 tracking-tight">
        <span className="font-bold">{viewCount.toLocaleString()}</span>
      </p>
    </div>
  );
}
