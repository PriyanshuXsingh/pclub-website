"use client"
import React from "react"
import { Sparkles, ArrowRight, Zap } from "lucide-react"
import { Carousel } from "@/components/ui/carousel"

const slides = [
  {
    title: "Help Request Hub",
    src: "https://via.placeholder.com/600x400?text=Help+Request+Hub",
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    github: "https://github.com/username/help-request-hub",
    live: "https://help-request-hub.vercel.app",
  },
  {
    title: "AI Chatbot Assistant",
    src: "https://via.placeholder.com/600x400?text=AI+Chatbot+Assistant",
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    github: "https://github.com/username/ai-chatbot",
    live: "https://ai-chatbot.vercel.app",
  },
  {
    title: "E-commerce Store",
    src: "https://via.placeholder.com/600x400?text=E-commerce+Store",
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    github: "https://github.com/username/ecommerce-store",
    live: "https://ecommerce-store.vercel.app",
  },
  {
    title: "Fitness Tracker App",
    src: "https://via.placeholder.com/600x400?text=Fitness+Tracker+App",
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    github: "https://github.com/username/fitness-tracker",
    live: "https://fitness-tracker.vercel.app",
  },
  {
    title: "Portfolio Website",
    src: "https://via.placeholder.com/600x400?text=Portfolio+Website",
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    github: "https://github.com/username/portfolio",
    live: "https://portfolio.vercel.app",
  },
  {
    title: "Real-time Weather App",
    src: "https://via.placeholder.com/600x400?text=Weather+App",
    youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    github: "https://github.com/username/weather-app",
    live: "https://weather-app.vercel.app",
  },
]

export const ProjectsSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#2b2e48]">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Floating Orbs */}
      <div className="absolute left-20 top-20 h-72 w-72 animate-pulse rounded-full bg-purple-500/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 blur-3xl delay-700"></div>
      <div className="absolute left-1/3 top-1/2 h-64 w-64 animate-pulse rounded-full bg-pink-500/10 blur-3xl delay-300"></div>

      <div className="relative z-10 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="mb-20 text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 backdrop-blur-sm">
              <Sparkles className="h-5 w-5 text-purple-300" />
              <span className="font-medium text-white/80">
                Our Creative Work
              </span>
            </div>

            <h2 className="mb-6 text-6xl font-bold tracking-tight text-white md:text-7xl">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>

            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/70">
              Discover our innovative solutions and creative endeavors that push
              the boundaries of technology and design
            </p>

            {/* Decorative Line */}
            <div className="mt-8 flex items-center justify-center">
              <div className="h-px w-64 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              <Zap className="mx-4 h-6 w-6 text-purple-400" />
              <div className="h-px w-64 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            </div>
          </div>

          {/* Carousel Container */}
          <Carousel slides={slides} />
        </div>
      </div>
    </div>
  )
}
