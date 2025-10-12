"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function PresentationLetter() {
  const t = useTranslations();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {t("presentation.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("presentation.subtitle")}
          </p>
        </div>
        
        <Card className="relative overflow-hidden border-2 shadow-lg">
          <div className="absolute top-4 left-4 text-primary/20">
            <Quote className="h-8 w-8" />
          </div>
          <CardContent className="p-8 md:p-12">
            <div className="space-y-6 text-lg leading-relaxed">
              <p className="text-foreground/90">
                {t("presentation.paragraph1")}
              </p>
              <p className="text-foreground/90">
                {t("presentation.paragraph2")}
              </p>
              <p className="text-foreground/90">
                {t("presentation.paragraph3")}
              </p>
              <div className="pt-4 border-t border-border/50">
                <p className="text-foreground font-medium">
                  {t("presentation.signature")}
                </p>
                <p className="text-muted-foreground text-base">
                  {t("presentation.role")}
                </p>
              </div>
            </div>
          </CardContent>
          <div className="absolute bottom-4 right-4 text-primary/20">
            <Quote className="h-8 w-8 rotate-180" />
          </div>
        </Card>
      </div>
    </section>
  );
}
