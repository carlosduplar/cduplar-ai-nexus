export interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
  tti?: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private isSupported = typeof window !== 'undefined' && 'performance' in window;

  constructor() {
    if (!this.isSupported) return;

    this.observeWebVitals();
    this.measureNavigationTiming();
  }

  private observeWebVitals() {
    if (!this.isSupported || !('PerformanceObserver' in window)) return;

    try {
      // First Contentful Paint (FCP)
      const paintObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
            this.logMetric('FCP', entry.startTime);
          }
        }
      });
      paintObserver.observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { renderTime?: number; loadTime?: number };
        this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime || lastEntry.startTime;
        this.logMetric('LCP', this.metrics.lcp);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as PerformanceEventTiming;
          this.metrics.fid = fidEntry.processingStart - fidEntry.startTime;
          this.logMetric('FID', this.metrics.fid);
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value || 0;
            this.metrics.cls = clsValue;
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('Error setting up performance observers:', e);
    }
  }

  private measureNavigationTiming() {
    if (!this.isSupported) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

        if (navigationEntry) {
          // Time to First Byte (TTFB)
          this.metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
          this.logMetric('TTFB', this.metrics.ttfb);

          // Time to Interactive (TTI) - approximation
          this.metrics.tti = navigationEntry.domInteractive - navigationEntry.fetchStart;
          this.logMetric('TTI', this.metrics.tti);
        }
      }, 0);
    });
  }

  private logMetric(name: string, value: number) {
    if (import.meta.env.DEV) {
      console.log(`[Performance] ${name}: ${value.toFixed(2)}ms`);
    }
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public markEvent(eventName: string) {
    if (!this.isSupported) return;

    try {
      performance.mark(eventName);
      if (import.meta.env.DEV) {
        console.log(`[Performance] Marked event: ${eventName}`);
      }
    } catch (e) {
      console.warn('Error marking performance event:', e);
    }
  }

  public measureBetween(startMark: string, endMark: string, measureName: string) {
    if (!this.isSupported) return;

    try {
      performance.measure(measureName, startMark, endMark);
      const measures = performance.getEntriesByName(measureName);
      const duration = measures[measures.length - 1]?.duration;

      if (import.meta.env.DEV && duration !== undefined) {
        console.log(`[Performance] ${measureName}: ${duration.toFixed(2)}ms`);
      }

      return duration;
    } catch (e) {
      console.warn('Error measuring performance:', e);
    }
  }

  public logResourceTimings() {
    if (!this.isSupported || !import.meta.env.DEV) return;

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];

    const slowResources = resources
      .filter(r => r.duration > 500)
      .sort((a, b) => b.duration - a.duration)
      .slice(0, 10);

    if (slowResources.length > 0) {
      console.group('[Performance] Slowest Resources (>500ms)');
      slowResources.forEach(resource => {
        console.log(`${resource.name}: ${resource.duration.toFixed(2)}ms`);
      });
      console.groupEnd();
    }

    const totalTransferSize = resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
    console.log(`[Performance] Total Transfer Size: ${(totalTransferSize / 1024).toFixed(2)} KB`);
  }

  public reportToAnalytics() {
    if (!this.isSupported) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        const metrics = this.getMetrics();

        if (typeof window.gtag === 'function') {
          // Send to Google Analytics
          window.gtag('event', 'performance_metrics', {
            fcp: metrics.fcp,
            lcp: metrics.lcp,
            fid: metrics.fid,
            cls: metrics.cls,
            ttfb: metrics.ttfb,
            tti: metrics.tti,
          });
        }

        if (import.meta.env.DEV) {
          this.logResourceTimings();
        }
      }, 3000);
    });
  }
}

export const performanceMonitor = new PerformanceMonitor();

export default PerformanceMonitor;
