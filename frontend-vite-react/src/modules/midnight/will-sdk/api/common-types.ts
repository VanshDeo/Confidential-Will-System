
import { type MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import { type FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import type { Contract, Witnesses } from '../../../../midnight/managed/will/contract/index';

export type WillPrivateState = {
  beneficiaries: Record<string, bigint>;
  executed: boolean;
};

export type WillContract = Contract<WillPrivateState, Witnesses<WillPrivateState>>;

export type WillCircuits = 'init' | 'addBeneficiary' | 'executeWill' | 'claim';

export const WillPrivateStateId = 'willPrivateState';

export type WillProviders = MidnightProviders<WillCircuits, typeof WillPrivateStateId, WillPrivateState>;

export type DeployedWillContract = FoundContract<WillContract>;

export type DerivedState = {
  readonly owner: Uint8Array | undefined;
  readonly isExecuted: boolean | undefined;
};

// Mock types for DApp Connector if missing
export type DAppConnectorAPI = any;
export type DAppConnectorWallet = any;
