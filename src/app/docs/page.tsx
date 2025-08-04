'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Code, 
  Zap, 
  Shield, 
  ArrowRight,
  ExternalLink,
  Layers,
  TrendingUp,
  Bot,
  Wallet
} from 'lucide-react';
import Link from 'next/link';

const docs = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of Meteora DLMM and how to start trading',
    icon: BookOpen,
    items: [
      'What is Dynamic Liquidity Market Making?',
      'How to connect your wallet',
      'Making your first trade',
      'Understanding fees and APY'
    ]
  },
  {
    title: 'DLMM Pools',
    description: 'Deep dive into Dynamic Liquidity Market Maker pools',
    icon: Layers,
    items: [
      'Pool mechanics and algorithms',
      'Liquidity provision strategies',
      'Risk management',
      'Yield optimization'
    ]
  },
  {
    title: 'Dynamic Vaults',
    description: 'Automated yield farming and portfolio management',
    icon: TrendingUp,
    items: [
      'Vault strategies explained',
      'Auto-compounding mechanics',
      'Performance tracking',
      'Withdrawal and deposits'
    ]
  },
  {
    title: 'Launch Pools',
    description: 'Participate in new token launches and IDOs',
    icon: Zap,
    items: [
      'Launch pool mechanics',
      'Token distribution',
      'Vesting schedules',
      'Early access benefits'
    ]
  },
  {
    title: 'API Integration',
    description: 'Integrate Meteora data into your applications',
    icon: Code,
    items: [
      'REST API endpoints',
      'WebSocket connections',
      'Rate limiting',
      'Authentication'
    ]
  },
  {
    title: 'Security',
    description: 'Best practices for secure DeFi interactions',
    icon: Shield,
    items: [
      'Wallet security',
      'Smart contract audits',
      'Risk assessment',
      'Emergency procedures'
    ]
  }
];

const quickLinks = [
  { title: 'API Reference', href: '/api/reference', external: false },
  { title: 'GitHub Repository', href: 'https://github.com/meteora-ag', external: true },
  { title: 'Discord Community', href: 'https://discord.gg/meteora', external: true },
  { title: 'Audit Reports', href: 'https://docs.meteora.ag/audits', external: true },
];

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
          Documentation
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
          Everything you need to know about Meteora DLMM, Dynamic Vaults, and Launch Pools. 
          From beginner guides to advanced API integration.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <BookOpen className="w-5 h-5 mr-2" />
            Quick Start Guide
          </Button>
          <Button variant="outline" size="lg">
            <Code className="w-5 h-5 mr-2" />
            API Documentation
          </Button>
        </div>
      </div>

      {/* Documentation Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {docs.map((section, index) => (
          <Card key={index} className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <section.icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                {section.title}
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">
                {section.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <ArrowRight className="w-4 h-4 mr-2 text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button 
                variant="ghost" 
                className="w-full mt-4 group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-950"
              >
                Read More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Links */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Zap className="w-6 h-6 mr-3 text-yellow-500" />
            Quick Links
          </CardTitle>
          <CardDescription>
            Essential resources and community links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target={link.external ? '_blank' : '_self'}
                className="group"
              >
                <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium group-hover:text-blue-600 transition-colors">
                      {link.title}
                    </span>
                    {link.external ? (
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Features Highlight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Bot className="w-6 h-6 mr-3 text-blue-600" />
              AI-Powered Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Our advanced AI algorithms analyze market conditions and provide intelligent 
              trading suggestions and risk assessments.
            </p>
            <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-600 hover:text-white">
              Learn More
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950 dark:to-pink-900 border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Wallet className="w-6 h-6 mr-3 text-purple-600" />
              Multi-Wallet Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Connect with all major Solana wallets including Phantom, Solflare, 
              and hardware wallets for maximum security.
            </p>
            <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-600 hover:text-white">
              View Wallets
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}