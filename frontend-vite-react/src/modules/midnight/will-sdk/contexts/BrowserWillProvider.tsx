
import {
    WillProviders,
    WillCircuits,
    DerivedState,
    WillPrivateStateId,
    DAppConnectorAPI,
    DAppConnectorWallet,
} from '../api/common-types';
import {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { FetchZkConfigProvider } from './FetchZkConfigProvider';
import * as api from '../api/contractController';
import {
    CostModel,
    createProvingPayload,
    createCheckPayload,
    parseCheckResult
} from '@midnight-ntwrk/ledger-v7';

const logger = {
    info: console.log,
    error: console.error,
    debug: console.debug,
    trace: console.trace,
    warn: console.warn,
};

export interface BrowserWillContextType {
    wallet: DAppConnectorWallet | undefined;
    walletApi: DAppConnectorAPI | undefined;
    isConnected: boolean;
    connectWallet: () => Promise<void>;
    contract: api.ContractController | undefined;
    contractState: DerivedState | undefined;
    loading: boolean;
    error: string | null;
    joinContract: () => Promise<void>;
    addBeneficiary: (person: string, amount: bigint) => Promise<void>;
    executeWill: () => Promise<void>;
    claim: (person: string) => Promise<void>;
}

export const BrowserWillContext = createContext<BrowserWillContextType | undefined>(
    undefined,
);

export const BrowserWillProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [wallet, setWallet] = useState<DAppConnectorWallet | undefined>(
        undefined,
    );
    const [walletApi, setWalletApi] = useState<DAppConnectorAPI | undefined>(
        undefined,
    );
    const [isConnected, setIsConnected] = useState(false);
    const [contract, setContract] = useState<api.ContractController | undefined>(
        undefined,
    );
    const [contractState, setContractState] = useState<DerivedState | undefined>(
        undefined,
    );
    const [providers, setProviders] = useState<WillProviders | undefined>(
        undefined,
    );
    const [loading, setLoading] = useState(false);
    const [providerLoading, setProviderLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [providerError, setProviderError] = useState<string | null>(null);

    const connectWallet = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('Attempting to connect wallet...');
            console.log('window.midnight:', window.midnight);
            if (window.midnight) {
                const walletObj = window.midnight.mnLace;
                // The wallet API usually exposes a `connect` method.
                // Midnight's dapp-connector-api defines `connect(networkId: string)`.
                // Local node/devnet is usually identified as 'undeployed' or 'bene' in some contexts, 
                // but the error message explicitly listed 'undeployed' as supported.
                const api = await walletObj.connect('undeployed');
                // Or if using specific version
                // const api = await window.midnight.mnLace.enable();

                setWallet(walletObj);
                setWalletApi(api);
                setIsConnected(true);
            } else {
                logger.error('Midnight wallet not found');
                setError('Midnight wallet not found (install Lace)');
            }
        } catch (e: any) {
            logger.error('Failed to connect wallet', e);
            if (e.message?.includes('Remote API') && e.message?.includes('shutdown')) {
                setError('Wallet connection stale. Please reload the page.');
            } else {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    // Initialize Providers
    useEffect(() => {
        const initProviders = async () => {
            if (!walletApi) return;
            try {
                setProviderLoading(true);
                setProviderError(null);
                // Inspecting the wallet API object to see what's available
                console.log('Wallet API Object:', walletApi);
                console.log('Wallet API methods:', Object.keys(walletApi));
                console.log('coinPublicKey type:', typeof walletApi.coinPublicKey);
                console.log('encPublicKey type:', typeof walletApi.encPublicKey);

                // Check if specific method exists, otherwise try getConfiguration
                let uris: any;
                if ('serviceUriConfig' in walletApi && typeof (walletApi as any).serviceUriConfig === 'function') {
                    uris = await (walletApi as any).serviceUriConfig();
                } else if ('getConfiguration' in walletApi && typeof (walletApi as any).getConfiguration === 'function') {
                    const config = await (walletApi as any).getConfiguration();
                    uris = {
                        indexer: config.indexerUri,
                        indexerWs: config.indexerWsUri,
                        proofServer: config.proverServerUri,
                        node: config.substrateNodeUri,
                        networkId: config.networkId
                    };
                } else {
                    // Fallback to local development network configuration
                    console.warn('Wallet API does not support serviceUriConfig or getConfiguration, using local development defaults');
                    uris = {
                        indexer: 'http://127.0.0.1:8088/api/v3/graphql',
                        indexerWs: 'ws://127.0.0.1:8088/api/v3/graphql/ws',
                        proofServer: 'http://127.0.0.1:6300',
                        node: 'http://127.0.0.1:9944',
                        networkId: 'undeployed'
                    };
                }

                console.log('Service URIs:', uris);

                // Fallback or use what's provided.
                // Note: DAppConnector might return different structure depending on version.
                // The reference code used `uris.indexer`, let's trust it for now.

                const zkConfigProvider = new FetchZkConfigProvider<WillCircuits>(window.location.origin + '/assets');

                // Fetch public keys once during initialization
                let coinPubKey: string;
                let encPubKey: string;

                try {
                    // The Lace DApp Connector API's getShieldedAddresses() returns a SINGLE object:
                    // { shieldedAddress: string, shieldedCoinPublicKey: string, shieldedEncryptionPublicKey: string }
                    console.log('Fetching shielded address from wallet API...');
                    const shieldedInfo = await walletApi.getShieldedAddresses();
                    console.log('Shielded address info:', shieldedInfo);

                    if (!shieldedInfo) {
                        throw new Error('Wallet returned no shielded address info. Ensure your Lace wallet is unlocked and synced.');
                    }

                    // Extract public keys using the correct field names from the DApp Connector API
                    coinPubKey = shieldedInfo.shieldedCoinPublicKey;
                    encPubKey = shieldedInfo.shieldedEncryptionPublicKey;

                    if (!coinPubKey || !encPubKey) {
                        // Log the full object to help debug unexpected API shapes
                        console.error('Unexpected shielded address structure:', JSON.stringify(shieldedInfo, null, 2));
                        console.error('Available keys:', Object.keys(shieldedInfo));
                        throw new Error(
                            'Public keys not found in wallet response. ' +
                            'Available fields: ' + Object.keys(shieldedInfo).join(', ') +
                            '. Please ensure your Lace wallet is fully synced.'
                        );
                    }

                    console.log('Successfully fetched public keys:', {
                        coinPubKey: coinPubKey.substring(0, 16) + '...',
                        encPubKey: encPubKey.substring(0, 16) + '...'
                    });
                } catch (e: any) {
                    logger.error('Failed to fetch wallet public keys', e);
                    throw new Error(`Failed to fetch wallet public keys: ${e.message}`);
                }

                const walletProvider = {
                    getCoinPublicKey: () => coinPubKey,
                    getEncryptionPublicKey: () => encPubKey,
                    balanceTx(tx: any) {
                        // The Lace DApp Connector API's balanceSealedTransaction takes only the tx string
                        return walletApi.balanceSealedTransaction(tx);
                    },
                };

                const newProviders: WillProviders = {
                    privateStateProvider: levelPrivateStateProvider({
                        privateStateStoreName: WillPrivateStateId,
                        walletProvider,
                    }),
                    publicDataProvider: indexerPublicDataProvider(uris.indexer, uris.indexerWs),
                    zkConfigProvider,
                    proofProvider: {
                        proveTx: async (unprovenTx: any) => {
                            const provingProvider = {
                                async check(serializedPreimage: Uint8Array, keyLocation: string) {
                                    console.log(`[CustomProofProvider] Checking ${keyLocation}`);
                                    const zkConfig = await zkConfigProvider.getZKIR(keyLocation as any); // FetchZkConfigProvider uses generic string
                                    console.log(`[CustomProofProvider] Got ZKIR, size: ${zkConfig.length}`);
                                    // Construct key material - we need IR for check
                                    const keyMaterial = { ir: zkConfig };
                                    const payload = createCheckPayload(serializedPreimage, keyMaterial.ir);
                                    console.log(`[CustomProofProvider] Check Payload size: ${payload.length}`);

                                    const response = await fetch(uris.proofServer + '/check', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/octet-stream' },
                                        body: new Blob([payload as any]),
                                    });

                                    if (!response.ok) {
                                        const text = await response.text();
                                        console.error(`[CustomProofProvider] Check failed: ${text}`);
                                        throw new Error(`Proof Server check failed: ${response.status} ${response.statusText} - ${text}`);
                                    }

                                    const resultBuffer = await response.arrayBuffer();
                                    return parseCheckResult(new Uint8Array(resultBuffer));
                                },
                                async prove(serializedPreimage: Uint8Array, keyLocation: string, overwriteBindingInput?: bigint) {
                                    console.log(`[CustomProofProvider] Proving ${keyLocation}`);
                                    // Fetch all key material for prove
                                    const [zkir, proverKey, verifierKey] = await Promise.all([
                                        zkConfigProvider.getZKIR(keyLocation as any),
                                        zkConfigProvider.getProverKey(keyLocation as any),
                                        zkConfigProvider.getVerifierKey(keyLocation as any)
                                    ]);
                                    console.log(`[CustomProofProvider] Got assets: ZKIR=${zkir.length}, Prover=${proverKey.length}, Verifier=${verifierKey.length}`);

                                    const keyMaterial = { ir: zkir, proverKey, verifierKey };
                                    const payload = createProvingPayload(serializedPreimage, overwriteBindingInput, keyMaterial);
                                    console.log(`[CustomProofProvider] Prove Payload size: ${payload.length}`);

                                    const response = await fetch(uris.proofServer + '/prove', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/octet-stream' },
                                        body: new Blob([payload as any]),
                                    });

                                    if (!response.ok) {
                                        const text = await response.text();
                                        console.error(`[CustomProofProvider] Prove failed: ${text}`);
                                        throw new Error(`Proof Server prove failed: ${response.status} ${response.statusText} - ${text}`);
                                    }

                                    const resultBuffer = await response.arrayBuffer();
                                    return new Uint8Array(resultBuffer);
                                }
                            };
                            return unprovenTx.prove(provingProvider, CostModel.initialCostModel());
                        }
                    },
                    walletProvider,
                    midnightProvider: {
                        submitTx(tx) {
                            return walletApi.submitTransaction(tx);
                        },
                    },
                };
                setProviders(newProviders);
            } catch (e: any) {
                logger.error('Failed to init providers', e);
                setProviderError(`Failed to init providers: ${e.message}`);
                setError(`Provider Error: ${e.message}`);
            } finally {
                setProviderLoading(false);
            }
        };
        if (isConnected && walletApi) {
            initProviders();
        }
    }, [isConnected, walletApi]);

    const joinContract = useCallback(async () => {
        console.log('joinContract called');
        if (!providers) {
            console.error('Providers not ready');
            console.error('Provider error:', providerError);
            console.error('Provider loading:', providerLoading);
            if (providerError) {
                setError(`Provider initialization failed: ${providerError}`);
            } else if (providerLoading) {
                setError('Initializing providers... please wait.');
            } else {
                setError('Midnight providers not initialized. Check console for details.');
            }
            return;
        }
        try {
            console.log('Providers ready, joining contract...');
            setLoading(true);
            const controller = await api.ContractController.join(providers, logger as any);
            setContract(controller);

            controller.state$.subscribe((state) => {
                setContractState(state);
            });
        } catch (e: any) {
            logger.error('Failed to join contract', e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }, [providers]);

    // When providers are ready, auto-join for better UX or wait for user?
    // Let's wait for user to click "Connect" then maybe "Join" or just "Connect" does both.

    const addBeneficiary = async (person: string, amount: bigint) => {
        if (!contract) return;
        await contract.addBeneficiary(person, amount);
    };

    const executeWill = async () => {
        if (!contract) return;
        await contract.executeWill();
    };

    const claim = async (person: string) => {
        if (!contract) return;
        await contract.claim(person);
    };

    return (
        <BrowserWillContext.Provider
            value={{
                wallet,
                walletApi,
                isConnected,
                connectWallet,
                contract,
                contractState,
                loading,
                error,
                joinContract,
                addBeneficiary,
                executeWill,
                claim,
            }}
        >
            {children}
        </BrowserWillContext.Provider>
    );
};
