"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface MetaButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

export const MetaButton = forwardRef<HTMLButtonElement, MetaButtonProps>(
  ({ children, className, variant, size, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <motion.span
          initial={false}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 flex items-center justify-center"
        >
          {children}
        </motion.span>
        <motion.div
          className="absolute inset-0 z-0 bg-primary/5"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </Button>
    )
  }
)
MetaButton.displayName = "MetaButton"

