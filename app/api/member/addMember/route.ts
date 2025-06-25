import { PrismaClient } from "@/lib/generated/prisma"
import { NextResponse, NextRequest } from "next/server"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const resBody = await req.json()
    const {
      name,
      email,
      roll_no,
      branch,
      year,
      role,
      profile_picture,
      socials,
    } = resBody

    const newMember = await prisma.member.create({
      data: {
        name,
        email,
        roll_no,
        branch,
        year,
        role,
        profile_picture,
        socials,
      },
    })

    return NextResponse.json(newMember, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
