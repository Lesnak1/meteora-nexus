import type { NextConfig } from "next";
import { SECURITY_HEADERS } from './src/lib/security';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', '@solana/wallet-adapter-react'],
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Turbopack configuration (stable)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'meteora.ag',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.meteora.ag',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  output: 'standalone',
  
  // Environment variables validation
  env: {
    SOLANA_NETWORK: process.env.SOLANA_NETWORK || 'mainnet-beta',
    RPC_URL: process.env.RPC_URL,
  },

  // Bundle analyzer in development
  ...(process.env.ANALYZE === 'true' && {
    bundleAnalyzer: {
      enabled: true,
    },
  }),

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: SECURITY_HEADERS,
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },


  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Webpack optimizations
  webpack: (config, { isServer, dev }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            chunks: 'all',
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          // Solana/Web3 specific chunk
          web3: {
            name: 'web3',
            test: /[\\/]node_modules[\\/](@solana|@wallet-adapter)[\\/]/,
            chunks: 'all',
            priority: 30,
          },
          // Charts chunk
          charts: {
            name: 'charts',
            test: /[\\/]node_modules[\\/](recharts|d3)[\\/]/,
            chunks: 'all',
            priority: 30,
          },
        },
      };
    }

    // Ignore unnecessary files
    config.resolve.alias = {
      ...config.resolve.alias,
      'pino-pretty': false,
    };

    return config;
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src'],
  },
};

export default nextConfig;
