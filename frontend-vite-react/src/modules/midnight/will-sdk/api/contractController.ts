
import { type Logger } from 'pino';
import { type ContractAddress } from '@midnight-ntwrk/compact-runtime';
import * as Rx from 'rxjs';
import {
  WillPrivateStateId,
  WillProviders,
  DeployedWillContract,
  DerivedState,
} from './common-types';
import { Contract, ledger } from '../../../../midnight/managed/will/contract/index';
import { findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { CompiledContract } from '@midnight-ntwrk/compact-js';
import { CONTRACT_ADDRESS } from '../../../../midnight/config';

const willCompiledContract = CompiledContract.make('will', Contract).pipe(
  CompiledContract.withVacantWitnesses,
  CompiledContract.withCompiledFileAssets(`${window.location.origin}/midnight/managed/will`),
);

export interface ContractControllerInterface {
  readonly deployedContractAddress: ContractAddress;
  readonly state$: Rx.Observable<DerivedState>;
  addBeneficiary(person: string, amount: bigint): Promise<void>;
  executeWill(): Promise<void>;
  claim(person: string): Promise<void>;
}

export class ContractController implements ContractControllerInterface {
  readonly deployedContractAddress: ContractAddress;
  readonly state$: Rx.Observable<DerivedState>;

  private constructor(
    public readonly deployedContract: DeployedWillContract,
    public readonly providers: WillProviders,
    private readonly logger: Logger,
  ) {
    this.deployedContractAddress = deployedContract.deployTxData.public.contractAddress;
    this.state$ = Rx.combineLatest(
        [
            providers.publicDataProvider.contractStateObservable(this.deployedContractAddress, { type: 'all' }),
            Rx.from(providers.privateStateProvider.get(WillPrivateStateId))
        ],
        (contractState, privateState) => {
            const ledgerState = ledger(contractState.data);
            return {
                owner: ledgerState.owner,
                isExecuted: privateState?.executed ?? false,
            };
        }
    );
  }

  async addBeneficiary(person: string, amount: bigint): Promise<void> {
    this.logger.info(`Adding beneficiary ${person} with amount ${amount}`);
    const tx = await this.deployedContract.callTx.addBeneficiary(Buffer.from(person, 'hex'), amount);
    this.logger.info(`Transaction confirmed: ${tx.public.txId}`);
  }

  async executeWill(): Promise<void> {
    this.logger.info('Executing will');
    const tx = await this.deployedContract.callTx.executeWill();
    this.logger.info(`Transaction confirmed: ${tx.public.txId}`);
  }

  async claim(person: string): Promise<void> {
    this.logger.info(`Claiming for ${person}`);
    const tx = await this.deployedContract.callTx.claim(Buffer.from(person, 'hex'));
    this.logger.info(`Transaction confirmed: ${tx.public.txId}`);
  }

  static async join(
    providers: WillProviders,
    logger: Logger,
  ): Promise<ContractController> {
    const contractAddress = CONTRACT_ADDRESS;
    logger.info(`Joining contract at ${contractAddress}`);

    const deployedContract = await findDeployedContract(providers, {
      contractAddress,
      compiledContract: willCompiledContract,
      privateStateId: WillPrivateStateId,
      initialPrivateState: { beneficiaries: {}, executed: false },
    });

    return new ContractController(deployedContract, providers, logger);
  }
}
