"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import AnimatedPage from "@/components/animated-page"
import AnimatedSection from "@/components/animated-section"
import TiltCard from "@/components/tilt-card"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "gsap"

type Category = "all" | "web" | "app" | "design"

interface Project {
  id: number
  title: string
  category: Exclude<Category, "all">
  image: string
  link: string
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const portfolioRef = useRef(null)

  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Website",
      category: "web",
      image: "/placeholder.svg?height=300&width=400",
      link: "#",
    },
    {
      id: 2,
      title: "Mobile Banking App",
      category: "app",
      image: "/placeholder.svg?height=300&width=400",
      link: "#",
    },
    {
      id: 3,
      title: "Brand Identity Design",
      category: "design",
      image: "/placeholder.svg?height=300&width=400",
      link: "#",
    },
    {
      id: 4,
      title: "Portfolio Website",
      category: "web",
      image: "/placeholder.svg?height=300&width=400",
      link: "#",
    },
    {
      id: 5,
      title: "Fitness Tracking App",
      category: "app",
      image: "/placeholder.svg?height=300&width=400",
      link: "#",
    },
    {
      id: 6,
      title: "Logo Collection",
      category: "design",
      image: "/placeholder.svg?height=300&width=400",
      link: "#",
    },
  ]

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  const categories: { value: Category; label: string }[] = [
    { value: "all", label: "All" },
    { value: "web", label: "Web Design" },
    { value: "app", label: "App Design" },
    { value: "design", label: "Graphic Design" },
  ]

  useEffect(() => {
    // GSAP animation for staggered appearance
    gsap.from(portfolioRef.current?.querySelectorAll(".portfolio-item"), {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "cubic-expo",
      scrollTrigger: {
        trigger: portfolioRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse",
      },
    })
  }, [])

  return (
    <AnimatedPage className="p-10">
      <h1 className="text-3xl font-bold mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">My Portfolio</h1>

      <AnimatedSection delay={0.1} className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Recent <span className="text-blue-500">Work</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Here are some of my recent projects. I've worked on a variety of projects, from websites to mobile apps and
          branding.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.2} className="flex justify-center mb-10">
        <div className="flex space-x-2 bg-white/30 dark:bg-[#1a1a1a]/80 backdrop-blur-lg p-1 rounded-lg border border-gray-200 dark:border-gray-800">
          {categories.map((category) => (
            <motion.button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-4 py-2 rounded-md transition-colors relative overflow-hidden`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span
                className={`relative z-10 ${
                  activeCategory === category.value ? "text-white" : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {category.label}
              </span>
              {activeCategory === category.value && (
                <motion.div
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 bg-blue-500 rounded-md"
                  initial={false}
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </AnimatedSection>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          ref={portfolioRef}
        >
          {filteredProjects.map((project, index) => (
            <TiltCard key={project.id} className="portfolio-item">
              <motion.div
                className="group relative overflow-hidden rounded-lg h-full bg-white/30 dark:bg-black/30 backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-lg"
                whileHover={{ y: -5 }}
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-blue-400 mb-4 capitalize">{project.category}</p>
                  <motion.a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition-colors w-fit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Project <ExternalLink size={16} />
                  </motion.a>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-blue-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>
      </AnimatePresence>
    </AnimatedPage>
  )
}
