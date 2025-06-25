import { PrismaClient } from "@/lib/generated/prisma"
import { NextResponse, NextRequest } from "next/server"

const prisma = new PrismaClient()

export async function PUT(req: NextRequest) {
  try {
    const { id, email, branch, year } = await req.json()

    if (!id) {
      return NextResponse.json({ error: "Missing member ID" }, { status: 400 })
    }

    // console.log("Incoming ID:", id) ;

    const updatedMember = await prisma.member.update({
      where: { id },
      data: {
        email,
        branch,
        year,
      },
    })
    return NextResponse.json(updatedMember, { status: 200 })
  } catch (error: any) {
    console.error("Error updating member:", error)
    return NextResponse.json(
      { error: "Failed to update member" },
      { status: 500 },
    )
  }
}
