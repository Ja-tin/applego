"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Star, MapPin, Scale } from 'lucide-react'
import { motion } from "framer-motion"
import { PriceAlertDialog } from "./price-alert-dialog"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

interface ProductCardProps {
  id: string
  name: string
  image: string
  price: number
  originalPrice: number
  store: string
  storeUrl: string
  rating: number
  location: string
  inStock: boolean
  isBestDeal?: boolean
}

export function ProductCard({
  id,
  name,
  image,
  price,
  originalPrice,
  store,
  storeUrl,
  rating,
  location,
  inStock,
  isBestDeal,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100)
  
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const handleViewAtStore = () => {
    if (storeUrl) {
      window.open(storeUrl, '_blank', 'noopener,noreferrer')
    } else {
      toast({
        title: "Store link unavailable",
        description: "Please visit the store's website directly",
        variant: "destructive"
      })
    }
  }

  const addToCompare = () => {
    try {
      const compareProducts = JSON.parse(localStorage.getItem("compareProducts") || "[]")
      if (compareProducts.length >= 4) {
        toast({
          title: "Compare limit reached",
          description: "You can compare up to 4 products at a time",
          variant: "destructive"
        })
        return
      }
      if (compareProducts.some((p: any) => p.id === id)) {
        toast({
          title: "Already in compare",
          description: "This product is already in your compare list",
          variant: "destructive"
        })
        return
      }
      compareProducts.push({ id, name, price, image })
      localStorage.setItem("compareProducts", JSON.stringify(compareProducts))
      toast({
        title: "Added to compare",
        description: "Product added to comparison list"
      })
      window.dispatchEvent(new Event("storage"))
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not add product to compare list",
        variant: "destructive"
      })
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader className="p-0">
          <div className="relative aspect-square">
            <motion.div
              animate={{
                scale: isHovered ? 1.05 : 1,
                rotateY: isHovered ? 10 : 0
              }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <Image
                src={image}
                alt={name}
                fill
                className="object-contain aspect-square w-full transition-all"
                priority
              />
            </motion.div>
            {isBestDeal && (
              <Badge className="absolute top-2 right-2 bg-green-500">
                Best Deal
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="grid gap-2.5 p-4">
          <CardTitle className="line-clamp-2 text-base">{name}</CardTitle>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm text-muted-foreground">{rating}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">{formatPrice(price)}</span>
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(originalPrice)}
            </span>
            <Badge variant="secondary" className="ml-auto">
              {discount}% OFF
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {location}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex flex-col gap-2">
          <Button 
            className="w-full" 
            variant={inStock ? "default" : "secondary"} 
            disabled={!inStock}
            onClick={handleViewAtStore}
          >
            {inStock ? (
              <>
                <span className="truncate">View at {store}</span>
                <ArrowUpRight className="ml-2 h-4 w-4 shrink-0" />
              </>
            ) : (
              "Out of Stock"
            )}
          </Button>
          <div className="flex gap-2 w-full">
            <PriceAlertDialog productName={name} currentPrice={price} />
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1" 
              onClick={addToCompare}
            >
              <Scale className="mr-2 h-4 w-4" />
              Compare
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

