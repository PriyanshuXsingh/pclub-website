import { PrismaClient } from "@/lib/generated/prisma"
import { NextResponse, NextRequest } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      title,
      desc,
      eventType,
      bannerImage,
      registerLink,
      status,
      organizer,
      speaker,
      recordLink,
      date,
      location,
    } = body

    const correctStatus =
      status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() // e.g.- Upcoming

    const newEvent = await prisma.event.create({
      data: {
        title,
        desc,
        eventType,
        bannerImage,
        registerLink,
        status: correctStatus as any,
        organizer,
        speaker,
        recordLink,
        date: new Date(date),
        location,
      },
    })

    return NextResponse.json(newEvent, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
