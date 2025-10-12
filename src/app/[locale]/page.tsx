import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Github, Linkedin, Calendar, Download } from "lucide-react";
import { PresentationLetter } from "@/components/presentation-letter";
import { AnimatedTechStack } from "@/components/animated-tech-stack";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <div className="container py-8">
      {/* Hero Section - Più compatto */}
      <section className="py-8 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t("hero.name")}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            {t("hero.role")}
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            {t("hero.tagline")}
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-4 flex-wrap">
            <Button asChild>
              <a
                href="/cv/cv-placeholder.pdf"
                download
                aria-label={t("hero.cta.downloadCV")}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {t("hero.cta.downloadCVText")}
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="#contact">{t("hero.cta.contact")}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/${locale}/blog`}>{t("hero.cta.blog")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lettera di Presentazione - Sezione principale */}
      <PresentationLetter />

      {/* Stack Tecnologico Animato */}
      <AnimatedTechStack />

      {/* Esperienza - Sezione compatta */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
            {t("cv.experience.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Role 1 */}
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="mb-3">
                <h4 className="font-semibold text-lg">
                  {t("cv.experience.roles.0.role")}
                </h4>
                <p className="text-primary font-medium">
                  {t("cv.experience.roles.0.company")}
                </p>
                <span className="text-sm text-muted-foreground">
                  {t("cv.experience.roles.0.period")}
                </span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  {t("cv.experience.roles.0.achievements.0")}
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  {t("cv.experience.roles.0.achievements.1")}
                </li>
              </ul>
            </div>

            {/* Role 2 */}
            <div className="bg-background rounded-lg p-6 shadow-sm border">
              <div className="mb-3">
                <h4 className="font-semibold text-lg">
                  {t("cv.experience.roles.1.role")}
                </h4>
                <p className="text-primary font-medium">
                  {t("cv.experience.roles.1.company")}
                </p>
                <span className="text-sm text-muted-foreground">
                  {t("cv.experience.roles.1.period")}
                </span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  {t("cv.experience.roles.1.achievements.0")}
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  {t("cv.experience.roles.1.achievements.1")}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Compatta */}
      <section id="contact" className="py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("contact.description")}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href={`mailto:${t("contact.email")}`} className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {t("contact.labels.email")}
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={t("contact.linkedin")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                {t("contact.labels.linkedin")}
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={t("contact.github")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                {t("contact.labels.github")}
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={t("contact.calendly")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {t("contact.labels.schedule")}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
