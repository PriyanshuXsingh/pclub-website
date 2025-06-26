import { PrismaClient } from "@/lib/generated/prisma"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    const deleteEvent = await prisma.event.delete({
      where: { id },
    })
    return NextResponse.json(deleteEvent, { status: 200 })
  } catch (error: any) {
    console.error("Error deleting event:", error)
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 },
    )
  }
}
