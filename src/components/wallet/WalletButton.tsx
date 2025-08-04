'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { Wallet, Copy, ExternalLink } from 'lucide-react';
import { truncateAddress } from '@/lib/utils';
import * as React from 'react';

export function WalletButton() {
  const { publicKey, connected, disconnect } = useWallet();

  if (!connected) {
    return (
      <div className="wallet-button-container" style={{ position: 'relative', zIndex: 999 }}>
        <WalletMultiButton 
          className="wallet-adapter-button !bg-gradient-to-r !from-orange-500 !via-red-500 !to-pink-500 !text-white !font-semibold !rounded-xl !px-6 !py-3 !text-sm !border-0 hover:!from-orange-600 hover:!via-red-600 hover:!to-pink-600 !transition-all !duration-200 !shadow-lg hover:!shadow-xl !relative !z-50 !min-w-[140px] hover:!scale-105"
          data-testid="wallet-button"
        />
      </div>
    );
  }

  const handleCopyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
    }
  };

  const handleViewOnExplorer = () => {
    if (publicKey) {
      window.open(`https://solscan.io/account/${publicKey.toString()}`, '_blank');
    }
  };

  return (
    <div className="wallet-button-container flex items-center gap-2" style={{ position: 'relative', zIndex: 999 }}>
      <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-900/20 dark:to-pink-900/20 border border-orange-200 dark:border-orange-800 rounded-xl px-4 py-2 shadow-sm">
        <Wallet className="w-4 h-4 text-orange-600" />
        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
          {publicKey ? truncateAddress(publicKey.toString()) : 'Not Connected'}
        </span>
        <button
          onClick={handleCopyAddress}
          className="p-1 hover:bg-orange-100 dark:hover:bg-orange-800/30 rounded transition-colors"
          title="Copy Address"
        >
          <Copy className="w-3 h-3 text-orange-600" />
        </button>
        <button
          onClick={handleViewOnExplorer}
          className="p-1 hover:bg-orange-100 dark:hover:bg-orange-800/30 rounded transition-colors"
          title="View on Explorer"
        >
          <ExternalLink className="w-3 h-3 text-orange-600" />
        </button>
      </div>
      <Button
        onClick={disconnect}
        variant="outline"
        size="sm"
        className="!border-red-200 !text-red-600 hover:!bg-red-50 hover:!text-red-700 dark:!border-red-800 dark:!text-red-400 hover:!scale-105 !transition-all"
      >
        Disconnect
      </Button>
    </div>
  );
}