import { PrismaClient } from "@/lib/generated/prisma"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { error: "Member ID is required" },
        { status: 400 },
      )
    }

    const deletedMember = await prisma.member.delete({
      where: { id },
    })

    return NextResponse.json(deletedMember, { status: 200 })
  } catch (error: any) {
    console.error("Error deleting member:", error)
    return NextResponse.json(
      { error: "Failed to delete member" },
      { status: 500 },
    )
  }
}
