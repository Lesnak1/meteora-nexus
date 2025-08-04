import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export interface AnalyticsEvent {
  name: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, unknown>;
}

export interface PerformanceMetrics {
  cls: number;
  fid: number;
  fcp: number;
  lcp: number;
  ttfb: number;
}

class Analytics {
  private isInitialized = false;
  private events: AnalyticsEvent[] = [];
  private performanceMetrics: Partial<PerformanceMetrics> = {};

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeWebVitals();
    }
  }

  private initializeWebVitals() {
    // Core Web Vitals with reportAllChanges: false to avoid unload events
    getCLS(this.handleWebVital.bind(this, 'CLS'), { reportAllChanges: false });
    getFID(this.handleWebVital.bind(this, 'FID'), { reportAllChanges: false });
    getFCP(this.handleWebVital.bind(this, 'FCP'), { reportAllChanges: false });
    getLCP(this.handleWebVital.bind(this, 'LCP'), { reportAllChanges: false });
    getTTFB(this.handleWebVital.bind(this, 'TTFB'), { reportAllChanges: false });
  }

  private handleWebVital(metricName: string, metric: { value: number; id: string; name: string; rating: string; navigationType: string }) {
    const value = metric.value;
    this.performanceMetrics[metricName.toLowerCase() as keyof PerformanceMetrics] = value;
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      // Metric logged: ${metricName}
    }

    // Send to analytics service
    this.trackEvent({
      name: 'web_vital',
      category: 'performance',
      action: metricName,
      value: Math.round(value * 1000) / 1000, // Round to 3 decimal places
      customParameters: {
        metric_id: metric.id,
        metric_name: metric.name,
        metric_value: value,
        metric_rating: metric.rating,
        navigation_type: metric.navigationType,
      }
    });
  }

  public trackEvent(event: AnalyticsEvent) {
    // Add timestamp
    const enrichedEvent = {
      ...event,
      timestamp: Date.now(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    };

    this.events.push(enrichedEvent);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      // Analytics event tracked successfully
    }

    // Send to analytics service (implement your preferred service)
    this.sendToAnalyticsService(enrichedEvent);
  }

  public trackPageView(pageName: string, customParameters?: Record<string, unknown>) {
    this.trackEvent({
      name: 'page_view',
      category: 'navigation',
      action: 'view',
      label: pageName,
      customParameters
    });
  }

  public trackUserInteraction(element: string, action: string, value?: number) {
    this.trackEvent({
      name: 'user_interaction',
      category: 'engagement',
      action,
      label: element,
      value
    });
  }

  public trackError(error: Error, context?: Record<string, unknown>) {
    this.trackEvent({
      name: 'error',
      category: 'error',
      action: 'occurred',
      label: error.message,
      customParameters: {
        error_name: error.name,
        error_stack: error.stack,
        ...context
      }
    });
  }

  public trackWalletConnection(walletType: string, success: boolean) {
    this.trackEvent({
      name: 'wallet_connection',
      category: 'wallet',
      action: success ? 'connected' : 'failed',
      label: walletType
    });
  }

  public trackPoolInteraction(poolName: string, action: string) {
    this.trackEvent({
      name: 'pool_interaction',
      category: 'pools',
      action,
      label: poolName
    });
  }

  public trackAnalyticsFilter(filterType: string, value: string) {
    this.trackEvent({
      name: 'analytics_filter',
      category: 'analytics',
      action: 'filter_applied',
      label: `${filterType}: ${value}`
    });
  }

  public trackStrategyInteraction(strategyName: string, action: string) {
    this.trackEvent({
      name: 'strategy_interaction',
      category: 'strategies',
      action,
      label: strategyName
    });
  }

  public getPerformanceMetrics(): Partial<PerformanceMetrics> {
    return { ...this.performanceMetrics };
  }

  public getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  public clearEvents() {
    this.events = [];
  }

  private sendToAnalyticsService(event: AnalyticsEvent & { timestamp: number; url: string; userAgent: string }) {
    // Implement your preferred analytics service here
    // Examples: Google Analytics, Mixpanel, Amplitude, etc.
    
    // For now, we'll use a simple endpoint
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Send to your analytics endpoint
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }).catch(error => {
        console.error('Failed to send analytics event:', error);
      });
    }
  }

  public initialize() {
    if (this.isInitialized) return;
    
    this.isInitialized = true;
    
    // Track initial page view
    if (typeof window !== 'undefined') {
      this.trackPageView(window.location.pathname);
      
      // Track navigation changes
      window.addEventListener('popstate', () => {
        this.trackPageView(window.location.pathname);
      });
    }
  }
}

// Create singleton instance
export const analytics = new Analytics();

// Initialize on client side
if (typeof window !== 'undefined') {
  analytics.initialize();
}

// Export convenience functions
export const trackEvent = (event: AnalyticsEvent) => analytics.trackEvent(event);
export const trackPageView = (pageName: string, customParameters?: Record<string, unknown>) => 
  analytics.trackPageView(pageName, customParameters);
export const trackUserInteraction = (element: string, action: string, value?: number) => 
  analytics.trackUserInteraction(element, action, value);
export const trackError = (error: Error, context?: Record<string, unknown>) => 
  analytics.trackError(error, context);
export const trackWalletConnection = (walletType: string, success: boolean) => 
  analytics.trackWalletConnection(walletType, success);
export const trackPoolInteraction = (poolName: string, action: string) => 
  analytics.trackPoolInteraction(poolName, action);
export const trackAnalyticsFilter = (filterType: string, value: string) => 
  analytics.trackAnalyticsFilter(filterType, value);
export const trackStrategyInteraction = (strategyName: string, action: string) => 
  analytics.trackStrategyInteraction(strategyName, action); 