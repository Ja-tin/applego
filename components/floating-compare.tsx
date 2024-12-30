"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Scale } from 'lucide-react'

interface CompareProduct {
  id: string
  name: string
  price: number
  image: string
}

export function FloatingCompare() {
  const [compareProducts, setCompareProducts] = useState<CompareProduct[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const storedProducts = localStorage.getItem("compareProducts")
    if (storedProducts) {
      setCompareProducts(JSON.parse(storedProducts))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("compareProducts", JSON.stringify(compareProducts))
    setIsVisible(compareProducts.length > 0)
  }, [compareProducts])

  const removeProduct = (id: string) => {
    setCompareProducts(products => products.filter(p => p.id !== id))
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Sheet>
            <SheetTrigger asChild>
              <Button className="relative">
                <Scale className="mr-2 h-4 w-4" />
                Compare ({compareProducts.length})
                {compareProducts.length >= 2 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-ping" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[600px]">
              <SheetHeader>
                <SheetTitle>Compare Products</SheetTitle>
                <SheetDescription>
                  Compare up to 4 products side by side
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-full py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {compareProducts.map((product) => (
                    <div key={product.id} className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={() => removeProduct(product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="border rounded-lg p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-32 object-contain mb-2"
                        />
                        <h3 className="font-medium text-sm">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

