# Meteora Nexus - DeFi Analytics Dashboard

A modern, responsive dashboard for exploring and analyzing Meteora DeFi protocol data on Solana. Built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

- **Real-time Analytics**: Dynamic charts and metrics for TVL, volume, and pool performance
- **Pool Explorer**: Comprehensive view of all DLMM pools with filtering and sorting
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Beautiful theme switching with system preference detection
- **Frontend-Only**: No backend required - all data is frontend-generated for demo purposes
- **Performance Optimized**: Built with Turbopack and modern optimization techniques

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Deployment**: Vercel (optimized configuration)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Lesnak1/meteora-nexus.git
cd meteora-nexus
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Development

### Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests
- `npm run test:e2e` - Run Playwright E2E tests

## 📊 Data

This is a demo application that generates realistic but simulated data for Meteora protocol metrics:

- **TVL**: ~$45M total value locked
- **Daily Volume**: ~$8.5M average daily volume
- **Pools**: 156 active pools
- **Top Tokens**: SOL, USDC, USDT, mSOL, RAY, BONK, JUP

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy with zero configuration

The project includes optimized `vercel.json` and `next.config.ts` files for optimal performance.

## 📄 License

This project is licensed under the MIT License.

---

**Note**: This is a demo/portfolio project showcasing modern React and Next.js development practices. It generates simulated data and is not connected to real Meteora protocol APIs.
