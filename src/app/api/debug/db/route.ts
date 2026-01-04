import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createHash } from "crypto";

function dbFingerprint(databaseUrl: string | undefined): string | null {
    if (!databaseUrl) return null;
    return createHash("sha256").update(databaseUrl).digest("hex").slice(0, 12);
}

function isAuthorized(request: Request): boolean {
    // Dev: always allow
    if (process.env.NODE_ENV === "development") return true;
    // Prod: require a secret so we can debug DB mismatches safely
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");
    const expected = process.env.MODERATION_SECRET || process.env.SESSION_SECRET;
    return Boolean(expected && secret && secret === expected);
}

// Debug endpoint to verify which DB the app is connected to.
// - Returns a fingerprint of DATABASE_URL (not the URL itself)
// - Returns basic row counts
//
// GET /api/debug/db
// - Dev: no auth
// - Prod: requires ?secret=<MODERATION_SECRET>
export async function GET(request: Request) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    try {
        const [users, poemsTotal, poemsApproved, poemsPending] = await Promise.all([
            prisma.user.count(),
            prisma.poem.count(),
            prisma.poem.count({ where: { status: "approved" } }),
            prisma.poem.count({ where: { status: "pending" } }),
        ]);

        return NextResponse.json(
            {
                nodeEnv: process.env.NODE_ENV,
                databaseUrlFingerprint: dbFingerprint(process.env.DATABASE_URL),
                counts: {
                    users,
                    poemsTotal,
                    poemsApproved,
                    poemsPending,
                },
            },
            {
                headers: {
                    "Cache-Control": "no-store, max-age=0",
                },
            }
        );
    } catch (error) {
        console.error("GET /api/debug/db error:", error);
        return NextResponse.json({ error: "Failed to query DB" }, { status: 500 });
    }
}


