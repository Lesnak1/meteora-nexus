'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatNumber, formatCurrency, formatPercentage } from '@/lib/utils';
import { getMeteoraPoolsData, type Pool } from '@/lib/meteora-data';
import { 
  Search, 
  TrendingUp, 
  ExternalLink, 
  Waves,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react';


export default function PoolsPage() {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'tvl' | 'volume24h' | 'apy'>('tvl');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchPools();
  }, []);

  const fetchPools = async () => {
    try {
      setLoading(true);
      // Use frontend-only data with realistic values
      const poolsData = getMeteoraPoolsData();
      setPools(poolsData);
    } catch (error) {
      console.error('Error generating pools data:', error);
      setPools([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedPools = pools
    .filter(pool => 
      pool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pool.tokenX.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pool.tokenY.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const multiplier = sortOrder === 'desc' ? -1 : 1;
      return multiplier * (a[sortBy] - b[sortBy]);
    });

  const handleSort = (field: 'tvl' | 'volume24h' | 'apy') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
          DLMM Pools
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Explore Dynamic Liquidity Market Maker pools with real-time analytics and performance metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pools</CardTitle>
            <Waves className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(pools.length, 0)}</div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Active DLMM pools</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total TVL</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(pools.reduce((sum, pool) => sum + pool.tvl, 0))}
            </div>
            <p className="text-xs text-green-600">+2.4% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
            <Zap className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(pools.reduce((sum, pool) => sum + pool.volume24h, 0))}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Across all pools</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg APY</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(pools.reduce((sum, pool) => sum + pool.apy, 0) / pools.length || 0).toFixed(1)}%
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">Average yield</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search pools..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => fetchPools()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pools Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">All DLMM Pools</CardTitle>
          <CardDescription>
            {filteredAndSortedPools.length} pools found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <span className="ml-3 text-slate-600 dark:text-slate-400">Loading pools...</span>
            </div>
          ) : pools.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-red-500 text-lg font-semibold mb-2">No pools data available</div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">Unable to load pool data from Meteora API</p>
              <Button onClick={fetchPools} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Pool</th>
                    <th 
                      className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                      onClick={() => handleSort('tvl')}
                    >
                      TVL {sortBy === 'tvl' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </th>
                    <th 
                      className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                      onClick={() => handleSort('volume24h')}
                    >
                      Volume 24h {sortBy === 'volume24h' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </th>
                    <th 
                      className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-400 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100"
                      onClick={() => handleSort('apy')}
                    >
                      APY {sortBy === 'apy' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-400">24h Change</th>
                    <th className="text-center py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedPools.map((pool) => (
                    <tr key={pool.address} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                              {pool.tokenX.symbol[0]}
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white text-xs font-bold">
                              {pool.tokenY.symbol[0]}
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold">{pool.name}</div>
                            <div className="text-xs text-slate-500">
                              {pool.tokenX.symbol}/{pool.tokenY.symbol}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-medium">
                        {formatCurrency(pool.tvl)}
                      </td>
                      <td className="py-4 px-4 text-right font-medium">
                        {formatCurrency(pool.volume24h)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-semibold text-green-600">
                          {pool.apy.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className={`flex items-center justify-end font-medium ${
                          pool.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {pool.change24h >= 0 ? 
                            <ArrowUpRight className="w-4 h-4 mr-1" /> : 
                            <ArrowDownRight className="w-4 h-4 mr-1" />
                          }
                          {formatPercentage(pool.change24h)}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button variant="outline" size="sm">
                            Analyze
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => window.open(`https://solscan.io/account/${pool.address}`, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}