import { PrismaClient } from "@/lib/generated/prisma"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      orderBy: {
        createdAt: "asc",
      },
    })

    return NextResponse.json(members, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 },
    )
  }
}
