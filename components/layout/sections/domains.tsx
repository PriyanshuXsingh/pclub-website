"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Code,
  Smartphone,
  Brain,
  Globe,
  Database,
  Palette,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const DomainsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

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
  ];

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
    <section
      ref={sectionRef}
      className="bg-[#2c2f4a] py-20 md:py-32 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex justify-between items-center mb-16">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <Badge
              variant="outline"
              className="border-[#9d4edd] text-[#9d4edd] bg-[#9d4edd]/10 text-sm py-2 mb-4"
            >
              PORTFOLIO
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Our Domains
            </h2>
          </div>

          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#2c2f4a] font-medium group"
            >
              EXPLORE MORE
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain, index) => {
            const IconComponent = domain.icon;
            return (
              <Card
                key={domain.id}
                className={`${domain.bgColor} border-none overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl group ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  animationDelay: `${index * 100}ms`,
                }}
                onMouseEnter={() => setHoveredCard(domain.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-6 h-64 flex flex-col justify-between relative">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 ${domain.iconColor} mb-4 transition-all duration-300 ${
                      hoveredCard === domain.id ? "scale-110 rotate-12" : ""
                    }`}
                  >
                    <IconComponent className="w-full h-full" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-gray-700 text-xs"
                    >
                      {domain.subtitle}
                    </Badge>
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
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
            );
          })}
        </div>
      </div>
    </section>
  );
};
