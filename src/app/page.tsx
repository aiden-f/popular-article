"use client";

import { articleList } from "@/data/data";
import { motion } from "framer-motion";
import { ExternalLink, Search, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
const WideSearchCoupangBanner = dynamic(
  () => import("@/components/WideSearchCoupangBanner").then((mod) => mod.WideSearchCoupangBanner),
  { ssr: false }
);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articleList.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const [shuffledKeywords, setShuffledKeywords] = useState(['오리젠', '카르나4', '벨칸도', '브릿', '이즈칸', '뉴트리소스', '플래티넘 사료', '몬지', '디어니스트키친', '지위픽', '테라카니스', '로얄캐닌', '나우', '고네이티브', '그랜마루시', '보나시보', '보레알', '스맥', '스몰배치', '스텔라 & 츄이스', '에프디에이', '레드반', '오픈팜', '카니러브', '허즈', '힐스']);

  useEffect(() => {
    setShuffledKeywords(prev => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Soft Background Accents */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-50 blur-[120px] rounded-full opacity-60" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-purple-50 blur-[120px] rounded-full opacity-60" />
      </div>

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        {/* Header Section */}
        <header className="mb-16 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-600 mb-6"
          >
            <Sparkles size={14} />
            Best Curation for Your Dog
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl mb-6 text-slate-950 leading-tight"
          >
            강아지 건강 및 <br />
            <span className="pt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">사료 정보 인기글 모음</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl leading-relaxed whitespace-pre-line"
          >
            {`당신의 반려견을 위한 가장 완벽한 가이드.
            전문 수의사의 조언부터 실제 보호자들의 생생한 후기까지,
            엄선된 사료 정보와 건강 팁을 한눈에 확인하세요.`}
          </motion.p>
        </header>

        {/* Search Bar */}
        <div className="mb-12 relative max-w-md">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="궁금한 정보를 검색해보세요..."
            className="w-full bg-white/70 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder:text-slate-400 backdrop-blur-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Article Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredArticles.map((article, index) => {
            return (
              <React.Fragment key={index}>
                <motion.article
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  onClick={() => window.open(article.url, "_blank")}
                  className="group relative flex flex-col h-full rounded-xl border border-slate-100 bg-white p-6 hover:border-indigo-100 transition-all cursor-pointer"
                >
                  <h2 className="text-xl font-bold mb-3 line-clamp-2 leading-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {article.title}
                  </h2>

                  {article.desc ? (
                    <p className="text-slate-600 text-sm mb-4 flex-grow-0 leading-relaxed">
                      {article.desc}
                    </p>
                  ) : (
                    <p className="text-slate-400 text-sm mb-4 flex-grow-0 italic">
                      요약 내용이 곧 추가될 예정입니다.
                    </p>
                  )}

                  {article.tag && article.tag.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {article.tag.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="text-[12px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.article>

                {/* Insert Banner Every 3 Items */}
                {/* {(index + 1) % 3 === 0 && (
                  <div className="col-span-1 sm:col-span-2 lg:col-span-3 py-4">
                    <WideSearchCoupangBanner
                      keyword={shuffledKeywords[Math.floor(index / 3) % shuffledKeywords.length]}
                    />
                  </div>
                )} */}
              </React.Fragment>
            )
          })}
        </motion.section>

        {filteredArticles.length === 0 && (
          <div className="text-center py-24">
            <p className="text-slate-400 text-lg font-medium">검색 결과가 없습니다.</p>
          </div>
        )}
      </main>
    </div>
  );
}
