"use client";
import React from "react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Users, Briefcase } from "lucide-react";
import data from "@/public/data.json";

export const TeamSection = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 py-16 px-6"
      id="team"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-amber-900 mb-4 tracking-tight">
            Our Team
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Animated Testimonials Section */}
        <div className="mb-20 bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
          <AnimatedTestimonials testimonials={data} autoplay />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Members Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-2xl border border-orange-100 transform group-hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-full">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-600 mb-2 font-mono">
                  52
                </div>
                <div className="text-gray-600 font-medium text-lg">Members</div>
              </div>
              <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Projects Done Card */}
          <div className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-2xl border border-orange-100 transform group-hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-full">
                  <Briefcase className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-600 mb-2 font-mono">
                  73+
                </div>
                <div className="text-gray-600 font-medium text-lg">
                  Projects Done
                </div>
              </div>
              <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-red-200 to-orange-200 rounded-full opacity-30 animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full opacity-20 animate-pulse delay-700"></div>
      </div>
    </div>
  );
};
