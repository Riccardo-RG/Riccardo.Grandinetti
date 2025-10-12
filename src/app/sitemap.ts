import { MetadataRoute } from "next";

const baseUrl = "https://yourname.dev";
const locales = ["en", "it", "es"];

// Mock posts - will be replaced with Contentlayer
const posts = [
  {
    slug: "frontend-calm-fast-mindset",
    lastModified: "2024-01-15",
  },
  {
    slug: "typescript-everywhere-safer-ui-patterns",
    lastModified: "2024-01-10",
  },
  {
    slug: "shipping-without-drama-production-checklist",
    lastModified: "2024-01-05",
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/blog",
    ...posts.map((post) => `/blog/${post.slug}`),
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add routes for each locale
  for (const locale of locales) {
    for (const route of routes) {
      const url = `${baseUrl}/${locale}${route}`;
      const lastModified = route.includes("/blog/")
        ? posts.find((post) => route.includes(post.slug))?.lastModified
        : new Date().toISOString().split("T")[0];

      sitemapEntries.push({
        url,
        lastModified: lastModified || new Date().toISOString().split("T")[0],
        changeFrequency: route === "" ? "monthly" : route === "/blog" ? "weekly" : "yearly",
        priority: route === "" ? 1 : route === "/blog" ? 0.8 : 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}${route}`])
          ),
        },
      });
    }
  }

  return sitemapEntries;
}
