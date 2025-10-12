"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { NavBlogButton } from "@/components/nav-blog-button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const locale = useLocale();
  const t = useTranslations("navigation");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <NavBlogButton
              locale={locale}
              className="transition-colors hover:text-foreground/80 text-foreground/60 bg-transparent border-none cursor-pointer"
            >
              {t("blog")}
            </NavBlogButton>
            {/* Projects link hidden for now as requested */}
            {/* <Link
              href={`/${locale}/projects`}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {t("projects")}
            </Link> */}
          </nav>
        </div>

        {/* Mobile Logo */}
        <div className="flex md:hidden">
          <Link
            href={`/${locale}`}
            className="flex items-center space-x-2"
          >
            <span className="font-bold">Your Name</span>
          </Link>
        </div>

        {/* Desktop and Mobile Right Side */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search would go here if needed */}
          </div>
          <nav className="flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b bg-background">
          <nav className="container py-4 space-y-4">
            <Link
              href={`/${locale}`}
              className="block text-foreground hover:text-foreground/80 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("home")}
            </Link>
            <NavBlogButton
              locale={locale}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-left text-foreground/60 hover:text-foreground/80 transition-colors bg-transparent border-none cursor-pointer w-full"
            >
              {t("blog")}
            </NavBlogButton>
            {/* Projects link hidden for now as requested */}
            {/* <Link
              href={`/${locale}/projects`}
              className="block text-foreground/60 hover:text-foreground/80 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("projects")}
            </Link> */}
          </nav>
        </div>
      )}
    </header>
  );
}
