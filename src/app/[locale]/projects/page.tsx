import { useTranslations } from "next-intl";

export default function ProjectsPage() {
  const t = useTranslations();

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight mb-8">
          Projects
        </h1>
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Projects section coming soon...
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            This section is scaffolded but hidden from navigation as requested.
          </p>
        </div>
      </div>
    </div>
  );
}
