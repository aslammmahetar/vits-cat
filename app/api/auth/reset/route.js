// app/api/auth/reset/route.js
import { hashPassword } from "@/lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function POST(req) {
    try {
        const { token, password } = await req.json();
        if (!token || !password) return new Response("Missing", { status: 400 });

        const record = await prisma.passwordResetToken.findUnique({ where: { token } });
        if (!record || record.expiresAt < new Date()) {
            return new Response(JSON.stringify({ error: "Invalid or expired token" }), { status: 400 });
        }

        const passwordHash = await hashPassword(password);

        await prisma.userMaster.update({
            where: { id: record.userId },
            data: {
                previousPasswordHash: (await prisma.userMaster.findUnique({ where: { id: record.userId } })).passwordHash,
                passwordHash,
            },
        });

        // delete used tokens
        await prisma.passwordResetToken.deleteMany({ where: { userId: record.userId } });

        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err) {
        console.error("RESET ERR", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}
