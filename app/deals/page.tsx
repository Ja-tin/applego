"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Filters } from "@/components/filters"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/stores"
import { Button } from "@/components/ui/button"
import { CommandSearch } from "@/components/command-search"

export default function DealsPage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search") || ""
  
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [priceRange, setPriceRange] = useState([0, 200000])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("relevance")
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  // Filter and sort products
  useEffect(() => {
    let result = [...products].filter(product => {
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(localSearchQuery.toLowerCase())
      return matchesPrice && matchesCategory && matchesSearch
    })

    // Sort products
    result = result.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "discount":
          const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100
          const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100
          return discountB - discountA
        default:
          return 0
      }
    })

    setFilteredProducts(result)
  }, [priceRange, selectedCategory, sortBy, localSearchQuery])

  // Update local search when URL param changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery)
  }, [searchQuery])

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Latest Deals</h1>
          <p className="text-muted-foreground">
            Find the best prices on Apple products across India
          </p>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3 space-y-6">
            <div className="w-full">
              <CommandSearch />
            </div>
            <Filters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
          <div className="col-span-12 md:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button 
                  onClick={() => {
                    setPriceRange([0, 200000])
                    setSelectedCategory("all")
                    setSortBy("relevance")
                    setLocalSearchQuery("")
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    {...product} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

