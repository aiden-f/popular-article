import { articleList } from "@/data/data";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Tag, Clock, ChevronRight } from "lucide-react";
import Script from "next/script";
import { ArticleSideAd } from "@/components/ArticleSideAd";
import { WideSearchCoupangBanner } from "@/components/WideSearchCoupangBanner";
import { coupangAdsKeyword } from "@/data/adKeyword";
import { ArticleImageGallery } from "@/components/ArticleImageGallery";
import { ViewCountBadge } from "@/components/ViewCountBadge";
import { renderTextWithLinks } from "@/lib/article";

// 빌드 타임에 모든 아티클 경로를 정적 생성 (data의 id 기반)
export function generateStaticParams() {
  return articleList.map((article) => ({
    id: String(article.id),
  }));
}

// 동적 파라미터 비활성화 (존재하지 않는 id 접근 시 404)
export const dynamicParams = false;

// 각 아티클별 SEO 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = articleList.find((a) => a.id === Number(id));

  if (!article) {
    return { title: "아티클을 찾을 수 없습니다" };
  }

  const BASE_URL = "https://popular-article.vercel.app";

  return {
    title: `${article.title} | POPULAR`,
    description:
      article.desc ||
      `${article.title} - 강아지 건강 및 사료 정보`,
    keywords: article.tag?.map((t) => t.replace("#", "")) || [],
    openGraph: {
      title: `${article.title} | POPULAR`,
      description:
        article.desc ||
        `${article.title} - 강아지 건강 및 사료 정보`,
      url: `${BASE_URL}/article/${id}`,
      siteName: "Popular Curation",
      images: article.images?.[0]
        ? [
          {
            url: article.images[0],
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ]
        : [],
      locale: "ko_KR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | POPULAR`,
      description:
        article.desc ||
        `${article.title} - 강아지 건강 및 사료 정보`,
      images: article.images?.[0] ? [article.images[0]] : [],
    },
    alternates: {
      canonical: `${BASE_URL}/article/${id}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // id 필드로 아티클 탐색
  const article = articleList.find((a) => a.id === Number(id));

  if (!article) {
    notFound();
  }

  // 관련 아티클: 같은 카테고리의 다른 아티클 (최대 3개)
  const relatedArticles = articleList
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  // contents를 단락으로 분리
  const paragraphs = article.contents
    ? article.contents
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0)
    : [];

  // JSON-LD 구조화 데이터
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.desc || "",
    image: article.images?.[0] || "",
    author: {
      "@type": "Organization",
      name: "Popular Curation",
    },
    publisher: {
      "@type": "Organization",
      name: "Popular Curation",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://popular-article.vercel.app/article/${id}`,
    },
  };

  const keyword = coupangAdsKeyword[Math.floor(Math.random() * coupangAdsKeyword.length) % coupangAdsKeyword.length]
  return (
    <>
      <Script
        id="article-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative min-h-screen bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        {/* 방문자 수 표시 */}
        <ViewCountBadge />
        {/* Soft Background Accents */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-50 blur-[120px] rounded-full opacity-60" />
          <div className="absolute top-[30%] -right-[5%] w-[25%] h-[25%] bg-purple-50 blur-[120px] rounded-full opacity-50" />
          <div className="absolute bottom-[10%] left-[20%] w-[20%] h-[20%] bg-blue-50 blur-[120px] rounded-full opacity-40" />
        </div>

        {/* 전체 레이아웃: 좌측 광고 + 메인 콘텐츠 */}
        <div className="relative z-10 flex justify-center">

          {/* 좌측 광고 사이드바 — xl 이상에서만 표시 */}
          <ArticleSideAd />

          {/* 메인 콘텐츠 */}
          <main className="w-full max-w-4xl px-6 py-10 md:px-12 md:py-16">
            {/* 뒤로가기 Navigation */}
            <nav className="mb-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors group"
                id="back-to-home-link"
              >
                <ArrowLeft
                  size={16}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                전체 아티클로 돌아가기
              </Link>
            </nav>

            {/* Article Header */}
            <header className="mb-10">
              {/* Category & Target Badge */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">
                  {article.category}
                </span>
                {article.target?.map((t, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight mb-6">
                {article.title}
              </h1>

              {/* Description */}
              {article.desc && (
                <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-indigo-200 pl-5 bg-slate-50/50 py-4 pr-5 rounded-r-xl">
                  {article.desc}
                </p>
              )}
            </header>

            {/* Hero Image — 클릭 시 모달 확대 */}
            {article.images && article.images.length > 0 && (
              <ArticleImageGallery images={article.images} alt={article.title} />
            )}

            {/* Article Content */}
            {paragraphs.length > 0 && (
              <article className="mb-10">
                <div className="prose prose-slate prose-lg max-w-none">
                  {paragraphs.map((paragraph, i) => {
                    const isSubHeading =
                      /^\d+[\.\)]\s/.test(paragraph) ||
                      /^["""]/.test(paragraph);
                    const isListItem = /^[-*·•]\s/.test(paragraph);
                    console.log(paragraph)
                    if (isSubHeading) {
                      return (
                        <h3
                          key={i}
                          className="text-md font-bold text-slate-900 mt-8 mb-3 flex items-start gap-2"
                        >
                          {/* <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" /> */}
                          {renderTextWithLinks(paragraph)}
                        </h3>
                      );
                    }

                    if (isListItem) {
                      return (
                        <div
                          key={i}
                          className="flex items-start gap-3 py-1.5 pl-4"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2.5 shrink-0" />
                          <p className="text-base text-slate-700 leading-relaxed">
                            {renderTextWithLinks(paragraph.replace(/^[-*·•]\s/, ""))}
                          </p>
                        </div>
                      );
                    }

                    return (
                      <p
                        key={i}
                        className="text-base text-slate-700 leading-[1.85] mb-4"
                      >
                        {renderTextWithLinks(paragraph)}
                      </p>
                    );
                  })}
                </div>

                {/* Fade-out Gradient Overlay & 더보기 CTA */}
                <div className="relative mt-2">
                  <div className="absolute -top-24 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                  <div className="pt-6 border-t border-dashed border-slate-200">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 md:p-8 text-center">
                      <p className="text-sm text-slate-500 mb-3 font-medium">
                        위 내용은 전체 글의 일부분입니다.
                      </p>
                      <p className="text-base text-slate-700 mb-6">
                        원문에서 더 자세하고 풍부한 내용을 확인해보세요.
                      </p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all duration-200 hover:-translate-y-0.5"
                        id="read-more-button"
                      >
                        전체 글 보러가기
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {keyword ? <WideSearchCoupangBanner keyword={`${keyword}`} /> : null}

            {/* 컨텐츠가 없는 경우 바로 원문 링크 */}
            {paragraphs.length === 0 && (
              <div className="mb-10 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
                <p className="text-base text-slate-700 mb-6">
                  원문에서 전체 내용을 확인하세요.
                </p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all duration-200 hover:-translate-y-0.5"
                  id="read-more-button-no-content"
                >
                  원문 보러가기
                  <ExternalLink size={18} />
                </a>
              </div>
            )}

            {/* Tags Section */}
            {article.tag && article.tag.length > 0 && (
              <section className="mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <Tag size={16} className="text-slate-400" />
                  <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                    관련 태그
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tag.map((tag, i) => (
                    <span
                      key={i}
                      className="text-sm font-medium px-3.5 py-2 rounded-xl bg-slate-50 text-slate-600 border border-slate-100 hover:bg-indigo-50 hover:border-indigo-100 hover:text-indigo-600 transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Clock size={20} className="text-indigo-500" />
                  같은 카테고리 아티클
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedArticles.map((related) => (
                    <Link
                      key={related.id}
                      href={`/article/${related.id}`}
                      className="group flex flex-col p-5 rounded-xl border border-slate-100 bg-white hover:border-indigo-100 hover:shadow-md transition-all"
                      id={`related-article-${related.id}`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 mb-2">
                        {related.category}
                      </span>
                      <h3 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-indigo-600 transition-colors mb-3">
                        {related.title}
                      </h3>
                      <span className="mt-auto text-xs font-semibold text-indigo-500 group-hover:text-indigo-600 flex items-center gap-1">
                        자세히 보기
                        <ChevronRight
                          size={14}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
