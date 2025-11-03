"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Check, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

const SUPPORTED_LOCALES = ["en", "it", "es"] as const;
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

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

  const getLocaleMeta = (code: SupportedLocale) => {
    const metaByCode: Record<SupportedLocale, { name: string; short: string }> = {
      en: { name: t("english"), short: "EN" },
      it: { name: t("italian"), short: "IT" },
      es: { name: t("spanish"), short: "ES" },
    };
    return metaByCode[code];
  };

  const currentLocaleMeta = getLocaleMeta((locale as SupportedLocale) || "en");

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="gap-2" aria-label="Change language">
        <Languages className="h-4 w-4" />
        <span className="hidden sm:inline">{t("english")}</span>
        <span className="sm:hidden">
          <Badge variant="outline" className="px-1.5 py-0 text-[10px] tracking-wide">EN</Badge>
        </span>
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
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Languages className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLocaleMeta.name}</span>
        <span className="sm:hidden">
          <Badge variant="outline" className="px-1.5 py-0 text-[10px] tracking-wide">
            {currentLocaleMeta.short}
          </Badge>
        </span>
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 z-50">
          <div
            className="rounded-md border bg-popover p-1 shadow-md animate-in fade-in-0 zoom-in-95 duration-200"
            role="listbox"
            aria-label={t("toggle")}
          >
            {SUPPORTED_LOCALES.map((code) => {
              const meta = getLocaleMeta(code);
              const isActive = code === locale;
              return (
                <button
                  key={code}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => !isActive && switchLocale(code)}
                  className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <Badge
                    variant={isActive ? "secondary" : "outline"}
                    className="px-1.5 py-0 text-[10px] tracking-wide"
                  >
                    {meta.short}
                  </Badge>
                  <span className="flex-1 text-left">{meta.name}</span>
                  {isActive && <Check className="h-4 w-4 opacity-80" />}
                </button>
              );
            })}
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
