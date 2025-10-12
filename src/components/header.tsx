"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Header() {
  const locale = useLocale();
  const t = useTranslations("navigation");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link
            href={`/${locale}`}
            className="mr-6 flex items-center space-x-2"
          >
            <span className="hidden font-bold sm:inline-block">
              Your Name
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href={`/${locale}`}
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              {t("home")}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t("blog")}
            </Link>
            {/* Projects link hidden for now as requested */}
            {/* <Link
              href={`/${locale}/projects`}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t("projects")}
            </Link> */}
          </nav>
        </div>
        
        {/* Mobile menu button would go here */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search would go here if needed */}
          </div>
          <nav className="flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
