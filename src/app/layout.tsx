import { AIChatWidget } from "@/components/features/AIChatWidget";
import { Navbar } from "@/components/layout/Navbar";
import type { Metadata, Viewport } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Divya Prakash Gupta | Senior Full Stack Engineer",
  description: "Portfolio of Divya Prakash Gupta - Senior Full Stack Engineer & Curious Explorer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`antialiased bg-[#050505] text-white ${publicSans.className}`} suppressHydrationWarning>
        <Navbar />
        {children}
        <AIChatWidget />
      </body>
    </html>
  );
}
