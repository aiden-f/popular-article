import { MetadataRoute } from 'next'
import { articleList } from '@/data/data'

// TODO: 실제 배포 도메인으로 변경하세요.
const BASE_URL = 'https://popular-article.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  // 기본 페이지
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // 아티클 개별 페이지
  const articlePages: MetadataRoute.Sitemap = articleList.map((article) => ({
    url: `${BASE_URL}/article/${article.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...articlePages]
}
