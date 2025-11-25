import { NextResponse } from "next/server";
import { verifyJwtEdge } from "./lib/auth";

export async function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    const cookieName = process.env.COOKIE_NAME;

    const pathSegments = pathname.split("/").filter(Boolean);
    const slug = pathSegments[0];

    // Define route types
    const isTenantAdmin = pathSegments.length > 1 && pathSegments[1] === "admin";
    const isTenantPublic = pathSegments.length > 1 && pathSegments[1] === "catalogue";
    const isGlobalAdmin = pathname.startsWith("/admin");
    const isProtectedApi = pathname.startsWith("/api/protected");

    // If it's a tenant public page, allow access (no auth required)
    if (isTenantPublic) {
        return NextResponse.next();
    }

    // Determine if this route should be protected
    const isProtected = isTenantAdmin || isGlobalAdmin || isProtectedApi;

    if (!isProtected) {
        return NextResponse.next();
    }

    // ---- 🔐 Auth check ----
    const cookieHeader = req.headers.get("cookie") || "";
    const cookieMatch = cookieHeader
        .split(";")
        .map(c => c.trim())
        .find(c => c.startsWith(`${cookieName}=`));

    if (!cookieMatch) {
        const loginUrl = slug && `${origin}/auth`;
        return NextResponse.redirect(loginUrl);
    }

    const token = cookieMatch.split("=")[1];
    const payload = await verifyJwtEdge(token);

    if (!payload && !token) {
        const loginUrl = slug && `${origin}/auth`;
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
}

// ✅ Apply middleware to specific routes only
export const config = {
    matcher: [
        "/admin/:path*",
        "/api/protected/:path*",
        "/:slug/admin/:path*",
        "/:slug/catalogue/:path*", // still runs for consistency (but open access)
    ],
};
