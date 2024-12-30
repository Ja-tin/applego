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
  SheetFooter,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Scale, ArrowRight } from 'lucide-react'
import Image from "next/image"
import { useRouter } from "next/navigation"

interface CompareProduct {
  id: string
  name: string
  price: number
  image: string
}

export function FloatingCompareButton() {
  const [compareProducts, setCompareProducts] = useState<CompareProduct[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedProducts = localStorage.getItem("compareProducts")
    if (storedProducts) {
      setCompareProducts(JSON.parse(storedProducts))
    }

    // Listen for storage changes from other components
    const handleStorageChange = () => {
      const updatedProducts = localStorage.getItem("compareProducts")
      if (updatedProducts) {
        setCompareProducts(JSON.parse(updatedProducts))
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  useEffect(() => {
    setIsVisible(compareProducts.length > 0)
  }, [compareProducts])

  const removeProduct = (id: string) => {
    const updatedProducts = compareProducts.filter(p => p.id !== id)
    setCompareProducts(updatedProducts)
    localStorage.setItem("compareProducts", JSON.stringify(updatedProducts))
  }

  const clearComparison = () => {
    setCompareProducts([])
    localStorage.removeItem("compareProducts")
    setIsOpen(false)
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
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button className="relative" size="lg">
                <Scale className="mr-2 h-5 w-5" />
                Compare Products ({compareProducts.length})
                {compareProducts.length >= 2 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-ping" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[600px]">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-2xl">Compare Products</SheetTitle>
                <SheetDescription>
                  {compareProducts.length < 2 
                    ? "Add at least 2 products to compare"
                    : "Compare products side by side"}
                </SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-[calc(100%-140px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {compareProducts.map((product) => (
                    <div key={product.id} className="relative group">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeProduct(product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="border rounded-lg p-4 group-hover:border-primary transition-colors">
                        <div className="relative h-32 mb-4">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h3 className="font-medium text-sm mb-2">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <SheetFooter className="mt-6">
                <div className="flex justify-between w-full">
                  <Button
                    variant="outline"
                    onClick={clearComparison}
                    disabled={compareProducts.length === 0}
                  >
                    Clear All
                  </Button>
                  <Button
                    onClick={() => {
                      router.push('/compare')
                      setIsOpen(false)
                    }}
                    disabled={compareProducts.length < 2}
                  >
                    Compare Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

