"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowRight, ShoppingCart, MapPin, Percent } from 'lucide-react'

export function HeroSection() {
  const router = useRouter()

  return (
    <div className="relative w-full min-h-[500px] lg:min-h-[600px] bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/appleGo_image-dEH1HTaHDQILk03s7tAn5ZqYdbHKEu.webp"
          alt="AppleGo Banner"
          fill
          className="object-cover opacity-20"
          priority
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
        >
          Smart Shopping
          <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent block mt-2">
            Better Savings
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-300 mb-12 max-w-2xl"
        >
          Your one-stop destination for the best Apple deals across India. Compare prices, find stores, and save big on your next purchase.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
            >
              <feature.icon className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8"
            onClick={() => router.push('/deals')}
          >
            Explore Deals
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-gray-900 px-8"
            onClick={() => router.push('/stores')}
          >
            Find Stores
            <MapPin className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>
  )
}

const features = [
  {
    title: "Price Comparison",
    description: "Compare prices across 100+ authorized retailers instantly",
    icon: ShoppingCart
  },
  {
    title: "Store Locator",
    description: "Find nearest Apple stores and authorized resellers",
    icon: MapPin
  },
  {
    title: "Best Deals",
    description: "Get notified about the latest discounts and offers",
    icon: Percent
  }
]

