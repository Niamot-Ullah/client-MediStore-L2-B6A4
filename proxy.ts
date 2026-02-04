// import { NextRequest, NextResponse } from "next/server";
// import { userService } from "./src/services/user.service";
// import { Roles } from "./src/constants/roles";
import { userService } from "@/services/user.service";
import { Roles } from "@/constants/roles";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    let isAuthenticated = false
    let isAdmin = false
    const { data } = await userService.getSession()

    // Skip middleware for verify-email route
    if (pathname.startsWith("/verify-email")) {
        return NextResponse.next();
    }
    // Check for session token in cookies
    const sessionToken = request.cookies.get("better-auth.session_token");

    //* User is not authenticated at all
    if (!sessionToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }




    if (data) {
        isAuthenticated = true
        isAdmin = data.user.role === Roles.admin
    }
    //* User in not authenticated at all
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }


    if (isAdmin && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
    if (isAdmin && pathname.startsWith("/seller-dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }

    if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }


    return NextResponse.next()

}

export const config = {
    matcher: ["/dashboard", "/seller-dashboard", "/admin-dashboard", "/dashboard/:path", "/seller-dashboard/:path", "/admin-dashboard/:path"]
}