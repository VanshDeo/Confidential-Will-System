import {
  ZKConfigProvider,
  type ZKIR,
  type ProverKey,
  type VerifierKey,
} from '@midnight-ntwrk/midnight-js-types';

export class FetchZkConfigProvider<K extends string> extends ZKConfigProvider<K> {
  constructor(
    private readonly baseUrl: string,
    private readonly fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response> = window.fetch.bind(window)
  ) {
    super();
  }

  async getZKIR(circuitId: K): Promise<ZKIR> {
    const response = await this.fetch(`${this.baseUrl}/${circuitId}.zkir`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ZKIR for ${circuitId}: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer) as ZKIR;
  }

  async getProverKey(circuitId: K): Promise<ProverKey> {
    const response = await this.fetch(`${this.baseUrl}/${circuitId}.prover`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ProverKey for ${circuitId}: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer) as ProverKey;
  }

  async getVerifierKey(circuitId: K): Promise<VerifierKey> {
    const response = await this.fetch(`${this.baseUrl}/${circuitId}.verifier`);
    if (!response.ok) {
      throw new Error(`Failed to fetch VerifierKey for ${circuitId}: ${response.statusText}`);
    }
    const buffer = await response.arrayBuffer();
    return new Uint8Array(buffer) as VerifierKey;
  }
}
