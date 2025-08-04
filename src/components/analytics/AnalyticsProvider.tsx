'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { analytics, trackPageView, trackError } from '@/lib/analytics';
import type { AnalyticsEvent } from '@/lib/analytics';

interface AnalyticsContextType {
  trackEvent: (event: AnalyticsEvent) => void;
  trackUserInteraction: (element: string, action: string, value?: number) => void;
  trackError: (error: Error, context?: Record<string, unknown>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views on route changes
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    // Global error tracking
    const handleError = (event: ErrorEvent) => {
      trackError(new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        type: 'unhandled_error'
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackError(new Error(event.reason), {
        type: 'unhandled_rejection'
      });
    };

    // Add global error listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  const contextValue: AnalyticsContextType = {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackUserInteraction: analytics.trackUserInteraction.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
} 