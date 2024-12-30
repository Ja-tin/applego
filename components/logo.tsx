import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  variant?: "horizontal" | "vertical"
  className?: string
}

export function Logo({ variant = "horizontal", className }: LogoProps) {
  return (
    <Link href="/" className={className}>
      <div className="relative flex items-center gap-2">
        <Image
          src={variant === "horizontal" 
            ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/applegoLogo-kDpnATlMRbl6754dRnrzz9672hFNe7.webp"
            : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/appleGo_image-dEH1HTaHDQILk03s7tAn5ZqYdbHKEu.webp"
          }
          alt="AppleGo Logo"
          width={variant === "horizontal" ? 40 : 120}
          height={variant === "horizontal" ? 40 : 120}
          className="object-contain"
          priority
        />
      </div>
    </Link>
  )
}

