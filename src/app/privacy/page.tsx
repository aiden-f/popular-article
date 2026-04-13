"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {

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
              <ShieldCheck size={14} />
              Privacy Policy
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-4 tracking-tight">개인정보 처리방침</h1>
            <p className="text-slate-500 leading-relaxed text-lg">
              본 사이트는 이용자의 개인정보를 중요하게 생각하며, 관련 법령을 준수합니다.
            </p>
          </motion.header>

          <div className="space-y-10 text-slate-700 leading-relaxed">
            <motion.section variants={itemVariants}>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                1. 수집하는 정보
              </h2>
              <p className="mb-4">
                본 사이트는 별도의 회원가입 없이 이용 가능하며, 다음과 같은 정보가 자동으로 수집될 수 있습니다.
              </p>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li>접속 IP 주소</li>
                  <li>쿠키(Cookie)</li>
                  <li>서비스 이용 기록</li>
                </ul>
              </div>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                2. 개인정보의 이용 목적
              </h2>
              <p className="mb-4">수집된 정보는 다음의 목적을 위해 활용됩니다.</p>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                  <li>광고 제공 및 최적화</li>
                  <li>서비스 개선 및 통계 분석</li>
                </ul>
              </div>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                3. 제3자 제공 (Google AdSense)
              </h2>
              <div className="p-6 border border-slate-100 rounded-2xl">
                <p className="mb-4 font-semibold text-slate-800">
                  본 사이트는 Google AdSense를 사용하여 광고를 제공하고 있습니다.
                </p>
                <p className="mb-4 text-slate-600">
                  Google은 쿠키를 사용하여 사용자에게 맞춤 광고를 제공할 수 있습니다.
                </p>
                <div className="my-6 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                  <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2">광고 설정 변경</p>
                  <a
                    href="https://adssettings.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 font-medium hover:underline inline-flex items-center gap-1"
                  >
                    https://adssettings.google.com
                  </a>
                </div>
                <p className="text-slate-600">
                  또한, 제3자 광고 제공자의 쿠키 사용을 원하지 않을 경우 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.
                </p>
              </div>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                4. 쿠키 설정 거부 방법
              </h2>
              <p className="text-slate-600 bg-slate-50 rounded-2xl p-6 border border-slate-100">
                사용자는 웹 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있습니다. 각 브라우저의 도움말 메뉴에서 상세한 방법을 확인하실 수 있습니다.
              </p>
            </motion.section>

            <motion.section variants={itemVariants}>
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-500 rounded-full" />
                5. 문의
              </h2>
              <div className="rounded-2xl p-8 border border-slate-100 bg-slate-50/30">
                <p className="mb-4 text-slate-400">
                  개인정보 처리와 관련된 문의는 아래 이메일로 연락주시기 바랍니다.
                </p>
                <div className="inline-block">
                  <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-1">이메일 문의</p>
                  <a
                    href="mailto:populararticle26@gmail.com"
                    className="text-md font-bold text-black transition-colors"
                  >
                    populararticle26@gmail.com
                  </a>
                </div>
              </div>
            </motion.section>
          </div>

          <motion.footer variants={itemVariants} className="mt-16 pt-8 border-t border-slate-100 text-sm text-slate-400 flex flex-col md:flex-row justify-between gap-4">
            <span className="font-medium text-slate-500">© Popular. All rights reserved.</span>
          </motion.footer>
        </div>
      </motion.div>
    </div>
  );
}
