"use client"
import { Badge } from "@/components/ui/badge"
import { Code } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[#f5f5f5] py-20 md:py-32"
      id="about"
    >
      <div className="container mx-auto px-6">
        <div className="space-y-8 text-center">
          <Badge
            variant="outline"
            className="mb-8 border-gray-300 bg-white/50 py-2 text-sm text-gray-600"
          >
            ABOUT US
          </Badge>

          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="mx-auto max-w-4xl text-5xl font-bold leading-tight text-[#1a1a1a] md:text-7xl">
              PASSION{" "}
              <span className="inline-flex items-center">
                <Code className="mx-4 h-12 w-12 text-[#9d4edd] md:h-16 md:w-16" />
              </span>
              FOR
              <br />
              <span className="inline-flex items-center">
                <div className="mx-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2c2f4a] md:h-16 md:w-16">
                  <Code className="h-6 w-6 text-white md:h-8 md:w-8" />
                </div>
              </span>
              PERFECTION
            </h2>
          </div>

          <div
            className={`mx-auto max-w-4xl transition-all delay-300 duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-lg font-medium leading-relaxed text-[#1a1a1a] md:text-xl">
              AT PCLUB, WE BRING TECHNOLOGY TO LIFE THROUGH OPEN-SOURCE
              WORKSHOPS, ENGAGING SEMINARS, INTENSE HACKATHONS, AND A VARIETY OF
              FUN TECH-BASED GAMES AND PROJECTS. WHETHER YOU&apos;RE DIVING INTO
              YOUR FIRST LINES OF CODE OR BUILDING YOUR NEXT BIG PROJECT, PCLUB
              IS HERE TO SUPPORT YOUR JOURNEY.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
