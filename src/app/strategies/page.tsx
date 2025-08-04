'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Target,
  Users,
  Copy,
  Eye,
  Play,
  Settings,
  Trophy,
  BookOpen
} from 'lucide-react';

interface Strategy {
  id: string;
  name: string;
  description: string;
  creator: string;
  category: 'Conservative' | 'Balanced' | 'Aggressive' | 'Custom';
  riskLevel: 'Low' | 'Medium' | 'High';
  performance: {
    totalReturn: number;
    apy: number;
    sharpeRatio: number;
    maxDrawdown: number;
    winRate: number;
  };
  allocation: Array<{
    pool: string;
    percentage: number;
    currentAPY: number;
  }>;
  followers: number;
  totalValue: number;
  minInvestment: number;
  isActive: boolean;
  timeframe: string;
  tags: string[];
}

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'performance' | 'followers' | 'totalValue'>('performance');

  useEffect(() => {
    fetchStrategies();
  }, []);

  const fetchStrategies = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/meteora/strategies');
      if (response.ok) {
        const data = await response.json();
        setStrategies(data);
      }
    } catch (error) {
      console.error('Error fetching strategies:', error);
      // Fallback data
      setStrategies([
        {
          id: '1',
          name: 'Stable Yield Maximizer',
          description: 'Conservative strategy focusing on stable coin pools with automatic rebalancing to capture the best yields while minimizing impermanent loss.',
          creator: 'YieldMaster',
          category: 'Conservative',
          riskLevel: 'Low',
          performance: {
            totalReturn: 18.4,
            apy: 12.8,
            sharpeRatio: 2.1,
            maxDrawdown: -3.2,
            winRate: 87
          },
          allocation: [
            { pool: 'USDC-USDT', percentage: 40, currentAPY: 8.9 },
            { pool: 'USDC Dynamic Vault', percentage: 35, currentAPY: 9.2 },
            { pool: 'USDT Dynamic Vault', percentage: 25, currentAPY: 8.1 }
          ],
          followers: 2847,
          totalValue: 15600000,
          minInvestment: 100,
          isActive: true,
          timeframe: '6 months',
          tags: ['Stable', 'Low Risk', 'Consistent']
        },
        {
          id: '2',
          name: 'SOL Ecosystem Alpha',
          description: 'Aggressive strategy capitalizing on Solana native tokens with dynamic allocation based on market momentum and technical indicators.',
          creator: 'SolanaWhale',
          category: 'Aggressive',
          riskLevel: 'High',
          performance: {
            totalReturn: 147.3,
            apy: 68.4,
            sharpeRatio: 1.8,
            maxDrawdown: -28.6,
            winRate: 73
          },
          allocation: [
            { pool: 'SOL-USDC', percentage: 30, currentAPY: 18.4 },
            { pool: 'JUP-SOL', percentage: 25, currentAPY: 24.1 },
            { pool: 'WIF-SOL', percentage: 20, currentAPY: 31.5 },
            { pool: 'SOL Dynamic Vault', percentage: 25, currentAPY: 12.8 }
          ],
          followers: 1923,
          totalValue: 8700000,
          minInvestment: 500,
          isActive: true,
          timeframe: '3 months',
          tags: ['High Yield', 'SOL Native', 'Momentum']
        },
        {
          id: '3',
          name: 'DeFi Blue Chip Balanced',
          description: 'Balanced approach combining established DeFi tokens with emerging opportunities, optimized for risk-adjusted returns.',
          creator: 'DeFiPro',
          category: 'Balanced',
          riskLevel: 'Medium',
          performance: {
            totalReturn: 42.1,
            apy: 28.7,
            sharpeRatio: 2.3,
            maxDrawdown: -12.4,
            winRate: 81
          },
          allocation: [
            { pool: 'SOL-USDC', percentage: 25, currentAPY: 18.4 },
            { pool: 'mSOL-SOL', percentage: 20, currentAPY: 15.7 },
            { pool: 'USDC-USDT', percentage: 20, currentAPY: 8.9 },
            { pool: 'JUP-SOL', percentage: 15, currentAPY: 24.1 },
            { pool: 'Mixed Dynamic Vaults', percentage: 20, currentAPY: 11.3 }
          ],
          followers: 4156,
          totalValue: 23400000,
          minInvestment: 250,
          isActive: true,
          timeframe: '8 months',
          tags: ['Balanced', 'Diversified', 'Blue Chip']
        },
        {
          id: '4',
          name: 'AI-Powered Momentum',
          description: 'Machine learning algorithm that analyzes market trends, volume patterns, and social sentiment to optimize pool allocation in real-time.',
          creator: 'AITrader',
          category: 'Custom',
          riskLevel: 'Medium',
          performance: {
            totalReturn: 89.6,
            apy: 45.2,
            sharpeRatio: 2.0,
            maxDrawdown: -18.3,
            winRate: 76
          },
          allocation: [
            { pool: 'Dynamic Allocation', percentage: 100, currentAPY: 45.2 }
          ],
          followers: 3241,
          totalValue: 11800000,
          minInvestment: 1000,
          isActive: true,
          timeframe: '4 months',
          tags: ['AI Powered', 'Dynamic', 'Momentum']
        },
        {
          id: '5',
          name: 'Meme Coin Hunter',
          description: 'High-risk, high-reward strategy focusing on emerging meme coins with strong community backing and early adoption indicators.',
          creator: 'MemeKing',
          category: 'Aggressive',
          riskLevel: 'High',
          performance: {
            totalReturn: 234.7,
            apy: 156.3,
            sharpeRatio: 1.4,
            maxDrawdown: -45.2,
            winRate: 62
          },
          allocation: [
            { pool: 'WIF-SOL', percentage: 30, currentAPY: 31.5 },
            { pool: 'BONK-SOL', percentage: 25, currentAPY: 67.8 },
            { pool: 'PEPE-SOL', percentage: 20, currentAPY: 124.3 },
            { pool: 'Meme Launch Pools', percentage: 25, currentAPY: 287.6 }
          ],
          followers: 1567,
          totalValue: 4200000,
          minInvestment: 100,
          isActive: true,
          timeframe: '2 months',
          tags: ['Meme Coins', 'High Risk', 'Viral']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredStrategies = strategies.filter(strategy => {
    const matchesCategory = selectedCategory === 'All' || strategy.category === selectedCategory;
    const matchesRisk = selectedRisk === 'All' || strategy.riskLevel === selectedRisk;
    return matchesCategory && matchesRisk;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'performance':
        return b.performance.totalReturn - a.performance.totalReturn;
      case 'followers':
        return b.followers - a.followers;
      case 'totalValue':
        return b.totalValue - a.totalValue;
      default:
        return 0;
    }
  });

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Conservative': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'Balanced': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'Aggressive': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      case 'Custom': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
          AI-Powered Strategies
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Follow proven strategies from top performers or create your own using AI-powered optimization
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Strategies</CardTitle>
            <Brain className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{strategies.length}</div>
            <p className="text-xs text-purple-600">AI-optimized</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(strategies.reduce((sum, s) => sum + s.totalValue, 0))}
            </div>
            <p className="text-xs text-green-600">Under management</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(strategies.reduce((sum, s) => sum + s.performance.totalReturn, 0) / strategies.length || 0).toFixed(1)}%
            </div>
            <p className="text-xs text-blue-600">Total return</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(strategies.reduce((sum, s) => sum + s.followers, 0), 0)}
            </div>
            <p className="text-xs text-orange-600">Strategy followers</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Categories</option>
                <option value="Conservative">Conservative</option>
                <option value="Balanced">Balanced</option>
                <option value="Aggressive">Aggressive</option>
                <option value="Custom">Custom</option>
              </select>
              
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

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'performance' | 'followers' | 'totalValue')}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="performance">Sort by Performance</option>
                <option value="followers">Sort by Followers</option>
                <option value="totalValue">Sort by AUM</option>
              </select>
            </div>

            <Button variant="meteora">
              <Brain className="w-4 h-4 mr-2" />
              Create AI Strategy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Strategies Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-slate-600 dark:text-slate-400">Loading strategies...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredStrategies.map((strategy) => (
            <Card key={strategy.id} className="hover:scale-[1.02] transition-all duration-200 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-2xl">{strategy.name}</CardTitle>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(strategy.category)}`}>
                        {strategy.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(strategy.riskLevel)}`}>
                        {strategy.riskLevel} Risk
                      </span>
                      {strategy.performance.totalReturn > 50 && (
                        <Trophy className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                      <span>by {strategy.creator}</span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {formatNumber(strategy.followers, 0)} followers
                      </span>
                      <span>Min: ${formatNumber(strategy.minInvestment)}</span>
                      <span>Timeframe: {strategy.timeframe}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">{strategy.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {strategy.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      +{strategy.performance.totalReturn.toFixed(1)}%
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      Total Return
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">APY</div>
                      <div className="font-semibold text-green-600">{strategy.performance.apy.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Sharpe Ratio</div>
                      <div className="font-semibold">{strategy.performance.sharpeRatio.toFixed(1)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Max Drawdown</div>
                      <div className="font-semibold text-red-600">{strategy.performance.maxDrawdown.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Win Rate</div>
                      <div className="font-semibold">{strategy.performance.winRate}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">AUM</div>
                      <div className="font-semibold">{formatCurrency(strategy.totalValue)}</div>
                    </div>
                  </div>

                  {/* Allocation */}
                  <div>
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">Current Allocation</div>
                    <div className="space-y-2">
                      {strategy.allocation.map((alloc, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{alloc.pool}</span>
                              <span className="text-sm text-slate-600 dark:text-slate-400">
                                {alloc.percentage}% • {alloc.currentAPY.toFixed(1)}% APY
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1">
                              <div 
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full"
                                style={{ width: `${alloc.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button variant="meteora" className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Follow Strategy
                    </Button>
                    <Button variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Analyze
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* How It Works */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            How AI-Powered Strategies Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Advanced machine learning algorithms analyze market data, pool performance, and risk metrics to optimize allocations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Auto-Rebalancing</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Strategies automatically rebalance based on market conditions and performance targets to maintain optimal risk-return profiles.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Risk Management</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Built-in risk controls including stop-losses, position limits, and diversification rules protect your capital.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}