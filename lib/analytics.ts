type EventName = 
  | 'view_product'
  | 'add_to_compare'
  | 'set_price_alert'
  | 'view_store'
  | 'search'
  | 'filter_products'
  | 'sort_products'

interface EventProperties {
  [key: string]: string | number | boolean | undefined
}

export function trackEvent(name: EventName, properties?: EventProperties) {
  // This is a basic implementation that logs to console
  // In production, replace with your analytics provider
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${name}:`, properties)
  }
  
  // Example implementation with Google Analytics
  try {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-ignore
      window.gtag('event', name, properties)
    }
  } catch (error) {
    console.error('Failed to track event:', error)
  }
}

