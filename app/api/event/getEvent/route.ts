import { PrismaClient } from "@/lib/generated/prisma"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: "asc",
      },
    })
    return NextResponse.json(events, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 },
    )
  }
}
