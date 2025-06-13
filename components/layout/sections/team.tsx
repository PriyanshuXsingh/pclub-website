"use client"
import React from "react"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { Users, Briefcase } from "lucide-react"
import data from "@/public/data.json"

export const TeamSection = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 px-6 py-16"
      id="team"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold tracking-tight text-amber-900">
            Our Team
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-amber-600 to-orange-500"></div>
        </div>

        {/* Animated Testimonials Section */}
        <div className="mb-20 rounded-3xl border border-white/20 bg-white/40 p-8 shadow-xl backdrop-blur-sm">
          <AnimatedTestimonials testimonials={data} autoplay />
        </div>

        {/* Stats Section */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* Members Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 rotate-1 transform rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 transition-transform duration-300 group-hover:rotate-2"></div>
            <div className="relative transform rounded-2xl border border-orange-100 bg-white p-8 shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
              <div className="mb-6 flex items-center justify-center">
                <div className="rounded-full bg-gradient-to-br from-orange-100 to-red-100 p-4">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 font-mono text-5xl font-bold text-orange-600">
                  52
                </div>
                <div className="text-lg font-medium text-gray-600">Members</div>
              </div>
              <div className="absolute right-4 top-4 h-2 w-2 animate-pulse rounded-full bg-orange-400"></div>
            </div>
          </div>

          {/* Projects Done Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 -rotate-1 transform rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 transition-transform duration-300 group-hover:-rotate-2"></div>
            <div className="relative transform rounded-2xl border border-orange-100 bg-white p-8 shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
              <div className="mb-6 flex items-center justify-center">
                <div className="rounded-full bg-gradient-to-br from-orange-100 to-red-100 p-4">
                  <Briefcase className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 font-mono text-5xl font-bold text-orange-600">
                  73+
                </div>
                <div className="text-lg font-medium text-gray-600">
                  Projects Done
                </div>
              </div>
              <div className="absolute right-4 top-4 h-2 w-2 animate-pulse rounded-full bg-orange-400"></div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-10 top-20 h-20 w-20 animate-pulse rounded-full bg-gradient-to-br from-orange-200 to-pink-200 opacity-30"></div>
        <div className="absolute bottom-20 right-10 h-16 w-16 animate-pulse rounded-full bg-gradient-to-br from-red-200 to-orange-200 opacity-30 delay-300"></div>
        <div className="absolute left-5 top-1/2 h-12 w-12 animate-pulse rounded-full bg-gradient-to-br from-pink-200 to-orange-200 opacity-20 delay-700"></div>
      </div>
    </div>
  )
}
