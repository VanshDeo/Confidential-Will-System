import React from 'react';
import { Shield, ShieldAlert, Globe, Lock } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";

export type PrivacyLevel = 'private' | 'partial' | 'public' | 'secure';

interface PrivacyBadgeProps {
    level: PrivacyLevel;
    className?: string;
    showText?: boolean;
}

export const PrivacyBadge: React.FC<PrivacyBadgeProps> = ({ level, className = '', showText = true }) => {
    const config = {
        private: {
            icon: <Shield className="w-3 h-3" />,
            text: 'Encrypted',
            color: 'text-emerald-700 dark:text-emerald-400',
            bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
            borderColor: 'border-emerald-200 dark:border-emerald-800',
            tooltip: 'End-to-end encrypted. Only visible to you.'
        },
        secure: {
            icon: <Lock className="w-3 h-3" />,
            text: 'Secure',
            color: 'text-blue-700 dark:text-blue-400',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
            borderColor: 'border-blue-200 dark:border-blue-800',
            tooltip: 'Protected by Midnight Shield.'
        },
        partial: {
            icon: <ShieldAlert className="w-3 h-3" />,
            text: 'Partially Private',
            color: 'text-amber-700 dark:text-amber-400',
            bgColor: 'bg-amber-100 dark:bg-amber-900/30',
            borderColor: 'border-amber-200 dark:border-amber-800',
            tooltip: 'Some information is visible on-chain.'
        },
        public: {
            icon: <Globe className="w-3 h-3" />,
            text: 'Public',
            color: 'text-slate-600 dark:text-slate-400',
            bgColor: 'bg-slate-100 dark:bg-slate-800',
            borderColor: 'border-slate-200 dark:border-slate-700',
            tooltip: 'Visible on the public blockchain.'
        }
    };

    const { icon, text, color, bgColor, borderColor, tooltip } = config[level];

    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border ${bgColor} ${borderColor} ${className} transition-colors cursor-help`}>
                        <span className={color}>{icon}</span>
                        {showText && <span className={`text-xs font-medium ${color}`}>{text}</span>}
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
