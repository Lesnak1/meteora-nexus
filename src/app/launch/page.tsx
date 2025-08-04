'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatNumber, formatCurrency } from '@/lib/utils';
import { 
  Rocket, 
  Clock, 
  Users, 
  Target,
  Zap,
  Shield,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Timer
} from 'lucide-react';

interface LaunchPool {
  name: string;
  symbol: string;
  address: string;
  description: string;
  totalRaise: number;
  currentRaise: number;
  price: number;
  participants: number;
  startTime: string;
  endTime: string;
  status: 'Upcoming' | 'Live' | 'Ended' | 'Filled';
  category: string;
  website?: string;
  twitter?: string;
  minContribution: number;
  maxContribution: number;
  vestingSchedule: string;
  tokenomics: {
    totalSupply: number;
    publicSale: number;
    team: number;
    ecosystem: number;
  };
}

export default function LaunchPage() {
  const [launches, setLaunches] = useState<LaunchPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  useEffect(() => {
    fetchLaunches();
  }, []);

  const fetchLaunches = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/meteora/launches');
      if (response.ok) {
        const data = await response.json();
        setLaunches(data);
      }
    } catch (error) {
      console.error('Error fetching launches:', error);
      // Fallback data
      setLaunches([
        {
          name: 'SolanaAI',
          symbol: 'SOLAI',
          address: 'SoLaNA1111111111111111111111111111111111111',
          description: 'Revolutionary AI-powered trading platform built on Solana for decentralized autonomous trading strategies.',
          totalRaise: 5000000,
          currentRaise: 3750000,
          price: 0.15,
          participants: 2847,
          startTime: '2025-08-01T12:00:00Z',
          endTime: '2025-08-07T12:00:00Z',
          status: 'Live',
          category: 'AI & Technology',
          website: 'https://solanaai.com',
          twitter: '@SolanaAI',
          minContribution: 100,
          maxContribution: 10000,
          vestingSchedule: '25% TGE, 75% over 6 months',
          tokenomics: {
            totalSupply: 1000000000,
            publicSale: 20,
            team: 15,
            ecosystem: 40
          }
        },
        {
          name: 'DeFiGuard',
          symbol: 'GUARD',
          address: 'DeFi1111111111111111111111111111111111111111',
          description: 'Advanced security protocol providing insurance and protection for DeFi investments on Solana.',
          totalRaise: 3000000,
          currentRaise: 3000000,
          price: 0.08,
          participants: 1926,
          startTime: '2025-07-25T10:00:00Z',
          endTime: '2025-07-30T10:00:00Z',
          status: 'Filled',
          category: 'DeFi Security',
          website: 'https://defiguard.io',
          twitter: '@DeFiGuard',
          minContribution: 50,
          maxContribution: 5000,
          vestingSchedule: '10% TGE, 90% over 12 months',
          tokenomics: {
            totalSupply: 500000000,
            publicSale: 25,
            team: 20,
            ecosystem: 35
          }
        },
        {
          name: 'GameFi Universe',
          symbol: 'GAME',
          address: 'Game1111111111111111111111111111111111111111',
          description: 'Next-generation gaming metaverse with Play-to-Earn mechanics and NFT integration on Solana.',
          totalRaise: 8000000,
          currentRaise: 1200000,
          price: 0.25,
          participants: 458,
          startTime: '2025-08-05T14:00:00Z',
          endTime: '2025-08-12T14:00:00Z',
          status: 'Upcoming',
          category: 'GameFi',
          website: 'https://gamefi-universe.com',
          twitter: '@GameFiUniverse',
          minContribution: 200,
          maxContribution: 15000,
          vestingSchedule: '20% TGE, 80% over 8 months',
          tokenomics: {
            totalSupply: 2000000000,
            publicSale: 18,
            team: 12,
            ecosystem: 45
          }
        },
        {
          name: 'SolSwap Pro',
          symbol: 'SWAP',
          address: 'Swap1111111111111111111111111111111111111111',
          description: 'Professional-grade DEX aggregator with advanced trading features and MEV protection.',
          totalRaise: 4500000,
          currentRaise: 4500000,
          price: 0.12,
          participants: 3241,
          startTime: '2025-07-20T09:00:00Z',
          endTime: '2025-07-27T09:00:00Z',
          status: 'Ended',
          category: 'DEX & Trading',
          website: 'https://solswap.pro',
          twitter: '@SolSwapPro',
          minContribution: 75,
          maxContribution: 8000,
          vestingSchedule: '30% TGE, 70% over 4 months',
          tokenomics: {
            totalSupply: 750000000,
            publicSale: 22,
            team: 18,
            ecosystem: 38
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'Upcoming': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'Ended': return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
      case 'Filled': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      default: return 'text-slate-600 bg-slate-100 dark:bg-slate-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Live': return <Zap className="w-4 h-4" />;
      case 'Upcoming': return <Clock className="w-4 h-4" />;
      case 'Ended': return <CheckCircle className="w-4 h-4" />;
      case 'Filled': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredLaunches = launches.filter(launch => {
    const matchesCategory = selectedCategory === 'All' || launch.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || launch.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  const liveCount = launches.filter(l => l.status === 'Live').length;
  const upcomingCount = launches.filter(l => l.status === 'Upcoming').length;
  const totalRaised = launches.reduce((sum, l) => sum + l.currentRaise, 0);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
          Launch Pools
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Early access to promising Solana projects with professional vetting and anti-bot protection
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Launches</CardTitle>
            <Zap className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{liveCount}</div>
            <p className="text-xs text-green-600">Active right now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingCount}</div>
            <p className="text-xs text-blue-600">Starting soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRaised)}</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Across all launches</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(launches.reduce((sum, l) => sum + l.participants, 0), 0)}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Total investors</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Status</option>
                <option value="Live">Live</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Ended">Ended</option>
                <option value="Filled">Filled</option>
              </select>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Categories</option>
                <option value="AI & Technology">AI & Technology</option>
                <option value="DeFi Security">DeFi Security</option>
                <option value="GameFi">GameFi</option>
                <option value="DEX & Trading">DEX & Trading</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Launch Pools */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-slate-600 dark:text-slate-400">Loading launches...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredLaunches.map((launch) => (
            <Card key={launch.address} className="hover:scale-[1.02] transition-all duration-200 hover:shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">
                      {launch.symbol[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl">{launch.name}</CardTitle>
                        <span className="text-slate-500">({launch.symbol})</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(launch.status)}`}>
                          {getStatusIcon(launch.status)}
                          {launch.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">{launch.category}</span>
                        <span>Price: ${launch.price}</span>
                        <span>{launch.participants} participants</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {launch.website && (
                      <Button variant="outline" size="sm" onClick={() => window.open(launch.website, '_blank')}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                    {launch.twitter && (
                      <Button variant="outline" size="sm" onClick={() => window.open(`https://twitter.com/${launch.twitter?.replace('@', '') || ''}`, '_blank')}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400">{launch.description}</p>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Funding Progress</span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {formatCurrency(launch.currentRaise)} / {formatCurrency(launch.totalRaise)}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((launch.currentRaise / launch.totalRaise) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-right text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {((launch.currentRaise / launch.totalRaise) * 100).toFixed(1)}% filled
                    </div>
                  </div>

                  {/* Key Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Min Contribution</div>
                      <div className="font-semibold">${formatNumber(launch.minContribution)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Max Contribution</div>
                      <div className="font-semibold">${formatNumber(launch.maxContribution)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Public Sale</div>
                      <div className="font-semibold">{launch.tokenomics.publicSale}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Vesting</div>
                      <div className="font-semibold text-xs">{launch.vestingSchedule}</div>
                    </div>
                  </div>

                  {/* Timing */}
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-green-600" />
                      <span>Start: {new Date(launch.startTime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-red-600" />
                      <span>End: {new Date(launch.endTime).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex gap-3">
                    <Button 
                      variant={launch.status === 'Live' ? 'meteora' : 'outline'} 
                      className="flex-1"
                      disabled={launch.status === 'Ended' || launch.status === 'Filled'}
                    >
                      <Rocket className="w-4 h-4 mr-2" />
                      {launch.status === 'Live' ? 'Participate Now' : 
                       launch.status === 'Upcoming' ? 'Set Reminder' :
                       launch.status === 'Filled' ? 'Fully Subscribed' : 'Launch Ended'}
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Security Notice */}
      <Card className="mt-12 border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-600">
            <Shield className="w-5 h-5" />
            Security & Protection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium">Anti-Bot Protection</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Alpha Vault technology prevents sniping bots and ensures fair distribution
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium">Professional Vetting</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  All projects undergo thorough due diligence and technical audits
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <div className="font-medium">Investment Risk</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  All investments carry risk. Only invest what you can afford to lose.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}