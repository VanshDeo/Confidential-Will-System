import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWill, useDemoBeneficiaries, useIsDemo } from "@/modules/midnight/will-sdk/hooks/useWill";
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
    Gavel,
    CheckCircle2,
    Clock,
    Loader2,
    UserPlus,
    Trash2,
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

    const demoBeneficiaries = useDemoBeneficiaries();
    const isDemo = useIsDemo();

    const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
    const [beneficiaryAmount, setBeneficiaryAmount] = useState("");
    const [claimAddress, setClaimAddress] = useState("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const showSuccess = (msg: string) => {
        setSuccessMessage(msg);
        setTimeout(() => setSuccessMessage(null), 4000);
    };

    const handleJoin = () => {
        joinContract();
    };

    const handleAddBeneficiary = async () => {
        if (!beneficiaryAddress || !beneficiaryAmount) return;
        try {
            await addBeneficiary(beneficiaryAddress, BigInt(beneficiaryAmount));
            setBeneficiaryAddress("");
            setBeneficiaryAmount("");
            showSuccess(`Beneficiary added successfully! (${beneficiaryAddress.slice(0, 8)}…)`);
        } catch (e) {
            console.error(e);
        }
    };

    const handleClaim = async () => {
        const addr = claimAddress.trim() || 'YOUR_ADDRESS';
        try {
            await claim(addr);
            setClaimAddress("");
            showSuccess("Funds claimed successfully!");
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

                {/* Success toast */}
                {successMessage && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-md flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Error */}
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
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Joining…
                                </>
                            ) : "Join Contract"}
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* ─── Overview Stats ───────────────────────────────────── */}
                        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                            <div className="bg-card rounded-xl border p-4 text-center">
                                <div className="text-2xl font-bold text-primary">{demoBeneficiaries.length}</div>
                                <div className="text-xs text-muted-foreground mt-1">Beneficiaries</div>
                            </div>
                            <div className="bg-card rounded-xl border p-4 text-center">
                                <div className="text-2xl font-bold text-primary">
                                    {demoBeneficiaries.reduce((sum, b) => sum + b.amount, 0n).toString()}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">Total Allocated</div>
                            </div>
                            <div className="bg-card rounded-xl border p-4 text-center">
                                <div className={`text-2xl font-bold ${contractState.isExecuted ? 'text-blue-600' : 'text-green-600'}`}>
                                    {contractState.isExecuted ? "Executed" : "Active"}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">Will Status</div>
                            </div>
                            <div className="bg-card rounded-xl border p-4 text-center">
                                <div className="text-2xl font-bold text-emerald-600">
                                    <ShieldCheck className="h-6 w-6 mx-auto" />
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">ZK Protected</div>
                            </div>
                        </div>

                        {/* ─── Main Cards Grid ─────────────────────────────────── */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Contract Status Card */}
                            <div className="md:col-span-2 lg:col-span-1">
                                <StatusCard
                                    title="Contract Status"
                                    icon={<FileText className="h-5 w-5" />}
                                    className="h-full"
                                    badge={
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${contractState.isExecuted ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
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

                                        <div className="p-3 bg-secondary/10 rounded-lg">
                                            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Privacy Level</div>
                                            <div className="flex gap-2 mt-1">
                                                <PrivacyBadge level="private" showText={true} />
                                                <PrivacyBadge level="secure" showText={true} />
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
                                                    {loading ? (
                                                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Processing…</>
                                                    ) : (
                                                        <><Gavel className="h-4 w-4 mr-2" />Execute Will</>
                                                    )}
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </StatusCard>
                            </div>

                            {/* Add Beneficiaries Card */}
                            <div className="md:col-span-2 lg:col-span-1">
                                <StatusCard
                                    title="Add Beneficiary"
                                    icon={<UserPlus className="h-5 w-5" />}
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
                                                placeholder="e.g. 00fa32ab..."
                                                value={beneficiaryAddress}
                                                onChange={(e) => setBeneficiaryAddress(e.target.value)}
                                                className="font-mono text-sm"
                                                disabled={contractState.isExecuted || loading}
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
                                                disabled={contractState.isExecuted || loading}
                                            />
                                        </div>
                                        <Button
                                            onClick={handleAddBeneficiary}
                                            disabled={loading || contractState.isExecuted || !beneficiaryAddress || !beneficiaryAmount}
                                            className="w-full"
                                        >
                                            {loading ? (
                                                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Encrypting…</>
                                            ) : (
                                                <><ShieldCheck className="h-4 w-4 mr-2" />Encrypt & Add Beneficiary</>
                                            )}
                                        </Button>
                                        {contractState.isExecuted && (
                                            <p className="text-xs text-muted-foreground text-center">
                                                Will is executed. No more beneficiaries can be added.
                                            </p>
                                        )}
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
                                            <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-800 rounded-lg text-center">
                                                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Inheritance Unlocked</h4>
                                                <p className="text-sm text-green-600 dark:text-green-500 mb-4">
                                                    Funds are now available for claim by designated beneficiaries.
                                                </p>
                                                <div className="space-y-2 mb-4">
                                                    <Label htmlFor="claimAddress" className="text-left block text-xs text-muted-foreground">Your Address (Hex)</Label>
                                                    <Input
                                                        id="claimAddress"
                                                        placeholder="Enter your coin public key"
                                                        value={claimAddress}
                                                        onChange={(e) => setClaimAddress(e.target.value)}
                                                        className="font-mono text-sm"
                                                        disabled={loading}
                                                    />
                                                </div>
                                                <Button
                                                    onClick={handleClaim}
                                                    disabled={loading}
                                                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                                                >
                                                    {loading ? (
                                                        <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Claiming…</>
                                                    ) : (
                                                        "Claim Available Funds"
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-48 text-center p-4">
                                            <Lock className="h-8 w-8 text-muted-foreground/30 mb-3" />
                                            <h4 className="font-medium text-muted-foreground">Assets Locked</h4>
                                            <p className="text-xs text-muted-foreground/70 mt-1 max-w-[200px]">
                                                Claims can only be made after the will has been executed by the owner.
                                            </p>
                                        </div>
                                    )}
                                </StatusCard>
                            </div>
                        </div>

                        {/* ─── Beneficiaries Table (visible in demo mode) ─────── */}
                        {isDemo && demoBeneficiaries.length > 0 && (
                            <StatusCard
                                title={`Registered Beneficiaries (${demoBeneficiaries.length})`}
                                icon={<Users className="h-5 w-5" />}
                            >
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-border text-left">
                                                <th className="pb-3 text-muted-foreground font-medium">#</th>
                                                <th className="pb-3 text-muted-foreground font-medium">Address</th>
                                                <th className="pb-3 text-muted-foreground font-medium text-right">Amount</th>
                                                <th className="pb-3 text-muted-foreground font-medium">Privacy</th>
                                                <th className="pb-3 text-muted-foreground font-medium">Added</th>
                                                {contractState.isExecuted && (
                                                    <th className="pb-3 text-muted-foreground font-medium text-right">Action</th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {demoBeneficiaries.map((b, i) => (
                                                <tr key={b.address + i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                                                    <td className="py-3 text-muted-foreground">{i + 1}</td>
                                                    <td className="py-3 font-mono text-xs">
                                                        {b.address.slice(0, 8)}…{b.address.slice(-6)}
                                                    </td>
                                                    <td className="py-3 text-right font-semibold">
                                                        {b.amount.toString()}
                                                    </td>
                                                    <td className="py-3">
                                                        <PrivacyBadge level="private" showText={false} />
                                                    </td>
                                                    <td className="py-3 text-xs text-muted-foreground">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            {b.addedAt.toLocaleTimeString()}
                                                        </span>
                                                    </td>
                                                    {contractState.isExecuted && (
                                                        <td className="py-3 text-right">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => claim(b.address)}
                                                                disabled={loading}
                                                                className="text-xs"
                                                            >
                                                                Claim
                                                            </Button>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </StatusCard>
                        )}
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
