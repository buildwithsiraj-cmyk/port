import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { portfolio } from "@/data/portfolio";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const title = "Siraj KS | Gen AI Engineer, Data Engineer & Full Stack Developer";
const description =
  "Explore Siraj KS's portfolio of work across Generative AI, data engineering, and full-stack development.";

export const metadata: Metadata = {
  metadataBase: portfolio.siteUrl ? new URL(portfolio.siteUrl) : undefined,
  title,
  description,
  alternates: portfolio.siteUrl ? { canonical: "/" } : undefined,
  openGraph: { title, description, type: "website", siteName: portfolio.name },
  twitter: { card: "summary", title, description },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#0B0D10" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
