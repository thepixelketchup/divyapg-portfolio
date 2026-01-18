"use client";

import { ArrowRight, Database, Download, Github, Linkedin, MapPin, Zap } from 'lucide-react';

export const Hero = () => {
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center">
            {/* Abstract Background Shapes */}
            <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-sm font-medium mb-8 animate-fade-in-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Available for new opportunities
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8 tracking-tight">
                        Divya Prakash <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400">
                            Gupta
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-lg mb-10 leading-relaxed">
                        Senior Full Stack Engineer transforming complex problems into elegant, user-centered digital solutions.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button onClick={scrollToContact} className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition-all flex items-center gap-2 group cursor-pointer">
                            Contact Me <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                        </button>
                        <button onClick={() => window.open('https://linkedin.com/in/divyapgupta', '_blank')} className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-full transition-all flex items-center gap-2 cursor-pointer">
                            <Download size={18} /> Download CV
                        </button>
                    </div>

                    <div className="mt-12 flex items-center gap-6 text-gray-500">
                        <div className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-pointer">
                            <Github size={20} />
                        </div>
                        <div className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-pointer">
                            <Linkedin size={20} />
                        </div>
                        <div className="h-4 w-px bg-white/20" />
                        <div className="flex items-center gap-2 text-sm font-mono hover:text-emerald-400 transition-colors cursor-pointer">
                            <MapPin size={16} className="text-emerald-500" />
                            Amsterdam, NL
                        </div>
                    </div>
                </div>

                {/* Code Block Visual */}
                <div className="relative hidden lg:block h-[600px] flex items-center justify-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-20">
                        <div className="animate-float">
                            {/* Code Window Header */}
                            <div className="bg-[#1a1a1a] rounded-t-xl p-4 flex items-center gap-2 border border-white/10 border-b-0">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <div className="ml-4 text-xs text-gray-500 font-mono">developer_profile.json</div>
                            </div>

                            {/* Code Window Body */}
                            <div className="bg-[#111] p-6 rounded-b-xl border border-white/10 shadow-2xl font-mono text-sm leading-relaxed text-gray-300">
                                <span className="text-purple-400">const</span> <span className="text-yellow-400">developer</span> = {'{'}
                                <div className="pl-4">
                                    <span className="text-blue-300">name</span>: <span className="text-emerald-400">'Divya Prakash Gupta'</span>,
                                    <br />
                                    <span className="text-blue-300">role</span>: <span className="text-emerald-400">'Senior Full Stack Engineer'</span>,
                                    <br />
                                    <span className="text-blue-300">yearsExperience</span>: <span className="text-orange-400">14</span>,
                                    <br />
                                    <span className="text-blue-300">traits</span>: [
                                    <div className="pl-4">
                                        <span className="text-emerald-400">'Curious Explorer'</span>,
                                        <br />
                                        <span className="text-emerald-400">'Design-Driven'</span>,
                                        <br />
                                        <span className="text-emerald-400">'Technical All-rounder'</span>
                                    </div>
                                    ],
                                    <br />
                                    <span className="text-blue-300">focus</span>: <span className="text-emerald-400">'High-performance scalable solutions'</span>
                                </div>
                                {'}'};
                            </div>
                        </div>
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[80%] z-10 opacity-40 -z-10">
                        <div className="w-full h-full bg-[#222] rounded-3xl border border-white/5 shadow-xl rotate-[6deg] animate-float-delayed" />
                    </div>

                    <div className="absolute top-[10%] right-[-10%] p-4 bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-lg animate-bounce duration-[3000ms] z-30">
                        <Zap className="text-yellow-400 fill-current" size={24} />
                    </div>
                    <div className="absolute bottom-[15%] left-[-5%] p-4 bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-lg animate-bounce duration-[4000ms] z-30">
                        <Database className="text-purple-400" size={24} />
                    </div>
                </div>
            </div>
        </section>
    );
};
