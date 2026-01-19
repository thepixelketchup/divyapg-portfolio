"use client";

import { Badge } from '@/components/ui/Badge';
import { BentoCard } from '@/components/ui/BentoCard';
import { ExternalLink } from 'lucide-react';

export const Experience = () => {
    return (
        <section id="experience" className="py-20 px-6 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
                        <span className="text-emerald-500 font-mono text-xl">02.</span>
                        Experience
                    </h2>
                </div>

                <div className="max-w-4xl space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[20px] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-emerald-500/20 before:to-transparent">

                    {/* Job 1 */}
                    <BentoCard className="relative pl-8 md:pl-10">
                        <div className="absolute top-8 left-0 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-emerald-500 z-10" />
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">Senior Full Stack Engineer (Freelance)</h3>
                                <div className="text-emerald-400 font-medium text-lg">Nationale-Nederlanden</div>
                                <div className="text-sm text-gray-500 mt-1">Team: Onboarding & Authentication</div>
                            </div>
                            <div className="text-right mt-2 md:mt-0">
                                <div className="text-gray-400 font-mono text-sm">Aug 2022 - Present</div>
                                <div className="text-gray-500 text-sm">The Hague</div>
                            </div>
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-2 text-gray-400 mb-6 marker:text-emerald-500">
                            <li>Lead Backend Developer for user identity verification and customer screening.</li>
                            <li>Implemented comprehensive automated testing using Vitest and Cucumber.</li>
                            <li>Established CI/CD pipeline using Azure DevOps.</li>
                            <li>Contributed to React Native app development for iOS and Android.</li>
                            <li>Collaborated with payments, savings, and pension teams.</li>
                        </ul>
                        <div className="flex flex-wrap gap-2">
                            <Badge color="orange">React Native</Badge>
                            <Badge color="orange">Node.js</Badge>
                            <Badge color="orange">AWS</Badge>
                            <Badge color="orange">Vitest</Badge>
                        </div>
                    </BentoCard>

                    {/* Job 2 */}
                    <BentoCard className="relative pl-8 md:pl-10">
                        <div className="absolute top-8 left-0 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-emerald-500 z-10" />
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">Senior Full Stack Engineer</h3>
                                <div className="text-blue-400 font-medium text-lg">Adevinta [Marktplaats/2dehands]</div>
                                <div className="text-sm text-gray-500 mt-1">Team: Interactions</div>
                            </div>
                            <div className="text-right mt-2 md:mt-0">
                                <div className="text-gray-400 font-mono text-sm">Aug 2021 - Mar 2023</div>
                                <div className="text-gray-500 text-sm">Amsterdam</div>
                            </div>
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-2 text-gray-400 mb-6 marker:text-blue-500">
                            <li>Led migration of legacy messaging app from Backbone.js to React.</li>
                            <li>Drove 12% increase in user engagement via A/B tested features.</li>
                            <li>Built Buyer Protection feature for secure trading.</li>
                            <li>Participated in user research and design-thinking initiatives.</li>
                        </ul>
                        <div className="flex flex-wrap gap-2">
                            <Badge color="blue">React</Badge>
                            <Badge color="blue">Node.js</Badge>
                            <Badge color="blue">Python</Badge>
                            <Badge color="blue">Google Analytics</Badge>
                        </div>
                    </BentoCard>

                    {/* Job 3 */}
                    <BentoCard className="relative pl-8 md:pl-10">
                        <div className="absolute top-8 left-0 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-emerald-500 z-10" />
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">Senior Full Stack Engineer (Freelance)</h3>
                                <div className="text-purple-400 font-medium text-lg">eBay Classifieds</div>
                                <div className="text-sm text-gray-500 mt-1">Team: Finding</div>
                            </div>
                            <div className="text-right mt-2 md:mt-0">
                                <div className="text-gray-400 font-mono text-sm">Aug 2019 - July 2021</div>
                                <div className="text-gray-500 text-sm">Amsterdam</div>
                            </div>
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-2 text-gray-400 mb-6 marker:text-purple-500">
                            <li>Conceived and launched over 100 targeted experiments.</li>
                            <li>Significantly increased active buyers and ad revenue.</li>
                            <li>Implemented video ads resulting in notable revenue increase.</li>
                            <li>Ensured GDPR compliance.</li>
                        </ul>
                        <div className="flex flex-wrap gap-2">
                            <Badge color="purple">Next.js</Badge>
                            <Badge color="purple">GraphQL</Badge>
                            <Badge color="purple">Experimentation</Badge>
                        </div>
                    </BentoCard>

                    {/* Job 4 */}
                    <BentoCard className="relative pl-8 md:pl-10">
                        <div className="absolute top-8 left-0 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-emerald-500 z-10" />
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">Senior Front-End Engineer</h3>
                                <div className="text-emerald-400 font-medium text-lg">Tikkie [via TCS]</div>
                                <div className="text-sm text-gray-500 mt-1">Team: Tikkie Zakelijk</div>
                            </div>
                            <div className="text-right mt-2 md:mt-0">
                                <div className="text-gray-400 font-mono text-sm">Dec 2018 - July 2019</div>
                                <div className="text-gray-500 text-sm">Amsterdam</div>
                            </div>
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-2 text-gray-400 mb-6 marker:text-emerald-500">
                            <li>Created design system and reusable UI component library.</li>
                            <li>Contributed to Tikkie Zakelijk portal for business transactions.</li>
                        </ul>
                        <div className="flex flex-wrap gap-2">
                            <Badge color="emerald">React</Badge>
                            <Badge color="emerald">Redux</Badge>
                            <Badge color="emerald">Storybook</Badge>
                            <Badge color="emerald">AWS</Badge>
                        </div>
                    </BentoCard>

                    {/* Job 5 */}
                    <BentoCard className="relative pl-8 md:pl-10">
                        <div className="absolute top-8 left-0 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-emerald-500 z-10" />
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">Senior Front-End Engineer</h3>
                                <div className="text-yellow-400 font-medium text-lg">ABN AMRO Bank [via TCS]</div>
                                <div className="text-sm text-gray-500 mt-1">Teams: Multibanking, Front-End CoE</div>
                            </div>
                            <div className="text-right mt-2 md:mt-0">
                                <div className="text-gray-400 font-mono text-sm">Dec 2015 - Nov 2018</div>
                                <div className="text-gray-500 text-sm">Amsterdam</div>
                            </div>
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-2 text-gray-400 mb-6 marker:text-yellow-500">
                            <li>Led front-end development of PSD2 Multibanking application.</li>
                            <li>Redesigned internal omni-channel front-end framework architecture.</li>
                            <li>Crafted and evangelized FE framework standards/guidelines.</li>
                        </ul>
                        <div className="flex flex-wrap gap-2">
                            <Badge color="yellow">AngularJS</Badge>
                            <Badge color="yellow">Vue.js</Badge>
                            <Badge color="yellow">React</Badge>
                            <Badge color="yellow">Webpack</Badge>
                        </div>
                    </BentoCard>

                    {/* Job 6 */}
                    <BentoCard className="relative pl-8 md:pl-10">
                        <div className="absolute top-8 left-0 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-emerald-500 z-10" />
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">Front-End Engineer</h3>
                                <div className="text-blue-400 font-medium text-lg">Royal Bank of Scotland [via TCS]</div>
                                <div className="text-sm text-gray-500 mt-1">Mumbai</div>
                            </div>
                            <div className="text-right mt-2 md:mt-0">
                                <div className="text-gray-400 font-mono text-sm">Apr 2012 - Nov 2015</div>
                                <div className="text-gray-500 text-sm">Mumbai</div>
                            </div>
                        </div>
                        <ul className="list-disc list-outside ml-4 space-y-2 text-gray-400 mb-6 marker:text-blue-500">
                            <li>Development, maintenance, and support of internet/intranet corporate banking applications.</li>
                            <li>Information security coordinator for Mumbai offshore center.</li>
                        </ul>
                        <div className="flex flex-wrap gap-2">
                            <Badge color="blue">Javascript</Badge>
                            <Badge color="blue">HTML/CSS</Badge>
                            <Badge color="blue">JSP</Badge>
                        </div>
                    </BentoCard>

                    <div className="pl-10">
                        <button
                            onClick={() => window.open('https://linkedin.com/in/divyapgupta', '_blank')}
                            className="text-emerald-400 hover:text-emerald-300 font-mono text-sm flex items-center gap-2 group cursor-pointer"
                        >
                            View Full History on LinkedIn <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
