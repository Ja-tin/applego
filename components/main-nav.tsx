"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Home, Menu, Tags, TrendingUp, Grid, MapPin } from 'lucide-react'
import { CommandSearch } from "./command-search"
import { Logo } from "./logo"

const routes = [
  {
    name: "Home",
    path: "/",
    icon: Home
  },
  {
    name: "Deals",
    path: "/deals",
    icon: Tags
  },
  {
    name: "Trending",
    path: "/trending",
    icon: TrendingUp
  },
  {
    name: "Categories",
    path: "/categories",
    icon: Grid
  },
  {
    name: "Stores",
    path: "/stores",
    icon: MapPin
  }
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="flex w-full items-center justify-between">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>
              <Logo variant="vertical" className="w-32 mx-auto" />
            </SheetTitle>
            <SheetDescription>
              Find the best Apple deals in India
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-1">
            {routes.map((route) => {
              const Icon = route.icon
              return (
                <Link key={route.path} href={route.path}>
                  <span
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === route.path ? "bg-accent" : "transparent"
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{route.name}</span>
                  </span>
                </Link>
              )
            })}
          </div>
        </SheetContent>
      </Sheet>

      <div className="hidden md:flex">
        <Logo variant="horizontal" />
      </div>

      <nav className="hidden md:flex items-center space-x-6">
        {routes.map((route) => {
          const Icon = route.icon
          return (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathname === route.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{route.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="flex items-center w-[200px] lg:w-[300px]">
        <CommandSearch />
      </div>
    </div>
  )
}

