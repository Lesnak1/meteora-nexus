'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatNumber, formatCurrency, formatPercentage } from '@/lib/utils';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Activity,
  Zap,
  Target,
  RefreshCw,
  Download
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie
} from 'recharts';

interface AnalyticsData {
  tvlHistory: Array<{ date: string; tvl: number; change: number }>;
  volumeHistory: Array<{ date: string; volume: number; trades: number }>;
  poolDistribution: Array<{ name: string; value: number; amount: number; color: string }>;
  topTokens: Array<{ symbol: string; tvl: number; volume24h: number; change24h: number; pools: number }>;
  userMetrics: Array<{ date: string; activeUsers: number; newUsers: number; transactions: number }>;
}



export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const generateFallbackData = useCallback((): AnalyticsData => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const tvlHistory = [];
    const volumeHistory = [];
    const userMetrics = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      if (dateStr) {
        const baseTvl = 1000000000 + (Math.sin(i * 0.1) * 100000000) + (Math.random() * 50000000);
        const baseVolume = 200000000 + (Math.sin(i * 0.15) * 100000000) + (Math.random() * 80000000);
        
        tvlHistory.push({
          date: dateStr,
          tvl: baseTvl,
          change: -5 + Math.random() * 10
        });
        
        volumeHistory.push({
          date: dateStr,
          volume: baseVolume,
          trades: 15000 + Math.floor(Math.random() * 10000)
        });

        userMetrics.push({
          date: dateStr,
          activeUsers: 25000 + Math.floor(Math.random() * 15000),
          newUsers: 1500 + Math.floor(Math.random() * 1000),
          transactions: 125000 + Math.floor(Math.random() * 50000)
        });
      }
    }

    return {
      tvlHistory,
      volumeHistory,
      userMetrics,
      poolDistribution: [
        { name: 'DLMM Pools', value: 45, amount: 495000000, color: '#8b5cf6' },
        { name: 'Dynamic Vaults', value: 32, amount: 352000000, color: '#ec4899' },
        { name: 'Launch Pools', value: 15, amount: 165000000, color: '#ef4444' },
        { name: 'Stable Pools', value: 8, amount: 88000000, color: '#f97316' }
      ],
      topTokens: [
        { symbol: 'SOL', tvl: 456000000, volume24h: 89000000, change24h: 2.3, pools: 156 },
        { symbol: 'USDC', tvl: 278000000, volume24h: 67000000, change24h: 0.1, pools: 203 },
        { symbol: 'mSOL', tvl: 189000000, volume24h: 34000000, change24h: 1.8, pools: 89 },
        { symbol: 'JUP', tvl: 123000000, volume24h: 45000000, change24h: 4.2, pools: 67 },
        { symbol: 'USDT', tvl: 98000000, volume24h: 23000000, change24h: -0.2, pools: 134 },
        { symbol: 'WIF', tvl: 76000000, volume24h: 18000000, change24h: -2.1, pools: 45 }
      ]
    };
  }, [timeRange]);

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/meteora/analytics?range=${timeRange}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setAnalytics(generateFallbackData());
    } finally {
      setLoading(false);
    }
  }, [timeRange, generateFallbackData]);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange, fetchAnalytics]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const currentTVL = analytics?.tvlHistory[analytics.tvlHistory.length - 1]?.tvl || 0;
  const previousTVL = analytics?.tvlHistory[analytics.tvlHistory.length - 2]?.tvl || 0;
  const tvlChange = ((currentTVL - previousTVL) / previousTVL) * 100;

  const currentVolume = analytics?.volumeHistory[analytics.volumeHistory.length - 1]?.volume || 0;
  const previousVolume = analytics?.volumeHistory[analytics.volumeHistory.length - 2]?.volume || 0;
  const volumeChange = ((currentVolume - previousVolume) / previousVolume) * 100;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4">
            Advanced Analytics
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Comprehensive insights and metrics for the Meteora ecosystem
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as '7d' | '30d' | '90d')}
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <Button variant="outline" onClick={fetchAnalytics}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current TVL</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(currentTVL)}</div>
            <div className={`flex items-center text-xs ${tvlChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {tvlChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {formatPercentage(tvlChange)} vs yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(currentVolume)}</div>
            <div className={`flex items-center text-xs ${volumeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {volumeChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {formatPercentage(volumeChange)} vs yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(analytics?.userMetrics[analytics.userMetrics.length - 1]?.activeUsers || 0, 0)}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              24h active users
            </div>
          </CardContent>
        </Card>

        <Card className="hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Zap className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(analytics?.userMetrics[analytics.userMetrics.length - 1]?.transactions || 0, 0)}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              24h transactions
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* TVL History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Total Value Locked Over Time
            </CardTitle>
            <CardDescription>TVL trends for the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics?.tvlHistory}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs"
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    className="text-xs"
                    tickFormatter={(value) => formatNumber(value)}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), 'TVL']}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="tvl" 
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Volume History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Trading Volume & Activity
            </CardTitle>
            <CardDescription>Daily volume and trade count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics?.volumeHistory}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs"
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    className="text-xs"
                    tickFormatter={(value) => formatNumber(value)}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      name === 'volume' ? formatCurrency(value) : formatNumber(value, 0), 
                      name === 'volume' ? 'Volume' : 'Trades'
                    ]}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="trades" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    dot={false}
                    yAxisId="right"
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    className="text-xs"
                    tickFormatter={(value) => formatNumber(value, 0)}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Pool Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-600" />
              TVL Distribution by Pool Type
            </CardTitle>
            <CardDescription>Breakdown of total value locked</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={analytics?.poolDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {analytics?.poolDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number, name: string, props: { payload?: { amount: number } }) => [
                      `${value}% (${formatCurrency(props.payload?.amount || 0)})`,
                      name
                    ]}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {analytics?.poolDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              User Activity Metrics
            </CardTitle>
            <CardDescription>Active and new user trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics?.userMetrics}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs"
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis 
                    className="text-xs"
                    tickFormatter={(value) => formatNumber(value, 0)}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      formatNumber(value, 0), 
                      name === 'activeUsers' ? 'Active Users' : 'New Users'
                    ]}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  />
                  <Bar dataKey="activeUsers" fill="#8b5cf6" />
                  <Bar dataKey="newUsers" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Tokens Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Top Tokens by TVL
          </CardTitle>
          <CardDescription>Most valuable tokens in the Meteora ecosystem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Token</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-400">TVL</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-400">24h Volume</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-400">24h Change</th>
                  <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Pools</th>
                </tr>
              </thead>
              <tbody>
                {analytics?.topTokens.map((token) => (
                  <tr key={token.symbol} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
                          {token.symbol[0]}
                        </div>
                        <span className="font-semibold">{token.symbol}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-medium">
                      {formatCurrency(token.tvl)}
                    </td>
                    <td className="py-4 px-4 text-right font-medium">
                      {formatCurrency(token.volume24h)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`font-medium ${token.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatPercentage(token.change24h)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-slate-600 dark:text-slate-400">
                      {token.pools}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}