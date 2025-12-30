import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { poemId, token, action, rejectionReason } = await request.json();

        // In a real app, verify the token (e.g., JWT or hash)
        // For now, we'll assume the request is secure if it comes with a token
        if (!token) {
            return NextResponse.json({ error: "The gateway is locked." }, { status: 401 });
        }

        if (action === "approve") {
            await prisma.poem.update({
                where: { id: poemId },
                data: {
                    status: "approved",
                    approvedAt: new Date(),
                },
            });
            return NextResponse.json({ success: true, status: "approved" });
        } else if (action === "reject") {
            await prisma.poem.update({
                where: { id: poemId },
                data: {
                    status: "rejected",
                    rejectionReason: rejectionReason || "Does not resonate with the sanctuary.",
                },
            });
            return NextResponse.json({ success: true, status: "rejected" });
        }

        return NextResponse.json({ error: "Unknown ritual." }, { status: 400 });
    } catch (error) {
        console.error("Moderate error:", error);
        return NextResponse.json({ error: "The moderation spirits are conflicted." }, { status: 500 });
    }
}
