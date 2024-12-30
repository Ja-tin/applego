"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, DoorOpenIcon as EnterIcon, LaptopIcon, SmartphoneIcon as MobileIcon, SearchIcon, TabletIcon, WatchIcon, HeadphonesIcon, WrenchIcon } from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { products } from "@/lib/stores"

const categoryIcons = {
  phones: MobileIcon,
  laptops: LaptopIcon,
  tablets: TabletIcon,
  watches: WatchIcon,
  audio: HeadphonesIcon,
  accessories: WrenchIcon,
}

export function CommandSearch() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (value: string) => {
    setOpen(false)
    router.push(`/deals?search=${encodeURIComponent(value)}`)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative w-full flex items-center text-sm font-medium px-4 py-2 border rounded-md bg-background hover:bg-accent hover:text-accent-foreground"
      >
        <SearchIcon className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search products...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-2 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search products..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {Object.entries(
            products.reduce((acc, product) => {
              if (!acc[product.category]) {
                acc[product.category] = []
              }
              acc[product.category].push(product)
              return acc
            }, {} as Record<string, typeof products>)
          ).map(([category, categoryProducts]) => (
            <CommandGroup key={category} heading={category.charAt(0).toUpperCase() + category.slice(1)}>
              {categoryProducts.map((product) => {
                const Icon = categoryIcons[product.category as keyof typeof categoryIcons]
                return (
                  <CommandItem
                    key={product.id}
                    value={product.name}
                    onSelect={handleSelect}
                  >
                    {Icon && <Icon className="mr-2 h-4 w-4" />}
                    <span>{product.name}</span>
                    <span className="ml-auto text-muted-foreground">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}

