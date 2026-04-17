import { articleList } from '@/data/data'
import moment from 'moment';

export const dynamic = 'force-dynamic';

export async function GET() {
  const BASE_URL = 'https://popular-article.vercel.app'

  const staticPages = [
    {
      url: `${BASE_URL}/about`,
      lastModified: moment().format('YYYY-MM-DD'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: moment().format('YYYY-MM-DD'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  const articlePages = articleList.map((article) => ({
    url: `${BASE_URL}/article/${article.id}`,
    lastModified: moment().format('YYYY-MM-DD'),
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const allPages = [...staticPages, ...articlePages]

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
      .map(
        (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
      )
      .join('\n')}
</urlset>`

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  })
}
