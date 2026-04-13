import { Metadata } from "next";
import HomeClient from "./HomeClient";
import Script from "next/script";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Popular",
  "description": "강아지 사료 및 건강 정보 큐레이션 플랫폼",
  "url": "https://popular-article.vercel.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://popular-article.vercel.app/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const metadata: Metadata = {
  title: "강아지 사료 및 건강 정보 큐레이션 | POPULAR",
  description: "2025년 최신 강아지 사료 등급표, 수의사 추천 사료, 원료 분석부터 건강 관리 팁까지. 당신의 반려견을 위한 가장 완벽한 정보 큐레이션 플랫폼 Popular입니다.",
  keywords: [
    "강아지 사료",
    "사료 등급표",
    "강아지 건강",
    "반려견 정보",
    "수의사 추천 사료",
    "강아지 영양제",
    "강아지 사료 분석",
    "강아지 음식",
  ],
  openGraph: {
    title: "강아지 사료 및 건강 정보 큐레이션 | POPULAR",
    description: "반려견을 위한 최고의 사료 선택 가이드와 건강 팁을 한눈에 확인하세요.",
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
    title: "강아지 사료 및 건강 정보 큐레이션 | POPULAR",
    description: "반려견을 위한 최고의 사료 선택 가이드와 건강 팁을 제공합니다.",
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
  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
