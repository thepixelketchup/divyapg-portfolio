"use client";

import { cn } from '@/lib/utils';
import { Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';

export const SmartSummary = () => {
    const [summary, setSummary] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const generateSummary = async (targetRole: string) => {
        setRole(targetRole);
        setLoading(true);
        setSummary(null);

        try {
            const response = await fetch('/api/summary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetRole })
            });

            const data = await response.json();
            const text = data.text;
            if (text) {
                setSummary(text);
            } else {
                setSummary("Unable to generate summary. Please try again.");
            }
        } catch (e) {
            setSummary("Could not generate summary at this time.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 p-6 bg-gradient-to-br from-emerald-900/10 to-purple-900/10 rounded-2xl border border-emerald-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-20 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors" />

            <div className="flex items-center gap-2 mb-4 text-emerald-400 font-mono text-sm relative z-10">
                <Sparkles size={16} />
                <span>AI Smart Summary</span>
            </div>

            <h4 className="text-white font-bold mb-4 relative z-10">How should I introduce myself to you?</h4>

            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                {['Recruiter', 'CTO', 'Product Manager'].map((r) => (
                    <button
                        key={r}
                        onClick={() => generateSummary(r)}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border cursor-pointer",
                            role === r
                                ? 'bg-emerald-500 text-black border-emerald-500'
                                : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:border-emerald-500/30'
                        )}
                    >
                        {r}
                    </button>
                ))}
            </div>

            {(loading || summary) && (
                <div className="relative z-10 bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-white/10 animate-in fade-in zoom-in-95 duration-300 min-h-[80px]">
                    {loading ? (
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <Loader2 size={16} className="animate-spin text-emerald-400" />
                            Generating tailored summary...
                        </div>
                    ) : (
                        <p className="text-gray-200 leading-relaxed italic text-base">
                            "{summary}"
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};
