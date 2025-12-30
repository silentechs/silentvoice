import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface RouteContext {
    params: Promise<{ id: string }>;
}

// POST /api/admin/poems/:id/moderate - Approve or reject a poem
export async function POST(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const { action, rejectionReason } = await request.json();

        if (!action || !["approve", "reject"].includes(action)) {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        const poem = await prisma.poem.findUnique({
            where: { id },
            include: { author: true },
        });

        if (!poem) {
            return NextResponse.json({ error: "Poem not found" }, { status: 404 });
        }

        if (action === "approve") {
            const updatedPoem = await prisma.poem.update({
                where: { id },
                data: {
                    status: "approved",
                    approvedAt: new Date(),
                },
            });

            // Send approval email to author
            try {
                const { sendEmail } = await import("@/lib/email");
                const { poemApprovedEmail } = await import("@/lib/email-templates");
                const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

                await sendEmail({
                    to: poem.author.email,
                    subject: `🎉 Your poem "${poem.title}" has been approved!`,
                    html: poemApprovedEmail({
                        title: poem.title,
                        authorName: poem.author.name,
                        poemUrl: `${baseUrl}/poems/${poem.id}`,
                    }),
                });
            } catch (emailError) {
                console.error("Approval email failed:", emailError);
            }

            return NextResponse.json({ success: true, poem: updatedPoem });
        } else {
            const updatedPoem = await prisma.poem.update({
                where: { id },
                data: {
                    status: "rejected",
                    rejectionReason: rejectionReason || "Does not align with the sanctuary's vision.",
                },
            });

            // Send rejection email to author
            try {
                const { sendEmail } = await import("@/lib/email");
                const { poemRejectedEmail } = await import("@/lib/email-templates");

                await sendEmail({
                    to: poem.author.email,
                    subject: `Update on your poem submission: "${poem.title}"`,
                    html: poemRejectedEmail({
                        title: poem.title,
                        authorName: poem.author.name,
                        reason: rejectionReason,
                    }),
                });
            } catch (emailError) {
                console.error("Rejection email failed:", emailError);
            }

            return NextResponse.json({ success: true, poem: updatedPoem });
        }
    } catch (error) {
        console.error("POST moderate error:", error);
        return NextResponse.json({ error: "Failed to moderate poem" }, { status: 500 });
    }
}
