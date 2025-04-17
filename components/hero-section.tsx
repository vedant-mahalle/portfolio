"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { useTheme } from "next-themes"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const buttonColor = "bg-blue-500 hover:bg-blue-600"
  const accentColor = "border-blue-500"
  const textAccentColor = "text-blue-500"

  const [isLoaded, setIsLoaded] = useState(false)
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)

  // Mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const x = clientX / window.innerWidth - 0.5
      const y = clientY / window.innerHeight - 0.5
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    setIsLoaded(true)

    // GSAP animation timeline
    const tl = gsap.timeline()

    tl.from(textRef.current.querySelectorAll(".gsap-text"), {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "cubic-expo",
    })

    tl.from(
      imageRef.current,
      {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "cubic-expo",
      },
      "-=0.8",
    )

    // Scroll trigger for parallax
    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: 200,
      opacity: 0.5,
      ease: "none",
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div
      ref={heroRef}
      className="relative flex flex-col md:flex-row items-center justify-between h-screen px-10 overflow-hidden"
    >
      {/* Content */}
      <motion.div
        ref={textRef}
        className="max-w-xl z-10"
        style={{
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
        }}
      >
        <motion.p className="text-gray-500 dark:text-gray-400 mb-1 gsap-text">
          Hello, my name is <span className={`font-medium ${textAccentColor}`}>Vedant Mahalle</span>
        </motion.p>
        <motion.h1 className="text-4xl md:text-6xl font-bold mb-4 gsap-text">
          I'm a <span className={textAccentColor}>Web Designer!</span>
        </motion.h1>
        <motion.p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md gsap-text">
          I'm a Web Designer with extensive experience for over 10 years. My expertise is to create and website design,
          graphic design, and many more...
        </motion.p>
        <motion.div className="gsap-text">
          <Link href="/about">
            <Button className={`${buttonColor} rounded-full px-8 py-6 text-lg relative overflow-hidden group`}>
              <span className="relative z-10">Meet About Me</span>
              <span className="absolute inset-0 bg-white dark:bg-blue-400 opacity-20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        ref={imageRef}
        className="relative mt-10 md:mt-0 z-10"
        style={{
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
        }}
      >
        {/* Glass card effect */}
        <div className="absolute inset-0 -m-6 rounded-2xl bg-white/5 dark:bg-black/20 backdrop-blur-lg border border-white/10 dark:border-white/5 shadow-xl"></div>

        {/* Top-right corner accent */}
        <motion.div
          className={`absolute -top-4 -right-4 w-16 h-16 border-t-4 border-r-4 ${accentColor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 1 }}
        ></motion.div>

        {/* Image */}
        <div className="relative z-10 w-[280px] h-[350px] overflow-hidden rounded-lg">
          <Image
            src="/placeholder.svg?height=350&width=280"
            alt="Vedant Mahalle"
            width={280}
            height={350}
            className="object-cover"
            priority
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        {/* Bottom-left corner accent */}
        <motion.div
          className={`absolute -bottom-4 -left-4 w-16 h-16 border-b-4 border-l-4 ${accentColor}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 1 }}
        ></motion.div>

        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-blue-500/20 rounded-lg blur-lg opacity-50"></div>
      </motion.div>

      {/* Code particles */}
      {/* <div className="absolute inset-0 -z-5">
        <div className="absolute w-full h-full">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-xs text-blue-500/30 dark:text-blue-400/20 font-mono"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {
                [
                  "{}",
                  "[]",
                  "()",
                  "</>",
                  "&&",
                  "||",
                  "=>",
                  "function()",
                  "const",
                  "let",
                  "import",
                  "export",
                  "return",
                  "async",
                  "await",
                ][Math.floor(Math.random() * 15)]
              }
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}
