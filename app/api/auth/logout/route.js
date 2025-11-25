import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookieName = process.env.COOKIE_NAME || "vits_auth";
        const clearCookie = `${cookieName}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; ${process.env.NODE_ENV === "production" ? "Secure; " : ""}`;
        const response = NextResponse.json({
            ok: true,
            status: 200,
            message: "Logged out successfully",
        });
        response.headers.set("Set-Cookie", clearCookie);
        return response;
    } catch (error) {
        console.error("LOGOUT ERR:", error);
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}
