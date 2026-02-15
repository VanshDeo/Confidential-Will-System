# 📜 Midnight Confidential Will

> A privacy-preserving inheritance protocol built on the [Midnight Network](https://midnight.network/).

![Midnight Network](https://img.shields.io/badge/Midnight-Network-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)

## 📖 Project Description

The **Confidential Will** project demonstrates the power of Midnight's privacy-first smart contracts. It allows a testator to create a digital will where the beneficiaries and their inheritance amounts remain **completely encrypted and hidden** from the public ledger.

Unlike traditional blockchain solutions where all transfers are visible, Midnight ensures that your personal financial decisions remain private until the moment they need to be executed.

## 🕵️‍♂️ What it Does

This dApp allows users to:
1. **Create a Will**: Deploy a smart contract that acts as a digital vault.
2. **Add Beneficiaries Privately**: Register friends and family without revealing their identities or the amounts they are set to receive.
3. **Execute the Will**: When the time comes, the will is marked as "executed".
4. **Claim Inheritance**: Beneficiaries can then prove their identity and claim their funds, with the transaction history remaining privacy-preserving.

## ✨ Features

### Smart Contract Features
- **🔒 Zero-Knowledge Privacy**: Beneficiaries and amounts are stored in a private state, not on the public blockchain.
- **🛡️ Selective Disclosure**: Information is only revealed when strictly necessary (e.g., during the claiming process).
- **📝 Trustless Logic**: The contract prevents claims before execution and ensures funds are allocated exactly as programmed.
- **🏗️ Type-Safe Development**: Built with TypeScript and the Midnight Compact language for robust and secure code.

### Frontend Features
- **💻 Interactive CLI**: User-friendly Command Line Interface (`will-cli`) for easy interaction.
- **🌐 Modern Web Interface**: React-based web application (`frontend-vite-react`) with Lace wallet integration.
- **🎨 Beautiful UI**: Built with Tailwind CSS v4 and Radix UI components for a premium user experience.
- **⚡ Fast Development**: Vite for instant HMR and optimized production builds.
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices.
- **🔗 Wallet Integration**: Seamless connection with Lace wallet for transaction signing.

- **� Wallet Integration**: Seamless connection with Lace wallet for transaction signing.

## 📱 User Walkthrough

Experience the full privacy-preserving flow of creating and executing a digital will.

### 1. Dashboard & Wallet Connection
Connect your Lace wallet to access the secure dashboard. This is your command center for managing your digital estate.
![Dashboard](dashboard-images/Screenshot%202026-02-15%20at%207.05.35%E2%80%AFPM.png)

### 2. Join the Contract
Join the deployed smart contract to start interacting with it. This establishes your secure connection to the Midnight network.
![Join Contract](dashboard-images/Screenshot%202026-02-15%20at%207.06.56%E2%80%AFPM.png)

### 3. Private State Initialization
Your private data is securely initialized locally. Beneficiary information is encrypted and stored in your browser's private state, not on the public blockchain.
![Private State](dashboard-images/Screenshot%202026-02-15%20at%207.07.26%E2%80%AFPM.png)

### 4. Add Beneficiaries Privately
Add friends and family as beneficiaries. Their identities and the amounts they are set to receive are **fully encrypted** and visible only to you until execution.
![Add Beneficiary](dashboard-images/Screenshot%202026-02-15%20at%207.07.29%E2%80%AFPM.png)

### 5. Execute the Will
When the time is right, the owner can mark the will as "Executed". This is a public state change that unlocks the ability for beneficiaries to claim their funds.
![Execute Will](dashboard-images/Screenshot%202026-02-15%20at%207.10.48%E2%80%AFPM.png)

### 6. Claim Inheritance
Once executed, beneficiaries can verify their allocation using zero-knowledge proofs and withdraw their funds securely.
![Claim Funds](dashboard-images/Screenshot%202026-02-15%20at%207.12.07%E2%80%AFPM.png)

## 🚀 Deployed Smart Contract

The `will-contract` has been deployed to the local development network.

| Network | Contract Address |
| :--- | :--- |
| **Local / Undeployed** | `2a7275cd74ca516b6227011b0907b77677c31351d102ee62ace4383ab1a60365` |

*(Note: This address is from a local deployment. If you restart your local node, you will need to redeploy.)*

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+) & [npm](https://www.npmjs.com/) (v9+)
- [Docker](https://docs.docker.com/get-docker/) (for running local Midnight network)
- [Git LFS](https://git-lfs.com/) (for large files)
- [Midnight Compact Tools](https://docs.midnight.network/relnotes/compact-tools) (for contract compilation)
- [Lace Wallet](https://chromewebstore.google.com/detail/hgeekaiplokcnmakghbdfbgnlfheichg) (Browser extension for wallet integration)

### 1. Installation

Clone the repo and install dependencies:

```bash
# Clone the repository
git clone <repository-url>
cd midnight-starter-template

# Install root dependencies
npm install
```

### 2. Build

Compile the Compact smart contract and build the TypeScript CLI:

```bash
npm run build
```

This will:
- Compile the `will.compact` smart contract
- Generate TypeScript bindings
- Build the CLI application

### 3. Run Local Devnet

Start the local Midnight node and helper services using Docker:

```bash
bash start-midnight-network.sh
```

This script starts three Docker containers:
- **Node** (port 9944) - Midnight blockchain node
- **Indexer** (port 8088) - Blockchain data indexer
- **Proof Server** (port 6300) - Zero-knowledge proof generation

**Verify the network is running:**
```bash
docker ps
# You should see: node, indexer, and proof-server containers running
```

### 4. Deploy Contract

Deploy your own instance of the Will contract:

```bash
cd will-contract
npm run deploy
```

**What happens during deployment:**
1. Prompts for a hex seed (or press Enter to generate a new one)
   - For local devnet, use the genesis seed: `0000000000000000000000000000000000000000000000000000000000000001`
2. Builds a wallet and waits for sync
3. Deploys the contract to the network
4. Initializes the contract with your wallet's public key
5. Saves deployment info to `deployment.json`

**Important**: Save the contract address from the output - you'll need it for the frontend!

### 5. Interact via CLI

Use the CLI to manage the will:

```bash
cd will-cli
npm start
```

**CLI Features:**
- Deploy a new will contract
- Join an existing contract
- Add beneficiaries (with encrypted amounts)
- Execute the will
- Claim inheritance (for beneficiaries)
- View contract state

### 6. Run Frontend

Start the React application to interact via the browser with a beautiful UI.

```bash
cd frontend-vite-react
npm install
npm run copy-contract-keys  # Copy ZK circuits and keys
npm run dev
```

The frontend will be available at **http://localhost:5173**

**Frontend Setup Steps:**

1. **Update Contract Address** (if needed)
   
   The contract address is automatically read from `will-contract/deployment.json`, but you can manually update it in `src/midnight/config.ts`:
   
   ```typescript
   export const currentDeployment: Deployment = {
     contractAddress: '2a7275cd74ca516b6227011b0907b77677c31351d102ee62ace4383ab1a60365',
     network: 'undeployed',
     deployedAt: '2026-02-15T12:41:30.854Z'
   };
   ```

2. **Install Lace Wallet**
   
   - Install the [Lace browser extension](https://chromewebstore.google.com/detail/hgeekaiplokcnmakghbdfbgnlfheichg)
   - Create or restore a wallet
   - Switch to the **"undeployed"** network (for local development)

3. **Connect Wallet**
   
   - Open http://localhost:5173 in your browser
   - Click **"Connect Wallet"** button
   - Approve the connection in Lace popup
   - Ensure you're on the **"undeployed"** network

4. **Join Contract**
   
   - Click **"Join Contract"** button
   - Wait for initialization (5-10 seconds)
   - Start managing your will!

> **Note**: Ensure you have successfully deployed the contract (Step 4) before running the frontend, as it requires the generated ZK keys and circuits.
> 
> **📖 For detailed frontend documentation**, see:
> - [Frontend README](frontend-vite-react/README.md) - Complete documentation with architecture details
> - [Quick Start Guide](frontend-vite-react/QUICKSTART.md) - Get started in 5 minutes

## 📂 Project Structure

```
midnight-starter-template/
├── will-contract/              # Smart Contract
│   ├── src/
│   │   ├── will.compact       # Main contract source
│   │   ├── deploy.ts          # Deployment script
│   │   └── managed/           # Generated contract code
│   ├── deployment.json        # Deployed contract info
│   └── package.json
│
├── will-cli/                  # Command Line Interface
│   ├── src/
│   │   ├── cli.ts            # CLI entry point
│   │   ├── api.ts            # Contract interaction API
│   │   └── config.ts         # Configuration
│   ├── standalone.yml        # Docker compose for local network
│   └── package.json
│
├── frontend-vite-react/       # Web Frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Dashboard.tsx # Main dashboard
│   │   │   ├── layout/       # Layout components
│   │   │   ├── privacy/      # Privacy UI components
│   │   │   └── wallet/       # Wallet connector
│   │   ├── modules/
│   │   │   └── midnight/
│   │   │       └── will-sdk/ # Midnight SDK integration
│   │   ├── routes/           # TanStack Router routes
│   │   ├── midnight/
│   │   │   ├── config.ts     # Contract configuration
│   │   │   └── managed/      # Generated contract code
│   │   └── main.tsx          # App entry point
│   ├── public/
│   │   ├── assets/           # ZK circuits and keys
│   │   └── midnight/         # Contract metadata
│   ├── README.md             # Detailed frontend docs
│   ├── QUICKSTART.md         # Quick start guide
│   └── package.json
│
├── start-midnight-network.sh # Script to start local network
└── README.md                 # This file
```

### Component Descriptions

- **`will-contract/`**: Contains the `will.compact` smart contract source code, deployment scripts, and generated TypeScript bindings.
  
- **`will-cli/`**: A TypeScript CLI application to interact with the deployed contract using the Midnight SDK. Includes wallet management, contract deployment, and transaction signing.
  
- **`frontend-vite-react/`**: A modern React frontend built with Vite, TypeScript, and Tailwind CSS. Provides a user-friendly interface for interacting with the Will contract through the Lace wallet.

## 🎯 Usage Examples

### Using the CLI

```bash
cd will-cli
npm start

# Follow the interactive prompts:
# 1. Select "Deploy New Will" or "Join Existing Will"
# 2. Add beneficiaries with their coin public keys and amounts
# 3. Execute the will when ready
# 4. Beneficiaries can claim their inheritance
```

### Using the Frontend

1. **Connect Wallet**: Click "Connect Wallet" and approve in Lace
2. **Join Contract**: Click "Join Contract" to connect to the deployed contract
3. **Add Beneficiaries**: Enter beneficiary details and amounts (encrypted)
4. **Execute Will**: Mark the will as executed when the time comes
5. **Claim Inheritance**: Beneficiaries can claim their allocated funds

### Frontend Features

- **Dashboard**: View contract status, owner info, and execution state
- **Beneficiary Management**: Add and view beneficiaries (amounts remain private)
- **Transaction History**: View all contract interactions
- **Wallet Integration**: Seamless Lace wallet connection and transaction signing
- **Privacy Indicators**: Visual indicators showing what data is public vs private
- **Responsive Design**: Works on all screen sizes

## 🔧 Development

### Frontend Development

```bash
cd frontend-vite-react

# Start dev server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Copy contract assets
npm run copy-contract-keys
```

### Contract Development

```bash
cd will-contract

# Compile contract
npm run build

# Deploy to local network
npm run deploy

# Run tests (if available)
npm test
```

### CLI Development

```bash
cd will-cli

# Start CLI
npm start

# Build CLI
npm run build
```

## 🌐 Service URLs (Local Development)

| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:5173 | Web application |
| **Indexer** | http://localhost:8088 | Blockchain data and state |
| **Proof Server** | http://localhost:6300 | ZK proof generation |
| **Node** | ws://localhost:9944 | Blockchain node |

**Health Checks:**
```bash
# Check indexer
curl http://localhost:8088/health

# Check proof server
curl http://localhost:6300/version

# Check node
curl http://localhost:9944/health
```

## 🐛 Troubleshooting

### Common Issues

#### 1. "Midnight providers not initialized" (Frontend)

**Solution:**
```bash
cd frontend-vite-react
npm run copy-contract-keys
# Refresh browser
```

#### 2. "Failed to join contract" (Frontend)

**Causes:**
- Contract not deployed
- Wrong contract address
- Network not running

**Solution:**
```bash
# Check contract address in frontend-vite-react/src/midnight/config.ts
# Redeploy if needed:
cd will-contract
npm run deploy
# Update contract address in frontend config
```

#### 3. Network connection failed

**Solution:**
```bash
# Check if containers are running
docker ps

# Restart network if needed
bash start-midnight-network.sh
```

#### 4. Wallet connection issues (Frontend)

**Solution:**
- Ensure Lace extension is installed and unlocked
- Switch to "undeployed" network in Lace settings
- Refresh the page and try connecting again

#### 5. "Waiting for funds" during deployment

**Solution:**
For local devnet, use the genesis wallet seed which is pre-funded:
```
0000000000000000000000000000000000000000000000000000000000000001
```

### Known Issues

- **ARM64 Proof Server**: There's a bug in the arm64 Docker image of the proof server.
  - **Workaround**: Use Bricktower proof server: `bricktowers/proof-server:6.1.0-alpha.6`

## 📚 Documentation

- **[Frontend README](frontend-vite-react/README.md)** - Complete frontend documentation
- **[Frontend Quick Start](frontend-vite-react/QUICKSTART.md)** - 5-minute setup guide
- **[Midnight Network Docs](https://docs.midnight.network/)** - Official documentation
- **[Compact Language Guide](https://docs.midnight.network/develop/compact/)** - Smart contract language
- **[Midnight SDK Reference](https://docs.midnight.network/develop/sdk/)** - SDK documentation
- **[Lace Wallet](https://www.lace.io/)** - Wallet documentation

## 🚀 Deployment

### Frontend Deployment

The frontend can be deployed to various hosting platforms:

```bash
cd frontend-vite-react

# Build for production
npm run build

# The dist/ folder is ready for deployment
```

**Hosting Options:**
- **Vercel** - Zero-config deployment
- **Netlify** - Automatic builds from Git
- **GitHub Pages** - Free static hosting
- **IPFS** - Decentralized hosting

**Before deploying:**
1. Update contract address for the target network (preprod/mainnet)
2. Update network ID in `src/midnight/config.ts`
3. Ensure contract assets are copied with `npm run copy-contract-keys`

### Contract Deployment

For testnet/mainnet deployment:

```bash
cd will-contract

# Set environment variables
export NETWORK_ID=preprod  # or mainnet
export INDEXER=https://indexer.preprod.midnight.network
export PROOF_SERVER=https://proof-server.preprod.midnight.network

# Deploy
npm run deploy
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Midnight Network](https://midnight.network/)
- [Midnight Documentation](https://docs.midnight.network/)
- [Lace Wallet](https://www.lace.io/)
- [Compact Language](https://docs.midnight.network/develop/compact/)
- [Midnight SDK](https://docs.midnight.network/develop/sdk/)
- [Midnight Discord](https://discord.gg/midnight)

## 💡 Tips & Best Practices

### For Smart Contract Development
- **Private State**: Beneficiary data is stored in private state (encrypted)
- **Transaction Fees**: Requires DUST tokens (auto-generated from NIGHT)
- **Network Sync**: Wait for wallet to sync before transactions
- **Contract Redeployment**: After restarting local network, redeploy contract

### For Frontend Development
- **Hot Reload**: Vite provides instant HMR for fast development
- **State Management**: Uses React Context for wallet and contract state
- **Private Data**: Beneficiary amounts remain encrypted in browser IndexedDB
- **Wallet Connection**: Always check wallet network matches contract network
- **Asset Copying**: Run `npm run copy-contract-keys` after contract redeployment

### For Production
- **Security**: Never commit private keys or seeds to version control
- **Testing**: Test thoroughly on testnet before mainnet deployment
- **Monitoring**: Monitor contract state and transaction status
- **Backup**: Keep secure backups of wallet seeds and deployment info

---

<div align="center">
  <p>Built with ❤️ for the Midnight Developer Community</p>
  <p>
    <a href="https://midnight.network/">Website</a> •
    <a href="https://docs.midnight.network/">Docs</a> •
    <a href="https://discord.gg/midnight">Discord</a> •
    <a href="https://twitter.com/MidnightNtwrk">Twitter</a>
  </p>
</div>
