"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import E from "@/public/sfd.svg";

const events = [
  {
    id: 1,
    title: "Software Freedom Day",
    date: "29 Oct, 2024",
    description: "Celebrating open source contributions and software freedom.",
    image: E,
  },
  {
    id: 2,
    title: "Fosshack Hackathon",
    date: "29 Oct, 2024",
    description: "Collaborative open-source hacking event.",
    image: E,
  },
  {
    id: 3,
    title: "Goonj 2k25",
    date: "21 Oct, 2024",
    description: "Annual cultural fest of the institute.",
    image: E,
  },
  {
    id: 4,
    title: "Goonj 2k25",
    date: "21 Oct, 2024",
    description: "Annual cultural fest of the institute.",
    image: E,
  },
  {
    id: 5,
    title: "Goonj 2k25",
    date: "21 Oct, 2024",
    description: "Annual cultural fest of the institute.",
    image: E,
  },
  {
    id: 6,
    title: "Goonj 2k25",
    date: "21 Oct, 2024",
    description: "Annual cultural fest of the institute.",
    image: E,
  },
];

export const EventsSection = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full px-6 py-16 bg-gradient-to-br from-[#fdf3ef] to-[#e7dbdc] relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-neutral-900">Our Events</h2>
          <Button variant="outline" className="text-sm">
            Discover All
          </Button>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500"
        >
          {events.map((event, idx) => (
            <div
              key={event.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group transition-all duration-500 ${activeId == event.id ? "scale-110" : ""}`}
              onMouseEnter={() => setActiveId(event.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover w-full h-full"
              />
              {activeId === event.id && (
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm text-white flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                  <p className="text-base mb-1 max-w-xl">{event.description}</p>
                  <div className="flex items-center text-sm text-neutral-200">
                    <CalendarDays className="w-5 h-5 mr-2" />
                    {event.date}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button className="px-8 py-3 text-base bg-[#ec684a] hover:bg-[#d65732] text-white">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
