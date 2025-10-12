import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { generateSEO, generateBlogPostSchema } from "@/lib/seo";
import { getMDXComponent } from "next-contentlayer/hooks";



export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  let allPosts: any[] = [];
  try {
    const contentlayer = await import("../../../../../.contentlayer/generated");
    allPosts = contentlayer.allPosts || [];
  } catch (error) {
    return {};
  }

  const post = allPosts.find((post) => post.slug === slug && post.lang === locale);

  if (!post) {
    return {};
  }

  return generateSEO({
    title: post.title,
    description: post.summary,
    url: `https://yourname.dev/${locale}/blog/${slug}`,
    locale,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("blog");

  let allPosts: any[] = [];
  try {
    const contentlayer = await import("../../../../../.contentlayer/generated");
    allPosts = contentlayer.allPosts || [];
  } catch (error) {
    notFound();
  }

  const post = allPosts.find((post) => post.slug === slug && post.lang === locale);

  if (!post) {
    notFound();
  }

  const Content = getMDXComponent(post.body.code);
  const readingTime = Math.ceil(post.body.raw.split(' ').length / 200);

  // Find next and previous posts in the same locale
  const localePosts = allPosts
    .filter((p) => p.lang === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const currentIndex = localePosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex > 0 ? localePosts[currentIndex - 1] : null;
  const prevPost = currentIndex < localePosts.length - 1 ? localePosts[currentIndex + 1] : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBlogPostSchema({
              title: post.title,
              description: post.summary,
              url: `https://yourname.dev/${locale}/blog/${slug}`,
              publishedTime: post.date,
            })
          ),
        }}
      />
      
      <div className="container py-8">
        <div className="mx-auto max-w-4xl">
          <Button variant="ghost" asChild className="mb-8">
            <Link href={`/${locale}/blog`} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("backToBlog")}
            </Link>
          </Button>

          <article>
            <header className="mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <time dateTime={post.date}>
                  {t("publishedOn")} {formatDate(post.date, locale)}
                </time>
                <span>•</span>
                <span>{readingTime} min read</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight mb-4">
                {post.title}
              </h1>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <Content />
            </div>

            {/* Navigation to next/prev posts */}
            {(nextPost || prevPost) && (
              <div className="flex justify-between items-center mt-12 pt-8 border-t">
                {prevPost ? (
                  <Link href={prevPost.url} className="flex items-center gap-2 text-sm hover:text-primary">
                    <ArrowLeft className="h-4 w-4" />
                    {t("prevPost")}
                  </Link>
                ) : <div />}

                {nextPost && (
                  <Link href={nextPost.url} className="flex items-center gap-2 text-sm hover:text-primary">
                    {t("nextPost")}
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Link>
                )}
              </div>
            )}
          </article>
        </div>
      </div>
    </>
  );
}
