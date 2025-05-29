"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Briefcase, ImageIcon, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function Sidebar() {
  const pathname = usePathname()
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const activeColor = "text-blue-500 hover:bg-blue-500/10"

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: User },
    { href: "/services", label: "Services", icon: Briefcase },
    { href: "/portfolio", label: "Portfolio", icon: ImageIcon },
    { href: "/contact", label: "Contact", icon: Mail },
  ]

  const sidebarVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <motion.aside
      className="w-[240px] min-h-screen bg-gray-50 dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800 flex flex-col transition-colors duration-300"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      <div className="p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold text-blue-500">Vedant</span>
            <div className="w-2 h-2 bg-blue-500"></div>
          </Link>
        </motion.div>
      </div>

      <nav className="mt-8 flex-1">
        <motion.ul className="space-y-2 px-3" variants={sidebarVariants}>
          {links.map((link, index) => {
            const isActive = pathname === link.href
            const Icon = link.icon

            return (
              <motion.li key={link.href} variants={itemVariants}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? `bg-opacity-10 ${activeColor}`
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon size={20} className={isActive ? "" : ""} />
                  <span>{link.label}</span>
                </Link>
              </motion.li>
            )
          })}
        </motion.ul>
      </nav>
    </motion.aside>
  )
}
