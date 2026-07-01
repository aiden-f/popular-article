import { Metadata } from "next";
import HomeClient from "./HomeClient";
import Script from "next/script";
import Ad from "@/components/Ad";
import { PawPrint, Wrench, Clock } from "lucide-react";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Popular",
  description: "강아지/고양이 사료 추천 리스트 모음",
  url: "https://popular-article.vercel.app",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://popular-article.vercel.app/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  title: "강아지/고양이 사료 추천 리스트 모음 | POPULAR",
  description:
    "2025년 최신 강아지/고양이 사료 등급표, 수의사 추천 사료, 원료 분석부터 건강 관리 팁까지. 당신의 반려견/반려묘를 위한 가장 완벽한 정보 큐레이션 플랫폼 Popular입니다.",
  keywords: [
    "강아지 사료",
    "사료 등급표",
    "강아지 건강",
    "반려견 정보",
    "수의사 추천 사료",
    "강아지 영양제",
    "강아지 사료 분석",
    "강아지 음식",
    "고양이 사료 추천",
    "고양이 사료 등급",
    "고양이 영양제",
  ],
  openGraph: {
    title: "강아지/고양이 사료 추천 리스트 모음 | POPULAR",
    description:
      "반려동물을 위한 최고의 사료 선택 가이드와 건강 팁을 한눈에 확인하세요.",
    url: "https://popular-article.vercel.app",
    siteName: "Popular Curation",
    images: [
      {
        url: "/og-image.jpg", // 실제 이미지가 있다면 해당 경로로 변경
        width: 1200,
        height: 630,
        alt: "Popular Dog Care Curation",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "강아지/고양이 사료 추천 리스트 모음 | POPULAR",
    description:
      "반려동물을 위한 최고의 사료 선택 가이드와 건강 팁을 제공합니다.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://popular-article.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Page() {
  if (process.env.SITE_ENABLED !== "true") {
    return <MaintenancePage />;
  }
  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HomeClient />
      <Ad />
    </>
  );
}

export function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50 text-slate-800 p-6 font-sans">
      <div className="relative w-full max-w-lg bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col items-center text-center overflow-hidden">
        {/* 장식용 배경 글로우 */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* 미세 애니메이션이 적용된 아이콘 컨테이너 */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute inset-0 bg-indigo-200/50 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-gradient-to-tr from-indigo-500 to-purple-500 p-5 rounded-2xl shadow-lg shadow-indigo-500/25 animate-bounce [animation-duration:3s]">
            <PawPrint className="w-12 h-12 text-white animate-pulse" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-amber-500 p-2 rounded-xl shadow-md border-2 border-white animate-spin [animation-duration:8s]">
            <Wrench className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* 헤드라인 */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4 leading-tight">
          더 건강한 내일을 위해
          <br />
          잠시 단장 중이에요
        </h1>

        <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed max-w-sm">
          더 나은 반려동물 사료 추천 서비스를 제공하기 위해 현재 시스템 점검을
          진행하고 있습니다. 빠른 시간 내에 다시 찾아뵙겠습니다.
        </p>

        {/* 공지사항 박스 */}
        <div className="w-full bg-slate-50/80 border border-slate-200/60 rounded-2xl p-4 flex items-start gap-3.5 text-left mb-8">
          <Clock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-slate-800">점검 안내</h4>
            <p className="text-xs text-slate-500 mt-1 leading-normal">
              시스템 안정화 및 데이터 정밀 분석 기능을 업데이트하고 있습니다.
              반려견과 반려묘를 위한 최고의 추천 플랫폼이 되겠습니다.
            </p>
          </div>
        </div>

        {/* 푸터 */}
        <div className="text-xs text-slate-400 font-medium tracking-widest uppercase">
          POPULAR Curation
        </div>
      </div>
    </div>
  );
}
