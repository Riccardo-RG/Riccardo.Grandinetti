/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourname.dev',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  alternateRefs: [
    {
      href: process.env.NEXT_PUBLIC_SITE_URL || 'https://yourname.dev',
      hreflang: 'en',
    },
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourname.dev'}/it`,
      hreflang: 'it',
    },
    {
      href: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourname.dev'}/es`,
      hreflang: 'es',
    },
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourname.dev'}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Remove www from canonical URLs
    const siteUrl = config.siteUrl.replace(/^https?:\/\/www\./, 'https://');
    
    return {
      loc: `${siteUrl}${path}`,
      changefreq: path === '/' ? 'monthly' : path.includes('/blog') ? 'weekly' : 'yearly',
      priority: path === '/' ? 1.0 : path.includes('/blog') ? 0.8 : 0.6,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
