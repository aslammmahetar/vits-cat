import { prisma } from "../../../lib/prisma";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" }
        });
        return Response.json(products);
    } catch (error) {
        console.error("GET /api/products error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        console.log(body)
        const { name, price, imageUrl, category, description, ownerId } = body;

        if (!name || !price || !imageUrl) {
            return Response.json({ error: "Name, Price and image is require!" }, { status: 400 })
        }
        const product = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price),
                image: imageUrl,
                category,
                description,
                ownerId, // ✅ directly stored
            },
        });
        return Response.json(product)
    } catch (error) {
        console.error("POST /api/products error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function DELETE(req) {
    const { id } = await req.json()
    await prisma.product.delete({ where: { id: Number(id) } })
    return Response.json({ success: true })
}