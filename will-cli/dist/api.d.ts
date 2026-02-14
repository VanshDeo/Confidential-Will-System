import { type Logger } from 'pino';
import { WillCircuits, type WillProviders, type DeployedWillContract } from './common-types';
import { type Config } from './config';
import { type WillPrivateState } from '@eddalabs/will-contract';
import { type ContractAddress } from '@midnight-ntwrk/compact-runtime';
import * as ledger from '@midnight-ntwrk/ledger-v7';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { type FinalizedTxData, type MidnightProvider, type WalletProvider } from '@midnight-ntwrk/midnight-js-types';
import { type UnshieldedKeystore } from '@midnight-ntwrk/wallet-sdk-unshielded-wallet';
import { WalletFacade } from '@midnight-ntwrk/wallet-sdk-facade';
export declare function setLogger(_logger: Logger): void;
export interface WalletContext {
    wallet: WalletFacade;
    shieldedSecretKeys: ledger.ZswapSecretKeys;
    dustSecretKey: ledger.DustSecretKey;
    unshieldedKeystore: UnshieldedKeystore;
    syncedState: any;
}
/**
 * Convert mnemonic phrase to seed buffer using BIP39 standard
 * This generates a 64-byte seed as expected by Midnight HD wallet
 */
export declare const mnemonicToSeed: (mnemonic: string) => Promise<string>;
export declare const getWillLedgerState: (providers: WillProviders, contractAddress: ContractAddress) => Promise<Uint8Array | null>;
export declare const joinContract: (providers: WillProviders, contractAddress: string) => Promise<DeployedWillContract>;
export declare const deploy: (providers: WillProviders, privateState: WillPrivateState, initialOwner: string) => Promise<DeployedWillContract>;
export declare const addBeneficiary: (willContract: DeployedWillContract, person: string, // Coin public key hex
amount: bigint) => Promise<FinalizedTxData>;
export declare const executeWill: (willContract: DeployedWillContract) => Promise<FinalizedTxData>;
export declare const claim: (willContract: DeployedWillContract, person: string) => Promise<FinalizedTxData>;
export declare const displayWillState: (providers: WillProviders, willContract: DeployedWillContract) => Promise<{
    owner: string | null;
    contractAddress: string;
}>;
export declare const createWalletAndMidnightProvider: (walletContext: WalletContext) => Promise<WalletProvider & MidnightProvider>;
export declare const waitForSync: (wallet: WalletFacade) => Promise<import("@midnight-ntwrk/wallet-sdk-facade").FacadeState>;
export declare const waitForFunds: (wallet: WalletFacade) => Promise<bigint>;
/**
 * Runs an async operation with an animated spinner on the console.
 * Shows ⠋⠙⠹... while running, then ✓ on success or ✗ on failure.
 */
export declare const withStatus: <T>(message: string, fn: () => Promise<T>) => Promise<T>;
/**
 * Build (or restore) a wallet from a hex seed, then wait for the wallet
 * to sync and receive funds before returning.
 *
 * Steps:
 *   1. Derive HD keys (Zswap, NightExternal, Dust) from the seed
 *   2. Create the three sub-wallets (Shielded, Unshielded, Dust)
 *   3. Start the WalletFacade and wait for sync
 *   4. Display a wallet summary with all addresses
 *   5. If balance is zero, wait for incoming funds (e.g. from faucet)
 */
export declare const buildWalletAndWaitForFunds: (config: Config, seed: string) => Promise<WalletContext>;
export declare const buildFreshWallet: (config: Config) => Promise<WalletContext>;
export declare const configureProviders: (walletContext: WalletContext, config: Config) => Promise<{
    privateStateProvider: import("@midnight-ntwrk/midnight-js-types").PrivateStateProvider<"willPrivateState", any>;
    publicDataProvider: import("@midnight-ntwrk/midnight-js-types").PublicDataProvider;
    zkConfigProvider: NodeZkConfigProvider<WillCircuits>;
    proofProvider: import("@midnight-ntwrk/midnight-js-types").ProofProvider;
    walletProvider: WalletProvider & MidnightProvider;
    midnightProvider: WalletProvider & MidnightProvider;
}>;
/**
 * Get the current DUST balance from the wallet state.
 */
export declare const getDustBalance: (wallet: WalletFacade) => Promise<{
    available: bigint;
    pending: bigint;
    availableCoins: number;
    pendingCoins: number;
}>;
/**
 * Monitor DUST balance with a live-updating display.
 * Prints a status line every 5 seconds showing balance, coins, and status.
 * Resolves when the user presses Enter (via the provided signal).
 */
export declare const monitorDustBalance: (wallet: WalletFacade, stopSignal: Promise<void>) => Promise<void>;
export declare const closeWallet: (walletContext: WalletContext) => Promise<void>;
