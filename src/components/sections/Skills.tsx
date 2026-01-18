"use client";

import { BentoCard } from '@/components/ui/BentoCard';
import { Cloud, Code, Database, GitBranch, PenTool, Server } from 'lucide-react';

export const Skills = () => {
    return (
        <section id="skills" className="py-20 px-6 bg-[#050505]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-emerald-500 font-mono text-xl">03.</span>
                        Tech Stack
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Frontend */}
                    <BentoCard className="bg-[#111]">
                        <div className="flex items-center gap-3 mb-6 text-emerald-400">
                            <Code size={24} />
                            <h3 className="text-lg font-bold text-white">Frontend</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'React Native', 'Angular', 'Vue', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5/CSS3', 'Tailwind', 'Redux', 'GraphQL'].map(s => (
                                <span key={s} className="px-2 py-1 bg-white/5 rounded text-sm text-gray-400 border border-white/5">{s}</span>
                            ))}
                        </div>
                    </BentoCard>

                    {/* Backend */}
                    <BentoCard className="bg-[#111]">
                        <div className="flex items-center gap-3 mb-6 text-blue-400">
                            <Server size={24} />
                            <h3 className="text-lg font-bold text-white">Backend</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['Node.js', 'Express', 'Python', 'Java', 'REST API', 'GraphQL', 'Microservices'].map(s => (
                                <span key={s} className="px-2 py-1 bg-white/5 rounded text-sm text-gray-400 border border-white/5">{s}</span>
                            ))}
                        </div>
                    </BentoCard>

                    {/* Database */}
                    <BentoCard className="bg-[#111]">
                        <div className="flex items-center gap-3 mb-6 text-purple-400">
                            <Database size={24} />
                            <h3 className="text-lg font-bold text-white">Database</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['MongoDB', 'Mongoose', 'MySQL', 'PostgreSQL'].map(s => (
                                <span key={s} className="px-2 py-1 bg-white/5 rounded text-sm text-gray-400 border border-white/5">{s}</span>
                            ))}
                        </div>
                    </BentoCard>

                    {/* DevOps */}
                    <BentoCard className="bg-[#111]">
                        <div className="flex items-center gap-3 mb-6 text-orange-400">
                            <Cloud size={24} />
                            <h3 className="text-lg font-bold text-white">DevOps & Cloud</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['AWS', 'Azure DevOps', 'Docker', 'CI/CD', 'Firebase', 'Google Cloud', 'Serverless'].map(s => (
                                <span key={s} className="px-2 py-1 bg-white/5 rounded text-sm text-gray-400 border border-white/5">{s}</span>
                            ))}
                        </div>
                    </BentoCard>

                    {/* Testing */}
                    <BentoCard className="bg-[#111]">
                        <div className="flex items-center gap-3 mb-6 text-red-400">
                            <PenTool size={24} />
                            <h3 className="text-lg font-bold text-white">Testing</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['Jest', 'Vitest', 'Cypress', 'Cucumber', 'React Testing Library', 'TDD/BDD'].map(s => (
                                <span key={s} className="px-2 py-1 bg-white/5 rounded text-sm text-gray-400 border border-white/5">{s}</span>
                            ))}
                        </div>
                    </BentoCard>

                    {/* Tools */}
                    <BentoCard className="bg-[#111]">
                        <div className="flex items-center gap-3 mb-6 text-yellow-400">
                            <GitBranch size={24} />
                            <h3 className="text-lg font-bold text-white">Tools & Methods</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['Agile/Scrum', 'Git', 'Design Thinking', 'Jira', 'Figma', 'A/B Testing'].map(s => (
                                <span key={s} className="px-2 py-1 bg-white/5 rounded text-sm text-gray-400 border border-white/5">{s}</span>
                            ))}
                        </div>
                    </BentoCard>
                </div>
            </div>
        </section>
    );
};
