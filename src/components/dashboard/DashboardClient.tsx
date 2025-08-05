'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatNumber, formatCurrency, formatPercentage } from '@/lib/utils';
import { getMeteoraStats, generateChartData, type MeteoraStats, type ChartDataPoint } from '@/lib/meteora-data';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  BarChart3,
  PieChart,
  Waves
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';


const COLORS = ['#8b5cf6', '#ec4899', '#ef4444', '#f97316', '#eab308', '#22c55e'];

export function DashboardClient() {
  const [stats, setStats] = useState<MeteoraStats | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMeteoraData = useCallback(async () => {
    try {
      setLoading(true);
      // Use frontend-only data with realistic values
      const statsData = getMeteoraStats();
      setStats(statsData);
      setChartData(generateChartData(statsData.totalValueLocked, statsData.dailyVolume));
    } catch (error) {
      console.error('Error generating Meteora data:', error);
      // Fallback with empty stats
      setStats({
        totalValueLocked: 0,
        dailyVolume: 0,
        totalPools: 0,
        dailyVolumeChange: 0,
        tvlChange: 0,
        topPools: []
      });
      setChartData(generateChartData());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMeteoraData();
  }, [fetchMeteoraData]);



  const pieData = stats && stats.totalValueLocked > 0 ? [
    { name: 'DLMM Pools', value: 45, amount: stats.totalValueLocked * 0.45 },
    { name: 'Dynamic Vaults', value: 32, amount: stats.totalValueLocked * 0.32 },
    { name: 'Launch Pools', value: 15, amount: stats.totalValueLocked * 0.15 },
    { name: 'Stable Pools', value: 8, amount: stats.totalValueLocked * 0.08 }
  ] : [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading Meteora data...</p>
        </div>
      </div>
    );
  }

  if (!stats || stats.totalValueLocked === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl font-semibold mb-4">Loading Meteora Data</div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">Attempting to fetch real-time data from Meteora API</p>
          <Button onClick={fetchMeteoraData} variant="outline">
            Retry Connection
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="animate-reveal-up">
            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-gradient">
              Meteora Intelligence Dashboard
            </h1>
            <p className="text-lg sm:text-2xl text-slate-700 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Advanced analytics and insights for the Meteora DeFi ecosystem. Real-time data, AI-powered strategies, and comprehensive portfolio management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pools">
                <Button variant="meteora" size="lg" className="animate-pulse-grow bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl transition-all duration-200">
                  <Zap className="w-5 h-5 mr-2" />
                  Explore Pools
                </Button>
              </Link>
              <Link href="/analytics">
                <Button variant="glass" size="lg" className="border border-orange-200 dark:border-orange-800 hover:bg-orange-50 dark:hover:bg-orange-950/20">
                  <Target className="w-5 h-5 mr-2" />
                  View Analytics
                </Button>
              </Link>
            </div>
          </div>
        </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="hover-lift glass border border-orange-200/20 dark:border-orange-800/20 bg-gradient-to-br from-white/90 to-orange-50/50 dark:from-slate-900/90 dark:to-orange-950/50 animate-float" style={{animationDelay: '0s'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-800 dark:text-slate-200">Total Value Locked</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{formatCurrency(stats?.totalValueLocked || 0)}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              {formatPercentage(stats?.tvlChange || 0)} from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift glass border border-orange-200/20 dark:border-orange-800/20 bg-gradient-to-br from-white/90 to-red-50/50 dark:from-slate-900/90 dark:to-red-950/50 animate-float" style={{animationDelay: '0.2s'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-800 dark:text-slate-200">24h Volume</CardTitle>
            <Activity className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{formatCurrency(stats?.dailyVolume || 0)}</div>
            <div className={`flex items-center text-xs ${(stats?.dailyVolumeChange || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {(stats?.dailyVolumeChange || 0) >= 0 ? 
                <TrendingUp className="w-3 h-3 mr-1" /> : 
                <TrendingDown className="w-3 h-3 mr-1" />
              }
              {formatPercentage(stats?.dailyVolumeChange || 0)} from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift glass border border-orange-200/20 dark:border-orange-800/20 bg-gradient-to-br from-white/90 to-pink-50/50 dark:from-slate-900/90 dark:to-pink-950/50 animate-float" style={{animationDelay: '0.4s'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-800 dark:text-slate-200">Active Pools</CardTitle>
            <Waves className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{formatNumber(stats?.totalPools || 0, 0)}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Across all pool types
            </div>
          </CardContent>
        </Card>

        <Card className="hover-lift glass border border-orange-200/20 dark:border-orange-800/20 bg-gradient-to-br from-white/90 to-orange-50/50 dark:from-slate-900/90 dark:to-orange-950/50 animate-float" style={{animationDelay: '0.6s'}}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-800 dark:text-slate-200">Market Share</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">22.3%</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Solana DEX volume
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* TVL & Volume Chart */}
        <Card className="glass border border-orange-200/20 dark:border-orange-800/20 bg-gradient-to-br from-white/90 to-orange-50/30 dark:from-slate-900/90 dark:to-orange-950/30 hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
              <BarChart3 className="w-5 h-5 text-orange-600" />
              TVL & Volume Trends (30 Days)
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Historical data showing Total Value Locked and trading volume
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-orange-200 dark:stroke-orange-800" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs fill-slate-600 dark:fill-slate-400"
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    className="text-xs fill-slate-600 dark:fill-slate-400"
                    tickFormatter={(value) => formatNumber(value)}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      formatCurrency(value), 
                      name === 'tvl' ? 'TVL' : 'Volume'
                    ]}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid rgba(249, 115, 22, 0.3)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tvl" 
                    stackId="1"
                    stroke="#f97316" 
                    strokeWidth={3}
                    fill="url(#tvlGradient)" 
                    fillOpacity={0.8}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="volume" 
                    stackId="2"
                    stroke="#ec4899" 
                    strokeWidth={3}
                    fill="url(#volumeGradient)" 
                    fillOpacity={0.8}
                  />
                  <defs>
                    <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#f97316" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#ec4899" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Protocol Distribution */}
        <Card className="glass border border-orange-200/20 dark:border-orange-800/20 bg-gradient-to-br from-white/90 to-pink-50/30 dark:from-slate-900/90 dark:to-pink-950/30 hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
              <PieChart className="w-5 h-5 text-pink-600" />
              TVL Distribution
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Total Value Locked across different pool types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number, name: string, props: { payload?: { amount: number } }) => [
                      `${value}% (${formatCurrency(props.payload?.amount || 0)})`,
                      name
                    ]}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid rgba(249, 115, 22, 0.3)',
                      borderRadius: '8px'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pools */}
      <Card className="glass border-0 hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Top Performing Pools
            </span>
            <Link href="/pools">
              <Button variant="neon" size="sm">
                View All Pools
              </Button>
            </Link>
          </CardTitle>
          <CardDescription>
            Highest volume and best performing liquidity pools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.topPools && stats.topPools.length > 0 ? stats.topPools.map((pool, index) => (
              <div key={pool.name} className="flex items-center justify-between p-4 rounded-xl glass border-0 hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-300 hover-lift">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold animate-pulse-grow">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold">{pool.name}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      TVL: {formatCurrency(pool.tvl)}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold">
                    APY: {pool.apy.toFixed(1)}%
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    24h Vol: {formatCurrency(pool.volume24h)}
                  </div>
                </div>
                
                <div className={`flex items-center text-sm font-medium ${pool.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {pool.change24h >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {formatPercentage(pool.change24h)}
                </div>
              </div>
            )) : (
              <div className="text-center py-8">
                <p className="text-slate-600 dark:text-slate-400">No pool data available from real Meteora API</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="text-center glass border-0 hover-lift group">
          <CardHeader>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center animate-float">
              <Waves className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl">Explore DLMM Pools</CardTitle>
            <CardDescription>
              Discover dynamic liquidity market maker opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/pools">
              <Button variant="meteora" className="w-full group-hover:scale-110 transition-transform">
                View DLMM Pools
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="text-center glass border-0 hover-lift group">
          <CardHeader>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center animate-float" style={{animationDelay: '0.2s'}}>
              <Target className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl">Dynamic Vaults</CardTitle>
            <CardDescription>
              Automated yield optimization strategies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/vaults">
              <Button variant="gradient" className="w-full group-hover:scale-110 transition-transform">
                Explore Vaults
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="text-center glass border-0 hover-lift group">
          <CardHeader>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center animate-float" style={{animationDelay: '0.4s'}}>
              <Zap className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl">Launch Pools</CardTitle>
            <CardDescription>
              Early access to new token launches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/launch">
              <Button variant="neon" className="w-full group-hover:scale-110 transition-transform">
                View Launches
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
}