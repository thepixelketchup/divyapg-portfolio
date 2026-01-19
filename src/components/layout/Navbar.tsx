"use client";

import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const scrollTo = (id: string) => {
        setIsMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
    };

    return (
        <>
            <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-tr from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center text-black font-black text-sm rotate-3">DP</div>
                        <span>Gupta<span className="text-emerald-500">.</span></span>
                    </div>

                    <div className="hidden md:flex gap-8 items-center">
                        {['Home', 'About', 'Experience', 'Skills'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollTo(item.toLowerCase())}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-emerald-400 cursor-pointer",
                                    activeSection === item.toLowerCase() ? 'text-white' : 'text-gray-400'
                                )}
                            >
                                {item}
                            </button>
                        ))}
                        <button
                            onClick={() => scrollTo('contact')}
                            className="px-5 py-2 bg-white text-black text-sm font-bold rounded-full hover:scale-105 transition-transform cursor-pointer"
                        >
                            Let's Talk
                        </button>
                    </div>

                    <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden">
                    <div className="flex flex-col gap-6 text-2xl font-light">
                        {['Home', 'About', 'Experience', 'Skills'].map((item) => (
                            <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="text-left py-4 border-b border-white/10 text-white">
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
