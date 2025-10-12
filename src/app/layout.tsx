import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { generateSEO } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = generateSEO();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
