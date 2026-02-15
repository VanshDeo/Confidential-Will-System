
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
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { FetchZkConfigProvider } from './FetchZkConfigProvider';
import * as api from '../api/contractController';

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
                    // The Lace wallet API uses getShieldedAddresses() which returns addresses with public keys
                    console.log('Fetching shielded addresses from wallet API...');
                    const shieldedAddresses = await walletApi.getShieldedAddresses();
                    console.log('Shielded addresses:', shieldedAddresses);

                    if (!shieldedAddresses || shieldedAddresses.length === 0) {
                        throw new Error('No shielded addresses found in wallet');
                    }

                    // Use the first address (index 0)
                    const primaryAddress = shieldedAddresses[0];
                    console.log('Primary address:', primaryAddress);

                    // Extract public keys from the address object
                    coinPubKey = primaryAddress.coinPublicKey || primaryAddress.coinPubKey;
                    encPubKey = primaryAddress.encryptionPublicKey || primaryAddress.encPubKey;

                    if (!coinPubKey || !encPubKey) {
                        console.error('Address structure:', primaryAddress);
                        throw new Error('Public keys not found in shielded address. Check console for address structure.');
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
                    balanceTx(tx: any, ttl: any) {
                        // The Lace wallet API uses balanceSealedTransaction for proven transactions
                        return walletApi.balanceSealedTransaction(tx, ttl);
                    },
                };

                const newProviders: WillProviders = {
                    privateStateProvider: levelPrivateStateProvider({
                        privateStateStoreName: WillPrivateStateId,
                        walletProvider,
                    }),
                    publicDataProvider: indexerPublicDataProvider(uris.indexer, uris.indexerWs),
                    zkConfigProvider,
                    proofProvider: httpClientProofProvider(uris.proofServer, zkConfigProvider),
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
