// lib/session.js
import { cookies } from "next/headers";
import { verifyJwt, verifyJwtEdge } from "./auth";
import { prisma } from "./prisma";

export async function getCurrentUserFromRequest(request) {
    try {
        const cookie = request.headers.get("cookie") || "";
        const match = cookie.split(";").map(c => c.trim()).find(c => c.startsWith(`${process.env.COOKIE_NAME}=`));
        if (!match) return null;
        const token = match.split("=")[1];
        const payload = verifyJwt(token);
        if (!payload) return null;
        const userId = Number(payload.sub);
        const user = await prisma.userMaster.findUnique({ where: { id: userId } });
        return user;
    } catch (err) {
        console.error("getCurrentUserFromRequest", err);
        return null;
    }
}

export async function getSessionStatus() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get(process.env.COOKIE_NAME)?.value;
        // If no cookie found → not logged in
        if (!token) {
            return { isAuthenticated: false };
        }
        // Verify the token
        const payload = await verifyJwtEdge(token);
        // If valid payload and contains required info
        if (payload?.sub && payload?.email && payload?.slug) {
            return { isAuthenticated: true, payload };
        }
        return { isAuthenticated: false };
    } catch (error) {
        console.error("Session check failed:", error);
        return { isAuthenticated: false };
    }
}