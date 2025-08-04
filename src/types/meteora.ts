// Meteora API Types
export interface TokenInfo {
  symbol: string;
  decimals: number;
  logo_uri?: string;
}

export interface MeteoraPoolResponse {
  name?: string;
  address: string;
  tvl?: number;
  volume_24h?: number;
  apy?: number;
  price_change_24h?: number;
  token_x?: TokenInfo;
  token_y?: TokenInfo;
}

export interface MeteoraStatsResponse {
  totalValueLocked: number;
  dailyVolume: number;
  totalPools: number;
  dailyVolumeChange: number;
  tvlChange: number;
  topPools: Array<{
    name: string;
    tvl: number;
    volume24h: number;
    apy: number;
    change24h: number;
  }>;
}

export interface MeteoraVaultResponse {
  name: string;
  address: string;
  tvl: number;
  apy: number;
  change24h: number;
  strategy: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  underlyingToken: TokenInfo;
  protocols: string[];
  lastRebalance: string;
}

export interface LaunchPoolResponse {
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

// Chart Data Types
export interface ChartDataPoint {
  date: string;
  value: number;
  [key: string]: string | number;
}

export interface PieChartData {
  name: string;
  value: number;
  amount: number;
  color: string;
}

// Component Props Types
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface SearchableItem {
  id: string;
  name: string;
  searchableFields: string[];
}

// API Response Types
export type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
  fallbackData?: T;
};