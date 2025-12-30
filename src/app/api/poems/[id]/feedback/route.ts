import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function POST(
    request: Request,
    context: RouteContext
) {
    try {
        const { id } = await context.params;
        const { content, authorName, email } = await request.json();

        if (!content || !authorName || !email) {
            return NextResponse.json({ error: "Resonance requires substance." }, { status: 400 });
        }

        // Find or create user for the feedback author
        const user = await prisma.user.upsert({
            where: { email },
            update: { name: authorName },
            create: { email, name: authorName },
        });

        const feedback = await prisma.feedback.create({
            data: {
                content,
                authorId: user.id,
                poemId: id,
            },
            include: { author: true },
        });

        return NextResponse.json({ success: true, feedback }, { status: 201 });
    } catch (error) {
        console.error("POST feedback error:", error);
        return NextResponse.json({ error: "The echoes are fading too quickly." }, { status: 500 });
    }
}
