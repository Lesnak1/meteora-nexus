'use client';

import React from 'react';
import Link from 'next/link';
import { FOOTER_LINKS } from '@/lib/constants';
import { Github, Twitter, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Meteora Nexus
                </span>
                <span className="text-xs text-slate-500 -mt-1">DeFi Intelligence</span>
              </div>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              The ultimate DeFi intelligence platform for Meteora ecosystem. Advanced analytics, 
              AI-powered strategies, and seamless portfolio management.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://twitter.com/MeteoraAG"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              >
                <Twitter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </a>
              <a
                href="https://discord.gg/meteora"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 text-slate-600 dark:text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors flex items-center gap-1"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.name}
                      {link.href.startsWith('http') && (
                        <ExternalLink className="w-3 h-3" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              © 2025 Meteora Nexus. All rights reserved. Built on Solana.
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <span>Builder:</span>
                <a
                  href="https://github.com/Lesnak1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium transition-colors"
                >
                  <Github className="w-4 h-4" />
                  Lesnak1
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}