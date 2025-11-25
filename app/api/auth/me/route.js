import { NextResponse } from "next/server";
import { verifyJwtEdge } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export async function GET(request) {
    try {
        const authHeader = request.headers.get("authorization");
        const token = authHeader?.split(" ")[1]
        console.log(token)
        if (!token) {
            return NextResponse.json({
                message: "Unauthorized - No token found in cookies",
            }, { status: 401 });
        }

        // Verify token
        let payload;
        try {
            payload = await verifyJwtEdge(token);
            console.log("Token payload:", payload);
        } catch (err) {
            console.error("Token verification failed:", err);
            return NextResponse.json({ message: "Invalid token" }, { status: 401 });
        }

        // Get user data
        const user = await prisma.userMaster.findUnique({
            where: { id: payload.sub },
            select: {
                id: true,
                name: true,
                email: true,
                firmName: true,
                businessType: true,
                address: true,
                city: true,
                state: true,
                latLong: true,
                profileImage: true,
                businessImage: true,
                slug: true,
                referralCode: true,
                referredBy: true,
                subscriptionPlan: true,
                isActive: true,
                lastLoginAt: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "User info retrieved successfully",
            user
        });

    } catch (error) {
        console.error("Error in /api/auth/me:", error);
        return NextResponse.json({
            message: "Internal server error"
        }, { status: 500 });
    }
} 