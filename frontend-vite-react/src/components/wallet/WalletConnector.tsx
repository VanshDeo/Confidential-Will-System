import React from 'react';
import { Button } from "@/components/ui/button";
import { useWill } from "@/modules/midnight/will-sdk/hooks/useWill";
import { PrivacyBadge } from "@/components/privacy/PrivacyBadge";
import { Wallet, Loader2 } from "lucide-react";

export const WalletConnector: React.FC = () => {
    const { isConnected, connectWallet, loading, error } = useWill();

    if (loading) {
        return (
            <Button disabled variant="outline" className="gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Connecting...
            </Button>
        );
    }

    if (isConnected) {
        return (
            <div className="flex items-center gap-3">
                <PrivacyBadge level="secure" showText={true} />
                <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/10 rounded-lg border border-border">
                    <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    <span className="text-sm font-medium font-mono text-foreground">
                        Connected
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-end gap-2">
            <Button onClick={connectWallet} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                <Wallet className="h-4 w-4" />
                Connect Wallet
            </Button>
            {error && (
                <span className="text-xs text-destructive max-w-[200px] text-right">
                    {error}
                </span>
            )}
        </div>
    );
};
