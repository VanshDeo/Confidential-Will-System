import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, Lock, EyeOff } from "lucide-react";

const FeatureItem = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-secondary/5 border border-border/50">
        <div className="p-2 rounded-full bg-primary/10 text-primary">
            {icon}
        </div>
        <div>
            <h4 className="font-semibold text-foreground mb-1">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
);

export const WelcomeModal: React.FC = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
        if (!hasSeenWelcome) {
            setOpen(true);
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
        localStorage.setItem('hasSeenWelcome', 'true');
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[600px] gap-6">
                <DialogHeader>
                    <div className="mx-auto p-4 rounded-full bg-primary/10 mb-4">
                        <Shield className="h-12 w-12 text-primary" />
                    </div>
                    <DialogTitle className="text-2xl text-center font-bold">Welcome to Confidential Inheritance</DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Secure your legacy with the power of Zero-Knowledge cryptography on the Midnight blockchain.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                    <FeatureItem
                        icon={<Lock className="h-5 w-5" />}
                        title="End-to-End Encrypted"
                        description="Your personal data and beneficiary details are encrypted before they leave your device."
                    />
                    <FeatureItem
                        icon={<EyeOff className="h-5 w-5" />}
                        title="Zero-Knowledge Privacy"
                        description="Prove ownership and execute transfers without revealing amounts or identities to the public."
                    />
                </div>

                <DialogFooter className="sm:justify-center">
                    <Button onClick={handleClose} size="lg" className="w-full sm:w-auto min-w-[200px]">
                        Get Started
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
