import { PrismaClient } from "@/lib/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const session = await getAuthSession();

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get current user (admin making the request)
        const currentUser = await prisma.user.findUnique({
            where: { email: session.user.email }
        });

        // Allow only approved admins or root admins
        if (!currentUser || !currentUser.approved || (currentUser.role !== "ADMIN" && currentUser.role !== "ROOT_ADMIN")) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { id } = await request.json();

        // reject the user request and delete its entry from admin db
        await prisma.user.delete({
            where: { id }
        });

        return NextResponse.json({ message: "User rejected and deleted" }, { status: 200 });
    }

    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}