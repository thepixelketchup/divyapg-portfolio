import { cn } from '@/lib/utils';
import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    color?: 'emerald' | 'purple' | 'blue' | 'orange' | 'gray';
    className?: string;
}

export const Badge = ({ children, color = "emerald", className }: BadgeProps) => {
    const colors = {
        emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
        purple: "bg-purple-500/10 text-purple-300 border-purple-500/20",
        blue: "bg-blue-500/10 text-blue-300 border-blue-500/20",
        orange: "bg-orange-500/10 text-orange-300 border-orange-500/20",
        gray: "bg-gray-800 text-gray-300 border-gray-700",
    };

    return (
        <span className={cn(
            "px-3 py-1 rounded-full text-xs font-mono font-medium border inline-flex items-center gap-1",
            colors[color] || colors.emerald,
            className
        )}>
            {children}
        </span>
    );
};
