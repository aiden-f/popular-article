"use client";

import Link from "next/link";
import { ArrowLeft, Info, Sparkles, Target, User, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-16 px-6 font-sans">
      <motion.div
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
      >
        {/* Header Decor */}
        <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />

        <div className="p-8 md:p-12">
          <motion.div variants={itemVariants}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors mb-8 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              홈으로 돌아가기
            </Link>
          </motion.div>

          <motion.header variants={itemVariants} className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-600 mb-4">
              <Info size={14} />
              About Popular
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-4 tracking-tight">소개</h1>
            <p className="text-slate-500 leading-relaxed text-lg">
              반려동물과 함께하는 삶을 더 행복하게 만들기 위해, 신뢰할 수 있는 정보를 선별하고 이해하기 쉽게 재구성하여 제공합니다. 단순히 정보를 나열하는 것이 아니라, 실제 반려가족에게 도움이 되는 내용만을 기준으로 큐레이션하며, 건강, 사료, 생활 전반에 걸친 다양한 주제를 다룹니다. 복잡하고 흩어져 있는 정보를 한눈에 이해할 수 있도록 정리하여, 보다 올바른 선택과 건강한 반려생활에 기여하는 것을 목표로 합니다.
            </p>
          </motion.header>

          <div className="space-y-12 text-slate-700 leading-relaxed">
            <motion.section variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 font-bold">
                  <Sparkles size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">서비스 미션</h2>
              </div>
              <p className="mb-4">
                이 사이트는 반려동물과 관련된 다양한 정보를 보다 쉽게 이해하고 활용할 수 있도록 정리하여 제공하는 정보 콘텐츠 플랫폼입니다.
              </p>
              <p>
                인터넷에 흩어져 있는 정보를 단순히 나열하는 것이 아니라, 실제 도움이 되는 내용을 기준으로 선별하고, 이해하기 쉬운 형태로 재구성하여 제공하는 것을 목표로 합니다.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-purple-50 text-purple-600 font-bold">
                  <Target size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">콘텐츠 작성 기준</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "신뢰성", desc: "신뢰할 수 있는 출처 기반의 정보 선별" },
                  { title: "실용성", desc: "실제 반려가족에게 도움이 되는 내용 중심" },
                  { title: "지속성", desc: "최신 정보를 반영한 지속적인 업데이트" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col gap-2">
                    <div className="text-indigo-600 font-bold text-sm uppercase tracking-wider">{item.title}</div>
                    <p className="text-sm text-slate-600 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600 font-bold">
                  <Mail size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">문의하기</h2>
              </div>
              <div className="rounded-2xl p-8 border border-slate-100 bg-slate-50/30">
                <p className="mb-6 text-slate-500">
                  본 사이트는 유용한 정보를 제공함과 동시에 광고(Google AdSense, 쿠팡)를 통해 운영됩니다. 제안이나 문의 사항이 있으시면 언제든지 연락해 주세요.
                </p>
                <div className="inline-block">
                  <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-1">이메일 문의</p>
                  <a
                    href="mailto:populararticle26@gmail.com"
                    className="text-xl font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                  >
                    populararticle26@gmail.com
                  </a>
                </div>
              </div>
            </motion.section>
          </div>

          <motion.footer variants={itemVariants} className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between gap-4">
            <span className="font-medium text-slate-500">© Popular. All rights reserved.</span>
          </motion.footer>
        </div>
      </motion.div>
    </div>
  );
}
