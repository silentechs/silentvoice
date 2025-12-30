import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import r2, { R2_BUCKET_NAME } from "@/lib/r2";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

interface RouteContext {
    params: Promise<{ id: string }>;
}

// POST /api/admin/poems/:id/moderate - Approve, reject, suspend, restore, or delete a poem
export async function POST(request: Request, context: RouteContext) {
    try {
        const { id } = await context.params;
        const { action, rejectionReason } = await request.json();

        const validActions = ["approve", "reject", "suspend", "restore", "delete"];
        if (!action || !validActions.includes(action)) {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        const poem = await prisma.poem.findUnique({
            where: { id },
            include: { author: true },
        });

        if (!poem) {
            return NextResponse.json({ error: "Poem not found" }, { status: 404 });
        }

        // Handle DELETE action
        if (action === "delete") {
            // Delete associated image from R2 if it exists
            if (poem.imageUrl && !poem.imageUrl.startsWith("http")) {
                try {
                    await r2.send(
                        new DeleteObjectCommand({
                            Bucket: R2_BUCKET_NAME,
                            Key: poem.imageUrl,
                        })
                    );
                } catch (r2Error) {
                    console.error("Failed to delete image from R2:", r2Error);
                    // Continue with poem deletion even if image deletion fails
                }
            }

            // Delete all feedback for this poem first (foreign key constraint)
            await prisma.feedback.deleteMany({
                where: { poemId: id },
            });

            // Delete the poem
            await prisma.poem.delete({
                where: { id },
            });

            return NextResponse.json({ success: true, deleted: true });
        }

        // Handle SUSPEND action
        if (action === "suspend") {
            const updatedPoem = await prisma.poem.update({
                where: { id },
                data: {
                    status: "suspended",
                },
            });

            return NextResponse.json({ success: true, poem: updatedPoem });
        }

        // Handle RESTORE action (restore suspended poem back to approved)
        if (action === "restore") {
            const updatedPoem = await prisma.poem.update({
                where: { id },
                data: {
                    status: "approved",
                },
            });

            return NextResponse.json({ success: true, poem: updatedPoem });
        }

        // Handle APPROVE action
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
        }

        // Handle REJECT action
        if (action === "reject") {
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

        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    } catch (error) {
        console.error("POST moderate error:", error);
        return NextResponse.json({ error: "Failed to moderate poem" }, { status: 500 });
    }
}
