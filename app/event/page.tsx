"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import axios from "axios"
import Image from "next/image"
import EditEventModal from "@/components/ui/EditEventModal"
import AddEventModal from "@/components/ui/AddEventModal"

type Status = "UPCOMING" | "COMPLETED" | "CANCELLED"

interface Event {
  id: string
  title: string
  desc: string
  eventType: string[]
  registerLink: string
  bannerImage: string
  status: Status
  organizer: string
  speaker: string
  recordLink: string
  date: string
  location: string
}

export default function EventPage() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [addEvent, setAddEvent] = useState<Event | null>(null)
  const [editEvent, setEditEvent] = useState<Event | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/api/event/getEvent")
        setEvents(res.data)
      } catch (error: any) {
        toast.error("Failed to fetch events")
      }
    }
    fetchEvents()
  }, [])

  useEffect(() => {
    const isModalOpen = !!addEvent || !!editEvent

    if (isModalOpen) {
      // Disable scroll
      document.body.style.overflow = "hidden"
    } else {
      // Re-enable scroll
      document.body.style.overflow = "auto"
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [addEvent, editEvent])

  const onDeleteEvent = async (eventId: string) => {
    try {
      await axios.delete("/api/event/deleteEvent", {
        data: { id: eventId },
      })
      toast.success("Event deleted successfully")
      setEvents((prev) => prev.filter((m) => m.id !== eventId))
    } catch (error: any) {
      console.log(error.message)
      toast.error("Failed to delete event")
    }
  }

  const handleAddEvent = async (newEvent: Event) => {
    setEvents((prev) => [...prev, newEvent])
  }

  const handleEditEvent = async (updatedEvent: Event) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e)),
    )
  }

  const formatCustomDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const day = date.getDate()
    const monthName = date.toLocaleString("en-US", { month: "long" })
    const year = date.getFullYear()

    const getDaySuffix = (d: number) => {
      if (d >= 11 && d <= 13) return "th"
      switch (d % 10) {
        case 1:
          return "st"
        case 2:
          return "nd"
        case 3:
          return "rd"
        default:
          return "th"
      }
    }

    return `${day}${getDaySuffix(day)} ${monthName}, ${year}`
  }

  const Card: React.FC<{ event: Event }> = ({ event }) => {
    return (
      <div className="group flex flex-col justify-between overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:scale-105">
        {event.bannerImage && (
          <div className="relative h-44 w-full">
            <Image
              src={String(event.bannerImage)}
              alt={`${event.title} image`}
              fill
              className="rounded-t-xl object-cover"
            />
          </div>
        )}

        <div className="flex flex-col items-center space-y-3 px-6 py-5 text-center text-gray-800">
          <h3 className="text-xl font-bold">{event.title}</h3>
          <p className="text-base text-gray-700">{event.desc}</p>
          <p className="text-sm font-medium text-gray-500">
            {event.eventType.join(", ")}
          </p>

          <a
            href={event.registerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline"
          >
            Register Link
          </a>

          <div className="mt-1 text-sm">
            <span className="mr-2 font-medium">Status:</span>
            <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
              {event.status}
            </span>
          </div>

          <p className="text-sm text-gray-500">
            {formatCustomDate(event.date)}
          </p>
        </div>

        <div className="mb-4 mt-2 flex justify-center gap-4 px-6">
          <button
            className="rounded-md bg-yellow-500 px-5 py-2 text-sm text-white transition hover:bg-yellow-600"
            onClick={() => setEditEvent(event)}
          >
            Edit
          </button>
          <button
            className="rounded-md bg-red-500 px-5 py-2 text-sm text-white transition hover:bg-red-600"
            onClick={() => onDeleteEvent(event.id)}
          >
            Delete
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf3ef] to-[#e7dbdc] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        {/* Top Controls: Add + Search */}
        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <button
            onClick={() =>
              setAddEvent({
                id: "",
                title: "",
                desc: "",
                eventType: [],
                registerLink: "",
                bannerImage: "",
                status: "UPCOMING",
                organizer: "",
                speaker: "",
                recordLink: "",
                date: "",
                location: "",
              })
            }
            className="rounded-lg bg-[#ec684a] px-6 py-3 text-white shadow-md transition hover:bg-[#d65732]"
          >
            Add Event
          </button>

          <div className="w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Search by title"
              name="search"
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          {events
            .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
            .map((event: Event) => (
              <Card key={event.id} event={event} />
            ))}
        </div>

        {addEvent && (
          <AddEventModal
            event={addEvent}
            onClose={() => setAddEvent(null)}
            onAdd={handleAddEvent}
          />
        )}

        {editEvent && (
          <EditEventModal
            event={editEvent}
            onClose={() => setEditEvent(null)}
            onEdit={handleEditEvent}
          />
        )}
      </div>
    </div>
  )
}
