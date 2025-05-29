import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import Sidebar from "@/components/sidebar"
import { Providers } from "@/components/providers"
import ScrollToTop from "@/components/scroll-to-top"
import ThemeToggle from "@/components/theme-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Vedant Mahalle - Web Designer Portfolio",
  description: "Portfolio website of Vedant Mahalle, Web Designer with over 10 years of experience",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-[#121212] text-gray-900 dark:text-white transition-colors duration-300`}
      >
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            {children}
          </div>
          <ThemeToggle />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  )
}


import './globals.css'