'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { 
  Vault, 
  TrendingUp, 
  Shield, 
  Zap,
  DollarSign,
  RefreshCw,
  ExternalLink,
  ArrowUpRight,
  ArrowDownRight,
  Timer,
  Target
} from 'lucide-react';

interface DynamicVault {
  name: string;
  address: string;
  tvl: number;
  apy: number;
  change24h: number;
  strategy: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  underlyingToken: {
    symbol: string;
    decimals: number;
    logoUri: string;
  };
  protocols: string[];
  lastRebalance: string;
}

export default function VaultsPage() {
  const [vaults, setVaults] = useState<DynamicVault[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');

  useEffect(() => {
    fetchVaults();
  }, []);

  const fetchVaults = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/meteora/vaults');
      if (response.ok) {
        const data = await response.json();
        setVaults(data);
      }
    } catch (error) {
      console.error('Error fetching vaults:', error);
      // Fallback data
      setVaults([
        {
          name: 'SOL High Yield Vault',
          address: 'So11111111111111111111111111111111111111112',
          tvl: 125600000,
          apy: 12.8,
          change24h: 1.4,
          strategy: 'Multi-Protocol Lending',
          riskLevel: 'Medium',
          underlyingToken: { symbol: 'SOL', decimals: 9, logoUri: '/tokens/sol.svg' },
          protocols: ['Kamino', 'Marginfi', 'Solend'],
          lastRebalance: '2 hours ago'
        },
        {
          name: 'USDC Stable Vault',
          address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
          tvl: 89400000,
          apy: 8.2,
          change24h: 0.3,
          strategy: 'Stable Lending',
          riskLevel: 'Low',
          underlyingToken: { symbol: 'USDC', decimals: 6, logoUri: '/tokens/usdc.svg' },
          protocols: ['Kamino', 'Marginfi'],
          lastRebalance: '1 hour ago'
        },
        {
          name: 'mSOL Dynamic Vault',
          address: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So',
          tvl: 67200000,
          apy: 14.6,
          change24h: 2.1,
          strategy: 'Liquid Staking + Lending',
          riskLevel: 'Medium',
          underlyingToken: { symbol: 'mSOL', decimals: 9, logoUri: '/tokens/msol.svg' },
          protocols: ['Kamino', 'Marginfi', 'Solend'],
          lastRebalance: '30 minutes ago'
        },
        {
          name: 'JUP Aggressive Vault',
          address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
          tvl: 23800000,
          apy: 28.4,
          change24h: -1.8,
          strategy: 'DeFi Yield Farming',
          riskLevel: 'High',
          underlyingToken: { symbol: 'JUP', decimals: 6, logoUri: '/tokens/jup.svg' },
          protocols: ['Kamino', 'Orca', 'Raydium'],
          lastRebalance: '15 minutes ago'
        },
        {
          name: 'USDT Conservative Vault',
          address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
          tvl: 54700000,
          apy: 7.9,
          change24h: 0.1,
          strategy: 'Conservative Lending',
          riskLevel: 'Low',
          underlyingToken: { symbol: 'USDT', decimals: 6, logoUri: '/tokens/usdt.svg' },
          protocols: ['Kamino', 'Marginfi'],
          lastRebalance: '45 minutes ago'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredVaults = vaults.filter(vault => {
    const matchesSearch = vault.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vault.underlyingToken.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = selectedRisk === 'All' || vault.riskLevel === selectedRisk;
    return matchesSearch && matchesRisk;
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
    }
  };

  const totalTVL = vaults.reduce((sum, vault) => sum + vault.tvl, 0);
  const averageAPY = vaults.reduce((sum, vault) => sum + vault.apy, 0) / vaults.length || 0;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
          Dynamic Vaults
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Automated yield optimization strategies that rebalance across lending protocols for maximum returns
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vaults</CardTitle>
            <Vault className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vaults.length}</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Active dynamic vaults</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total TVL</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalTVL)}</div>
            <p className="text-xs text-green-600">+3.2% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average APY</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageAPY.toFixed(1)}%</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Across all vaults</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protocols</CardTitle>
            <Shield className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8+</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Integrated protocols</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search vaults..."
                className="w-full pl-4 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Risk Levels</option>
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
              </select>
              <Button variant="outline" size="sm" onClick={() => fetchVaults()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vaults Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-slate-600 dark:text-slate-400">Loading vaults...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredVaults.map((vault) => (
            <Card key={vault.address} className="hover:scale-105 transition-all duration-200 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {vault.underlyingToken.symbol[0]}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{vault.name}</CardTitle>
                      <CardDescription>{vault.strategy}</CardDescription>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(vault.riskLevel)}`}>
                    {vault.riskLevel} Risk
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">TVL</div>
                      <div className="font-semibold">{formatCurrency(vault.tvl)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">APY</div>
                      <div className="font-semibold text-green-600">{vault.apy.toFixed(1)}%</div>
                    </div>
                  </div>

                  {/* 24h Change */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">24h Change</span>
                    <div className={`flex items-center font-medium ${
                      vault.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {vault.change24h >= 0 ? 
                        <ArrowUpRight className="w-4 h-4 mr-1" /> : 
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                      }
                      {vault.change24h >= 0 ? '+' : ''}{vault.change24h}%
                    </div>
                  </div>

                  {/* Protocols */}
                  <div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Protocols</div>
                    <div className="flex flex-wrap gap-1">
                      {vault.protocols.map((protocol) => (
                        <span
                          key={protocol}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs rounded-full"
                        >
                          {protocol}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Last Rebalance */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Timer className="w-4 h-4" />
                      Last rebalance: {vault.lastRebalance}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="meteora" className="flex-1">
                      <Target className="w-4 h-4 mr-2" />
                      Deposit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`https://solscan.io/account/${vault.address}`, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Information Section */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            How Dynamic Vaults Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Automated Optimization</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Vaults continuously monitor yield opportunities across multiple lending protocols and automatically rebalance to maximize returns.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Risk Management</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Each vault implements sophisticated risk management strategies, diversifying across protocols to minimize exposure.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Compound Returns</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                All yields are automatically compounded, allowing your investments to grow exponentially over time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}