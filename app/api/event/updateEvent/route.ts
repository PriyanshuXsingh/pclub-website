import { PrismaClient } from "@/lib/generated/prisma"
import { NextResponse, NextRequest } from "next/server"

const prisma = new PrismaClient()

export async function PUT(req: NextRequest) {
  try {
    const res = await req.json()
    const { id, title, desc, eventType, status, speaker, date, location } = res

    if (!id) {
      return NextResponse.json({ error: "Missing event ID" }, { status: 400 })
    }

    const correctStatus =
      status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() // e.g.- Upcoming

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        title,
        desc,
        eventType,
        status: correctStatus as any,
        speaker,
        date: new Date(date),
        location,
      },
    })
    return NextResponse.json(updatedEvent, { status: 200 })
  } catch (error: any) {
    console.error("Error updating event:", error)
    return NextResponse.json(
      { error: "Failed to update event" },
      { status: 500 },
    )
  }
}
