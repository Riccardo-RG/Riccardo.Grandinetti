"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, useRef } from "react";
import { ExternalLink, Code, Zap, X } from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  delay: number;
  projects: ProjectInfo[];
}

interface ProjectInfo {
  name: string;
  description: string;
  usage: string;
  impact?: string;
}

export function AnimatedTechStack() {
  const t = useTranslations();
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [isInView, setIsInView] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Definisco lo stack tecnologico con progetti tradotti
  const getTechStack = (): TechItem[] => [
    {
      name: "React",
      category: "frontend",
      delay: 0,
      projects: [
        {
          name: t("techStack.projects.react.ecommerce.name"),
          description: t("techStack.projects.react.ecommerce.description"),
          usage: t("techStack.projects.react.ecommerce.usage"),
          impact: t("techStack.projects.react.ecommerce.impact")
        },
        {
          name: t("techStack.projects.react.dashboard.name"),
          description: t("techStack.projects.react.dashboard.description"),
          usage: t("techStack.projects.react.dashboard.usage"),
          impact: t("techStack.projects.react.dashboard.impact")
        }
      ]
    },
    {
      name: "TypeScript",
      category: "frontend",
      delay: 100,
      projects: [
        {
          name: t("techStack.projects.typescript.banking.name"),
          description: t("techStack.projects.typescript.banking.description"),
          usage: t("techStack.projects.typescript.banking.usage"),
          impact: t("techStack.projects.typescript.banking.impact")
        }
      ]
    },
    {
      name: "Next.js",
      category: "frontend",
      delay: 200,
      projects: [
        {
          name: t("techStack.projects.nextjs.corporate.name"),
          description: t("techStack.projects.nextjs.corporate.description"),
          usage: t("techStack.projects.nextjs.corporate.usage"),
          impact: t("techStack.projects.nextjs.corporate.impact")
        }
      ]
    },
    {
      name: "Tailwind CSS",
      category: "frontend",
      delay: 300,
      projects: [
        {
          name: t("techStack.projects.tailwind.designSystem.name"),
          description: t("techStack.projects.tailwind.designSystem.description"),
          usage: t("techStack.projects.tailwind.designSystem.usage"),
          impact: t("techStack.projects.tailwind.designSystem.impact")
        }
      ]
    },
    {
      name: "Node.js",
      category: "backend",
      delay: 500,
      projects: [
        {
          name: t("techStack.projects.nodejs.api.name"),
          description: t("techStack.projects.nodejs.api.description"),
          usage: t("techStack.projects.nodejs.api.usage"),
          impact: t("techStack.projects.nodejs.api.impact")
        }
      ]
    },
    {
      name: "AWS",
      category: "cloud",
      delay: 1100,
      projects: [
        {
          name: t("techStack.projects.aws.scalable.name"),
          description: t("techStack.projects.aws.scalable.description"),
          usage: t("techStack.projects.aws.scalable.usage"),
          impact: t("techStack.projects.aws.scalable.impact")
        }
      ]
    }
  ];

  const techStack = getTechStack();

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isInView) {
      techStack.forEach((item) => {
        setTimeout(() => {
          setVisibleItems((prev) => new Set([...prev, item.name]));
        }, item.delay);
      });
    }
  }, [isInView, techStack]);

  const getCategoryColor = (category: string) => {
    const colors = {
      frontend: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      backend: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      testing: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      tooling: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      cloud: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  };

  const handleMouseEnter = (techName: string, event: React.MouseEvent) => {
    if (isMobile) return; // Disable hover on mobile

    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const scrollY = window.scrollY;

    // Simple positioning - center above the element
    const x = rect.left + rect.width / 2;
    const y = rect.top + scrollY - 10;

    setHoverPosition({ x, y });
    setHoveredTech(techName);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;

    // Add small delay before hiding to prevent flickering
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredTech(null);
    }, 150);
  };

  const handleTechClick = (techName: string) => {
    if (isMobile) {
      setHoveredTech(techName);
      setShowMobileModal(true);
    }
  };

  const closeMobileModal = () => {
    setShowMobileModal(false);
    setHoveredTech(null);
  };

  return (
    <section ref={sectionRef} id="tech-stack-section" className="py-16 md:py-20 relative">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {t("techStack.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("techStack.description")}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {isMobile ? t("techStack.hoverInstruction.mobile") : t("techStack.hoverInstruction.desktop")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {techStack.map((item, index) => (
            <div
              key={item.name}
              className={`transform transition-all duration-700 ease-out ${
                visibleItems.has(item.name)
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
              style={{
                transitionDelay: visibleItems.has(item.name) ? "0ms" : `${item.delay}ms`,
                pointerEvents: 'auto',
              }}
            >
              <Badge
                variant="secondary"
                className={`text-sm md:text-base px-4 py-2 font-medium hover:scale-110 hover:shadow-lg transition-all duration-200 cursor-pointer ${getCategoryColor(
                  item.category
                )} ${isMobile ? 'active:scale-95' : ''}`}
                style={{ pointerEvents: 'auto' }}
                onMouseEnter={(e) => handleMouseEnter(item.name, e)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleTechClick(item.name)}
              >
                {item.name}
              </Badge>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            {t("techStack.footer")}
          </p>
        </div>
      </div>

      {/* Desktop Hover Card */}
      {hoveredTech && !isMobile && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-6"
            style={{
              minWidth: '300px',
              minHeight: '200px',
            }}
          >
            {(() => {
              const tech = techStack.find(t => t.name === hoveredTech);
              if (!tech) return null;

              return (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getCategoryColor(tech.category)}`}>
                      <Code className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white">{tech.name}</h4>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">{tech.category}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {tech.projects.slice(0, 1).map((project, index) => (
                      <div key={index} className="bg-muted/30 rounded-lg p-3">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white mb-1">{project.name}</p>
                        <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed mb-2">
                          {project.description}
                        </p>
                        {project.impact && (
                          <div className="flex items-center gap-2">
                            <Zap className="h-3 w-3 text-green-600" />
                            <p className="text-xs text-green-600 font-medium">
                              {project.impact}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                    {tech.projects.length > 1 && (
                      <p className="text-xs text-center text-gray-500">
                        +{tech.projects.length - 1} altri progetti
                      </p>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Mobile Modal */}
      {showMobileModal && hoveredTech && isMobile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto"
            style={{
              animation: 'modalSlideIn 0.3s ease-out',
            }}
          >
            {(() => {
              const tech = techStack.find(t => t.name === hoveredTech);
              if (!tech) return null;

              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(tech.category)}`}>
                        <Code className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{tech.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {tech.category}
                        </Badge>
                      </div>
                    </div>
                    <button
                      onClick={closeMobileModal}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tech.projects.map((project, index) => (
                      <div key={index} className="bg-muted/30 rounded-lg p-3 space-y-2">
                        <p className="font-medium text-sm text-foreground">{project.name}</p>
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex items-start gap-2 mt-2">
                          <Code className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {project.usage}
                          </p>
                        </div>
                        {project.impact && (
                          <div className="flex items-start gap-2 mt-2">
                            <Zap className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-green-600 font-medium leading-relaxed">
                              {project.impact}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}
