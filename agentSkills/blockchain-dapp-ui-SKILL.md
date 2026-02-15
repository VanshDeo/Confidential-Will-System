---
name: blockchain-dapp-ui
description: Build privacy-focused blockchain DApp interfaces with trust-building design. Use this skill when creating user interfaces for decentralized applications, Web3 products, blockchain wallets, DeFi platforms, NFT marketplaces, or any application involving cryptocurrency, smart contracts, or distributed ledger technology. Specializes in abstracting blockchain complexity while highlighting security and privacy benefits. Applies to React, Vue, or vanilla JavaScript implementations.
---

# Blockchain DApp UI Design

This skill guides the creation of trustworthy, user-friendly interfaces for blockchain applications that abstract technical complexity while building user confidence through transparency and privacy-first design.

## Core Principles

### Blockchain Abstraction
**Hide the complexity, show the benefits**

Users don't need to understand Merkle trees, gas fees, or cryptographic algorithms. They need to understand:
- **Immutability**: Their actions are permanent and verifiable
- **Privacy**: Their data is encrypted and protected
- **Decentralization**: No single entity controls their assets
- **Transparency**: All actions can be verified

**What to Show:**
- Transaction status and progress
- Asset balances and allocations
- Verification indicators (blockchain confirmed, encrypted, etc.)
- Simple, clear action buttons
- Privacy status shields
- Timestamp displays for immutability

**What to Hide (Initially):**
- Transaction hashes (available in advanced/details view)
- Raw wallet addresses (show nicknames, reveal on hover/click)
- Smart contract addresses and ABIs
- Gas prices and transaction fees (show total cost only)
- Block numbers and confirmations (show "confirmed" badge instead)

### Trust Through Design
**Every pixel should convey security and reliability**

Estate planning, financial transactions, and identity management require maximum trust. The interface must feel:
- **Permanent**: Design should feel solid, not ephemeral
- **Secure**: Visual indicators of security everywhere
- **Professional**: Clean, refined, purposeful
- **Transparent**: Clear about what's happening at each step

**Trust Indicators:**
- Shield icons for encrypted/private data
- Checkmark badges for blockchain verification
- Lock icons for secure operations
- Timestamps to show immutability
- Chain icons for blockchain connection
- Real-time status updates

### Privacy First Design
**Make privacy features visible and understandable**

Blockchain privacy features (ZK-proofs, encryption, anonymity) are complex. Communicate them clearly:

**Privacy Shields:**
- Green shield: Fully private/encrypted
- Amber shield: Partially disclosed (explain what's public)
- Icon placement: Next to sensitive data fields
- Tooltip: "This information is encrypted and only visible to you"

**Zero-Knowledge Proof Badges:**
- Text: "ZK-Proof Verified" with lock icon
- Tooltip: "This transaction was verified without revealing your private data"
- Link: "Learn more about zero-knowledge proofs" → documentation
- Color: Subtle blue or green to match security indicators

**Privacy Status Table:**
Display what's private vs. public in a clear table:

| Data Type | Visibility | Why |
|-----------|------------|-----|
| Will existence | Public | Contract must be discoverable |
| Beneficiary addresses | Private (encrypted) | Personal information protected |
| Asset amounts | Private (ZK-proof) | Financial privacy preserved |
| Execution status | Public | Transparency for claims |

## Visual Design System

### Color Palette (Blockchain-Appropriate)

**Primary Colors:**
- **Primary Blue**: #2E75B6 - Trust, professionalism, blockchain theme
- **Secondary Gray**: #6C757D - Body text, supporting elements

**Semantic Colors:**
- **Success Green**: #28A745 - Confirmed transactions, active state
- **Warning Amber**: #FFC107 - Pending transactions, caution
- **Danger Red**: #DC3545 - Failed transactions, critical actions
- **Privacy Green**: #10B981 - Encrypted data indicators

**Backgrounds:**
- **Dark Mode**: #1A1D29 - For headers, hero sections (crypto aesthetic)
- **Light Background**: #F8F9FA - Main page background
- **Card Background**: #FFFFFF with subtle shadow

**Accent Colors:**
- **Blockchain Purple**: #8B5CF6 - Optional accent for crypto branding
- **NFT Pink**: #EC4899 - For NFT-related features

### Typography

**Font Stack:**
```css
/* Primary UI Font */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace for Addresses/Hashes */
font-family: 'Roboto Mono', 'SF Mono', Monaco, 'Courier New', monospace;

/* Optional: Display Font for Hero Sections */
font-family: 'Space Grotesk', 'Inter', sans-serif;
```

**Scale:**
- H1: 36px / 700 bold / 1.2 line-height
- H2: 28px / 600 semibold / 1.3
- H3: 22px / 600 semibold / 1.4
- Body: 16px / 400 regular / 1.6
- Small: 14px / 400 regular / 1.5
- Caption: 12px / 400 regular / 1.4
- Monospace (addresses): 14px / 400 regular / 1.4

### Spacing
Use 8px base unit:
- 4px: Tight (icon-to-text)
- 8px: Close (form labels)
- 16px: Standard (between fields)
- 24px: Section (between cards)
- 32px: Large (major sections)
- 48px: Extra large (page sections)

## Component Patterns

### Wallet Connection Widget

**Disconnected State:**
```
[🎒 Wallet Icon] Connect Wallet
```
- Large primary button
- Icon + text
- Hover: Slight elevation, darken 10%

**Connected State:**
```
[●] 0x1234...5678 [▼]
```
- Green dot indicator
- Abbreviated address
- Dropdown arrow
- Hover: Show full address in tooltip
- Click: Dropdown with:
  - Full address (with copy button)
  - Network status
  - Account balance
  - "Disconnect" option

### Status Cards

**Card Anatomy:**
```
┌─────────────────────────────────────────┐
│ [Icon] Title                      [Badge]│
│                                           │
│ Main content area with key information   │
│                                           │
│ [Action Button]              [Link]      │
└─────────────────────────────────────────┘
```

- Background: White with shadow `0 2px 8px rgba(0,0,0,0.08)`
- Border: 1px solid #E5E7EB, 12px radius
- Padding: 24px all sides
- Elevation on hover (optional)

### Status Badges

```
[Active] - Green bg, white text
[Pending] - Amber bg, dark text
[Executed] - Blue bg, white text
[Failed] - Red bg, white text
[Locked] - Gray bg, white text
```

- Height: 24px
- Padding: 4px 12px
- Border radius: 12px (pill shape)
- Font: 12px semibold
- Icon + text for maximum clarity

### Transaction Progress Modal

```
╔═══════════════════════════════════════╗
║  [Spinner] Processing Transaction     ║
║                                        ║
║  ① Preparing        ✓                 ║
║  ② Signing          ← You are here    ║
║  ③ Broadcasting     ...               ║
║  ④ Confirming       ...               ║
║                                        ║
║  Please confirm in your wallet        ║
╚═══════════════════════════════════════╝
```

**States:**
1. **Preparing**: Gather transaction data
2. **Signing**: User signing in wallet (show wallet icon pulsing)
3. **Broadcasting**: Sending to blockchain
4. **Confirming**: Waiting for confirmation (show block countdown)
5. **Success**: Green checkmark + "Transaction Confirmed"
6. **Failed**: Red X + error message + retry option

**Implementation:**
- Modal overlay: rgba(0,0,0,0.6)
- Modal: White, centered, max-width 500px
- Progress steps: Check marks for completed, spinner for current
- Prevent dismissal during processing
- Auto-close on success after 3 seconds

### Address Input Field

**Special considerations for wallet addresses:**

```
┌─────────────────────────────────────────┐
│ Wallet Address                          │
│ ┌─────────────────────────────────────┐ │
│ │ 0x742d35Cc6634C0532...  [📋] [📝]  │ │
│ └─────────────────────────────────────┘ │
│ [✓] Valid Ethereum address              │
└─────────────────────────────────────────┘
```

- Font: Monospace (Roboto Mono)
- Icons: Copy (📋) and Paste (📝) buttons
- Real-time validation with checksum verification
- Visual indicator for valid addresses (green check)
- Error state for invalid addresses (red X + message)
- Support for ENS names or other aliases

### Confirmation Modals (Critical Actions)

**For irreversible actions (e.g., executing a will, transferring assets):**

```
╔═══════════════════════════════════════╗
║  [⚠️ Warning Icon]                    ║
║                                        ║
║  Execute Will?                         ║
║                                        ║
║  This action is IRREVERSIBLE and will: ║
║  • Allow beneficiaries to claim assets║
║  • Lock all beneficiary data          ║
║  • Prevent future modifications       ║
║                                        ║
║  □ I understand this cannot be undone ║
║                                        ║
║  [Cancel]  [Execute Will]             ║
╚═══════════════════════════════════════╝
```

**Requirements:**
- Large warning icon (amber or red)
- Clear title
- Bullet list of consequences
- Required checkbox to proceed
- Secondary "Cancel" + Danger "Confirm" buttons
- Consider adding a countdown (5 seconds) before enabling confirm

### Privacy Indicators

**Full Privacy:**
```
[🛡️ Private] This data is encrypted
```
- Green shield icon
- Green text
- Tooltip: "End-to-end encrypted. Only you can see this information."

**Partial Privacy:**
```
[🛡️ Partially Public] Some data visible
```
- Amber shield icon
- Amber text
- Tooltip: "Some information is public for contract functionality. Click to see details."

**Public:**
```
[🌐 Public] Visible on blockchain
```
- Blue globe icon
- Gray text
- Tooltip: "This information is recorded on the public blockchain."

## User Flow Patterns

### First-Time User Onboarding

**Step 1: Landing Page**
- Hero section with clear value proposition
- "Connect Wallet" CTA
- "New to blockchain?" → Help section
- 3-step visual: Connect → Create → Secure

**Step 2: Wallet Connection**
- Explain why wallet connection is needed
- List supported wallets
- Security reassurance
- "Don't have a wallet?" → Installation guide

**Step 3: Welcome Modal**
```
╔═══════════════════════════════════════╗
║  Welcome to [DApp Name]!               ║
║                                        ║
║  🛡️ Your Privacy is Protected          ║
║                                        ║
║  • All sensitive data is encrypted    ║
║  • Zero-knowledge proofs verify       ║
║    transactions without revealing data║
║  • You control your assets entirely   ║
║                                        ║
║  [Learn More] [Get Started]           ║
╚═══════════════════════════════════════╝
```

**Step 4: Interactive Tutorial (Optional)**
- Highlight key features with pointers
- Allow users to skip or dismiss
- Mark as completed in localStorage

### Error States

**Wallet Not Connected:**
```
┌─────────────────────────────────────────┐
│ [🎒] Connect Your Wallet                │
│                                          │
│ To use this feature, please connect     │
│ your wallet first.                       │
│                                          │
│ [Connect Wallet]                         │
└─────────────────────────────────────────┘
```

**Network Mismatch:**
```
┌─────────────────────────────────────────┐
│ [⚠️] Wrong Network                       │
│                                          │
│ Please switch to Ethereum Mainnet       │
│ in your wallet.                          │
│                                          │
│ Current: Polygon        Required: Ethereum│
│                                          │
│ [Switch Network]                         │
└─────────────────────────────────────────┘
```

**Transaction Failed:**
```
┌─────────────────────────────────────────┐
│ [❌] Transaction Failed                  │
│                                          │
│ Your transaction could not be completed.│
│                                          │
│ Possible reasons:                        │
│ • Insufficient funds for gas            │
│ • Transaction rejected by user          │
│ • Network congestion                    │
│                                          │
│ [Try Again] [View Details]              │
└─────────────────────────────────────────┘
```

## Code Implementation Guidelines

### React Structure

```jsx
// Component hierarchy for a DApp dashboard
<DAppLayout>
  <Header>
    <Logo />
    <Navigation />
    <WalletConnector />
  </Header>
  
  <MainContent>
    <StatusCard />
    <ActionPanel />
    <DataTable />
  </MainContent>
  
  <Footer>
    <Links />
    <NetworkIndicator />
  </Footer>
  
  {/* Modals */}
  <TransactionModal />
  <ConfirmationModal />
</DAppLayout>
```

### Web3 Integration Patterns

```javascript
// Wallet connection state management
const [account, setAccount] = useState(null);
const [provider, setProvider] = useState(null);
const [network, setNetwork] = useState(null);

// Connection handler
const connectWallet = async () => {
  try {
    // Request accounts
    const accounts = await window.ethereum.request({ 
      method: 'eth_requestAccounts' 
    });
    setAccount(accounts[0]);
    
    // Get network
    const chainId = await window.ethereum.request({ 
      method: 'eth_chainId' 
    });
    setNetwork(chainId);
    
    // Initialize provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    
    // Listen for account changes
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    
  } catch (error) {
    console.error('Wallet connection failed:', error);
    showError('Failed to connect wallet. Please try again.');
  }
};

// Transaction with loading states
const [txStatus, setTxStatus] = useState('idle'); // idle, preparing, signing, broadcasting, confirming, success, failed

const executeTransaction = async () => {
  try {
    setTxStatus('preparing');
    // Prepare transaction data
    
    setTxStatus('signing');
    // User signs in wallet
    const tx = await contract.executeFunction();
    
    setTxStatus('broadcasting');
    // Transaction sent to network
    
    setTxStatus('confirming');
    // Wait for confirmation
    await tx.wait();
    
    setTxStatus('success');
    showSuccess('Transaction confirmed!');
    
  } catch (error) {
    setTxStatus('failed');
    showError(parseError(error));
  }
};
```

### Privacy Feature Display

```jsx
// Privacy indicator component
const PrivacyBadge = ({ level, data }) => {
  const config = {
    full: {
      icon: '🛡️',
      text: 'Private',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      tooltip: 'This data is fully encrypted and only visible to you.'
    },
    partial: {
      icon: '🛡️',
      text: 'Partially Public',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      tooltip: 'Some information is public for contract functionality.'
    },
    public: {
      icon: '🌐',
      text: 'Public',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      tooltip: 'This information is recorded on the public blockchain.'
    }
  };
  
  const { icon, text, color, bgColor, tooltip } = config[level];
  
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${bgColor}`}>
      <span>{icon}</span>
      <span className={`text-sm font-medium ${color}`}>{text}</span>
      <Tooltip content={tooltip} />
    </div>
  );
};
```

## Accessibility Requirements

**WCAG 2.1 Level AA:**
- Color contrast: 4.5:1 for body text, 3:1 for large text
- Keyboard navigation: All interactive elements accessible
- Screen reader support: Proper ARIA labels and semantic HTML
- Focus indicators: Visible on all focusable elements

**Blockchain-Specific Accessibility:**
- Transaction status announced to screen readers
- Loading states communicated clearly
- Error messages descriptive and actionable
- Alternative text for icons and status indicators

## Responsive Design

**Breakpoints:**
- Mobile: 320px - 767px (single column, bottom sheets)
- Tablet: 768px - 1023px (two columns)
- Desktop: 1024px+ (multi-column, modals)

**Mobile Considerations:**
- Stack cards vertically
- Use bottom sheet modals instead of centered
- Larger touch targets (44x44px minimum)
- Hamburger menu for navigation
- Sticky wallet connector at top

## Testing Checklist

Before deployment, verify:
- [ ] Wallet connects on all supported providers
- [ ] Network switching works correctly
- [ ] Transaction signing flow is clear
- [ ] Error states display helpful messages
- [ ] Loading states provide feedback
- [ ] Privacy indicators are accurate
- [ ] All addresses validate correctly
- [ ] Responsive on mobile, tablet, desktop
- [ ] Accessible via keyboard only
- [ ] Screen reader announces key state changes
- [ ] Works on slow connections (loading states)
- [ ] Handles wallet disconnection gracefully

## Common Pitfalls to Avoid

1. **Don't assume wallet is always connected**: Check on every transaction
2. **Don't expose sensitive data in logs**: Never log private keys or seeds
3. **Don't trust client-side validation only**: Always validate on-chain
4. **Don't use technical jargon**: "Gas fee" → "Network fee", "Nonce" → (hide it)
5. **Don't hide critical information**: Transaction costs should be clear
6. **Don't make destructive actions easy**: Require confirmation
7. **Don't ignore error states**: Every Web3 call can fail
8. **Don't forget loading states**: Blockchain operations take time

## Remember

The goal is to make blockchain technology feel as intuitive as traditional web applications, while highlighting the unique benefits of decentralization, privacy, and security. Every design decision should either simplify complexity or build trust.
