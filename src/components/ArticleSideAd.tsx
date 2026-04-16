"use client";

import { coupangAdsKeyword } from "@/data/adKeyword";
import dynamic from "next/dynamic";

const VerticlaSearchCoupangBanner = dynamic(
  () =>
    import("@/components/VerticlaSearchCoupangBanner").then(
      (mod) => mod.VerticlaSearchCoupangBanner
    ),
  { ssr: false }
);

export function ArticleSideAd() {
  return (
    <aside className="hidden xl:flex flex-col gap-4 pt-10 pr-6 w-[360px] shrink-0">
      <div className=" flex flex-col gap-4">
        {/* 광고 라벨 */}
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-slate-100" />
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
            광고
          </span>
          <div className="h-px flex-1 bg-slate-100" />
        </div>
        {/* 쿠팡 세로형 배너 */}
        <VerticlaSearchCoupangBanner keyword={coupangAdsKeyword[(Math.floor(Math.random() * coupangAdsKeyword.length)) % coupangAdsKeyword.length]} />
      </div>
    </aside>
  );
}
