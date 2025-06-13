"use client"

import Image from "next/image"
import { useState, useRef } from "react"
import { CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import E from "@/public/sfd.svg"

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
]

export const EventsSection = () => {
  const [activeId, setActiveId] = useState<number | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#fdf3ef] to-[#e7dbdc] px-6 py-16"
      id="sessions"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-neutral-900">Our Events</h2>
          <Button variant="outline" className="text-sm">
            Discover All
          </Button>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 gap-6 transition-all duration-500 md:grid-cols-3"
        >
          {events.map((event, idx) => (
            <div
              key={event.id}
              ref={(el) => {
                cardRefs.current[idx] = el
              }}
              className={`group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl transition-all duration-500 ${activeId == event.id ? "scale-110" : ""}`}
              onMouseEnter={() => setActiveId(event.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="h-full w-full object-cover"
              />
              {activeId === event.id && (
                <div className="absolute inset-0 flex flex-col justify-end bg-black/50 p-6 text-white backdrop-blur-sm">
                  <h3 className="mb-2 text-2xl font-bold">{event.title}</h3>
                  <p className="mb-1 max-w-xl text-base">{event.description}</p>
                  <div className="flex items-center text-sm text-neutral-200">
                    <CalendarDays className="mr-2 h-5 w-5" />
                    {event.date}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button className="bg-[#ec684a] px-8 py-3 text-base text-white hover:bg-[#d65732]">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
