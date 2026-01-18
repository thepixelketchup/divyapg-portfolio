import { cn } from '@/lib/utils';
import React from 'react';

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const BentoCard = ({ children, className = "", delay = 0 }: BentoCardProps) => (
    <div
        className={cn(
            "bg-[#111] border border-white/5 rounded-3xl p-6 hover:border-emerald-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-900/10 group overflow-hidden relative",
            className
        )}
        style={{ animationDelay: `${delay}ms` }}
    >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {children}
    </div>
);
