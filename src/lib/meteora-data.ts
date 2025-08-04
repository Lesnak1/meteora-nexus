// Frontend-only Meteora data with realistic values
export interface MeteoraStats {
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

export interface Pool {
  name: string;
  address: string;
  tvl: number;
  volume24h: number;
  apy: number;
  change24h: number;
  tokenX: {
    symbol: string;
    name: string;
    address: string;
    logoUri: string;
    decimals: number;
  };
  tokenY: {
    symbol: string;
    name: string;
    address: string;
    logoUri: string;
    decimals: number;
  };
  fee: number;
  active: boolean;
  lastUpdate: string;
}

// Realistic data based on Meteora's actual market position
export function getMeteoraStats(): MeteoraStats {
  // Base realistic values for Meteora
  const baseTVL = 45000000; // $45M TVL (realistic for Meteora)
  const baseVolume = 8500000; // $8.5M daily volume
  
  // Add some daily variation
  const tvlVariation = baseTVL * (0.95 + Math.random() * 0.1); // ±5% daily variation
  const volumeVariation = baseVolume * (0.8 + Math.random() * 0.4); // ±20% volume variation
  
  return {
    totalValueLocked: tvlVariation,
    dailyVolume: volumeVariation,
    totalPools: 156,
    dailyVolumeChange: (Math.random() - 0.5) * 20, // ±10% daily change
    tvlChange: (Math.random() - 0.5) * 10, // ±5% TVL change
    topPools: [
      {
        name: 'SOL/USDC',
        tvl: 8420000, // $8.42M
        volume24h: 2340000, // $2.34M
        apy: 12.5,
        change24h: 2.34
      },
      {
        name: 'USDT/USDC',
        tvl: 6950000, // $6.95M
        volume24h: 1870000, // $1.87M
        apy: 8.2,
        change24h: 0.12
      },
      {
        name: 'mSOL/SOL',
        tvl: 4630000, // $4.63M
        volume24h: 890000, // $890K
        apy: 15.8,
        change24h: 1.87
      },
      {
        name: 'RAY/SOL',
        tvl: 3200000, // $3.2M
        volume24h: 620000, // $620K
        apy: 22.3,
        change24h: -1.45
      },
      {
        name: 'BONK/SOL',
        tvl: 2800000, // $2.8M
        volume24h: 1200000, // $1.2M
        apy: 18.7,
        change24h: 5.23
      }
    ]
  };
}

export function getMeteoraPoolsData(): Pool[] {
  const now = new Date().toISOString();
  
  return [
    {
      name: 'SOL/USDC',
      address: 'pool_sol_usdc_main',
      tvl: 8420000,
      volume24h: 2340000,
      apy: 12.5,
      change24h: 2.34,
      tokenX: { 
        symbol: 'SOL', 
        name: 'Solana', 
        address: 'So11111111111111111111111111111111111111112', 
        logoUri: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png', 
        decimals: 9 
      },
      tokenY: { 
        symbol: 'USDC', 
        name: 'USD Coin', 
        address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', 
        logoUri: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png', 
        decimals: 6 
      },
      fee: 0.003,
      active: true,
      lastUpdate: now
    },
    {
      name: 'USDT/USDC',
      address: 'pool_usdt_usdc_main',
      tvl: 6950000,
      volume24h: 1870000,
      apy: 8.2,
      change24h: 0.12,
      tokenX: { 
        symbol: 'USDT', 
        name: 'Tether USD', 
        address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', 
        logoUri: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png', 
        decimals: 6 
      },
      tokenY: { 
        symbol: 'USDC', 
        name: 'USD Coin', 
        address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', 
        logoUri: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png', 
        decimals: 6 
      },
      fee: 0.001,
      active: true,
      lastUpdate: now
    },
    {
      name: 'mSOL/SOL',
      address: 'pool_msol_sol_main',
      tvl: 4630000,
      volume24h: 890000,
      apy: 15.8,
      change24h: 1.87,
      tokenX: { 
        symbol: 'mSOL', 
        name: 'Marinade Staked SOL', 
        address: 'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', 
        logoUri: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So/logo.png', 
        decimals: 9 
      },
      tokenY: { 
        symbol: 'SOL', 
        name: 'Solana', 
        address: 'So11111111111111111111111111111111111111112', 
        logoUri: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png', 
        decimals: 9 
      },
      fee: 0.0025,
      active: true,
      lastUpdate: now
    },
    {
      name: 'RAY/SOL',
      address: 'pool_ray_sol_main',
      tvl: 3200000,
      volume24h: 620000,
      apy: 22.3,
      change24h: -1.45,
      tokenX: { 
        symbol: 'RAY', 
        name: 'Raydium', 
        address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', 
        logoUri: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png', 
        decimals: 6 
      },
      tokenY: { 
        symbol: 'SOL', 
        name: 'Solana', 
        address: 'So11111111111111111111111111111111111111112', 
        logoUri: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png', 
        decimals: 9 
      },
      fee: 0.0025,
      active: true,
      lastUpdate: now
    },
    {
      name: 'BONK/SOL',
      address: 'pool_bonk_sol_main',
      tvl: 2800000,
      volume24h: 1200000,
      apy: 18.7,
      change24h: 5.23,
      tokenX: { 
        symbol: 'BONK', 
        name: 'Bonk', 
        address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', 
        logoUri: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263/logo.png', 
        decimals: 5 
      },
      tokenY: { 
        symbol: 'SOL', 
        name: 'Solana', 
        address: 'So11111111111111111111111111111111111111112', 
        logoUri: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png', 
        decimals: 9 
      },
      fee: 0.0025,
      active: true,
      lastUpdate: now
    },
    {
      name: 'JUP/SOL',
      address: 'pool_jup_sol_main',
      tvl: 2100000,
      volume24h: 450000,
      apy: 16.4,
      change24h: -0.85,
      tokenX: { 
        symbol: 'JUP', 
        name: 'Jupiter', 
        address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', 
        logoUri: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN/logo.png', 
        decimals: 6 
      },
      tokenY: { 
        symbol: 'SOL', 
        name: 'Solana', 
        address: 'So11111111111111111111111111111111111111112', 
        logoUri: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png', 
        decimals: 9 
      },
      fee: 0.003,
      active: true,
      lastUpdate: now
    }
  ];
}

export interface ChartDataPoint {
  date: string;
  tvl: number;
  volume: number;
}

export function generateChartData(baseTvl?: number, baseVolume?: number): ChartDataPoint[] {
  const tvl = baseTvl || 45000000; // $45M realistic base
  const volume = baseVolume || 8500000; // $8.5M realistic base
  
  const data = [];
  const now = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Generate realistic variations
    const tvlVariation = tvl * (0.85 + Math.random() * 0.3); // ±15% variation
    const volumeVariation = volume * (0.7 + Math.random() * 0.6); // ±30% variation
    
    const dateString = date.toISOString().split('T')[0];
    if (dateString) {
      data.push({
        date: dateString,
        tvl: tvlVariation,
        volume: volumeVariation
      });
    }
  }
  
  return data;
}