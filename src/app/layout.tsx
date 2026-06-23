import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BRAND } from "@/lib/constants";
import { SITE_URL } from "@/lib/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.name} — Social proof walls for your website`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    "Castio turns testimonials, reviews, screenshots and UGC into clean, embeddable proof walls that convert. Collect proof, curate it, display it.",
  applicationName: BRAND.name,
  keywords: [
    "social proof",
    "testimonial wall",
    "wall of love",
    "UGC wall",
    "review wall",
    "social proof widget",
    "Curator.io alternative",
  ],
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    title: `${BRAND.name} — Social proof walls for your website`,
    description:
      "Turn scattered social proof into conversion-ready proof walls you can embed anywhere.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — Social proof walls for your website`,
    description:
      "Turn scattered social proof into conversion-ready proof walls you can embed anywhere.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
