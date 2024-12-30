import Image from "next/image"

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-32 h-32 animate-pulse">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/appleGo_image-dEH1HTaHDQILk03s7tAn5ZqYdbHKEu.webp"
            alt="AppleGo Loading"
            fill
            className="object-contain"
          />
        </div>
        <div className="mt-4 text-xl font-semibold animate-pulse">
          Loading amazing deals...
        </div>
      </div>
    </div>
  )
}

