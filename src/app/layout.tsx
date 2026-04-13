import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "강아지 사료 및 건강 정보 큐레이션 | POPULAR",
  description: "2025년 강아지 사료 등급표, 수의사 추천 사료, 건강 관리 팁 등 반려견을 위한 최적의 정보를 한곳에서 확인하세요.",
  keywords: ["강아지 사료", "사료 등급표", "강아지 건강", "반려견 정보", "수의사 추천"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="light h-full" suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2723326980364617"
          crossOrigin="anonymous"></script>
      </head>
      <body className={`${outfit.variable} font-sans min-h-screen flex flex-col bg-white`}>
        <div className="flex-grow">
          {children}
        </div>
        <footer className="border-t border-slate-100 px-6 py-12 md:px-12 bg-slate-50/50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-slate-500 font-medium whitespace-nowrap">
              © 2026 Popular Curation. 반려견을 위한 최고의 선택.
            </p>
            <nav className="flex items-center gap-8">
              <Link
                href="/about"
                className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
                id="footer-about-link"
              >
                소개
              </Link>
              <Link
                href="/privacy"
                className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
                id="footer-privacy-link"
              >
                개인정보 처리방침
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
