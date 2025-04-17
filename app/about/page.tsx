import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Download, Mail } from "lucide-react"
import AnimatedPage from "@/components/animated-page"
import AnimatedSection from "@/components/animated-section"
import TiltCard from "@/components/tilt-card"

export default function AboutPage() {
  return (
    <AnimatedPage className="p-10">
      <h1 className="text-3xl font-bold mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">About Me</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <AnimatedSection delay={0.1}>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">
              I'm <span className="text-blue-500">Vedant Mahalle</span>, a Professional Web Designer
            </h2>

            <p className="text-gray-600 dark:text-gray-300">
              I am a web designer with over 10 years of experience in creating beautiful, functional websites that help
              businesses grow online. My approach combines creative design with technical expertise to deliver websites
              that not only look great but also perform well.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/30 dark:bg-[#1a1a1a]/80 backdrop-blur-lg p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="font-medium mb-2">Name:</h3>
                <p className="text-gray-500 dark:text-gray-400">Vedant Mahalle</p>
              </div>
              <div className="bg-white/30 dark:bg-[#1a1a1a]/80 backdrop-blur-lg p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="font-medium mb-2">Email:</h3>
                <p className="text-gray-500 dark:text-gray-400">vedant@example.com</p>
              </div>
              <div className="bg-white/30 dark:bg-[#1a1a1a]/80 backdrop-blur-lg p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="font-medium mb-2">Phone:</h3>
                <p className="text-gray-500 dark:text-gray-400">+1 (555) 123-4567</p>
              </div>
              <div className="bg-white/30 dark:bg-[#1a1a1a]/80 backdrop-blur-lg p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="font-medium mb-2">Location:</h3>
                <p className="text-gray-500 dark:text-gray-400">New York, USA</p>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button className="bg-blue-500 hover:bg-blue-600 rounded-full px-6 flex items-center gap-2 relative overflow-hidden group">
                <span className="relative z-10">
                  <Download size={16} />
                  Download CV
                </span>
                <span className="absolute inset-0 bg-white opacity-20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
              </Button>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="rounded-full px-6 border-blue-500 text-blue-500 hover:bg-blue-500/10 flex items-center gap-2"
                >
                  <Mail size={16} />
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <TiltCard className="relative">
            <div className="relative">
              {/* Glass effect */}
              <div className="absolute inset-0 -m-6 rounded-2xl bg-white/5 dark:bg-black/20 backdrop-blur-lg border border-white/10 dark:border-white/5 shadow-xl"></div>

              {/* Top-right corner accent */}
              <div className="absolute -top-4 -right-4 w-16 h-16 border-t-4 border-r-4 border-blue-500"></div>

              {/* Image */}
              <div className="relative z-10 w-full h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Vedant Mahalle"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Bottom-left corner accent */}
              <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-4 border-l-4 border-blue-500"></div>

              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-blue-500/20 rounded-lg blur-lg opacity-50"></div>
            </div>
          </TiltCard>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.5} className="mt-16">
        <h2 className="text-2xl font-semibold mb-8">My Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <SkillBar name="Web Design" percentage={95} delay={0.1} />
            <SkillBar name="HTML/CSS" percentage={90} delay={0.2} />
            <SkillBar name="JavaScript" percentage={85} delay={0.3} />
          </div>

          <div className="space-y-6">
            <SkillBar name="UI/UX Design" percentage={92} delay={0.4} />
            <SkillBar name="React" percentage={80} delay={0.5} />
            <SkillBar name="Graphic Design" percentage={88} delay={0.6} />
          </div>
        </div>
      </AnimatedSection>
    </AnimatedPage>
  )
}

function SkillBar({ name, percentage, delay }: { name: string; percentage: number; delay: number }) {
  return (
    <AnimatedSection delay={delay}>
      <div className="bg-white/30 dark:bg-[#1a1a1a]/80 backdrop-blur-lg p-4 rounded-lg border border-gray-200 dark:border-gray-800">
        <div className="flex justify-between mb-2">
          <span className="font-medium">{name}</span>
          <span className="text-blue-500">{percentage}%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <AnimatedSection delay={delay + 0.2}>
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full origin-left"
              style={{ width: `${percentage}%` }}
            ></div>
          </AnimatedSection>
        </div>
      </div>
    </AnimatedSection>
  )
}
