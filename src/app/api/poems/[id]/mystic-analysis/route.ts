import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface RouteContext {
    params: Promise<{ id: string }>;
}

export async function GET(
    request: Request,
    context: RouteContext
) {
    try {
        const { id } = await context.params;

        const poem = await prisma.poem.findUnique({
            where: { id },
            include: { author: true },
        });

        if (!poem) {
            return NextResponse.json({ error: "The voice is lost in the void." }, { status: 404 });
        }

        // In a real app, this would call an AI model (OpenAI, Gemini, etc.)
        // For this rewrite, we'll simulate a mystical AI response
        const themes = ["Transcendence", "Obsidian Shadows", "Eternal Resonance", "Whispered Truths"];
        const theme = themes[Math.floor(Math.random() * themes.length)];

        const mysticAnalysis = {
            theme,
            insight: `The verses in "${poem.title}" vibrate with a frequency of ${theme.toLowerCase()}. There is a profound sense of ${Math.random() > 0.5 ? "becoming" : "unfolding"} within these lines. The spirit of the sanctuary finds a mirror in your words.`,
            echo: "Listen closely, for the silence speaks louder than the verse.",
        };

        return NextResponse.json({ success: true, analysis: mysticAnalysis });
    } catch (error) {
        console.error("Mystic analysis error:", error);
        return NextResponse.json({ error: "The oracle is silent right now." }, { status: 500 });
    }
}
