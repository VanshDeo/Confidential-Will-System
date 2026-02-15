import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWill } from "@/modules/midnight/will-sdk/hooks/useWill";
import { useState } from "react";
import { DAppLayout } from "@/components/layout/DAppLayout";
import { StatusCard } from "@/components/common/StatusCard";
import { PrivacyBadge } from "@/components/privacy/PrivacyBadge";
import { WelcomeModal } from "@/components/onboarding/WelcomeModal";
import {
    Users,
    FileText,
    Coins,
    ShieldCheck,
    AlertCircle,
    Gavel
} from "lucide-react";

export function Dashboard() {
    const {
        isConnected,
        joinContract,
        contractState,
        addBeneficiary,
        executeWill,
        claim,
        loading,
        error,
    } = useWill();

    const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
    const [beneficiaryAmount, setBeneficiaryAmount] = useState("");

    const handleJoin = () => {
        joinContract();
    };

    const handleAddBeneficiary = async () => {
        if (!beneficiaryAddress || !beneficiaryAmount) return;
        try {
            await addBeneficiary(beneficiaryAddress, BigInt(beneficiaryAmount));
            setBeneficiaryAddress("");
            setBeneficiaryAmount("");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <DAppLayout>
            <WelcomeModal />

            <div className="space-y-8">
                {/* Hero / Intro */}
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">My Confidential Estate Plan</h1>
                    <p className="text-muted-foreground mt-2 max-w-2xl">
                        Manage your digital legacy securely with Midnight's privacy-preserving smart contracts.
                        Your beneficiary data remains encrypted until you decide otherwise.
                    </p>
                </div>

                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md flex items-center gap-2">
                        <AlertCircle className="h-5 w-5" />
                        <span>{error}</span>
                    </div>
                )}

                {!isConnected ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-xl border border-dashed border-border">
                        <ShieldCheck className="h-16 w-16 text-muted-foreground mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Connect Your Wallet</h2>
                        <p className="text-muted-foreground mb-6 text-center max-w-md">
                            Connect your Midnight wallet to access securely encrypted estate planning tools.
                        </p>
                        {/* Wallet connection is handled in header, providing instruction here */}
                    </div>
                ) : !contractState ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-card rounded-xl border shadow-sm">
                        <FileText className="h-16 w-16 text-primary mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Initialize Your Will</h2>
                        <p className="text-muted-foreground mb-6 text-center max-w-md">
                            No active will contract found. Join the deployed contract to start managing your estate.
                        </p>
                        <Button onClick={handleJoin} disabled={loading} size="lg" className="min-w-[200px]">
                            {loading ? "Joining..." : "Join Contract"}
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Contract Status Card */}
                        <div className="md:col-span-2 lg:col-span-1">
                            <StatusCard
                                title="Contract Status"
                                icon={<FileText className="h-5 w-5" />}
                                className="h-full"
                                badge={
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${contractState.isExecuted ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                        {contractState.isExecuted ? "EXECUTED" : "ACTIVE"}
                                    </span>
                                }
                            >
                                <div className="space-y-4">
                                    <div className="p-3 bg-secondary/10 rounded-lg">
                                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Owner Account</div>
                                        <div className="font-mono text-sm break-all">
                                            {contractState.owner ? Buffer.from(contractState.owner).toString('hex') : 'Hidden'}
                                        </div>
                                    </div>

                                    {!contractState.isExecuted && (
                                        <div className="pt-4 border-t border-border">
                                            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-destructive">
                                                <AlertCircle className="h-4 w-4" />
                                                Danger Zone
                                            </h4>
                                            <p className="text-xs text-muted-foreground mb-3">
                                                Executing the will effectively locks it and allows beneficiaries to claim assets. This action cannot be undone.
                                            </p>
                                            <Button
                                                variant="destructive"
                                                onClick={() => executeWill()}
                                                disabled={loading}
                                                className="w-full"
                                            >
                                                <Gavel className="h-4 w-4 mr-2" />
                                                Execute Will
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </StatusCard>
                        </div>

                        {/* Beneficiaries Card */}
                        <div className="md:col-span-2 lg:col-span-1">
                            <StatusCard
                                title="Add Beneficiary"
                                icon={<Users className="h-5 w-5" />}
                                className="h-full"
                            >
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="address">Address (Hex)</Label>
                                            <PrivacyBadge level="private" />
                                        </div>
                                        <Input
                                            id="address"
                                            placeholder="e.g. 00fa32..."
                                            value={beneficiaryAddress}
                                            onChange={(e) => setBeneficiaryAddress(e.target.value)}
                                            className="font-mono text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <Label htmlFor="amount">Amount</Label>
                                            <PrivacyBadge level="private" />
                                        </div>
                                        <Input
                                            id="amount"
                                            type="number"
                                            placeholder="1000"
                                            value={beneficiaryAmount}
                                            onChange={(e) => setBeneficiaryAmount(e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        onClick={handleAddBeneficiary}
                                        disabled={loading || contractState.isExecuted}
                                        className="w-full"
                                    >
                                        Encrypt & Add Beneficiary
                                    </Button>
                                </div>
                            </StatusCard>
                        </div>

                        {/* Claim Card */}
                        <div className="md:col-span-2 lg:col-span-1">
                            <StatusCard
                                title="Claim Inheritance"
                                icon={<Coins className="h-5 w-5" />}
                                className="h-full"
                            >
                                {contractState.isExecuted ? (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 rounded-lg text-center">
                                            <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Inheritance Unlocked</h4>
                                            <p className="text-sm text-green-600 dark:text-green-500 mb-4">
                                                Funds are now available for claim by designated beneficiaries.
                                            </p>
                                            <Button
                                                onClick={() => claim("YOUR_ADDRESS")}
                                                disabled={loading}
                                                className="w-full bg-green-600 hover:bg-green-700 text-white"
                                            >
                                                Claim Available Funds
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-48 text-center p-4">
                                        <Lock className="h-8 w-8 text-muted-foreground/30 mb-3" />
                                        <h4 className="font-medium text-muted-foreground">Assets Locked</h4>
                                        <p className="text-xs text-muted-foreground/70 mt-1 max-w-[200px]">
                                            Claims can only be made after the will has been executed.
                                        </p>
                                    </div>
                                )}
                            </StatusCard>
                        </div>
                    </div>
                )}
            </div>
        </DAppLayout>
    );
}

// Helper component for the locked state
function Lock(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    )
}
