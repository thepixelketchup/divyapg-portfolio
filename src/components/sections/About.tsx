"use client";

import { SmartSummary } from '@/components/features/SmartSummary';
import { BentoCard } from '@/components/ui/BentoCard';
import { Coffee, Terminal } from 'lucide-react';

export const About = () => {
    return (
        <section id="about" className="sticky top-0 z-10 py-20 px-6 bg-[#050505] min-h-screen flex flex-col justify-center">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-emerald-500 font-mono text-xl">01.</span>
                        About Me
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6">
                    {/* Main Bio - Large Card */}
                    <BentoCard className="md:col-span-2 md:row-span-2 flex flex-col justify-between bg-gradient-to-br from-[#111] to-[#0a0a0a]">
                        <div>
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-6">
                                <Terminal size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">The Curious Explorer</h3>
                            <p className="text-gray-400 leading-relaxed mb-6">
                                I am a Senior Full Stack Engineer with over <strong className="text-white">15 years</strong> of experience building high-scale digital solutions in the Banking, Fintech, and eClassifieds domains. I specialize in bridging the gap between complex backend logic and intuitive frontend design, ensuring technical robustness translates into seamless user experiences. I don’t just write code; I use technology to solve problems, optimize performance, and drive measurable business growth.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Beyond the code, I am an active maker, entrepreneur, and mentor, passionate about sharing knowledge and helping people to become the best version of themselves.
                            </p>

                            <SmartSummary />
                        </div>
                    </BentoCard>

                    {/* Stats Cards */}
                    <BentoCard className="md:col-span-1 bg-[#151515] flex flex-col items-center justify-center text-center">
                        <div className="text-4xl font-bold text-white mb-2">15+</div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">Years Experience</p>
                    </BentoCard>

                    <BentoCard className="md:col-span-1 bg-[#151515] flex flex-col items-center justify-center text-center">
                        <div className="text-4xl font-bold text-white mb-2">100+</div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">Experiments Launched</p>
                    </BentoCard>

                    <BentoCard className="md:col-span-2 bg-[#151515] flex items-center justify-between px-10">
                        <div>
                            <div className="text-3xl font-bold text-emerald-400 mb-1">High</div>
                            <p className="text-sm text-gray-500 uppercase tracking-wider">User Engagement</p>
                        </div>
                        <Coffee className="text-orange-400 opacity-50" size={48} />
                    </BentoCard>
                </div>
            </div>
        </section>
    );
};
