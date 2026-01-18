import { JobMatchAnalyzer } from "@/components/features/JobMatchAnalyzer";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 selection:bg-emerald-500/30">
      <Hero />
      <About />
      <Experience />
      <Skills />

      {/* Job Matcher Section */}
      <section className="py-20 px-6 bg-[#050505]">
        <JobMatchAnalyzer />
      </section>

      <Contact />
    </main>
  );
}
