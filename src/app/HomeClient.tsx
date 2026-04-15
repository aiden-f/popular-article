"use client";

import { coupangAdsKeyword } from "@/data/adKeyword";
import { articleList } from "@/data/data";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ViewCountBadge } from "@/components/ViewCountBadge";
const WideSearchCoupangBanner = dynamic(
  () => import("@/components/WideSearchCoupangBanner").then((mod) => mod.WideSearchCoupangBanner),
  { ssr: false }
);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const categories = ["전체", ...Array.from(new Set(articleList.map((a) => a.category)))];

  const filteredArticles = articleList.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "전체" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const [shuffledKeywords, setShuffledKeywords] = useState(coupangAdsKeyword);

  useEffect(() => {
    setShuffledKeywords(prev => [...prev].sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    setShuffledKeywords(prev => [...prev].sort(() => Math.random() - 0.5));
  }, [selectedCategory])

  return (
    <div className="relative min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* View Count Display */}
      <ViewCountBadge />

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
            강아지/고양이 건강 및 <br />
            <span className="pt-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">사료 추천 인기글 모음</span>
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

        {/* Search & Categories Section */}
        <div className="mb-12 space-y-8">
          {/* Search Bar */}
          <div className="relative max-w-md">
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

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${selectedCategory === category
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "bg-white border border-slate-100 text-slate-500 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/50"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Article Grid */}
        <motion.section
          key={selectedCategory + searchQuery} // Force re-animation on filter change
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
                  className="group relative flex flex-col h-full rounded-xl border border-slate-100 bg-white p-6 hover:border-indigo-100 transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  <Link href={`/article/${article.id}`} className="absolute inset-0 z-10" aria-label={article.title} />
                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md mb-3 inline-block">
                      {article.category}
                    </span>
                    <h2 className="text-xl font-bold line-clamp-2 leading-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {article.title}
                    </h2>
                  </div>

                  {article.desc ? (
                    <p className="text-slate-600 text-sm mb-4 flex-grow leading-relaxed">
                      {article.desc}
                    </p>
                  ) : (
                    <p className="text-slate-400 text-sm mb-4 flex-grow italic">
                      요약 내용이 곧 추가될 예정입니다.
                    </p>
                  )}

                  {article.tag && article.tag.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {article.tag.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="text-[12px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.article>

                {/* 3rd content마다 쿠팡 배너 노출 */}
                {(index + 1) % 3 === 0 && (
                  <div className="col-span-full my-4">
                    <WideSearchCoupangBanner
                      keyword={shuffledKeywords[Math.floor(index / 3) % shuffledKeywords.length]}
                    />
                  </div>
                )}
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
