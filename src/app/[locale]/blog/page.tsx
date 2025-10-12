import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";



export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("blog");

  // Import posts dynamically to handle build-time issues
  let allPosts: any[] = [];
  try {
    const contentlayer = await import("../../../../.contentlayer/generated");
    allPosts = contentlayer.allPosts || [];
  } catch (error) {
    console.log("Contentlayer not ready yet");
  }

  // Filter posts by current locale and sort by date
  const posts = allPosts
    .filter((post) => post.lang === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground">
            {t("description")}
          </p>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={post.url}>
                <div className="rounded-lg border p-6 transition-colors hover:bg-muted/50">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <time dateTime={post.date}>
                      {formatDate(post.date, locale)}
                    </time>
                    <span>•</span>
                    <span>{Math.ceil(post.body.raw.split(' ').length / 200)} min read</span>
                  </div>

                  <h2 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.summary}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t("noPostsFound")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
