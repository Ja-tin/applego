export function trackProductView(productId: string) {
  try {
    const stored = localStorage.getItem("recentlyViewed")
    const recent = stored ? JSON.parse(stored) : []
    
    // Remove if exists and add to front
    const updated = [
      { id: productId, timestamp: Date.now() },
      ...recent.filter((item: any) => item.id !== productId)
    ].slice(0, 10) // Keep last 10

    localStorage.setItem("recentlyViewed", JSON.stringify(updated))
  } catch (error) {
    console.error("Failed to track product view:", error)
  }
}

