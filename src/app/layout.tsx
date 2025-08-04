import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CustomWalletProvider } from "@/components/wallet/WalletProvider";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { PerformanceMonitor } from "@/components/analytics/PerformanceMonitor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meteora Nexus - DeFi Intelligence Platform",
  description: "The ultimate DeFi intelligence platform for Meteora ecosystem. Advanced analytics, AI-powered strategies, and seamless portfolio management on Solana.",
  keywords: "Meteora, Solana, DeFi, DLMM, Dynamic Vaults, Crypto, Portfolio Management, Analytics",
  authors: [{ name: "Lesnak1", url: "https://github.com/Lesnak1" }],
  creator: "Lesnak1",
  openGraph: {
    title: "Meteora Nexus - DeFi Intelligence Platform",
    description: "Advanced DeFi analytics and portfolio management for Meteora ecosystem",
    url: "https://meteora-nexus.vercel.app",
    siteName: "Meteora Nexus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meteora Nexus - DeFi Intelligence Platform",
    description: "Advanced DeFi analytics and portfolio management for Meteora ecosystem",
    creator: "@MeteoraAG",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://meteora.ag" />
        <link rel="preconnect" href="https://api.mainnet-beta.solana.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen cursor-none`}
      >
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        <ErrorBoundary>
          <ThemeProvider>
            <AnalyticsProvider>
              <CustomCursor />
              <CustomWalletProvider>
                <div className="layout-stable">
                  <Header />
                  <main id="main-content" className="content-wrapper" role="main">
                    <ErrorBoundary>
                      {children}
                    </ErrorBoundary>
                  </main>
                  <Footer />
                </div>
              </CustomWalletProvider>
              <PerformanceMonitor />
            </AnalyticsProvider>
          </ThemeProvider>
        </ErrorBoundary>

        {/* Accessibility announcements */}
        <div
          id="aria-live-region"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        />
      </body>
    </html>
  );
}
