"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Code,
  Smartphone,
  Brain,
  Globe,
  Database,
  Palette,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

export const DomainsSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef(null)

  const domains = [
    {
      id: 1,
      title: "AI / ML",
      subtitle: "Design",
      description:
        "Artificial Intelligence and Machine Learning projects with cutting-edge algorithms",
      icon: Brain,
      bgColor: "bg-gradient-to-br from-orange-200 via-red-200 to-pink-200",
      iconColor: "text-red-600",
    },
    {
      id: 2,
      title: "WebDev",
      subtitle: "Branding",
      description:
        "Full-stack web development with modern frameworks and technologies",
      icon: Globe,
      bgColor: "bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200",
      iconColor: "text-orange-600",
    },
    {
      id: 3,
      title: "App Dev",
      subtitle: "Illustration",
      description:
        "Mobile application development for iOS and Android platforms",
      icon: Smartphone,
      bgColor: "bg-gradient-to-br from-purple-100 via-pink-100 to-purple-200",
      iconColor: "text-purple-600",
    },
    {
      id: 4,
      title: "Data Science",
      subtitle: "Analytics",
      description: "Data analysis, visualization, and statistical modeling",
      icon: Database,
      bgColor: "bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200",
      iconColor: "text-blue-600",
    },
    {
      id: 5,
      title: "UI/UX Design",
      subtitle: "Creative",
      description: "User interface and experience design for digital products",
      icon: Palette,
      bgColor: "bg-gradient-to-br from-green-100 via-emerald-100 to-green-200",
      iconColor: "text-green-600",
    },
    {
      id: 6,
      title: "DevOps",
      subtitle: "Infrastructure",
      description: "Development operations, CI/CD, and cloud infrastructure",
      icon: Code,
      bgColor: "bg-gradient-to-br from-gray-100 via-slate-100 to-gray-200",
      iconColor: "text-gray-600",
    },
  ]

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
      className="relative overflow-hidden bg-[#2c2f4a] py-20 md:py-32"
      id="domains"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-20 h-32 w-32 rounded-full border border-white/20"></div>
        <div className="absolute bottom-20 right-20 h-24 w-24 rounded-full border border-white/20"></div>
        <div className="absolute left-1/4 top-1/2 h-16 w-16 rounded-full border border-white/20"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="mb-16 flex items-center justify-between">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >
            <Badge
              variant="outline"
              className="mb-4 border-[#9d4edd] bg-[#9d4edd]/10 py-2 text-sm text-[#9d4edd]"
            >
              PORTFOLIO
            </Badge>
            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Our Domains
            </h2>
          </div>

          <div
            className={`transition-all delay-200 duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            <Button
              variant="outline"
              className="group border-white font-medium text-white hover:bg-white hover:text-[#2c2f4a]"
            >
              EXPLORE MORE
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain, index) => {
            const IconComponent = domain.icon
            return (
              <Card
                key={domain.id}
                className={`${domain.bgColor} group cursor-pointer overflow-hidden border-none transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  animationDelay: `${index * 100}ms`,
                }}
                onMouseEnter={() => setHoveredCard(domain.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="relative flex h-64 flex-col justify-between p-6">
                  {/* Icon */}
                  <div
                    className={`h-12 w-12 ${domain.iconColor} mb-4 transition-all duration-300 ${
                      hoveredCard === domain.id ? "rotate-12 scale-110" : ""
                    }`}
                  >
                    <IconComponent className="h-full w-full" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-xs text-gray-700"
                    >
                      {domain.subtitle}
                    </Badge>
                    <h3 className="text-2xl font-bold text-gray-800 transition-colors group-hover:text-gray-900">
                      {domain.title}
                    </h3>
                    <p
                      className={`text-sm text-gray-600 transition-all duration-300 ${
                        hoveredCard === domain.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {domain.description}
                    </p>
                  </div>

                  {/* Hover overlay */}
                  <div
                    className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
                      hoveredCard === domain.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
