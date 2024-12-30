"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Clock, ArrowRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { products } from "@/lib/stores"

interface RecentProduct {
  id: string
  timestamp: number
}

export function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<typeof products>([])

  useEffect(() => {
    const storedProducts = localStorage.getItem("recentlyViewed")
    if (storedProducts) {
      const recentIds = JSON.parse(storedProducts) as RecentProduct[]
      const sortedProducts = recentIds
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 4)
        .map(recent => products.find(p => p.id === recent.id))
        .filter((p): p is typeof products[0] => p !== undefined)
      setRecentProducts(sortedProducts)
    }
  }, [])

  if (recentProducts.length === 0) return null

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recently Viewed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex w-full gap-4">
            {recentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-[200px]"
              >
                <Link href={`/product/${product.id}`}>
                  <Card className="overflow-hidden group">
                    <div className="relative aspect-square">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4 transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="font-medium line-clamp-1">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{product.price.toLocaleString('en-IN')}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

