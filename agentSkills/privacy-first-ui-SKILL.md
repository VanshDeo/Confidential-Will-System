---
name: privacy-first-ui
description: Design interfaces that communicate privacy, encryption, and zero-knowledge proofs to non-technical users. Use this skill when building applications with strong privacy features, end-to-end encryption, zero-knowledge proofs, anonymous authentication, data minimization, or any product where user privacy is a core value proposition. Focuses on making complex privacy technology understandable and trustworthy.
---

# Privacy-First UI Design

This skill guides the creation of interfaces that make privacy features visible, understandable, and trustworthy to users without overwhelming them with technical complexity.

## Core Principle: Privacy as a Feature, Not a Burden

Users should:
1. **Understand** what privacy they have
2. **See** privacy working in real-time
3. **Trust** that privacy claims are legitimate
4. **Feel** in control of their data

## Visual Language of Privacy

### Icons and Symbols

**Lock Icons:**
- 🔒 Closed Lock: Data is encrypted/secure
- 🔓 Open Lock: Data is unencrypted (use rarely, with warning color)
- 🔐 Lock with Key: User has exclusive access
- 🔏 Lock with Pen: Signed/authenticated data

**Shield Icons:**
- 🛡️ Shield: General protection/privacy
- ✅ Shield with Check: Verified privacy protection
- ⚠️ Shield with Warning: Privacy risk or partial protection
- 🛡️ Multi-layer Shield: Multiple privacy layers (ZK proofs + encryption)

**Eye Icons:**
- 👁️ Eye: Visible/public data
- 👁️‍🗨️ Eye crossed out: Private/hidden data
- 👀 Two Eyes: Watched/tracked (negative)
- 🔍 Magnifying glass: Data inspection/audit

**Other Privacy Icons:**
- 🎭 Mask: Anonymous/pseudonymous
- 🔑 Key: Encryption key, access control
- 🌐 Globe: Public blockchain data
- 🗝️ Old Key: Master key, recovery key
- ⛓️ Chain: Blockchain, immutable
- 🔗 Broken Chain: Unlinkable, anonymous

### Color Psychology for Privacy

**Privacy Levels:**

```
🟢 GREEN (#10B981): Fully Private
   - End-to-end encrypted
   - Zero-knowledge proofs
   - No data stored
   - Anonymous

🟡 AMBER (#FFC107): Partially Private
   - Some data disclosed
   - Pseudonymous
   - Limited tracking
   - Opt-in analytics

🔴 RED (#DC3545): Public/Exposed
   - Publicly visible
   - Tracked
   - Not encrypted
   - Required disclosure
```

**Use consistently:**
- Green = Maximum privacy
- Amber = Conditional/partial privacy
- Red = Low/no privacy (warnings only)

### Typography and Tone

**Voice:**
- Confident but not arrogant
- Technical but accessible
- Transparent about limitations
- Empowering, not fearful

**Examples:**

✅ Good:
- "Your data is encrypted and only you can access it"
- "We use zero-knowledge proofs to verify without revealing"
- "This information stays on your device"

❌ Avoid:
- "Don't worry, we've got your back!" (too casual)
- "Military-grade encryption protects you" (marketing speak)
- "Your data is 100% safe" (overpromising)

## Privacy Communication Patterns

### Privacy Dashboard

```
┌─────────────────────────────────────────────┐
│ 🛡️ Your Privacy Status                      │
│                                             │
│ 🟢 Personal Data: Encrypted                │
│    End-to-end encrypted, key stored locally│
│                                             │
│ 🟢 Messages: Zero-Knowledge                │
│    Verified without revealing content      │
│                                             │
│ 🟡 Metadata: Minimized                     │
│    Only connection times stored            │
│                                             │
│ 🌐 Public: Account Existence               │
│    Required for discoverability            │
│                                             │
│ [View Details] [Export Privacy Report]     │
└─────────────────────────────────────────────┘
```

**Key Elements:**
- Visual hierarchy by privacy level
- Color-coded status indicators
- Brief explanation for each item
- "Why?" link for each disclosure
- Export option for transparency

### Privacy Policy (User-Friendly Version)

**Instead of legal document, show:**

```
┌─────────────────────────────────────────────┐
│ What We Know About You                     │
│                                             │
│ ✓ Things we NEVER see:                     │
│   • Your messages                           │
│   • Your passwords                          │
│   • Your files                              │
│   • Your contact list                       │
│                                             │
│ ⚠️ Things we collect:                       │
│   • When you logged in (for security)      │
│   • Error reports (anonymous)               │
│                                             │
│ 🌐 Things that are public:                 │
│   • Your username                           │
│   • Your public profile                     │
│                                             │
│ [See Full Privacy Policy]                  │
└─────────────────────────────────────────────┘
```

### Zero-Knowledge Proof Explainer

**Challenge:** ZK proofs are complex to explain

**Solution:** Progressive disclosure

```
┌─────────────────────────────────────────────┐
│ 🎭 Zero-Knowledge Proof                     │
│                                             │
│ Simple explanation:                         │
│ We can verify you own something without    │
│ learning what that something is.            │
│                                             │
│ [How it works ▼]                            │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ Technical explanation (expanded):       │ │
│ │ Zero-knowledge proofs use cryptographic │ │
│ │ techniques to prove a statement is true │ │
│ │ without revealing any information beyond│ │
│ │ the validity of the statement itself.   │ │
│ │                                         │ │
│ │ Example: Proving you're over 18 without│ │
│ │ revealing your exact age.               │ │
│ │                                         │ │
│ │ [Learn more] [See diagram]             │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

### Encryption Visualization

**Show, don't just tell:**

```
┌─────────────────────────────────────────────┐
│ Your Message Journey                        │
│                                             │
│ You type:                                   │
│ ┌─────────────────────────────────────────┐ │
│ │ "Hello, how are you?"                   │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ We see:                                     │
│ ┌─────────────────────────────────────────┐ │
│ │ ●●●●●●●●●●●●●●●●●●●●                   │ │
│ │ [Encrypted data blob]                   │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ Recipient sees:                             │
│ ┌─────────────────────────────────────────┐ │
│ │ "Hello, how are you?"                   │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ 🔒 End-to-end encrypted                    │
└─────────────────────────────────────────────┘
```

## Component Patterns

### Privacy Toggle

```
┌─────────────────────────────────────────────┐
│ Share Analytics                   [○     ] │
│                                             │
│ Help us improve by sharing anonymous usage │
│ data. We'll never see your personal info.  │
│                                             │
│ What we collect: [View Details]            │
│ • Screen views (no content)                │
│ • Button clicks (aggregated)               │
│ • Error reports (anonymous)                │
└─────────────────────────────────────────────┘
```

**Requirements:**
- Default to OFF for privacy
- Explain exactly what's collected
- Link to details
- Easy to toggle anytime

### Data Export Tool

```
┌─────────────────────────────────────────────┐
│ 📦 Export Your Data                         │
│                                             │
│ Get a copy of all your data. You own it.   │
│                                             │
│ What's included:                            │
│ ✓ Your profile information                 │
│ ✓ Your messages (encrypted)                │
│ ✓ Your settings                             │
│ ✓ Your activity log                         │
│                                             │
│ Format: □ JSON  □ CSV  ☑️ Human-readable   │
│                                             │
│ 📧 We'll email a download link when ready  │
│    Usually takes 5-15 minutes               │
│                                             │
│ [Request Export]                            │
└─────────────────────────────────────────────┘
```

### Data Deletion Interface

```
┌─────────────────────────────────────────────┐
│ 🗑️ Delete Your Data                         │
│                                             │
│ ⚠️ This action is permanent                 │
│                                             │
│ What will be deleted:                       │
│ • Your account                              │
│ • Your messages                             │
│ • Your files                                │
│ • Your settings                             │
│                                             │
│ What stays (legal requirements):            │
│ • Transaction records (5 years)            │
│ • Abuse reports you filed                  │
│                                             │
│ Before you go:                              │
│ □ I've exported my data                    │
│ □ I understand this is permanent           │
│                                             │
│ [Cancel] [Delete Everything]               │
└─────────────────────────────────────────────┘
```

### Privacy Audit Log

```
┌─────────────────────────────────────────────┐
│ 📋 Privacy Activity Log                     │
│                                             │
│ Recent privacy-related events:              │
│                                             │
│ Today, 3:45 PM                              │
│ 🔐 You changed your encryption password    │
│                                             │
│ Yesterday, 11:20 AM                         │
│ 👁️ You viewed your data export             │
│                                             │
│ Dec 15, 2025                                │
│ 📧 You updated email notification settings │
│                                             │
│ Dec 10, 2025                                │
│ 🔑 New device authorized (iPhone)          │
│                                             │
│ [View All Activity]                         │
└─────────────────────────────────────────────┘
```

## Onboarding for Privacy Features

### First-Time Privacy Tutorial

```
Step 1: Welcome
┌─────────────────────────────────────────────┐
│ 🛡️ Your Privacy Matters                     │
│                                             │
│ We've built this app with privacy-first    │
│ principles. Here's what that means:         │
│                                             │
│ • End-to-end encryption                    │
│ • Zero-knowledge architecture              │
│ • Minimal data collection                  │
│ • You control everything                   │
│                                             │
│ [Next: How Encryption Works]               │
└─────────────────────────────────────────────┘

Step 2: Encryption
┌─────────────────────────────────────────────┐
│ 🔒 End-to-End Encryption                    │
│                                             │
│ [Animated diagram showing message flow]    │
│                                             │
│ Your messages are scrambled before they    │
│ leave your device. Only the recipient can  │
│ unscramble them. Not even we can read them.│
│                                             │
│ [Next: Your Keys]                           │
└─────────────────────────────────────────────┘

Step 3: Keys
┌─────────────────────────────────────────────┐
│ 🔑 Your Encryption Keys                     │
│                                             │
│ You have two keys:                          │
│ • Public Key: Share with everyone          │
│ • Private Key: Keep secret, never share    │
│                                             │
│ We'll securely store your private key      │
│ encrypted with your password.               │
│                                             │
│ ⚠️ If you lose your password, we cannot    │
│    recover your data.                       │
│                                             │
│ [I Understand]                              │
└─────────────────────────────────────────────┘
```

## Privacy Warnings and Notifications

### Low Privacy Warning

```
┌─────────────────────────────────────────────┐
│ ⚠️ Less Private Mode                        │
│                                             │
│ You're about to use a feature that reduces │
│ your privacy:                               │
│                                             │
│ • Your location will be shared             │
│ • This cannot be end-to-end encrypted      │
│ • Recipients will see your real identity   │
│                                             │
│ Consider:                                   │
│ • Using a throwaway account                │
│ • Sharing minimal information              │
│                                             │
│ [Go Back] [Continue Anyway]                │
└─────────────────────────────────────────────┘
```

### Compromised Privacy Alert

```
┌─────────────────────────────────────────────┐
│ 🚨 Security Alert                           │
│                                             │
│ We detected unusual activity on your       │
│ account that may compromise your privacy:  │
│                                             │
│ • Login from new device (London, UK)       │
│ • Was this you?                             │
│                                             │
│ Recommended actions:                        │
│ 1. Change your password immediately        │
│ 2. Review authorized devices               │
│ 3. Enable two-factor authentication        │
│                                             │
│ [Yes, That Was Me] [Secure My Account]    │
└─────────────────────────────────────────────┘
```

## Privacy Comparisons (Against Competitors)

**Effective way to communicate privacy benefits:**

```
┌─────────────────────────────────────────────┐
│ Privacy Comparison                          │
│                                             │
│                     Us    Competitor A   B  │
│ ─────────────────────────────────────────  │
│ E2E Encryption      ✅         ❌         ⚠️  │
│ Zero-Knowledge      ✅         ❌         ❌  │
│ No Ads              ✅         ❌         ❌  │
│ No Data Selling     ✅         ❌         ⚠️  │
│ Local Storage       ✅         ❌         ⚠️  │
│ Open Source         ✅         ⚠️         ❌  │
│                                             │
│ [Learn More About Our Privacy]             │
└─────────────────────────────────────────────┘
```

**Key:**
- ✅ Full support
- ⚠️ Partial/conditional
- ❌ Not supported

## Privacy-Preserving Analytics

**Challenge:** How to improve product without tracking users?

**Solution:** Transparent, privacy-first analytics

```
┌─────────────────────────────────────────────┐
│ 📊 Privacy-Friendly Analytics               │
│                                             │
│ We want to improve, but respect your       │
│ privacy. Here's how we do analytics:        │
│                                             │
│ ✅ What we collect:                         │
│ • Which features are used (not who uses)   │
│ • Error messages (anonymous)               │
│ • Performance metrics (aggregated)         │
│                                             │
│ ❌ What we DON'T collect:                   │
│ • Individual user behavior                 │
│ • Personal information                     │
│ • Message content                          │
│ • Contact lists                            │
│                                             │
│ 🔍 View our analytics:                      │
│ All data is aggregated and public          │
│ [See Analytics Dashboard]                  │
│                                             │
│ Enable privacy-friendly analytics? [○   ] │
└─────────────────────────────────────────────┘
```

## Trust Indicators

### Independent Audit Badge

```
┌─────────────────────────────────────────────┐
│ 🔍 Security Audit                           │
│                                             │
│ ✅ Audited by [Reputable Firm]             │
│ Date: January 2026                          │
│ Result: No critical issues found           │
│                                             │
│ [View Full Audit Report]                   │
└─────────────────────────────────────────────┘
```

### Open Source Badge

```
┌─────────────────────────────────────────────┐
│ 🌐 Open Source                              │
│                                             │
│ Our code is public and independently       │
│ verifiable. Check it yourself:             │
│                                             │
│ GitHub: github.com/yourapp                 │
│ License: MIT                                │
│ Contributors: 234                           │
│                                             │
│ [View Source Code]                          │
└─────────────────────────────────────────────┘
```

### Compliance Badges

```
GDPR ✓   CCPA ✓   SOC2 ✓   ISO 27001 ✓
```

Display prominently in footer with links to compliance documents.

## Common Privacy Misconceptions to Address

### Misconception: "I have nothing to hide"

**Response in UI:**
```
Privacy isn't about hiding bad things.
It's about controlling your personal information.

Examples:
• Medical records
• Financial data
• Personal conversations
• Location history

You deserve control over who sees these.
```

### Misconception: "Encryption is too complex"

**Response:**
```
You don't need to understand encryption to use it.

Just like you don't need to understand how a 
lock works to lock your door.

We handle the complexity. You get the security.
```

### Misconception: "Free services must track me"

**Response:**
```
We're free AND private. How?

• Optional paid features
• Donations from users who value privacy
• No ads, no tracking, no data selling

[See Our Business Model]
```

## Privacy Settings Interface

### Privacy Level Slider

```
┌─────────────────────────────────────────────┐
│ Choose Your Privacy Level                   │
│                                             │
│ ◀──────────●──────────────────────────────▶ │
│ Public    Balanced    Maximum               │
│                                             │
│ Currently: BALANCED                         │
│                                             │
│ This means:                                 │
│ ✓ End-to-end encryption                    │
│ ✓ Anonymous analytics                      │
│ ⚠️ Profile visible to connections          │
│ ⚠️ Online status visible                   │
│                                             │
│ [Customize] [Apply]                         │
└─────────────────────────────────────────────┘
```

### Granular Privacy Controls

```
┌─────────────────────────────────────────────┐
│ Advanced Privacy Settings                   │
│                                             │
│ Profile                                     │
│ ├─ Who can see your profile?               │
│ │  ○ Everyone  ○ Connections ☑️ No one     │
│ └─ Who can search for you?                 │
│    ☑️ Everyone  ○ Connections ○ No one     │
│                                             │
│ Activity                                    │
│ ├─ Show "Last seen"?                       │
│ │  ○ Yes  ☑️ No                            │
│ └─ Show "Typing..."?                       │
│    ☑️ Yes  ○ No                            │
│                                             │
│ Data                                        │
│ ├─ Store messages on server?               │
│ │  ○ Yes  ☑️ No (more private, less sync) │
│ └─ Backup encryption?                      │
│    ☑️ Yes  ○ No                            │
│                                             │
│ [Save Changes]                              │
└─────────────────────────────────────────────┘
```

## Error Messages (Privacy Context)

### Encryption Failed

```
❌ Unable to encrypt message

Your message could not be encrypted before 
sending. This might mean:

• Recipient's encryption key is invalid
• Network connection interrupted
• Local storage is full

Your message was NOT sent to protect your privacy.

[Retry] [Check Connection]
```

### Key Verification Failed

```
⚠️ Unable to verify encryption key

The recipient's encryption key has changed.
This could mean:

• They reinstalled the app
• They're using a new device
• Someone is impersonating them (unlikely)

For maximum security, verify their identity
before continuing.

[Verify Identity] [Continue Anyway]
```

## Accessibility for Privacy Features

**Important:** Privacy controls must be accessible

- Screen reader support: Announce privacy status changes
- Keyboard navigation: All privacy toggles accessible
- High contrast: Privacy indicators visible
- Simple language: Avoid jargon
- Multiple indicators: Don't rely on color alone

## Testing Checklist

- [ ] Privacy dashboard shows accurate status
- [ ] All privacy toggles work correctly
- [ ] Data export includes all user data
- [ ] Data deletion actually deletes
- [ ] Encryption key generation is secure
- [ ] ZK proof explanations are clear
- [ ] Privacy warnings appear when needed
- [ ] Audit log captures all privacy events
- [ ] Analytics are truly anonymous
- [ ] Privacy policy is readable
- [ ] Trust indicators link to verification
- [ ] Works with screen readers
- [ ] Works without JavaScript (where critical)

## Remember

Privacy is not a feature you add at the end. It's a fundamental architecture decision that affects every aspect of the UI. 

Make privacy visible, understandable, and verifiable. Never hide privacy risks. Always give users control. Build trust through transparency, not just claims.

The best privacy UI is one where users feel secure without thinking about it constantly, but have full visibility and control when they need it.
