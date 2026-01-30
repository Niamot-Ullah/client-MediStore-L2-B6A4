import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    let isAuthenticated = false
    let isAdmin = false
    const { data } = await userService.getSession()

    console.log(data);

    if (data) {
        isAuthenticated = true
        isAdmin = data.user.role === Roles.admin
    }
    //* User in not authenticated at all
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    //* User is authenticated and role = ADMIN
    //* User can not visit user dashboard
    if (isAdmin && pathname.startsWith("/user-dashboard")) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }

    //* User is authenticated and role = USER
    //* User can not visit admin-dashboard
    if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
        return NextResponse.redirect(new URL("/user-dashboard", request.url));
    }


    return NextResponse.next()

}

export const config = {
    matcher: ["/user-dashboard", "/admin-dashboard","/user-dashboard/:path", "/admin-dashboard/:path"]
}