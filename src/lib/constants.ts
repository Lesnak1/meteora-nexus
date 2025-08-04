export const METEORA_ENDPOINTS = {
  MAINNET: 'https://app.meteora.ag/api',
  DLMM_POOLS: 'https://app.meteora.ag/api/dlmm/pools',
  DYNAMIC_VAULTS: 'https://app.meteora.ag/api/vaults',
  POOL_STATS: 'https://app.meteora.ag/api/pool-stats',
  LAUNCH_POOLS: 'https://app.meteora.ag/api/launch-pools',
  // Alternative endpoints for real data
  PAIR_INFO: 'https://app.meteora.ag/api/pair',
  POOL_INFO: 'https://app.meteora.ag/api/pool',
  TOKEN_INFO: 'https://app.meteora.ag/api/token'
} as const;

export const SOLANA_RPC_ENDPOINTS = {
  MAINNET: 'https://api.mainnet-beta.solana.com',
  DEVNET: 'https://api.devnet.solana.com',
  HELIUS: 'https://rpc.helius.xyz/?api-key=',
  QUICKNODE: 'https://solana-mainnet.rpc.extrnode.com'
} as const;

export const NAVIGATION = [
  { name: 'Dashboard', href: '/', icon: 'layout-dashboard' },
  { name: 'DLMM Pools', href: '/pools', icon: 'waves' },
  { name: 'Dynamic Vaults', href: '/vaults', icon: 'vault' },
  { name: 'Launch Pools', href: '/launch', icon: 'rocket' },
  { name: 'Analytics', href: '/analytics', icon: 'trending-up' },
  { name: 'Strategies', href: '/strategies', icon: 'brain-circuit' },
] as const;

export const FOOTER_LINKS = [
  {
    title: 'Platform',
    links: [
      { name: 'Dashboard', href: '/' },
      { name: 'DLMM Pools', href: '/pools' },
      { name: 'Dynamic Vaults', href: '/vaults' },
      { name: 'Analytics', href: '/analytics' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '/docs' },
      { name: 'About', href: '/about' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Support', href: '/support' },
    ]
  },
  {
    title: 'Meteora',
    links: [
      { name: 'Official Site', href: 'https://meteora.ag' },
      { name: 'Discord', href: 'https://discord.gg/meteora' },
      { name: 'Twitter', href: 'https://twitter.com/MeteoraAG' },
      { name: 'Docs', href: 'https://docs.meteora.ag' },
    ]
  }
] as const;