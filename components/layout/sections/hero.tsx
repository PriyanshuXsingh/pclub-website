"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Sparkles } from "lucide-react"
import H from "@/public/hero.svg"
import Image from "next/image"

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#2c2f4a] text-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute left-10 top-20 h-2 w-2 animate-pulse rounded-full bg-[#9d4edd] opacity-60"></div>
        <div className="absolute right-20 top-40 h-1 w-1 rounded-full bg-[#f4c430] opacity-80"></div>
        <div className="absolute bottom-32 left-1/4 h-1.5 w-1.5 rounded-full bg-[#9d4edd] opacity-40"></div>
        <div className="absolute right-1/3 top-1/3 h-1 w-1 animate-pulse rounded-full bg-white opacity-60 delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge
              variant="outline"
              className="w-fit border-[#9d4edd] bg-[#9d4edd]/10 py-2 text-sm text-[#9d4edd]"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Pclub welcomes you onboard</span>
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                Programming
                <br />
                <span className="bg-gradient-to-r from-[#9d4edd] via-[#f4c430] to-[#ff6b6b] bg-clip-text text-transparent">
                  Club
                </span>
                , UIET
              </h1>

              <p className="max-w-lg text-lg leading-relaxed text-gray-300 md:text-xl">
                We&apos;re more than just a club, we are a thriving community of
                innovators, creators, and problem-solvers.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group/arrow transform bg-[#ff6b6b] px-8 py-3 font-bold text-white transition-all duration-200 hover:scale-105 hover:bg-[#ff5252]"
              >
                Learn More
                <ArrowRight className="ml-2 size-5 transition-transform group-hover/arrow:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Visual Elements */}
          <Image src={H} alt="Hero" />
        </div>
      </div>
    </section>
  )
}
