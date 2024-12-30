import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { Toaster } from "@/components/ui/toaster"
import { Logo } from "@/components/logo"
import { FloatingCompareButton } from "@/components/floating-compare-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AppleGo - Find the Best Apple Deals in India",
  description: "Compare Apple product prices across 100+ stores in India",
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/applegoLogo-kDpnATlMRbl6754dRnrzz9672hFNe7.webp",
        href: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/applegoLogo-kDpnATlMRbl6754dRnrzz9672hFNe7.webp",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative min-h-screen flex flex-col">
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center">
                  <MainNav />
                </div>
              </header>

              <main className="flex-1">
                {children}
              </main>

              <footer className="border-t py-6 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                  <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <Logo variant="horizontal" className="w-8 h-8" />
                    <p className="text-center text-sm leading-loose md:text-left">
                      AppleGo - Your trusted source for Apple product price comparison in India
                    </p>
                  </div>
                  <p className="text-center text-sm text-muted-foreground md:text-right">
                    Disclaimer: Prices and availability are subject to change
                  </p>
                </div>
              </footer>
            </div>
            <FloatingCompareButton />
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
  )
}

