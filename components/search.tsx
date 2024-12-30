"use client"

import { useState } from "react"
import { SearchIcon } from 'lucide-react'
import { Input } from "@/components/ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function Search() {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full max-w-sm lg:max-w-lg">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
            <SearchIcon className="h-4 w-4 shrink-0 opacity-50" />
            <Input
              className="flex w-full border-0 bg-transparent p-0 pl-2 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search electronics..."
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search electronics..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>iPhone 15 Pro</CommandItem>
                <CommandItem>MacBook Air</CommandItem>
                <CommandItem>iPad Pro</CommandItem>
                <CommandItem>AirPods Pro</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

