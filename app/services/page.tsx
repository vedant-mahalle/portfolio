import { Code, Layout, Palette, Search, Smartphone, Zap } from "lucide-react"
import AnimatedPage from "@/components/animated-page"
import AnimatedSection from "@/components/animated-section"
import TiltCard from "@/components/tilt-card"

export default function ServicesPage() {
  const services = [
    {
      icon: Layout,
      title: "Web Design",
      description:
        "Creating beautiful, responsive websites that look great on all devices and provide an excellent user experience.",
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Building robust, scalable web applications using the latest technologies and best practices.",
    },
    {
      icon: Palette,
      title: "Graphic Design",
      description:
        "Designing logos, branding materials, and other visual assets that communicate your brand's message.",
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description:
        "Improving your website's visibility in search engines to drive more organic traffic to your business.",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Ensuring your website looks and functions perfectly on all devices, from desktops to smartphones.",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speeding up your website to provide a better user experience and improve search engine rankings.",
    },
  ]

  return (
    <AnimatedPage className="p-10">
      <h1 className="text-3xl font-bold mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">My Services</h1>

      <AnimatedSection delay={0.1} className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          What I <span className="text-blue-500">Offer</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          I provide a wide range of services to help businesses establish a strong online presence. From design to
          development, I've got you covered.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <AnimatedSection key={index} delay={0.2 + index * 0.1}>
            <TiltCard>
              <div className="bg-white/30 dark:bg-[#1a1a1a]/80 backdrop-blur-lg border border-gray-200 dark:border-gray-800 rounded-lg p-6 transition-all duration-300 hover:border-blue-500 h-full shadow-lg relative overflow-hidden group">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 relative z-10">
                  <service.icon size={28} className="text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3 relative z-10">{service.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 relative z-10">{service.description}</p>

                {/* Subtle gradient background */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-xl"></div>
              </div>
            </TiltCard>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection
        delay={0.8}
        className="mt-16 bg-white/30 dark:bg-[#1a1a1a]/80 backdrop-blur-lg border border-gray-200 dark:border-gray-800 rounded-lg p-8 text-center shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Need a Custom Service?</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          If you don't see the service you're looking for, don't worry. I offer custom solutions tailored to your
          specific needs.
        </p>
        <a
          href="/contact"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition-colors relative overflow-hidden group"
        >
          <span className="relative z-10">Get in Touch</span>
          <span className="absolute inset-0 bg-white opacity-20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
        </a>
      </AnimatedSection>
    </AnimatedPage>
  )
}
