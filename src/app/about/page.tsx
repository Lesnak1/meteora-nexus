import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Target, 
  Shield, 
  TrendingUp, 
  Users, 
  Lightbulb,
  Brain,
  BarChart3,
  ExternalLink,
  Github
} from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms analyze market conditions and provide intelligent strategy recommendations for optimal yield generation."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
      title: "Real-Time Data",
      description: "Live data feeds from Meteora protocol, providing up-to-the-second information on pool performance, yields, and market conditions."
    },
    {
      icon: <Shield className="w-6 h-6 text-green-600" />,
      title: "Secure Integration",
      description: "Built with security-first principles, featuring non-custodial wallet integration and secure smart contract interactions."
    },
    {
      icon: <Target className="w-6 h-6 text-red-600" />,
      title: "Portfolio Optimization",
      description: "Comprehensive portfolio management tools with risk assessment, diversification analysis, and automated rebalancing suggestions."
    },
    {
      icon: <Users className="w-6 h-6 text-orange-600" />,
      title: "Social Trading",
      description: "Follow successful strategies from top performers, share your own strategies, and learn from the community."
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      title: "Lightning Fast",
      description: "Built on Next.js 14 with optimized performance for instant loading and seamless user experience."
    }
  ];

  const metrics = [
    { label: "Supported Pools", value: "1,200+" },
    { label: "Total TVL Tracked", value: "$1.1B+" },
    { label: "Daily Volume", value: "$245M+" },
    { label: "Active Strategies", value: "500+" }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-6">
          About Meteora Nexus
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
          Meteora Nexus is the premier DeFi intelligence platform designed specifically for the Meteora ecosystem. 
          We combine cutting-edge AI technology with real-time blockchain data to provide unparalleled insights 
          and tools for DeFi participants on Solana.
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="mb-12 border-2 border-purple-200 dark:border-purple-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-3">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            To democratize access to sophisticated DeFi analytics and strategy optimization tools, 
            empowering both novice and experienced users to maximize their returns while minimizing risks 
            in the rapidly evolving Meteora ecosystem.
          </p>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {metrics.map((metric, index) => (
          <Card key={index} className="text-center hover:scale-105 transition-transform duration-200">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {metric.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">What Makes Us Different</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:scale-105 transition-all duration-200 hover:shadow-xl border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-lg">
                  {feature.icon}
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-3">
            <Zap className="w-8 h-8 text-blue-500" />
            Built with Modern Technology
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="font-semibold text-lg">Frontend</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <div>Next.js 14</div>
                <div>TypeScript</div>
                <div>TailwindCSS</div>
                <div>Framer Motion</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-lg">Blockchain</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <div>Solana</div>
                <div>Phantom Wallet</div>
                <div>@solana/web3.js</div>
                <div>Anchor Framework</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-lg">Data & Analytics</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <div>Real-time APIs</div>
                <div>Recharts</div>
                <div>TanStack Query</div>
                <div>AI/ML Models</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-lg">Infrastructure</div>
              <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <div>Vercel</div>
                <div>Edge Functions</div>
                <div>Redis Caching</div>
                <div>CDN Optimization</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Section */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Built by the Community</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            Meteora Nexus is developed by passionate DeFi enthusiasts and blockchain developers 
            who believe in the power of decentralized finance and the Solana ecosystem.
          </p>
          <div className="flex justify-center items-center gap-6">
            <div className="text-center">
              <div className="font-semibold text-lg">Lead Developer</div>
              <div className="flex items-center justify-center gap-2 mt-2">
                <a
                  href="https://github.com/Lesnak1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  Lesnak1
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Ready to Optimize Your DeFi Strategy?</h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Join thousands of users who are already maximizing their yields with Meteora Nexus
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="meteora" size="lg" asChild>
            <Link href="/">
              <TrendingUp className="w-5 h-5 mr-2" />
              Start Analyzing
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/docs">
              <ExternalLink className="w-5 h-5 mr-2" />
              View Documentation
            </Link>
          </Button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-16 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>
          Meteora Nexus is an independent project and is not officially affiliated with Meteora AG. 
          We provide analytics and tools for the Meteora ecosystem with the highest standards of security and transparency.
        </p>
      </div>
    </div>
  );
}