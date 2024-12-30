"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"
import { Smartphone, Laptop, Tablet, Headphones, Watch, Speaker, Tv, Camera, ArrowRight } from 'lucide-react'

const categories = [
  {
    name: "Smartphones",
    icon: Smartphone,
    count: 24,
    href: "/deals?category=phones",
    color: "from-blue-500 to-blue-600",
    gradient: "from-blue-500/20 to-blue-600/20",
    description: "Latest iPhones and accessories"
  },
  {
    name: "Laptops",
    icon: Laptop,
    count: 18,
    href: "/deals?category=laptops",
    color: "from-purple-500 to-purple-600",
    gradient: "from-purple-500/20 to-purple-600/20",
    description: "MacBooks and related accessories"
  },
  {
    name: "Tablets",
    icon: Tablet,
    count: 12,
    href: "/deals?category=tablets",
    color: "from-pink-500 to-pink-600",
    gradient: "from-pink-500/20 to-pink-600/20",
    description: "iPads and accessories"
  },
  {
    name: "Audio",
    icon: Headphones,
    count: 45,
    href: "/deals?category=audio",
    color: "from-green-500 to-green-600",
    gradient: "from-green-500/20 to-green-600/20",
    description: "AirPods, HomePod, and more"
  },
  {
    name: "Watches",
    icon: Watch,
    count: 15,
    href: "/deals?category=watches",
    color: "from-yellow-500 to-yellow-600",
    gradient: "from-yellow-500/20 to-yellow-600/20",
    description: "Apple Watch and bands"
  },
  {
    name: "TV & Home",
    icon: Tv,
    count: 8,
    href: "/deals?category=tv",
    color: "from-red-500 to-red-600",
    gradient: "from-red-500/20 to-red-600/20",
    description: "Apple TV and accessories"
  },
  {
    name: "Cameras",
    icon: Camera,
    count: 10,
    href: "/deals?category=cameras",
    color: "from-indigo-500 to-indigo-600",
    gradient: "from-indigo-500/20 to-indigo-600/20",
    description: "Security cameras and accessories"
  },
  {
    name: "Speakers",
    icon: Speaker,
    count: 14,
    href: "/deals?category=speakers",
    color: "from-orange-500 to-orange-600",
    gradient: "from-orange-500/20 to-orange-600/20",
    description: "Smart speakers and sound systems"
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
}

export default function CategoriesPage() {
  return (
    <div className="container py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2 mb-8"
      >
        <h1 className="text-3xl font-bold">Browse Categories</h1>
        <p className="text-muted-foreground">
          Explore our wide range of Apple products and accessories
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <motion.div key={category.name} variants={item}>
              <Link href={category.href}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
                  <CardHeader className={`relative p-6 bg-gradient-to-r ${category.gradient}`}>
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${category.color}" />
                    <CardTitle className="flex items-center gap-3 relative z-10 group-hover:text-white transition-colors duration-300">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                          {category.count} items
                        </Badge>
                        <motion.div
                          initial={false}
                          animate={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          className="flex items-center text-sm text-primary"
                        >
                          Browse
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

