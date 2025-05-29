"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, ExternalLink, Code, RefreshCw } from "lucide-react"
import AnimatedPage from "@/components/animated-page"
import AnimatedSection from "@/components/animated-section"
import { Button } from "@/components/ui/button"

// Add your GitHub projects here
const projects = [
  {
    title: "Modern Portfolio Website",
    description: "Personal portfolio website built with Next.js 13, featuring dark mode, animations, and a responsive design.",
    image: "https://placehold.co/600x400/2563eb/ffffff?text=Portfolio+Website",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Framer Motion"],
    githubUrl: "https://github.com/vedantmahalle21/portfolio ",
    liveUrl: "https://v0-react-portfolio-website-alpha.vercel.app/",
  },
  {
    title: "Vithai Enterprises",
    description: "A website for a local business that sells a variety of engine products.",
    image: "https://placehold.co/600x400/2563eb/ffffff?text=Task+Manager+API",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Framer Motion"],
    githubUrl: "https://github.com/vedant-mahalle/Vithai-Enterprises",
    liveUrl: "https://vithai-enterprises.vercel.app/",
  },
  {
    title: "Web Chess-Platform",
    description: "Real-time weather application with location search, 5-day forecast, and interactive weather maps.",
    image: "https://placehold.co/600x400/2563eb/ffffff?text=Weather+Dashboard",
    tags: ["React", "OpenWeather API", "Chart.js", "Tailwind CSS"],
    githubUrl: "https://github.com/vedant-mahalle/web-chess",
    // liveUrl: "https://weather-dashboard-demo.com",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce platform with product management, shopping cart, and payment integration.",
    image: "https://placehold.co/600x400/2563eb/ffffff?text=E-Commerce+Platform",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redux"],
    githubUrl: "https://github.com/vedantmahalle21/ecommerce-platform",
    liveUrl: "https://ecommerce-platform-demo.com",
  }
]

export default function PortfolioPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [iframeErrors, setIframeErrors] = useState<Record<string, boolean>>({})

  // Get unique tags from all projects
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)))

  // Filter projects based on selected tag
  const filteredProjects = selectedTag
    ? projects.filter(project => project.tags.includes(selectedTag))
    : projects

  const handleIframeError = (projectTitle: string) => {
    setIframeErrors(prev => ({ ...prev, [projectTitle]: true }))
  }

  const retryIframe = (projectTitle: string) => {
    setIframeErrors(prev => ({ ...prev, [projectTitle]: false }))
  }

  return (
    <AnimatedPage className="p-10">
      <h1 className="text-3xl font-bold mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">My Projects</h1>

      <AnimatedSection delay={0.1} className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Featured <span className="text-blue-500">Projects</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Here are some of my recent projects. Each one is crafted with attention to detail and modern best practices.
        </p>
      </AnimatedSection>

      {/* Filter Tags */}
      <AnimatedSection delay={0.2} className="mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            onClick={() => setSelectedTag(null)}
            className="rounded-full"
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              onClick={() => setSelectedTag(tag)}
              className="rounded-full"
            >
              {tag}
            </Button>
          ))}
        </div>
      </AnimatedSection>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <AnimatedSection key={project.title} delay={0.3 + index * 0.1}>
            <motion.div
              className="bg-white/30 dark:bg-[#1a1a1a]/80 backdrop-blur-lg border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-blue-500 transition-colors duration-300"
              whileHover={{ y: -5 }}
            >
              {/* Project Preview */}
              <div className="relative h-[300px] overflow-hidden bg-gray-100 dark:bg-gray-800">
                {project.liveUrl && !iframeErrors[project.title] ? (
                  <div className="relative w-full h-full group">
                    <div className="absolute inset-0">
                      <iframe
                        src={project.liveUrl}
                        className="w-full h-full"
                        style={{
                          transform: 'scale(1)',
                          transformOrigin: '0 0',
                        }}
                        onError={() => handleIframeError(project.title)}
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-transparent group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    {project.liveUrl && (
                      <button
                        onClick={() => retryIframe(project.title)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      >
                        <RefreshCw className="w-8 h-8 text-white" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </Button>
                  {project.liveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      asChild
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatedSection>
        ))}
      </div>
    </AnimatedPage>
  )
}
