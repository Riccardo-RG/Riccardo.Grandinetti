"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const locales = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchLocale = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath as any);
    setIsOpen(false);
  };

  const currentLocale = locales.find((l) => l.code === locale);

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="gap-2" aria-label="Change language">
        <Languages className="h-4 w-4" />
        <span className="hidden sm:inline">🇺🇸 English</span>
        <span className="sm:hidden">🇺🇸</span>
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        aria-label={t("toggle")}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Languages className="h-4 w-4" />
        <span className="hidden sm:inline">
          {currentLocale?.flag} {currentLocale?.name}
        </span>
        <span className="sm:hidden">{currentLocale?.flag}</span>
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 z-50">
          <div className="rounded-md border bg-popover p-1 shadow-md animate-in fade-in-0 zoom-in-95 duration-200">
            {locales
              .filter((l) => l.code !== locale)
              .map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLocale(l.code)}
                  className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <span>{l.flag}</span>
                  <span>{l.name}</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
