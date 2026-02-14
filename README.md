# Midnight Starter Template

- A starter template for building on Midnight Network with React frontend and smart contract integration.
- **[Live Demo → counter.nebula.builders](https://counter.nebula.builders)**

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v23+) & [npm](https://www.npmjs.com/) (v11+)
- [Docker](https://docs.docker.com/get-docker/)
- [Git LFS](https://git-lfs.com/) (for large files)
- [Compact](https://docs.midnight.network/relnotes/compact-tools) (Midnight developer tools)
- [Lace](https://chromewebstore.google.com/detail/hgeekaiplokcnmakghbdfbgnlfheichg?utm_source=item-share-cb) (Browser wallet extension)
- [Faucet](https://faucet.preview.midnight.network/) (Preview Network Faucet)

## Known Issues

- There’s a not-yet-fixed bug in the arm64 Docker image of the proof server.
- Workaround: Use Bricktower proof server. **bricktowers/proof-server:6.1.0-alpha.6**

## 🛠️ Setup

### 1️⃣ Install Git LFS

```bash
# Install and initialize Git LFS
sudo dnf install git-lfs  # For Fedora/RHEL
git lfs install
```

### 2️⃣ Install Compact Tools

```bash
# Install the latest Compact tools
# 📜 Midnight Confidential Will

> A privacy-preserving inheritance protocol built on the [Midnight Network](https://midnight.network/).

![Midnight Network](https://img.shields.io/badge/Midnight-Network-purple?style=for-the-badge)
![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## 📖 Project Description

The **Confidential Will** project demonstrates the power of Midnight's privacy-first smart contracts. It allows a testator to create a digital will where the beneficiaries and their inheritance amounts remaining **completely encrypted and hidden** from the public ledger.

Unlike traditional blockchain solutions where all transfers are visible, Midnight ensures that your personal financial decisions remain private until the moment they need to be executed.

## 🕵️‍♂️ What it Does

This dApp allows users to:
1.  **Create a Will**: Deploy a smart contract that acts as a digital vault.
2.  **Add Beneficiaries Privately**: Register friends and family without revealing their identities or the amounts they are set to receive.
3.  **Execute the Will**: When the time comes, the will is marked as "executed".
4.  **Claim Inheritance**: Beneficiaries can then prove their identity and claim their funds, with the transaction history remaining privacy-preserving.

## ✨ Features

- **🔒 Zero-Knowledge Privacy**: Beneficiaries and amounts are stored in a private state, not on the public blockchain.
- **🛡️ Selective Disclosure**: Information is only revealed when strictly necessary (e.g., during the claiming process).
- **📝 Trustless Logic**: The contract prevents claims before execution and ensures funds are allocated exactly as programmed.
- **💻 Interactive CLI**: Includes a user-friendly Command Line Interface (`will-cli`) for easy interaction.
- **🏗️ Type-Safe Development**: Built with TypeScript and the Midnight Compact language for robust and secure code.

## 🚀 Deployed Smart Contract

The `will-contract` has been deployed to the local development network.

| Network | Contract Address |
| :--- | :--- |
| **Local / Undeployed** | `811e53ef80931b60672dcfb0b9abb79d6f39fd0b9fb7611354583fdf369b7e95` |

*(Note: This address is from a local deployment. If you restart your local node, you will need to redeploy.)*

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://docs.docker.com/get-docker/)
- [Midnight Compact Tools](https://docs.midnight.network/)

### 1. Installation

Clone the repo and install dependencies:

```bash
npm install
```

### 2. Build

Compile the Compact smart contract and build the TypeScript CLI:

```bash
npm run build
```

### 3. Run Local Devnet

Start the local Midnight node and helper services:

```bash
npm run stand-alone-node
```

### 4. Deploy

Deploy your own instance of the Will contract:

```bash
cd will-contract
npm run deploy
```

### 5. Interact

Use the CLI to manage the will:

```bash
cd will-cli
npm start
```

## 📂 Project Structure

- **`will-contract/`**: Contains the `will.compact` smart contract source code and deployment scripts.
- **`will-cli/`**: A TypeScript CLI application to interact with the deployed contract using the Midnight SDK.

---
<div align="center">
  <p>Built with ❤️ for the Midnight Developer Community</p>
</div>
