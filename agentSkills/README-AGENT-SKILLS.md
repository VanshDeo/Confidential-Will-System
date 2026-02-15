# Confidential Inheritance DApp - Antigravity Agent Skills

This package contains three specialized agent skills for building the Confidential Inheritance DApp UI on the Midnight blockchain. These skills are designed to work with Anthropic's Claude and provide comprehensive guidance for creating privacy-focused, blockchain-based estate planning interfaces.

## 📦 Skills Included

### 1. `blockchain-dapp-ui-SKILL.md`
**Purpose:** General blockchain DApp interface design with privacy-first principles

**Use when:**
- Building any decentralized application UI
- Creating Web3 product interfaces
- Designing blockchain wallet interactions
- Implementing smart contract interfaces
- Working with crypto wallets (Lace, MetaMask, etc.)

**Key Features:**
- Blockchain abstraction patterns
- Trust-building design elements
- Wallet connection flows
- Transaction status interfaces
- Privacy indicators and badges
- Error handling for Web3
- Responsive design for crypto apps

**Best for:** React, Vue, or vanilla JavaScript DApp frontends

---

### 2. `estate-planning-ui-SKILL.md`
**Purpose:** Emotionally intelligent interfaces for estate planning and inheritance

**Use when:**
- Building will creation interfaces
- Designing beneficiary management systems
- Creating inheritance claim workflows
- Developing estate planning dashboards
- Handling sensitive financial data

**Key Features:**
- Emotional design principles for mortality-related content
- Tone and vocabulary guidelines
- Legal disclaimer patterns
- Beneficiary management interfaces
- Multi-step will creation flows
- Security confirmation modals
- Privacy-aware beneficiary notifications

**Best for:** Any application dealing with wills, trusts, legacy planning, or end-of-life decisions

---

### 3. `privacy-first-ui-SKILL.md`
**Purpose:** Making complex privacy features (ZK-proofs, encryption) understandable

**Use when:**
- Implementing zero-knowledge proofs in UI
- Displaying end-to-end encryption status
- Communicating privacy features to non-technical users
- Building privacy dashboards
- Creating data export/deletion interfaces

**Key Features:**
- Privacy visualization patterns
- Zero-knowledge proof explainers
- Encryption status displays
- Privacy level indicators
- Data control interfaces
- Privacy audit logs
- Trust badges and verification

**Best for:** Applications with strong privacy features, encrypted messaging, anonymous authentication

---

## 🚀 How to Use These Skills

### For Claude.ai Users

1. **Upload a skill file** to your conversation
2. **Reference it** in your prompts:
   ```
   Using the blockchain-dapp-ui skill, create a wallet connection 
   component for the Midnight blockchain with Lace wallet integration.
   ```

### For Anthropic API Users

Include the skill content in your system prompt or context:

```python
import anthropic

# Read the skill file
with open('blockchain-dapp-ui-SKILL.md', 'r') as f:
    skill_content = f.read()

client = anthropic.Anthropic(api_key="your-api-key")

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=4000,
    system=skill_content,
    messages=[
        {
            "role": "user",
            "content": "Create a wallet connection component for Lace wallet"
        }
    ]
)
```

### For Antigravity/Agent Builders

1. Place skill files in your agent's knowledge base
2. Configure your agent to load relevant skills based on task type
3. Chain skills together for complex workflows

Example workflow:
```
Task: Build complete will creation interface
↓
Load: estate-planning-ui-SKILL.md (emotional tone, flow)
Load: privacy-first-ui-SKILL.md (encryption displays)
Load: blockchain-dapp-ui-SKILL.md (Web3 integration)
↓
Generate: Complete React component with all features
```

---

## 🎯 Project-Specific Usage

### For the Confidential Inheritance DApp

**Recommended Skill Combinations:**

#### Landing Page & Marketing
- `estate-planning-ui` (tone, messaging)
- `privacy-first-ui` (privacy benefits)

#### Wallet Connection
- `blockchain-dapp-ui` (wallet integration)
- `privacy-first-ui` (privacy onboarding)

#### Will Creation Flow
- `estate-planning-ui` (multi-step flow, disclaimers)
- `privacy-first-ui` (encryption indicators)
- `blockchain-dapp-ui` (transaction signing)

#### Beneficiary Management
- `estate-planning-ui` (beneficiary cards, allocation)
- `blockchain-dapp-ui` (address validation)
- `privacy-first-ui` (data privacy status)

#### Execute Will Confirmation
- `estate-planning-ui` (critical action modal)
- `blockchain-dapp-ui` (transaction flow)

#### Beneficiary Claim Interface
- `estate-planning-ui` (claim flow)
- `blockchain-dapp-ui` (asset transfer)
- `privacy-first-ui` (ZK-proof verification)

---

## 📋 Component Examples

### Example 1: Wallet Connection with Privacy

```
Prompt to Claude:
"Using blockchain-dapp-ui and privacy-first-ui skills, create a 
wallet connection component that explains privacy benefits."

Output: React component with:
- Lace wallet connection
- Privacy onboarding modal
- Encryption status indicator
- Network status display
```

### Example 2: Add Beneficiary Form

```
Prompt:
"Using estate-planning-ui and blockchain-dapp-ui skills, create a 
form to add beneficiaries with address validation."

Output: Form component with:
- Emotional, supportive tone
- Address input with checksum validation
- Allocation percentage slider
- Privacy indicators
- Confirmation modal
```

### Example 3: Privacy Dashboard

```
Prompt:
"Using privacy-first-ui skill, create a privacy dashboard showing 
what data is encrypted vs. public on the Midnight blockchain."

Output: Dashboard component with:
- Privacy status cards
- Color-coded indicators
- ZK-proof badges
- Privacy level explanations
```

---

## 🎨 Design System Reference

All three skills follow a consistent design system:

### Colors
- **Primary Blue:** #2E75B6 (trust, blockchain)
- **Success Green:** #28A745 (confirmed, active)
- **Warning Amber:** #FFC107 (pending, caution)
- **Danger Red:** #DC3545 (errors, critical)
- **Privacy Green:** #10B981 (encrypted, private)
- **Dark Background:** #1A1D29 (headers, hero sections)
- **Light Background:** #F8F9FA (page background)

### Typography
- **Primary Font:** Inter (UI), Georgia (legal text)
- **Monospace:** Roboto Mono (addresses, hashes)
- **Base Size:** 16px with 1.6 line height

### Spacing
- **Base Unit:** 8px
- **Common Values:** 4px, 8px, 16px, 24px, 32px, 48px

### Icons
- **Library:** Lucide icons (already in dependencies)
- **Privacy:** Shield, Lock, Eye
- **Blockchain:** Chain, Check, Clock
- **Actions:** Plus, Edit, Trash

---

## 🔧 Technical Integration

### React Example Structure

```jsx
// Recommended component structure
src/
├── components/
│   ├── wallet/
│   │   ├── WalletConnector.jsx          // blockchain-dapp-ui
│   │   └── PrivacyOnboarding.jsx        // privacy-first-ui
│   ├── will/
│   │   ├── CreateWillFlow.jsx           // estate-planning-ui
│   │   ├── AddBeneficiary.jsx           // estate-planning + blockchain
│   │   └── ExecuteConfirmation.jsx      // estate-planning + blockchain
│   ├── privacy/
│   │   ├── PrivacyDashboard.jsx         // privacy-first-ui
│   │   ├── PrivacyBadge.jsx             // privacy-first-ui
│   │   └── ZKProofExplainer.jsx         // privacy-first-ui
│   └── common/
│       ├── StatusBadge.jsx              // All skills
│       ├── Modal.jsx                    // All skills
│       └── Card.jsx                     // All skills
```

### Web3 Integration Points

```javascript
// Where each skill applies
import { ethers } from 'ethers';

// blockchain-dapp-ui handles:
- Wallet connection logic
- Transaction signing flows
- Network switching
- Error handling
- Loading states

// privacy-first-ui handles:
- Displaying encryption status
- ZK-proof indicators
- Privacy level badges
- Data control interfaces

// estate-planning-ui handles:
- User-facing flow
- Emotional tone
- Legal disclaimers
- Beneficiary management UI
```

---

## 🧪 Testing Guidelines

### Accessibility Testing
- [ ] Keyboard navigation works
- [ ] Screen reader announcements correct
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] Alt text for all icons

### Privacy Testing
- [ ] Privacy indicators accurate
- [ ] Encryption actually works
- [ ] ZK-proofs verify correctly
- [ ] No data leaks in console logs
- [ ] Analytics are truly anonymous

### Blockchain Testing
- [ ] Wallet connects properly
- [ ] Transactions sign correctly
- [ ] Network switching works
- [ ] Error messages helpful
- [ ] Works on slow connections

### Emotional Design Testing
- [ ] Tone appropriate for estate planning
- [ ] No alarming or morbid content
- [ ] Legal disclaimers clear
- [ ] Users feel supported
- [ ] Tested with target demographic

---

## 📚 Additional Resources

### Related Documentation
- [Midnight Blockchain Docs](https://docs.midnight.network)
- [Lace Wallet Integration](https://www.lace.io/developers)
- [Zero-Knowledge Proofs Explained](https://z.cash/technology/zksnarks/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Example Projects
- [Example DApp UI](https://github.com/example/dapp-ui)
- [Privacy Dashboard Demo](https://github.com/example/privacy-dashboard)
- [Estate Planning Workflow](https://github.com/example/will-creation)

---

## 🤝 Contributing

These skills are designed to evolve with the project. If you:
- Discover better patterns
- Find gaps in coverage
- Identify common mistakes
- Have accessibility improvements

Please contribute back to improve these skills for everyone.

---

## 📄 License

These skills are provided as part of the Confidential Inheritance DApp project. Use them freely in your own blockchain applications.

---

## 🆘 Support

For questions about using these skills:
1. Refer to the detailed examples in each skill file
2. Check the component patterns section
3. Review the testing checklists
4. Consult the project's main UI/UX guide

---

## 🎯 Quick Start Checklist

To build the Confidential Inheritance DApp:

- [ ] Read all three skill files thoroughly
- [ ] Set up design tokens (colors, typography)
- [ ] Create component library based on patterns
- [ ] Implement wallet connection (blockchain-dapp-ui)
- [ ] Build will creation flow (estate-planning-ui)
- [ ] Add privacy features (privacy-first-ui)
- [ ] Test accessibility
- [ ] Test with real users
- [ ] Deploy with legal review

---

**Built with 💙 for the Midnight blockchain community**

*These skills represent best practices learned from building privacy-focused blockchain applications. They prioritize user trust, emotional intelligence, and making complex technology accessible.*
