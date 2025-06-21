import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublicPath = path === "/login" || path === "/signup";

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    // Logged-in users shouldn't access public pages
    // if (isPublicPath && token) {
    //     return NextResponse.redirect(new URL('/', request.nextUrl));
    // }

    // Unauthenticated users shouldn't access private pages
    const isProtectedPath = path === "/admin";
    if (!token && isProtectedPath) {
        return NextResponse.redirect(new URL("/login", request.url));
    }


    if (path.startsWith("/admin")) {
        const userRole = token?.role;

        if (userRole !== "ADMIN" && userRole !== "ROOT_ADMIN") {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/admin"]
};