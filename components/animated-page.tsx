"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedPageProps {
  children: ReactNode
  className?: string
}

export default function AnimatedPage({ children, className = "" }: AnimatedPageProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className={`flex-1 ${className}`}
    >
      {children}
    </motion.main>
  )
}
