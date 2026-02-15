import {
    createContext,
    ReactNode,
    useCallback,
    useState,
} from 'react';
import type { BrowserWillContextType } from './BrowserWillProvider';
import type { DerivedState } from '../api/common-types';

// ── Simulated data ──────────────────────────────────────────────
const DEMO_OWNER_HEX =
    'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2';

export interface DemoBeneficiary {
    address: string;
    amount: bigint;
    addedAt: Date;
}

export interface DemoWillContextType extends BrowserWillContextType {
    demoBeneficiaries: DemoBeneficiary[];
}

// ── Context ─────────────────────────────────────────────────────
export const DemoWillContext = createContext<DemoWillContextType | undefined>(
    undefined,
);

// Re-export as BrowserWillContextType-compatible for useWill
export const DemoWillContextAsBrowser = DemoWillContext as unknown as React.Context<BrowserWillContextType | undefined>;

// ── Provider ────────────────────────────────────────────────────
export const DemoWillProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [contractState, setContractState] = useState<DerivedState | undefined>(undefined);
    const [beneficiaries, setBeneficiaries] = useState<DemoBeneficiary[]>([
        {
            address: '001a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
            amount: 5000n,
            addedAt: new Date(Date.now() - 86400000), // Yesterday
        },
        {
            address: '009f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a10',
            amount: 12500n,
            addedAt: new Date(Date.now() - 43200000), // 12 hours ago
        }
    ]);
    const [hasJoined, setHasJoined] = useState(false);

    // ── helpers ────────────────────────────────────────────────
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const simulateTransaction = async (label: string, durationMs = 1500) => {
        console.log(`[DEMO] ${label} – started`);
        setLoading(true);
        setError(null);
        await sleep(durationMs);
        console.log(`[DEMO] ${label} – finished`);
        setLoading(false);
    };

    // ── connect wallet (simulated) ─────────────────────────────
    const connectWallet = useCallback(async () => {
        setLoading(true);
        setError(null);
        console.log('[DEMO] Connecting wallet...');
        await sleep(1200);
        setIsConnected(true);
        setLoading(false);
        console.log('[DEMO] Wallet connected ✓');
    }, []);

    // ── join contract (simulated) ──────────────────────────────
    const joinContract = useCallback(async () => {
        if (!isConnected) {
            setError('Connect your wallet first');
            return;
        }
        await simulateTransaction('Joining deployed contract...', 2000);
        const ownerBytes = new Uint8Array(
            (DEMO_OWNER_HEX.match(/.{1,2}/g) || []).map((b) => parseInt(b, 16)),
        );
        setContractState({
            owner: ownerBytes,
            isExecuted: false,
        });
        setHasJoined(true);
        console.log('[DEMO] Joined contract ✓');
    }, [isConnected]);

    // ── add beneficiary (simulated) ────────────────────────────
    const addBeneficiary = useCallback(
        async (person: string, amount: bigint) => {
            if (!hasJoined) {
                setError('Join the contract first');
                return;
            }
            if (contractState?.isExecuted) {
                setError('Cannot add beneficiaries – will is already executed');
                return;
            }
            if (!person.trim()) {
                setError('Address cannot be empty');
                return;
            }
            if (amount <= 0n) {
                setError('Amount must be greater than 0');
                return;
            }
            await simulateTransaction(`Encrypting & adding beneficiary…`, 2500);
            setBeneficiaries((prev) => [
                ...prev,
                { address: person, amount, addedAt: new Date() },
            ]);
            console.log(`[DEMO] Added beneficiary ${person.slice(0, 8)}… for ${amount} ✓`);
        },
        [hasJoined, contractState],
    );

    // ── execute will (simulated) ───────────────────────────────
    const executeWill = useCallback(async () => {
        if (!hasJoined) {
            setError('Join the contract first');
            return;
        }
        if (contractState?.isExecuted) {
            setError('Will is already executed');
            return;
        }
        await simulateTransaction('Generating ZK proof & executing will…', 3000);
        setContractState((prev) => prev ? { ...prev, isExecuted: true } : prev);
        console.log('[DEMO] Will executed ✓');
    }, [hasJoined, contractState]);

    // ── claim (simulated) ──────────────────────────────────────
    const claim = useCallback(
        async (person: string) => {
            if (!contractState?.isExecuted) {
                setError('Will must be executed before claiming');
                return;
            }
            await simulateTransaction(`Claiming funds for ${person.slice(0, 8)}…`, 2000);
            // Remove the claimed beneficiary
            setBeneficiaries((prev) => prev.filter((b) => b.address !== person));
            console.log(`[DEMO] Claimed funds for ${person.slice(0, 8)}… ✓`);
        },
        [contractState],
    );

    // ── value ──────────────────────────────────────────────────
    const value: DemoWillContextType = {
        wallet: isConnected ? ({} as any) : undefined,
        walletApi: isConnected ? ({} as any) : undefined,
        isConnected,
        connectWallet,
        contract: hasJoined ? ({} as any) : undefined,
        contractState,
        loading,
        error,
        joinContract,
        addBeneficiary,
        executeWill,
        claim,
        demoBeneficiaries: beneficiaries,
    };

    return (
        <DemoWillContext.Provider value={value}>
            {children}
        </DemoWillContext.Provider>
    );
};
