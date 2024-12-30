"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Bell, Info } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface PriceAlertDialogProps {
  productName: string
  currentPrice: number
}

export function PriceAlertDialog({ productName, currentPrice }: PriceAlertDialogProps) {
  const [email, setEmail] = useState("")
  const [targetPrice, setTargetPrice] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // This is a demo functionality
    // In a real application, this would connect to a backend service
    toast({
      title: "Demo Feature",
      description: "This is a demo feature. In a real application, you would receive email alerts when the price drops.",
      duration: 5000,
    })
    
    toast({
      title: "Price Alert Set!",
      description: `We'll notify you at ${email} when ${productName} reaches ₹${parseInt(targetPrice).toLocaleString('en-IN')}`,
    })
    
    setOpen(false)
    setEmail("")
    setTargetPrice("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Set Price Alert
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Get notified when price drops</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Set Price Alert
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Demo feature - no actual emails will be sent</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTitle>
          <DialogDescription>
            Get notified when {productName} reaches your target price.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="target-price" className="text-sm font-medium">
              Target Price (₹)
            </label>
            <Input
              id="target-price"
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder={`Current: ₹${currentPrice.toLocaleString('en-IN')}`}
              max={currentPrice}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">Set Alert</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

