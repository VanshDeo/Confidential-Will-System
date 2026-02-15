import React from 'react';
import { WalletConnector } from "@/components/wallet/WalletConnector";
import { Link } from '@tanstack/react-router';
import { ShieldCheck, Copyright } from 'lucide-react';

interface DAppLayoutProps {
    children: React.ReactNode;
}

export const DAppLayout: React.FC<DAppLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                            <ShieldCheck className="h-6 w-6" />
                            <span>Confidential Inheritance</span>
                        </Link>
                    </div>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link to="/" className="transition-colors hover:text-primary">Dashboard</Link>
                        <a href="#" className="transition-colors hover:text-primary text-muted-foreground">About</a>
                        <a href="#" className="transition-colors hover:text-primary text-muted-foreground">FAQ</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <WalletConnector />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container py-8 md:py-12">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t bg-muted/30">
                <div className="container py-8 md:py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="font-semibold mb-3">About Midnight</h3>
                            <p className="text-sm text-muted-foreground">
                                Built on the Midnight blockchain, offering data protection and regulatory compliance by design.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Resources</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-primary">Documentation</a></li>
                                <li><a href="#" className="hover:text-primary">Midnight Explorer</a></li>
                                <li><a href="#" className="hover:text-primary">Support</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-3">Legal</h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-primary">Disclaimer</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Copyright className="h-4 w-4" />
                            <span>2026 Confidential Inheritance DApp. All rights reserved.</span>
                        </div>
                        <div className="flex items-center gap-4 mt-4 md:mt-0">
                            <div className="flex items-center gap-1.5" title="Ensures data privacy">
                                <ShieldCheck className="h-4 w-4 text-privacy" />
                                <span>Privacy-First Design</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
