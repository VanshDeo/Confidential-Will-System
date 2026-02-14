export * as Will from "./managed/will/contract/index.js";
export * as Voting from "./managed/voting/contract/index.js";

export type WillPrivateState = {
  readonly beneficiaries: Record<string, bigint>;
  readonly executed: boolean;
};
