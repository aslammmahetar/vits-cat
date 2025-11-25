import { NextResponse } from "next/server";
import { hashPassword, signJwt } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";
import { genarateUniqueSlug } from "../../../../lib/slugify";
import { generateReferralCode } from "../../../../lib/referralCode";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, password, mobileNo, firmName, address, city, state, latlong, businessType, referredBy } = body
        if (!email || !password || !name || !mobileNo || !firmName) return NextResponse.json({ error: "Missing fields", status: 400 })

        const existing = await prisma.userMaster.findUnique({ where: { email } })
        if (existing) return NextResponse.json({ message: "User is already register! Please login", status: 409 })

        const passwordHash = await hashPassword(password)
        const slug = await genarateUniqueSlug(firmName)
        const referralCode = generateReferralCode(firmName)
        const user = await prisma.userMaster.create({
            data: { name, email, mobileNo, firmName, businessType: Number(businessType || 0), passwordHash, referralCode: referralCode || "", address, state, city, latlong, slug, referredBy: referredBy || "" }
        })
        const token = signJwt({ sub: user.id, email: user.email });
        const res = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email }, status: 201, message: "Registration Successfull, Please login" });
        res.cookies.set({
            name: process.env.COOKIE_NAME,
            value: token,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60,
            path: "/"
        })
        return res
    }
    catch (error) {
        console.error("REGISTER ERR", error);
        return NextResponse.json({ message: "Internal Server Error", status: 500, error });
    }
}