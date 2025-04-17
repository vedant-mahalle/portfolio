"use client"

import { type ReactNode, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { ThemeProvider } from "next-themes"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"
import { Lenis as ReactLenis } from "@studio-freight/react-lenis"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase)
}

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Custom GSAP ease
    CustomEase.create("cubic-expo", "0.19, 1, 0.22, 1")
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: false }}>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </ReactLenis>
    </ThemeProvider>
  )
}
