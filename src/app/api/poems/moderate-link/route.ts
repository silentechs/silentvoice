import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyModerationToken } from "@/lib/notifications";

// This route handles GET requests from email links for one-click moderation
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.redirect(new URL("/moderation/error?reason=missing-token", request.url));
        }

        // Verify the secure token
        const verified = verifyModerationToken(token);

        if (!verified) {
            return NextResponse.redirect(new URL("/moderation/error?reason=invalid-token", request.url));
        }

        const { poemId, action } = verified;

        // Perform the moderation action
        if (action === "approve") {
            await prisma.poem.update({
                where: { id: poemId },
                data: {
                    status: "approved",
                    approvedAt: new Date(),
                },
            });
            return NextResponse.redirect(new URL("/moderation/success", request.url));
        } else if (action === "reject") {
            await prisma.poem.update({
                where: { id: poemId },
                data: {
                    status: "rejected",
                    rejectionReason: "Does not resonate with the sanctuary.",
                },
            });
            return NextResponse.redirect(new URL("/moderation/reject", request.url));
        }

        return NextResponse.redirect(new URL("/moderation/error?reason=unknown-action", request.url));
    } catch (error) {
        console.error("Moderate link error:", error);
        return NextResponse.redirect(new URL("/moderation/error?reason=server-error", request.url));
    }
}
