import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/stores"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Zap, Star, FlameIcon as Fire } from 'lucide-react'

export default function TrendingPage() {
  const trendingProducts = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 9)

  const topDeals = products
    .sort((a, b) => {
      const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100
      const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100
      return discountB - discountA
    })
    .slice(0, 3)

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            Trending Now
          </h1>
          <p className="text-muted-foreground">
            Discover what's hot in the world of Apple products
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {topDeals.map((product, index) => (
            <Card key={product.id} className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {index === 0 && <Fire className="h-5 w-5 text-red-500" />}
                  {index === 1 && <Zap className="h-5 w-5 text-yellow-500" />}
                  {index === 2 && <Star className="h-5 w-5 text-green-500" />}
                  Top Deal #{index + 1}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </div>
                <p className="text-sm text-muted-foreground">
                  Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} on {product.name}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trendingProducts.map((product, index) => (
            <div key={product.id} className="relative">
              {index === 0 && (
                <Badge className="absolute -top-2 -left-2 z-10 bg-gradient-to-r from-red-500 to-orange-500 px-2 py-1">
                  <Fire className="h-4 w-4 mr-1" />
                  Most Popular
                </Badge>
              )}
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

