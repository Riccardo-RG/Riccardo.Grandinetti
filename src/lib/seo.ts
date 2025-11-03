import { Metadata } from "next";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  locale?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export function generateSEO({
  title = "Riccardo Grandinetti - Senior Frontend Engineer",
  description = "I build calm, high-quality front-ends—driven by a love for technology and reliable delivery.",
  image = "/og-image.png",
  url = "https://yourname.dev",
  locale = "en",
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: SEOProps = {}): Metadata {
  const siteName = "Riccardo Grandinetti";
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${url}/en`,
        it: `${url}/it`,
        es: `${url}/es`,
      },
    },
    ...(tags && { keywords: tags }),
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Riccardo Grandinetti",
    jobTitle: "Senior Frontend Engineer",
    description:
      "I build calm, high-quality front-ends—driven by a love for technology and reliable delivery.",
    url: "https://yourname.dev",
    sameAs: [
      "https://www.linkedin.com/in/your-handle",
      "https://github.com/your-handle",
    ],
    knowsAbout: [
      "React",
      "TypeScript",
      "Next.js",
      "Frontend Development",
      "Web Performance",
      "User Experience",
    ],
  };
}

export function generateBlogPostSchema({
  title,
  description,
  url,
  publishedTime,
  modifiedTime,
  image,
  author = "Riccardo Grandinetti",
}: {
  title: string;
  description: string;
  url: string;
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished: publishedTime,
    ...(modifiedTime && { dateModified: modifiedTime }),
    author: {
      "@type": "Person",
      name: author,
      url: "https://yourname.dev",
    },
    publisher: {
      "@type": "Person",
      name: author,
      url: "https://yourname.dev",
    },
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
        width: 1200,
        height: 630,
      },
    }),
  };
}
