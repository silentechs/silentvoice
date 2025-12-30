import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { resolvePublicImageUrl } from "@/lib/images";

// GET /api/admin/poems - List poems with optional status filter
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get("status") || "pending";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const skip = (page - 1) * limit;

        const whereClause = status === "all" ? {} : { status };

        const [poems, total] = await Promise.all([
            prisma.poem.findMany({
                where: whereClause,
                include: { author: true },
                orderBy: { submittedAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.poem.count({ where: whereClause }),
        ]);

        return NextResponse.json({
            poems: poems.map((poem) => ({
                ...poem,
                imageUrl: resolvePublicImageUrl(poem.imageUrl),
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("GET admin poems error:", error);
        return NextResponse.json({ error: "Failed to fetch poems" }, { status: 500 });
    }
}
