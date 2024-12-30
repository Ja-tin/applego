"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { ArrowUpDown, Tags } from 'lucide-react'

interface FiltersProps {
  priceRange: number[]
  setPriceRange: (value: number[]) => void
  selectedCategory: string
  setSelectedCategory: (value: string) => void
  sortBy: string
  setSortBy: (value: string) => void
}

export function Filters({
  priceRange,
  setPriceRange,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy
}: FiltersProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value)
  }

  const handlePriceRangeChange = (newRange: number[]) => {
    // Ensure the range values are valid numbers
    if (newRange[0] >= 0 && newRange[1] <= 200000) {
      setPriceRange(newRange)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6 border rounded-lg bg-card">
      <div>
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <Tags className="h-4 w-4" />
          Price Range
        </h3>
        <div className="space-y-4">
          <Slider
            defaultValue={[0, 200000]}
            min={0}
            max={200000}
            step={1000}
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            className="py-4"
          />
          <div className="flex justify-between text-sm">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort By: {sortBy.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
            <DropdownMenuRadioItem value="relevance">Relevance</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="price-low">Price: Low to High</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="price-high">Price: High to Low</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="discount">Biggest Discount</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rating">Highest Rated</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            <Tags className="mr-2 h-4 w-4" />
            Category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Category</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={selectedCategory} onValueChange={setSelectedCategory}>
            <DropdownMenuRadioItem value="all">All Categories</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="phones">Phones</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="laptops">Laptops</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="tablets">Tablets</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="watches">Watches</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="audio">Audio</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="accessories">Accessories</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

