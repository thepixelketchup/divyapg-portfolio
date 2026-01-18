import { AIChatWidget } from "@/components/features/AIChatWidget";
import { Navbar } from "@/components/layout/Navbar";
import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#050505] text-white">
        <Navbar />
        {children}
        <AIChatWidget />
      </body>
    </html>
  );
}
