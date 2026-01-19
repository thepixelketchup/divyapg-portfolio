"use client";

import { cn } from '@/lib/utils';
import { Bot, Calendar, Loader2, Mail, MessageSquare, Send, Sparkles, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Message {
    role: 'assistant' | 'user';
    text: string;
}

export const AIChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            text: "Hi! I'm Divya's AI Agent. How can I help you?\n\nHere are a few things you can ask me:\n• Tell me about Divya's experience\n• What matches Divya's skills?\n• Is Divya available for a project?\n\nAre you reaching out for a project or job opportunity? 🚀"
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailDraft, setEmailDraft] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage as Message]);
        setInput('');
        setIsLoading(true);
        setEmailDraft(null);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    userInput: input
                })
            });

            const data = await response.json();
            let aiResponse = data.text || "I'm having trouble connecting right now. Please try again later.";

            if (aiResponse.includes('[EMAIL_SUMMARY_START]')) {
                const parts = aiResponse.split('[EMAIL_SUMMARY_START]');
                const conversationalText = parts[0].trim();
                const summaryPart = parts[1].split('[EMAIL_SUMMARY_END]')[0].trim();

                aiResponse = conversationalText;
                setEmailDraft(summaryPart);
            } else if (aiResponse.includes('[PREPARE_EMAIL_DRAFT]')) {
                // Fallback for older api responses or cache
                aiResponse = aiResponse.replace('[PREPARE_EMAIL_DRAFT]', '').trim();
                setEmailDraft(aiResponse);
            }

            setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', text: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLaunchEmail = () => {
        if (!emailDraft) return;
        const subject = encodeURIComponent("Project Opportunity for Divya (via AI Assistant)");
        const body = encodeURIComponent(`Hi Divya,\n\nI had a chat with your AI assistant about a potential opportunity. Here are the details we discussed:\n\n${emailDraft}\n\nLet's connect soon!`);
        window.location.href = `mailto:divya@thecuriousbunny.nl?subject=${subject}&body=${body}`;
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full text-black shadow-lg hover:scale-110 transition-transform duration-300 group cursor-pointer"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} className="fill-current" />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[500px] md:h-[600px] max-h-[70vh] md:max-h-[80vh] bg-[#111] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <div className="p-4 bg-gradient-to-r from-emerald-900/40 to-cyan-900/40 border-b border-white/5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center">
                            <Bot size={18} className="text-black" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">Divya's AI Agent</h3>
                            <p className="text-xs text-emerald-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Online
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={cn("flex gap-3", msg.role === 'user' ? 'flex-row-reverse' : '')}>
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center",
                                    msg.role === 'user' ? 'bg-white/10 text-white' : 'bg-emerald-500/20 text-emerald-400'
                                )}>
                                    {msg.role === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                                </div>
                                <div className={cn(
                                    "p-3 rounded-2xl text-sm max-w-[80%] whitespace-pre-wrap",
                                    msg.role === 'user'
                                        ? 'bg-white text-black rounded-tr-none'
                                        : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none'
                                )}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                    <Loader2 size={16} className="animate-spin" />
                                </div>
                                <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {emailDraft && (
                            <div className="flex flex-col gap-2 mt-2 animate-in fade-in slide-in-from-bottom-2">
                                <button
                                    onClick={handleLaunchEmail}
                                    className="w-full py-3 px-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Mail size={18} /> Send Details to Divya
                                </button>
                                <a
                                    href="https://calendly.com/divyapgupta"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 px-4 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors flex items-center justify-center gap-2 border border-white/10"
                                >
                                    <Calendar size={18} /> Book a Call Now
                                </a>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-white/5 bg-[#151515]">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about experience, skills, or availability..."
                                className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="p-2 bg-emerald-500 text-black rounded-xl hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
