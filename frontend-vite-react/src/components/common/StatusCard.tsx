import React from 'react';

interface StatusCardProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    badge?: React.ReactNode;
}

export const StatusCard: React.FC<StatusCardProps> = ({ title, icon, children, className = '', badge }) => {
    return (
        <div className={`bg-card text-card-foreground rounded-xl border border-border/50 shadow-sm p-6 ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {icon && <span className="text-primary">{icon}</span>}
                    <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                {badge}
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};
