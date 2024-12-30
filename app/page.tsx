import { ProductCard } from "@/components/product-card"
import { StoreLocator } from "@/components/store-locator"
import { products } from "@/lib/stores"
import { HeroSection } from "@/components/hero-section"
import { RecentlyViewed } from "@/components/recently-viewed"
import { PageTransition } from "@/components/page-transition"

export default function Home() {
  const featuredProducts = products
    .filter(product => product.isBestDeal || product.rating >= 4.7)
    .slice(0, 6)

  return (
    <PageTransition>
      <div>
        <HeroSection />
        <div className="container py-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-3">
              <StoreLocator />
            </div>
            <div className="col-span-12 md:col-span-9 space-y-6">
              <RecentlyViewed />
              <h2 className="text-2xl font-bold">Featured Deals</h2>
              {featuredProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No featured deals available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

