'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle,
  Mail,
  Clock,
  HeadphonesIcon,
  FileText,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Send,
  User,
  HelpCircle
} from 'lucide-react';

const supportChannels = [
  {
    title: 'Discord Community',
    description: 'Join our active community for real-time help and discussions',
    icon: MessageCircle,
    action: 'Join Discord',
    href: 'https://discord.gg/meteora',
    color: 'from-indigo-500 to-purple-600',
    responseTime: 'Usually within minutes'
  },
  {
    title: 'Email Support',
    description: 'Send detailed questions and get comprehensive answers',
    icon: Mail,
    action: 'Send Email',
    href: 'mailto:support@meteora.ag',
    color: 'from-blue-500 to-cyan-600',
    responseTime: 'Within 24 hours'
  },
  {
    title: 'Live Chat',
    description: 'Chat with our support team during business hours',
    icon: HeadphonesIcon,
    action: 'Start Chat',
    href: '#',
    color: 'from-green-500 to-emerald-600',
    responseTime: 'Immediate (9 AM - 6 PM UTC)'
  },
  {
    title: 'Bug Reports',
    description: 'Report technical issues and get priority assistance',
    icon: AlertCircle,
    action: 'Report Bug',
    href: 'https://github.com/meteora-ag/issues',
    color: 'from-red-500 to-pink-600',
    responseTime: 'Within 12 hours'
  }
];

const commonIssues = [
  {
    title: 'Wallet Connection Issues',
    description: 'Problems connecting or switching wallets',
    icon: AlertCircle,
    color: 'text-orange-500'
  },
  {
    title: 'Transaction Failures',
    description: 'Failed or stuck transactions',
    icon: AlertCircle,
    color: 'text-red-500'
  },
  {
    title: 'Pool Performance Questions',
    description: 'Questions about APY, fees, or returns',
    icon: HelpCircle,
    color: 'text-blue-500'
  },
  {
    title: 'Withdrawal Problems',
    description: 'Issues with withdrawing funds or claiming rewards',
    icon: AlertCircle,
    color: 'text-purple-500'
  }
];

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // Support form submitted successfully
    // Reset form or show success message
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
          Support Center
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
          We're here to help! Choose the best way to get in touch with our support team. 
          Most questions are answered within a few hours.
        </p>
        
        <div className="flex items-center justify-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            24/7 Community Support
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-blue-500" />
            Fast Response Times
          </div>
        </div>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {supportChannels.map((channel, index) => (
          <Card key={index} className="group hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border-0 overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${channel.color}`} />
            <CardHeader className="pb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${channel.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <channel.icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                {channel.title}
              </CardTitle>
              <CardDescription className="text-sm">
                {channel.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-center text-xs text-slate-500 mb-2">
                  <Clock className="w-3 h-3 mr-1" />
                  Response Time
                </div>
                <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {channel.responseTime}
                </div>
              </div>
              <Button 
                className="w-full group-hover:bg-blue-600 group-hover:text-white transition-all duration-200" 
                variant="outline"
                onClick={() => window.open(channel.href, '_blank')}
              >
                {channel.action}
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Send className="w-6 h-6 mr-3 text-blue-600" />
              Send us a Message
            </CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Priority Level
                </label>
                <select
                  id="priority"
                  name="priority"
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option value="low">Low - General inquiry</option>
                  <option value="medium">Medium - Account or feature question</option>
                  <option value="high">High - Transaction or technical issue</option>
                  <option value="urgent">Urgent - Security concern or fund access</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please provide as much detail as possible about your issue..."
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Common Issues & Quick Help */}
        <div className="space-y-6">
          {/* Common Issues */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <HelpCircle className="w-5 h-5 mr-3 text-orange-500" />
                Common Issues
              </CardTitle>
              <CardDescription>
                Quick solutions for frequently reported problems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commonIssues.map((issue, index) => (
                  <div key={index} className="flex items-start p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <issue.icon className={`w-5 h-5 mr-3 mt-0.5 ${issue.color}`} />
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                        {issue.title}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {issue.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status & Updates */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-green-800 dark:text-green-200">
                <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">API Services</span>
                  <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">DLMM Pools</span>
                  <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">Dynamic Vaults</span>
                  <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    Operational
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4 border-green-300 text-green-700 hover:bg-green-600 hover:text-white dark:border-green-700 dark:text-green-300">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Status Page
              </Button>
            </CardContent>
          </Card>

          {/* Quick Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <FileText className="w-5 h-5 mr-3 text-blue-500" />
                Quick Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <FileText className="w-4 h-4 mr-3" />
                  Documentation
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <HelpCircle className="w-4 h-4 mr-3" />
                  FAQ
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <ExternalLink className="w-4 h-4 mr-3" />
                  Video Tutorials
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <MessageCircle className="w-4 h-4 mr-3" />
                  Community Forum
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}