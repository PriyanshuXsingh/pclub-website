"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Sparkles } from "lucide-react";
import H from "@/public/hero.svg";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="bg-[#2c2f4a] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#9d4edd] rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-[#f4c430] rounded-full opacity-80"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-[#9d4edd] rounded-full opacity-40"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-6 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge
              variant="outline"
              className="border-[#9d4edd] text-[#9d4edd] bg-[#9d4edd]/10 text-sm py-2 w-fit"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Pclub welcomes you onboard</span>
            </Badge>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Programming
                <br />
                <span className="text-transparent bg-gradient-to-r from-[#9d4edd] via-[#f4c430] to-[#ff6b6b] bg-clip-text">
                  Club
                </span>
                , UIET
              </h1>

              <p className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed">
                We&apos;re more than just a club, we are a thriving community of
                innovators, creators, and problem-solvers.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-bold group/arrow px-8 py-3 transition-all duration-200 transform hover:scale-105"
              >
                Learn More
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Right Visual Elements */}
          <Image src={H} alt="Hero" />
        </div>
      </div>
    </section>
  );
};
