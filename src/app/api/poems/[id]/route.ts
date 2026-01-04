import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { resolvePublicImageUrl } from "@/lib/images";

export const dynamic = "force-dynamic";

interface RouteContext {
    params: Promise<{ id: string }>;
}

// GET /api/poems/[id] - Get a single poem by ID
export async function GET(
    request: Request,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        const poem = await prisma.poem.findUnique({
            where: { id },
            include: {
                author: true,
                feedback: {
                    include: { author: true },
                    orderBy: { createdAt: "desc" },
                },
            },
        });

        if (!poem) {
            return NextResponse.json({ error: "Poem not found" }, { status: 404 });
        }

        // Only return approved poems publicly
        if (poem.status !== "approved") {
            return NextResponse.json({ error: "Poem is not yet curated" }, { status: 403 });
        }

        const poemWithPublicImage = {
            ...poem,
            imageUrl: resolvePublicImageUrl(poem.imageUrl),
        };

        return NextResponse.json(
            { poem: poemWithPublicImage },
            {
                headers: {
                    "Cache-Control": "no-store, max-age=0",
                },
            }
        );
    } catch (error) {
        console.error("GET poem error:", error);
        return NextResponse.json({ error: "The spirits are silent" }, { status: 500 });
    }
}
