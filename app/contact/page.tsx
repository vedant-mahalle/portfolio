"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone, Send, Loader2 } from "lucide-react"
import AnimatedPage from "@/components/animated-page"
import AnimatedSection from "@/components/animated-section"
import { motion } from "framer-motion"
import { gsap } from "gsap"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const formRef = useRef(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      // Shake animation for form errors using keyframes
      gsap.to(formRef.current, {
        keyframes: [
          { x: -10 },
          { x: 10 },
          { x: -10 },
          { x: 10 },
          { x: 0 }
        ],
        duration: 0.5,
        ease: "power2.inOut",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitMessage(null)

    // Simulate form submission
    try {
      // In a real application, you would send the form data to your server here
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitMessage({
        type: "success",
        text: "Your message has been sent successfully! I'll get back to you soon.",
      })

      // Success animation
      gsap.from(formRef.current, {
        y: 20,
        opacity: 0.5,
        duration: 0.5,
        ease: "back.out(1.7)",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "There was an error sending your message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      details: "Pune, India",
      href: undefined
    },
    {
      icon: Mail,
      title: "Email",
      details: "vedantmahalle39@gmail.com",
      href: "mailto:vedantmahalle39@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+91 9730665390",
      href: "tel:+919730665390"
    },
  ]

  return (
    <AnimatedPage className="p-10">
      <h1 className="text-3xl font-bold mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">Contact Me</h1>

      <AnimatedSection delay={0.1} className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Get In <span className="text-blue-500">Touch</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Have a project in mind or want to discuss a potential collaboration? Feel free to reach out to me.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1 space-y-6">
          {contactInfo.map((info, index) => (
            <AnimatedSection key={index} delay={0.2 + index * 0.1}>
              <motion.div
                className="bg-white/30 dark:bg-[#1a1a1a]/80 backdrop-blur-lg border border-gray-200 dark:border-gray-800 rounded-lg p-6 flex items-start gap-4 hover:border-blue-500 transition-colors duration-300 shadow-lg"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1)" }}
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <info.icon size={24} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{info.title}</h3>
                  {info.href ? (
                    <a 
                      href={info.href}
                      className="text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      {info.details}
                    </a>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">{info.details}</p>
                  )}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection
          delay={0.5}
          className="lg:col-span-2 bg-white/30 dark:bg-[#1a1a1a]/80 backdrop-blur-lg border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>

          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg ${
                submitMessage.type === "success" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
              }`}
            >
              {submitMessage.text}
            </motion.div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`bg-white/5 dark:bg-[#232323]/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:border-blue-500 text-gray-900 dark:text-white ${
                    errors.name ? "border-red-500" : ""
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-white/5 dark:bg-[#232323]/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:border-blue-500 text-gray-900 dark:text-white ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`bg-white/5 dark:bg-[#232323]/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:border-blue-500 text-gray-900 dark:text-white ${
                  errors.subject ? "border-red-500" : ""
                }`}
                placeholder="Project Inquiry"
              />
              {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Your Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`bg-white/5 dark:bg-[#232323]/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 focus:border-blue-500 text-gray-900 dark:text-white min-h-[150px] ${
                  errors.message ? "border-red-500" : ""
                }`}
                placeholder="Hello, I'd like to discuss a project..."
              />
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-2 flex items-center gap-2 w-full sm:w-auto relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={16} />
                    </>
                  )}
                </span>
                <span className="absolute inset-0 bg-white opacity-20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
              </Button>
            </motion.div>
          </form>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.8} className="mt-16 h-[400px] rounded-lg overflow-hidden shadow-lg">
        {/* This would be a Google Map in a real application */}
        <div className="w-full h-full bg-white/30 dark:bg-[#1a1a1a]/80 backdrop-blur-lg border border-gray-200 dark:border-gray-800 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Google Map would be displayed here</p>
        </div>
      </AnimatedSection>
    </AnimatedPage>
  )
}
