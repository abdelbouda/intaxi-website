// /src/pages/sitemap.xml.ts
import { fetchPosts } from '../utils/blog';

// GEUPDATE: Nu met www. voor Google Search optimalisatie
const SITE = 'https://www.intaxi.nl';

const dynamicAirports = [
  { slug: 'schiphol' },
  { slug: 'rotterdam' },
  { slug: 'eindhoven' },
  { slug: 'antwerpen' },
  { slug: 'brussel' },
  { slug: 'charleroi' },
  { slug: 'duesseldorf' }
];

const lastmod = new Date().toISOString().slice(0, 10);

export async function GET() {
  const staticEN = [
    { path: '/en', priority: 1.0 },
    { path: '/en/contact', priority: 0.8 },
    { path: '/en/vliegveld-taxi', priority: 0.8 }
  ];
  const staticNL = [
    { path: '', priority: 1.0 },
    { path: '/contact', priority: 0.8 },
    { path: '/vliegveld-taxi', priority: 0.8 }
  ];

  const enAirportUrls = dynamicAirports.map(({ slug }) => ({
    url: `${SITE}/en/taxi-${slug}`,
    priority: 0.7,
    changefreq: 'monthly'
  }));
  const nlAirportUrls = dynamicAirports.map(({ slug }) => ({
    url: `${SITE}/taxi-${slug}`,
    priority: 0.7,
    changefreq: 'monthly'
  }));

  let blogUrls: Array<{ url: string; priority: number; changefreq: string }> = [];
  try {
    const posts = await fetchPosts?.();
    if (posts && posts.length) {
      blogUrls = posts.map(post => ({
        url: `${SITE}/blog/${post.slug}`,
        priority: 0.6,
        changefreq: 'monthly'
      }));
    }
  } catch { /* blog disabled */ }

  const urls = [
    ...staticEN.map(({ path, priority }) => ({
      url: `${SITE}${path}`,
      priority,
      changefreq: 'monthly'
    })),
    ...staticNL.map(({ path, priority }) => ({
      url: `${SITE}${path}`,
      priority,
      changefreq: 'monthly'
    })),
    ...enAirportUrls,
    ...nlAirportUrls,
    ...blogUrls
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, priority, changefreq }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
