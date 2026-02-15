---
name: estate-planning-ui
description: Design emotionally intelligent interfaces for estate planning, will creation, inheritance management, and sensitive financial applications. Use this skill when building applications involving wills, trusts, beneficiary management, legacy planning, end-of-life decisions, or any interface dealing with mortality, inheritance, or generational wealth transfer. Emphasizes emotional sensitivity, legal clarity, and security.
---

# Estate Planning & Inheritance UI Design

This skill guides the creation of respectful, professional, and emotionally intelligent user interfaces for estate planning applications. These interfaces require special attention to tone, security, and the sensitive nature of end-of-life planning.

## Core Philosophy: Emotional Intelligence in Design

### The Context
Estate planning involves thinking about death, family dynamics, and financial legacy. Users are often:
- Anxious about mortality
- Concerned about family conflicts
- Worried about legal validity
- Protective of privacy
- Seeking peace of mind

### Design Tone Guidelines

**DO:**
- Be professional but warm
- Use empowering language ("secure your legacy", "protect your loved ones")
- Acknowledge the importance of the task
- Provide reassurance and support
- Show respect for the gravity of estate planning
- Use clear, plain language

**DON'T:**
- Use somber or morbid imagery/language
- Be overly casual or flippant
- Rush users through important decisions
- Use dark humor or irreverent tone
- Display death-related imagery (skulls, tombstones, etc.)
- Use alarming or fear-based messaging

### Vocabulary Guide

**Prefer:**
- "Estate planning" over "death planning"
- "Legacy" over "inheritance"
- "Beneficiaries" over "heirs"
- "Secure" over "protect against death"
- "When the time comes" over "when you die"
- "Your wishes" over "final wishes"
- "Peace of mind" over "worry-free death"

**Avoid:**
- "Death", "dying", "deceased" in headlines
- "Last will and testament" → "Will" or "Estate plan"
- Overly legal language without explanation
- Medical terminology
- Religious assumptions

## Visual Design System for Estate Planning

### Color Psychology

**Primary Palette:**
- **Trust Blue**: #2E75B6 - Reliability, professionalism
- **Sage Green**: #10B981 - Growth, life, security
- **Warm Gray**: #6C757D - Neutrality, professionalism
- **Soft White**: #FAFAFA - Clean, peaceful

**Accent Colors:**
- **Gold**: #D4AF37 - Legacy, value (use sparingly)
- **Deep Navy**: #1E3A8A - Authority, trust (for legal sections)

**Avoid:**
- Black or very dark colors as primary
- Red (except for critical warnings)
- Stark white/black contrast
- Neon or harsh colors

### Typography for Readability and Authority

Estate planning documents require excellent readability and convey authority:

```css
/* Primary Font - Authoritative but Approachable */
font-family: 'Georgia', 'Times New Roman', serif; /* For legal sections */
font-family: 'Inter', 'SF Pro', system-ui, sans-serif; /* For UI */

/* Hierarchy */
H1: 32px / 600 semibold / 1.3 line-height
H2: 24px / 600 semibold / 1.4
H3: 20px / 600 semibold / 1.4
Body: 16px / 400 regular / 1.7 (increased for comfort)
Legal: 14px / 400 regular / 1.8 (extra readable)
```

**Key Principle**: Favor readability over style. Users need to understand legal implications.

### Imagery and Iconography

**Use:**
- Family silhouettes (abstract, warm)
- Home illustrations
- Document/scroll icons
- Shield icons (security, protection)
- Tree icons (family tree, legacy)
- Hand holding icons (care, support)
- Checkmark icons (completion, confirmation)

**Avoid:**
- Stock photos of sad families
- Medical imagery
- Funeral-related imagery
- Aggressive or threatening visuals
- Overly corporate stock photos

## User Personas

### Primary: The Testator (Will Creator)

**Demographics:**
- Age: 45-75
- Tech Savvy: Low to Moderate
- Motivation: Ensure family is provided for
- Concerns: Legal validity, privacy, family disputes

**Needs:**
- Step-by-step guidance
- Legal reassurance (but not legal advice)
- Privacy guarantees
- Ability to make changes later
- Clear explanation of consequences

**UI Requirements:**
- Large, readable text
- Clear progress indicators
- Save and return functionality
- Confirmation at each step
- Access to help/support

### Secondary: The Beneficiary

**Demographics:**
- Age: 25-65
- Tech Savvy: Moderate to High
- Motivation: Understand what they're entitled to
- Concerns: When can they claim? Is this legitimate?

**Needs:**
- Clear notification of their status
- Transparency about the process
- Easy claim procedure
- Verification of authenticity
- Timeline expectations

### Tertiary: The Executor (Future Feature)

**Demographics:**
- Age: 35-70
- Tech Savvy: Moderate
- Motivation: Fulfill their duty properly
- Concerns: Legal responsibilities, fairness

**Needs:**
- Clear instructions
- Verification tools
- Communication with beneficiaries
- Legal protection
- Step-by-step execution guide

## Information Architecture

### Landing Page Structure

```
┌────────────────────────────────────────────┐
│ Header: Logo + "Start Planning" CTA       │
├────────────────────────────────────────────┤
│                                            │
│ HERO: "Secure Your Legacy"                │
│ Subhead: Clear, simple explanation        │
│ [Get Started] [Learn More]                │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│ HOW IT WORKS (3 Steps)                     │
│ ① Create → ② Designate → ③ Secure        │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│ BENEFITS                                   │
│ 🛡️ Privacy  ⚡ Simple  ✓ Secure          │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│ TESTIMONIALS (If available)               │
│                                            │
├────────────────────────────────────────────┤
│                                            │
│ LEGAL DISCLAIMER (Clear, accessible)      │
│                                            │
├────────────────────────────────────────────┤
│ Footer: FAQ + Support + Terms             │
└────────────────────────────────────────────┘
```

### Will Creation Flow

**Critical: Progressive disclosure with clear checkpoints**

```
Step 1: Introduction
├─ What is an estate plan?
├─ What this tool does (and doesn't do)
├─ Legal disclaimer
└─ [Start Creating]

Step 2: Basic Information
├─ Your name
├─ Location (affects legal requirements)
├─ Purpose of this will
└─ [Continue]

Step 3: Designate Beneficiaries
├─ Add beneficiary (name + contact)
├─ Assign assets/percentages
├─ Set conditions (optional)
└─ [Add Another] [Continue]

Step 4: Review
├─ Summary of all information
├─ Edit option for each section
├─ Final disclaimer
└─ [Confirm & Create]

Step 5: Security
├─ Set access method
├─ Backup options
├─ Execution trigger setup
└─ [Finalize]

Step 6: Completion
├─ Confirmation message
├─ Next steps
├─ Download/print option
└─ [Go to Dashboard]
```

## Component Patterns

### Disclaimer Modal (Required Before Creation)

```
╔═══════════════════════════════════════════════╗
║  Important Legal Information                  ║
║                                               ║
║  This tool helps you create an estate plan,  ║
║  but it is NOT a substitute for legal advice.║
║                                               ║
║  We recommend:                                ║
║  ✓ Consulting with an estate attorney        ║
║  ✓ Understanding local laws                  ║
║  ✓ Reviewing with qualified professionals    ║
║                                               ║
║  By continuing, you acknowledge:             ║
║  • This is an informational tool             ║
║  • You are responsible for legal compliance  ║
║  • No attorney-client relationship is formed ║
║                                               ║
║  □ I understand and wish to continue         ║
║                                               ║
║  [Go Back]  [I Understand]                   ║
╚═══════════════════════════════════════════════╝
```

**Requirements:**
- Must appear before any will creation
- Cannot be dismissed without accepting
- Checkbox required to enable continue
- "Go Back" should be equally prominent
- Store acceptance with timestamp

### Beneficiary Card

```
┌─────────────────────────────────────────┐
│ 👤 Sarah Johnson                        │
│                                         │
│ Relationship: Daughter                  │
│ Contact: sarah@email.com                │
│ Allocation: $50,000 (40%)               │
│                                         │
│ Conditions: None                        │
│                                         │
│ [Edit] [Remove]                         │
└─────────────────────────────────────────┘
```

**Features:**
- Clear visual hierarchy
- Avatar or icon for personalization
- Percentage and absolute amount
- Edit and remove options
- Confirmation before removing

### Progress Indicator (Multi-Step Form)

```
① Basic Info → ② Beneficiaries → ③ Assets → ④ Review → ⑤ Complete
   [✓]            [Current]        [ • ]      [ • ]      [ • ]
```

**Implementation:**
- Show all steps at once
- Highlight current step
- Show completed steps with checkmark
- Allow clicking previous steps to edit
- Disable future steps until prerequisites met

### Security Confirmation Modal

```
╔═══════════════════════════════════════════════╗
║  🛡️ Secure Your Will                          ║
║                                               ║
║  Your will contains sensitive information.   ║
║  How would you like to secure it?            ║
║                                               ║
║  ○ Password Protection                       ║
║    Encrypt with a password you create        ║
║                                               ║
║  ○ Multi-Signature                           ║
║    Require multiple approvals to access      ║
║                                               ║
║  ○ Time-Lock                                 ║
║    Automatically accessible after a date     ║
║                                               ║
║  [Learn More] [Continue]                     ║
╚═══════════════════════════════════════════════╝
```

### Asset Allocation Interface

**Visual representation of distribution:**

```
┌─────────────────────────────────────────┐
│ Total Estate Value: $500,000            │
│                                         │
│ ████████████░░░░░░░░░░░░ 50% Sarah     │
│ ████████░░░░░░░░░░░░░░░░ 30% Michael   │
│ ████░░░░░░░░░░░░░░░░░░░░ 20% Charity   │
│                                         │
│ ✓ All assets allocated                 │
└─────────────────────────────────────────┘
```

**Features:**
- Visual bar chart
- Percentages and amounts
- Validation (must add up to 100%)
- Color-coded beneficiaries
- Clear indicators for over/under allocation

### Execution Warning (Critical Action)

```
╔═══════════════════════════════════════════════╗
║  ⚠️ IMPORTANT: Execute Your Will              ║
║                                               ║
║  You are about to execute your will.         ║
║  This is a significant action that:          ║
║                                               ║
║  • Makes your will legally binding           ║
║  • Allows beneficiaries to be notified       ║
║  • Cannot be easily reversed                 ║
║                                               ║
║  Before executing, please ensure:            ║
║  ✓ All information is accurate               ║
║  ✓ All beneficiaries are correct             ║
║  ✓ Asset allocations are final               ║
║  ✓ You've consulted legal counsel (recommended)║
║                                               ║
║  □ I have reviewed everything carefully      ║
║  □ I understand this action's consequences   ║
║                                               ║
║  [Cancel]  [Execute Will]                    ║
╚═══════════════════════════════════════════════╝
```

**Special requirements:**
- Multiple checkboxes required
- 10-second countdown before button enabled
- Very clear warning styling
- Secondary "Cancel" button prominent
- Confirmation message after execution

## Privacy and Security Displays

### Privacy Dashboard Card

```
┌─────────────────────────────────────────┐
│ 🛡️ Privacy Status                       │
│                                         │
│ Your Information:                       │
│ • Personal details: 🔒 Encrypted       │
│ • Beneficiary data: 🔒 Encrypted       │
│ • Asset amounts: 🔒 Private            │
│ • Will existence: 🌐 Public            │
│                                         │
│ [View Privacy Details]                 │
└─────────────────────────────────────────┘
```

### Access Control Display

```
┌─────────────────────────────────────────┐
│ 🔐 Who Can Access Your Will             │
│                                         │
│ ✓ You (Creator)                         │
│ ✓ Designated Executor (after execution)│
│ ✓ Beneficiaries (partial, after execution)│
│ ✗ Public                                │
│                                         │
│ [Manage Access]                         │
└─────────────────────────────────────────┘
```

## Beneficiary Experience

### Notification Design

**Email/SMS to Beneficiary:**

```
Subject: You've Been Named in an Estate Plan

Dear [Name],

You have been designated as a beneficiary in an estate 
plan created through [Platform Name].

What this means:
• You may be entitled to assets or property
• You will be notified when the will is executed
• No action is required from you at this time

Your privacy is protected:
• Your information is encrypted
• You control your notification preferences
• You can verify this is legitimate at [link]

If you have questions, please visit [support link]

[View Details]
```

**Key principles:**
- Clear subject line
- No alarming language
- Explain what it means
- No action required yet
- Privacy reassurance
- Verification option

### Claim Interface for Beneficiaries

```
┌─────────────────────────────────────────┐
│ Your Inheritance Status                 │
│                                         │
│ From: John Smith's Estate               │
│ Status: ✓ Ready to Claim                │
│ Amount: $50,000                         │
│                                         │
│ What happens next:                      │
│ 1. Review the allocation details        │
│ 2. Verify your identity                 │
│ 3. Sign to claim your inheritance       │
│                                         │
│ This process typically takes 5-10 minutes│
│                                         │
│ [Review Details] [Start Claim Process] │
└─────────────────────────────────────────┘
```

## FAQ Section (Essential)

Estate planning raises many questions. Provide comprehensive FAQ:

```
Common Questions:

Q: Is this legally binding?
A: Our platform helps you create estate planning documents. 
   Legal validity depends on your jurisdiction. We recommend 
   consulting with a qualified estate attorney.

Q: Can I change my will later?
A: Yes, you can modify your will anytime before execution. 
   After execution, changes require creating a new version.

Q: What happens to my data?
A: All sensitive information is encrypted. We cannot access 
   your beneficiary details or asset allocations.

Q: When will my beneficiaries be notified?
A: Beneficiaries are only notified after you execute your will 
   or when an authorized executor triggers notification.

Q: What if I lose access?
A: [Explain recovery process]

Q: How do beneficiaries claim their inheritance?
A: [Explain claim process]
```

## Error Prevention and Guidance

### Common Mistakes to Prevent

**Incomplete Information:**
```
⚠️ Before continuing, please review:
• All beneficiaries have contact information
• Asset allocations total 100%
• Required fields are complete
```

**Conflicting Instructions:**
```
⚠️ Potential Conflict Detected
Asset "Family Home" is allocated to both Sarah and Michael.
Please clarify how this asset should be divided.
[Edit Allocation]
```

**Legal Requirements Not Met:**
```
⚠️ Legal Requirement
In your state (California), wills require two witnesses.
Please ensure you have this arranged before execution.
[Learn More] [I Understand]
```

## Microcopy Examples

**Button Labels:**
- "Start Planning" (not "Create Will")
- "Add Beneficiary" (not "Add Heir")
- "Review My Plan" (not "Review Will")
- "Secure & Save" (not "Submit")
- "Update My Plan" (not "Edit Will")

**Status Messages:**
- "Your plan is secure" ✓
- "Beneficiaries can now claim" ✓
- "Changes saved successfully" ✓

**Help Text:**
- "We'll guide you through each step"
- "Take your time - you can save and return anytime"
- "Your information is private and secure"

## Accessibility for Older Users

**Special Considerations:**
- Larger default font size (16px minimum)
- High contrast (WCAG AAA where possible)
- Simple navigation
- No time limits on forms
- Clear visual hierarchy
- Avoid complex animations
- Provide print option
- Phone support prominently displayed
- Video tutorials with captions

## Testing Checklist

Before launch:
- [ ] All legal disclaimers present and clear
- [ ] Confirmation required for critical actions
- [ ] Privacy settings work correctly
- [ ] Beneficiary notifications accurate
- [ ] Save and resume functionality works
- [ ] Print/download generates correct format
- [ ] Accessible to users with disabilities
- [ ] Mobile-friendly for all key flows
- [ ] Error messages are helpful, not alarming
- [ ] FAQ addresses common concerns
- [ ] Support contact is prominent
- [ ] Legal review completed (if applicable)

## Red Flags to Avoid

**Never:**
- Make medical assumptions
- Offer tax or legal advice
- Assume family structure
- Use fear-based marketing
- Show countdown timers ("Act now!")
- Display user counts or urgency tactics
- Oversimplify complex legal matters
- Promise outcomes you can't guarantee
- Ignore jurisdiction differences

## Remember

You are helping people with one of the most important and emotionally charged tasks of their life. Every word, color, and interaction should reflect respect, professionalism, and care. The interface should provide confidence and peace of mind, not anxiety or confusion.

Design with empathy, test with real users in the demographic, and always prioritize clarity and security over clever features.
