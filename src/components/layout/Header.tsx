'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletButton } from '@/components/wallet/WalletButton';
import { Button } from '@/components/ui/button';
import { NAVIGATION } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Waves,
  Vault,
  Rocket,
  TrendingUp,
  BrainCircuit,
  Menu,
  X
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useState } from 'react';

const iconMap = {
  'layout-dashboard': LayoutDashboard,
  'waves': Waves,
  'vault': Vault,
  'rocket': Rocket,
  'trending-up': TrendingUp,
  'brain-circuit': BrainCircuit,
};

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-200/30 bg-white/70 backdrop-blur-xl dark:border-orange-800/30 dark:bg-slate-950/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-400 border-2 border-white animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                Meteora Nexus
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 -mt-1">DeFi Intelligence</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {NAVIGATION.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                      : "text-slate-600 hover:text-orange-600 hover:bg-orange-50 dark:text-slate-400 dark:hover:text-orange-400 dark:hover:bg-orange-950/20"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle & Wallet Button */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <div className="hidden sm:block">
              <WalletButton />
            </div>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-button"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-4" data-testid="mobile-menu">
            <nav className="flex flex-col space-y-2">
              {NAVIGATION.map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                        : "text-slate-600 hover:text-orange-600 hover:bg-orange-50 dark:text-slate-400 dark:hover:text-orange-400 dark:hover:bg-orange-950/20"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col space-y-3">
              <ThemeToggle />
              <WalletButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}