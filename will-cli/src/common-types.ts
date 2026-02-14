import { Will, type WillPrivateState } from '@eddalabs/will-contract';
import type { MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import type { ImpureCircuitId } from '@midnight-ntwrk/compact-js';

export type WillCircuits = ImpureCircuitId<Will.Contract<WillPrivateState>>;

export const WillPrivateStateId = 'willPrivateState';

export type WillProviders = MidnightProviders<WillCircuits, typeof WillPrivateStateId, WillPrivateState>;

export type WillContract = Will.Contract<WillPrivateState>;

export type DeployedWillContract = DeployedContract<WillContract> | FoundContract<WillContract>;

export type UserAction = {
  addBeneficiary: { person: string; amount: bigint } | undefined;
  executeWill: boolean | undefined;
  claim: boolean | undefined;
};

export type DerivedState = {
  readonly owner: Will.Ledger["owner"];
};

export const emptyState: DerivedState = {
  owner: new Uint8Array(32),
};
