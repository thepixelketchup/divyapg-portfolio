"use client";

import { Briefcase, CheckCircle2, FileText, Loader2, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface JobMatchResult {
    matchScore: number;
    analysis: string;
    matchingSkills: string[];
    missingSkills: string[];
}

export const JobMatchAnalyzer = () => {
    const [jdText, setJdText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<JobMatchResult | null>(null);

    const analyzeJob = async () => {
        if (!jdText.trim()) return;
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch('/api/job-match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jdText })
            });

            const data = await response.json();
            if (data.result) {
                setResult(data.result);
            }
        } catch (error) {
            console.error(error);
            alert("Analysis failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="sticky top-0 z-40 py-20 px-6 bg-[#050505] min-h-screen flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">
                <div className="mb-12 text-left">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-emerald-500 font-mono text-xl">04.</span>
                        AI Job Matcher
                    </h2>
                    <p className="text-gray-400 max-w-2xl bg-[#050505]">
                        Leverage my custom AI agent to analyze your Job Description against my resume.
                        Get an instant match score, skills gap analysis, and honest feedback on fit.
                    </p>
                </div>

                <div className="w-full p-8 rounded-3xl bg-[#111] border border-emerald-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                            <Briefcase size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Paste your JD below</h2>
                            <p className="text-gray-400 text-sm">I'll check if I'm the right fit for your team.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Input Area */}
                        <div className="space-y-4">
                            <textarea
                                value={jdText}
                                onChange={(e) => setJdText(e.target.value)}
                                placeholder="Paste Job Description here..."
                                className="w-full h-48 bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-gray-300 focus:outline-none focus:border-emerald-500/50 resize-none custom-scrollbar"
                            />
                            <button
                                onClick={analyzeJob}
                                disabled={loading || !jdText.trim()}
                                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                                Analyze Fit
                            </button>
                        </div>

                        {/* Results Area */}
                        <div className="bg-black/30 rounded-xl border border-white/5 p-6 min-h-[250px] flex items-center justify-center relative">
                            {!result && !loading && (
                                <div className="text-center text-gray-500">
                                    <FileText size={48} className="mx-auto mb-3 opacity-20" />
                                    <p>Results will appear here</p>
                                </div>
                            )}

                            {result && (
                                <div className="w-full space-y-6 animate-in fade-in slide-in-from-right-4">
                                    {/* Score */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-4xl font-bold text-white">{result.matchScore}%</span>
                                            <span className="text-sm text-gray-400 block">Match Score</span>
                                        </div>
                                        <div className="w-16 h-16 relative flex items-center justify-center">
                                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
                                                {/* Background Track */}
                                                <circle
                                                    cx="32" cy="32" r="28"
                                                    fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4"
                                                />
                                                {/* Progress Arc */}
                                                <circle
                                                    cx="32" cy="32" r="28"
                                                    fill="none" stroke="#10b981" strokeWidth="4"
                                                    strokeDasharray={`${(result.matchScore / 100) * 175} 175`}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <CheckCircle2 className="text-emerald-500 relative z-10" size={24} />
                                        </div>
                                    </div>

                                    {/* Analysis */}
                                    <p className="text-sm text-gray-300 italic border-l-2 border-emerald-500/30 pl-3">
                                        "{result.analysis}"
                                    </p>

                                    {/* Skills Breakdown */}
                                    <div className="space-y-3">
                                        <div>
                                            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Matching Skills</h4>
                                            <div className="flex flex-wrap gap-1.5">
                                                {result.matchingSkills?.map(skill => (
                                                    <span key={skill} className="px-2 py-1 bg-emerald-500/10 text-emerald-300 rounded text-xs border border-emerald-500/20">{skill}</span>
                                                ))}
                                            </div>
                                        </div>

                                        {result.missingSkills?.length > 0 && (
                                            <div>
                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Missing / To Discuss</h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {result.missingSkills.map(skill => (
                                                        <span key={skill} className="px-2 py-1 bg-white/5 text-gray-400 rounded text-xs border border-white/10">{skill}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
