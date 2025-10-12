"use client";

import { Button } from "@/components/ui/button";

interface BlogButtonProps {
  locale: string;
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  className?: string;
}

export function BlogButton({ locale, children, variant = "outline", className }: BlogButtonProps) {
  const handleClick = () => {
    window.location.href = `/${locale}/blog`;
  };

  return (
    <Button variant={variant} onClick={handleClick} className={className}>
      {children}
    </Button>
  );
}
