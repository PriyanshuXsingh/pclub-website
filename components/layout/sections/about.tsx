"use client";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f5f5f5] py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-8">
          <Badge
            variant="outline"
            className="bg-white/50 border-gray-300 text-gray-600 text-sm py-2 mb-8"
          >
            ABOUT US
          </Badge>

          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-[#1a1a1a] leading-tight max-w-4xl mx-auto">
              PASSION{" "}
              <span className="inline-flex items-center">
                <Code className="w-12 h-12 md:w-16 md:h-16 text-[#9d4edd] mx-4" />
              </span>
              FOR
              <br />
              <span className="inline-flex items-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2c2f4a] rounded-full flex items-center justify-center mx-4">
                  <Code className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
              </span>
              PERFECTION
            </h2>
          </div>

          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-lg md:text-xl text-[#1a1a1a] leading-relaxed font-medium">
              AT PCLUB, WE BRING TECHNOLOGY TO LIFE THROUGH OPEN-SOURCE
              WORKSHOPS, ENGAGING SEMINARS, INTENSE HACKATHONS, AND A VARIETY OF
              FUN TECH-BASED GAMES AND PROJECTS. WHETHER YOU'RE DIVING INTO YOUR
              FIRST LINES OF CODE OR BUILDING YOUR NEXT BIG PROJECT, PCLUB IS
              HERE TO SUPPORT YOUR JOURNEY.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
