import { AIChatWidget } from "@/components/features/AIChatWidget";
import { Navbar } from "@/components/layout/Navbar";
import type { Metadata, Viewport } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Set NEXT_PUBLIC_SITE_URL in your environment to the real deployed domain.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const TITLE = "Divya Prakash Gupta | Senior Full Stack Engineer";
const DESCRIPTION = "Portfolio of Divya Prakash Gupta - Senior Full Stack Engineer & Curious Explorer.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["Divya Prakash Gupta", "Senior Full Stack Engineer", "React Developer", "Node.js", "Amsterdam"],
  authors: [{ name: "Divya Prakash Gupta" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Divya Prakash Gupta",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Divya Prakash Gupta",
  jobTitle: "Senior Full Stack Engineer",
  url: SITE_URL,
  address: { "@type": "PostalAddress", addressLocality: "Amsterdam", addressCountry: "NL" },
  sameAs: ["https://linkedin.com/in/divyapgupta"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`antialiased bg-[#050505] text-white ${publicSans.className}`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Navbar />
        {children}
        <AIChatWidget />
      </body>
    </html>
  );
}
