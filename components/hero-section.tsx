"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"

export default function HeroSection() {
  const { theme } = useTheme()
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  return (
    <div className="relative min-h-screen px-6 md:px-10 py-20 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
      {/* Content */}
      <div className="w-full md:w-1/2 max-w-xl z-10">
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          Hello, my name is <span className="font-medium text-blue-500">Vedant Mahalle</span>
        </p>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          I'm a <span className="text-blue-500">Web Designer!</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
          I'm a Web Designer with extensive experience for over 10 years. My expertise is to create and website design,
          graphic design, and many more...
        </p>
        <Link href="/about">
          <Button 
            className={cn(
              "rounded-full px-8 py-6 text-lg relative overflow-hidden group",
              "bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
            )}
          >
            <span className="relative z-10">Meet About Me</span>
            <span className="absolute inset-0 bg-white/20 dark:bg-blue-400/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
          </Button>
        </Link>
      </div>

      {/* Image Section */}
      <div className="relative w-full md:w-1/2 max-w-md aspect-[4/5] z-10">
        {/* Glass card effect */}
        <div 
          className={cn(
            "absolute inset-0 -m-6 rounded-2xl backdrop-blur-lg border shadow-xl",
            "bg-white/5 dark:bg-black/20",
            "border-white/10 dark:border-white/5"
          )}
        />

        {/* Corner accents */}
        <div className="absolute -top-4 -right-4 w-16 h-16 border-t-4 border-r-4 border-blue-500" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-4 border-l-4 border-blue-500" />

        {/* Image container */}
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          {/* Placeholder */}
          <div 
            className={cn(
              "absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse",
              imageLoaded && "hidden"
            )} 
          />
          
          <Image
            src="/images/profile.jpg"
            alt="Vedant Mahalle - Web Designer"
            fill
            className={cn(
              "object-cover transition-opacity duration-300",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            onLoad={handleImageLoad}
          />
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-blue-500/20 rounded-lg blur-lg opacity-50" />
      </div>
    </div>
  )
}