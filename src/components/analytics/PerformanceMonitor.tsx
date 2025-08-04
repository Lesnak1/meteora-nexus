'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { analytics } from '@/lib/analytics';
import { Activity, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

interface PerformanceMetrics {
  cls: number;
  fid: number;
  fcp: number;
  lcp: number;
  ttfb: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<Partial<PerformanceMetrics>>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show performance monitor in development
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }

    // Update metrics every 5 seconds
    const interval = setInterval(() => {
      const currentMetrics = analytics.getPerformanceMetrics();
      setMetrics(currentMetrics);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const getMetricColor = (metric: string, value: number) => {
    const thresholds: Record<string, { good: number; needsImprovement: number }> = {
      cls: { good: 0.1, needsImprovement: 0.25 },
      fid: { good: 100, needsImprovement: 300 },
      fcp: { good: 1800, needsImprovement: 3000 },
      lcp: { good: 2500, needsImprovement: 4000 },
      ttfb: { good: 800, needsImprovement: 1800 },
    };

    const threshold = thresholds[metric];
    if (!threshold) return 'text-gray-600';

    if (value <= threshold.good) return 'text-green-600';
    if (value <= threshold.needsImprovement) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetricIcon = (metric: string, value: number) => {
    const color = getMetricColor(metric, value);
    if (color.includes('green')) return <TrendingUp className="w-4 h-4" />;
    if (color.includes('yellow')) return <AlertTriangle className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  const formatMetric = (metric: string, value: number) => {
    switch (metric) {
      case 'cls':
        return value.toFixed(3);
      case 'fid':
      case 'fcp':
      case 'lcp':
      case 'ttfb':
        return `${Math.round(value)}ms`;
      default:
        return value.toString();
    }
  };

  const metricLabels: Record<string, string> = {
    cls: 'Cumulative Layout Shift',
    fid: 'First Input Delay',
    fcp: 'First Contentful Paint',
    lcp: 'Largest Contentful Paint',
    ttfb: 'Time to First Byte',
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-80 bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-600" />
            Performance Monitor
            <span className="text-xs text-slate-500">(Dev)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(metrics).map(([metric, value]) => (
            <div key={metric} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {getMetricIcon(metric, value)}
                <span className="font-medium">{metricLabels[metric] || metric}</span>
              </div>
              <span className={`font-mono ${getMetricColor(metric, value)}`}>
                {formatMetric(metric, value)}
              </span>
            </div>
          ))}
          {Object.keys(metrics).length === 0 && (
            <div className="text-center text-slate-500 text-sm py-4">
              <Clock className="w-4 h-4 mx-auto mb-2" />
              Loading metrics...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 