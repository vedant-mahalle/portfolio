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
    category: "Web Development",
  },
  {
    title: "Vithai Enterprises(Sponser)",
    description: "A website for a local business that sells a variety of engine products.",
    image: "https://placehold.co/600x400/2563eb/ffffff?text=Task+Manager+API",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Framer Motion"],
    githubUrl: "https://github.com/vedant-mahalle/Vithai-Enterprises",
    liveUrl: "https://vithai-enterprises.vercel.app/",
    category: "Web Development",
  },
  {
    title: "Movie Stremer",
    description: "A responsive movie streaming platform built with Next.js and integrated with TMDB API for movie data.",
    image: "https://placehold.co/600x400/2563eb/ffffff?text=Movie+Stremer",
    tags: ["Next.js", "React", "Tailwind CSS", "TMDB API", "Video.js"],
    githubUrl: "https://github.com/vedant-mahalle/movie-stremer",
    liveUrl: "https://movie-stremer.vercel.app/",
    category: "Web Development",
  },
  {
    title: "Food Recommendation System",
    description: "An intelligent system that recommends personalized meal plans based on BMI calculations and nutritional requirements. Built with Flask and machine learning algorithms.",
    image: "https://placehold.co/600x400/2563eb/ffffff?text=Food+Recommendation",
    tags: ["Python", "Flask", "Machine Learning", "CSV Data Processing", "BMI Analysis"],
    githubUrl: "https://github.com/vedant-mahalle/foodrecomendation",
    category: "Machine Learning",
  },
  {
    title: "Web Chess-Platform",
    description: "Interactive chess platform with real-time gameplay, move validation, and multiplayer support. Features include game state management, piece movement animations, and checkmate detection.",
    image: "https://placehold.co/600x400/2563eb/ffffff?text=Chess",
    tags: ["React", "JavaScript", "Chess.js", "Socket.io", "CSS3"],
    githubUrl: "https://github.com/vedant-mahalle/web-chess",
    category: "DSA & Algorithms",
  },
  {
    title: "Data Structures & Algorithms",
    description: "A comprehensive collection of DSA implementations and problem solutions in multiple programming languages.",
    image: "https://placehold.co/600x400/2563eb/ffffff?text=DSA",
    tags: ["Java", "Python", "C++", "Algorithms", "Data Structures"],
    githubUrl: "https://github.com/vedantmahalle21/DSA",
    category: "DSA & Algorithms",
  },
  {
    title: "Machine Learning Projects",
    description: "Collection of ML projects including image classification, natural language processing, and predictive analytics.",
    image: "https://placehold.co/600x400/2563eb/ffffff?text=ML+Projects",
    tags: ["Python", "TensorFlow", "PyTorch", "Scikit-learn"],
    githubUrl: "https://github.com/vedantmahalle21/ml-projects",
    category: "Machine Learning",
  }
]

export default function PortfolioPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [iframeErrors, setIframeErrors] = useState<Record<string, boolean>>({})

  // Get unique tags and categories from all projects
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)))
  const allCategories = Array.from(new Set(projects.map(project => project.category)))

  // Filter projects based on selected tag and category
  const filteredProjects = projects.filter(project => {
    const matchesTag = selectedTag ? project.tags.includes(selectedTag) : true
    const matchesCategory = selectedCategory ? project.category === selectedCategory : true
    return matchesTag && matchesCategory
  })

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
          Here are some of my projects across different domains - from web development to algorithms and machine learning.
        </p>
      </AnimatedSection>

      {/* Category Filter */}
      <AnimatedSection delay={0.2} className="mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="rounded-full"
          >
            All Categories
          </Button>
          {allCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </AnimatedSection>

      {/* Tag Filter */}
      <AnimatedSection delay={0.3} className="mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            onClick={() => setSelectedTag(null)}
            className="rounded-full"
          >
            All Tags
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
          <AnimatedSection key={project.title} delay={0.4 + index * 0.1}>
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
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <span className="text-sm text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
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
