import { type Logger } from 'pino';
import { type DockerComposeEnvironment } from 'testcontainers';
import { type Config } from './config';
/**
 * Main entry point for the CLI.
 *
 * Flow:
 *   1. (Optional) Start Docker containers for proof server / node / indexer
 *   2. Build or restore a wallet and wait for it to be funded
 *   3. Configure midnight-js providers (proof server, indexer, wallet, private state)
 *   4. Enter the contract deploy/join and counter interaction loop
 *   5. Clean up: close wallet, readline, and docker environment
 */
export declare const run: (config: Config, _logger: Logger, dockerEnv?: DockerComposeEnvironment) => Promise<void>;
