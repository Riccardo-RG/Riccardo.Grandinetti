import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

import { Header } from "@/components/header";
import { Analytics } from "@/components/analytics";
import { HtmlLang } from "@/components/html-lang";
import { Providers } from "@/lib/providers";
import { generateSEO, generatePersonSchema } from "@/lib/seo";

const locales = ["en", "it", "es"];

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateSEO({
    locale,
    url: `https://yourname.dev/${locale}`,
  });
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePersonSchema()),
        }}
      />
      <Analytics />
      <HtmlLang />
      <Providers>
        <NextIntlClientProvider messages={messages}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  © 2024 Your Name. All rights reserved.
                </p>
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                  Built with Next.js, Tailwind CSS, and Contentlayer.
                </p>
              </div>
            </footer>
          </div>
        </NextIntlClientProvider>
      </Providers>
    </>
  );
}
