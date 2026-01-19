"use client";

import { Linkedin, Mail } from 'lucide-react';

export const Contact = () => {
    return (
        <section id="contact" className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-emerald-500 font-mono text-xl">04.</span>
                        What's Next?
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#111] to-[#050505] border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-emerald-500/5 blur-3xl pointer-events-none" />

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Get In Touch</h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto relative z-10">
                        I'm currently open to new opportunities. Whether you have a question about my stack,
                        want to discuss a project, or just want to say hi, my inbox is always open.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                        <a href="mailto:divya@thecuriousbunny.nl" className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                            <Mail size={18} /> Say Hello
                        </a>
                        <a href="https://linkedin.com/in/divyapgupta" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#1a1a1a] text-white font-bold rounded-full border border-white/10 hover:bg-[#222] transition-colors flex items-center justify-center gap-2 cursor-pointer">
                            <Linkedin size={18} /> Connect on LinkedIn
                        </a>
                    </div>
                </div>

                <footer className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col items-center gap-2 text-sm text-gray-500 text-center">
                    <div>© 2025 Divya Prakash Gupta. All rights reserved.</div>
                    <div>Made with Antigravity + Gemini in a couple of hours 🚀</div>
                </footer>
            </div>
        </section>
    );
};
