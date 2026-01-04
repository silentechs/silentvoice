import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Development-only endpoint to clear DB content.
// POST /api/debug/clear?confirm=YES
export async function POST(request: Request) {
    if (process.env.NODE_ENV !== "development") {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    if (searchParams.get("confirm") !== "YES") {
        return NextResponse.json(
            { error: "Confirmation required. Use ?confirm=YES" },
            { status: 400 }
        );
    }

    try {
        // Order matters due to FK constraints
        const deletedFeedback = await prisma.feedback.deleteMany({});
        const deletedPoems = await prisma.poem.deleteMany({});
        const deletedSessions = await prisma.session.deleteMany({});
        const deletedUsers = await prisma.user.deleteMany({
            where: { isOwner: false },
        });

        return NextResponse.json({
            ok: true,
            deleted: {
                feedback: deletedFeedback.count,
                poems: deletedPoems.count,
                sessions: deletedSessions.count,
                users: deletedUsers.count,
            },
        });
    } catch (error) {
        console.error("POST /api/debug/clear error:", error);
        return NextResponse.json({ error: "Failed to clear DB" }, { status: 500 });
    }
}


