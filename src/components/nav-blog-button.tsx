"use client";

interface NavBlogButtonProps {
  locale: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavBlogButton({ locale, children, className, onClick }: NavBlogButtonProps) {
  const handleClick = () => {
    if (onClick) onClick();
    window.location.href = `/${locale}/blog`;
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}
