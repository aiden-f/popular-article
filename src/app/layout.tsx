import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "강아지 사료 및 건강 정보 큐레이션 | PAPULAR",
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
      <body className={`${outfit.variable} font-sans min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
