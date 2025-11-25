// app/api/auth/forgot/route.js
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { sendResetEmail } from "@/lib/email";

export async function POST(req) {
    try {
        const { email } = await req.json();
        if (!email) return new Response("Missing", { status: 400 });

        const user = await prisma.userMaster.findUnique({ where: { email } });
        if (!user) {
            // don't reveal whether email exists
            return new Response(JSON.stringify({ ok: true }), { status: 200 });
        }

        // create token valid for 1 hour
        const token = uuidv4();
        const expires = new Date(Date.now() + 60 * 60 * 1000);

        await prisma.passwordResetToken.create({
            data: { token, userId: user.id, expiresAt: expires },
        });

        const resetUrl = `${process.env.APP_URL}/reset-password?token=${token}`;
        await sendResetEmail(user.email, resetUrl);

        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (err) {
        console.error("FORGOT ERR", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}
