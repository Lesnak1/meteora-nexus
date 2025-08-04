'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Search,
  MessageCircle,
  Book,
  Shield,
  DollarSign
} from 'lucide-react';

const faqCategories = [
  {
    title: 'Getting Started',
    icon: HelpCircle,
    color: 'blue',
    faqs: [
      {
        question: 'What is Meteora DLMM?',
        answer: 'Meteora Dynamic Liquidity Market Making (DLMM) is an innovative AMM protocol that allows liquidity providers to customize their liquidity distribution. Unlike traditional AMMs where liquidity is spread across the entire price curve, DLMM lets you concentrate liquidity in specific price ranges for better capital efficiency.'
      },
      {
        question: 'How do I connect my wallet?',
        answer: 'Click the "Connect Wallet" button in the top right corner and select your preferred Solana wallet (Phantom, Solflare, etc.). Make sure you have SOL for transaction fees and the tokens you want to trade.'
      },
      {
        question: 'What wallets are supported?',
        answer: 'We support all major Solana wallets including Phantom, Solflare, Backpack, Glow, and hardware wallets like Ledger. The wallet must be compatible with Solana and support the Wallet Adapter standard.'
      },
      {
        question: 'Is there a minimum deposit?',
        answer: 'There\'s no strict minimum deposit, but you\'ll need enough SOL to cover transaction fees (typically 0.00025 SOL per transaction) plus the tokens you want to provide as liquidity or trade.'
      }
    ]
  },
  {
    title: 'Trading & Liquidity',
    icon: DollarSign,
    color: 'green',
    faqs: [
      {
        question: 'How do DLMM pools work?',
        answer: 'DLMM pools use a bin-based system where liquidity is distributed across discrete price bins. Each bin represents a small price range, and liquidity providers can choose which bins to deposit into, allowing for concentrated liquidity strategies.'
      },
      {
        question: 'What are the fees for trading?',
        answer: 'Trading fees vary by pool but typically range from 0.1% to 1%. The fees are automatically distributed to liquidity providers in proportion to their liquidity contribution. You can see the exact fee for each pool on the pool details page.'
      },
      {
        question: 'How is APY calculated?',
        answer: 'APY (Annual Percentage Yield) is calculated based on trading fees earned, liquidity mining rewards (if applicable), and any additional incentives. The calculation considers compounding and is updated in real-time based on recent trading activity.'
      },
      {
        question: 'What is impermanent loss?',
        answer: 'Impermanent loss occurs when the price ratio of tokens in a liquidity pool changes compared to when you deposited them. In DLMM pools, you can minimize this by concentrating liquidity around the current price or using single-sided strategies.'
      }
    ]
  },
  {
    title: 'Dynamic Vaults',
    icon: Shield,
    color: 'purple',
    faqs: [
      {
        question: 'What are Dynamic Vaults?',
        answer: 'Dynamic Vaults are automated strategies that actively manage your liquidity positions. They automatically rebalance, compound rewards, and adjust to market conditions to optimize yield while minimizing risk.'
      },
      {
        question: 'How often do vaults rebalance?',
        answer: 'Rebalancing frequency depends on the vault strategy and market conditions. Most vaults rebalance at least once per day, but some may rebalance more frequently during volatile periods to maintain optimal positions.'
      },
      {
        question: 'Can I withdraw from vaults anytime?',
        answer: 'Yes, you can withdraw from most vaults at any time. However, some vaults may have a small withdrawal fee or a minimum holding period to prevent frequent trading that could harm other vault participants.'
      },
      {
        question: 'What are the vault management fees?',
        answer: 'Management fees vary by vault but typically range from 1-2% annually. Performance fees may also apply (usually 10-20% of profits). All fees are clearly displayed before you deposit into any vault.'
      }
    ]
  },
  {
    title: 'Security & Safety',
    icon: Shield,
    color: 'red',
    faqs: [
      {
        question: 'Is Meteora audited?',
        answer: 'Yes, Meteora has been audited by multiple top-tier security firms including Zellic and OtterSec. All audit reports are publicly available on our documentation site. We also have an ongoing bug bounty program.'
      },
      {
        question: 'How are funds secured?',
        answer: 'All funds are secured by smart contracts on the Solana blockchain. We use multi-signature wallets for admin functions, implement timelock mechanisms for critical updates, and follow security best practices including least privilege access.'
      },
      {
        question: 'What happens if there\'s a bug?',
        answer: 'We have comprehensive monitoring systems and emergency procedures. In case of any issues, we can pause contracts, and we maintain an emergency fund for user protection. We also have insurance coverage through leading DeFi insurance providers.'
      },
      {
        question: 'How do I report a security issue?',
        answer: 'Please report security issues immediately through our bug bounty program or contact security@meteora.ag. Do not post security issues on public forums. We offer substantial rewards for responsible disclosure of security vulnerabilities.'
      }
    ]
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<{[key: string]: boolean}>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleItem = (categoryIndex: number, faqIndex: number) => {
    const key = `${categoryIndex}-${faqIndex}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => 
    selectedCategory === null || 
    category.title === selectedCategory ||
    category.faqs.length > 0
  );

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600 border-blue-200 dark:border-blue-800',
      green: 'from-green-500 to-green-600 border-green-200 dark:border-green-800',
      purple: 'from-purple-500 to-purple-600 border-purple-200 dark:border-purple-800',
      red: 'from-red-500 to-red-600 border-red-200 dark:border-red-800'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
          Find answers to common questions about Meteora DLMM, Dynamic Vaults, and Launch Pools. 
          Can't find what you're looking for? Contact our support team.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="rounded-full"
          >
            All Categories
          </Button>
          {faqCategories.map((category) => (
            <Button
              key={category.title}
              variant={selectedCategory === category.title ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.title)}
              className="rounded-full"
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.title}
            </Button>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="space-y-8">
        {filteredCategories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            {category.faqs.length > 0 && (
              <Card className={`border-2 ${getColorClasses(category.color)}`}>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getColorClasses(category.color)} flex items-center justify-center mr-4`}>
                      <category.icon className="w-5 h-5 text-white" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => {
                      const isOpen = openItems[`${categoryIndex}-${faqIndex}`];
                      return (
                        <div key={faqIndex} className="border border-slate-200 dark:border-slate-700 rounded-lg">
                          <button
                            className="w-full px-6 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={() => toggleItem(categoryIndex, faqIndex)}
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-slate-900 dark:text-slate-100 pr-4">
                                {faq.question}
                              </h3>
                              {isOpen ? (
                                <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                              )}
                            </div>
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-4">
                              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredCategories.every(category => category.faqs.length === 0) && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
            No results found
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Try adjusting your search terms or browse all categories.
          </p>
          <Button onClick={() => {setSearchTerm(''); setSelectedCategory(null);}}>
            Clear Search
          </Button>
        </div>
      )}

      {/* Contact Support */}
      <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border-0">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center text-2xl">
            <MessageCircle className="w-6 h-6 mr-3 text-blue-600" />
            Still Need Help?
          </CardTitle>
          <CardDescription className="text-lg">
            Our support team is here to help you with any questions or issues.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" size="lg">
              <Book className="w-5 h-5 mr-2" />
              View Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}