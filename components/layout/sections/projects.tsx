"use client";
import React from "react";
import { Sparkles, ArrowRight, Zap } from "lucide-react";
import { Carousel } from "@/components/ui/carousel";

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
];

export const ProjectsSection = () => {
  return (
    <div className="min-h-screen bg-[#2b2e48] relative overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-300"></div>

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <Sparkles className="w-5 h-5 text-purple-300" />
              <span className="text-white/80 font-medium">
                Our Creative Work
              </span>
            </div>

            <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Our{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>

            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Discover our innovative solutions and creative endeavors that push
              the boundaries of technology and design
            </p>

            {/* Decorative Line */}
            <div className="flex items-center justify-center mt-8">
              <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent w-64"></div>
              <Zap className="w-6 h-6 text-purple-400 mx-4" />
              <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent w-64"></div>
            </div>
          </div>

          {/* Carousel Container */}
          <Carousel slides={slides} />
        </div>
      </div>
    </div>
  );
};
