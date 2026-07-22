# Solas (Powered by Sera Protocol)

Solas is a modern, high-speed payment platform built on the **Sera Protocol**. It serves as a global instant settlement layer that enables true instant P2P payments, frictionless creator tipping links, and real-time payouts for gig workers using stablecoins (USDC).

With sub-second settlement times (< 1.2s) and incredibly low fees (< $0.01), Solas eliminates the friction of traditional banking (no banking hours, no correspondent banks, no hidden spreads).

## 🚀 Key Features

### 1. Instant Global P2P Transfers
Send money anywhere in the world instantly. Settle in stablecoins like USDC with zero friction. Whether you're paying a friend or a contractor across the globe, the funds arrive in under a second.

### 2. Creator Links & `.sera` Usernames
Creators can claim a unique `.sera` username (e.g., `@alex`) to simplify getting paid. Share a simple `solas.app/@name` link to receive tips instantly directly into your wallet. The platform tracks your total earnings, supporters, and link views.

### 3. Gig Worker Quick Payouts
Integrate Solas to pay your global workforce the second the job is done. Say goodbye to waiting 3-5 business days for an ACH transfer.

### 4. Interactive Dashboard
A comprehensive dashboard that allows you to:
- Connect your Web3 wallet (e.g., MetaMask).
- View your available balance and transaction history in real-time.
- Create, manage, and share payment links (with QR code support).
- Track creator metrics (Earnings, Supporters, Link Views).
- Request payments via QR code or wallet address.

### 5. Developer SDK
Solas provides a seamless developer experience with a fully-typed React SDK (`useSeraPay`). It offers out-of-the-box hooks to initiate instant payments from any frontend without complex smart contract interactions or manual gas estimation.

### 6. Bank-Grade Security
- **Smart Contract Audits:** Audited by top-tier firms.
- **Encrypted Sessions:** Bank-grade TLS 1.3 and AES encryption.
- **DDoS Protection:** Enterprise rate limiting.
- **24/7 Monitoring:** Real-time incident response.

## 💻 Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Web3 Integration:** `ethers.js` & Custom Sera Protocol SDK (`@/lib/sera-sdk`)
- **State Management:** Zustand & React Hooks

## 🛠 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `src/app/page.tsx`: The landing page highlighting the features and SDK.
- `src/app/dashboard/page.tsx`: The main user dashboard for managing funds, links, and profile.
- `src/app/send/page.tsx`: The payment flow interface for sending funds to other users.
- `src/lib/sera-sdk/`: The core SDK providing Web3 connectivity and Sera Protocol network interactions.
