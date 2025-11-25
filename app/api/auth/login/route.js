import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { signJwt, verifyPassword } from "../../../../lib/auth";

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ message: "Missing credentials", status: 400 });
        }

        const user = await prisma.userMaster.findUnique({ where: { email } });
        if (!user) return NextResponse.json({ message: "Invalid credentials", status: 401 });

        const ok = await verifyPassword(password, user.passwordHash);
        if (!ok) return NextResponse.json({ message: "Invalid credentials", status: 401 });

        await prisma.userMaster.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });

        const token = signJwt({
            sub: user.id,
            email: user.email,
            slug: user.slug,
        });
        const response = NextResponse.json(
            {
                status: 200,
                success: true,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    slug: user.slug,
                    token: token,
                },
                message: "Login Successfully"
            }
        );
        response.cookies.set({
            name: process.env.COOKIE_NAME || "vits_auth",
            value: token,
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60,
        });

        return response;
    } catch (error) {
        console.error("LOGIN ERR:", error);
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}
