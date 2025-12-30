import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import r2, { R2_BUCKET_NAME } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { resolvePublicImageUrl } from "@/lib/images";
import { randomUUID } from "crypto";

function extensionFromMimeType(mimeType: string): string | null {
    switch (mimeType) {
        case "image/jpeg":
            return "jpg";
        case "image/png":
            return "png";
        case "image/webp":
            return "webp";
        default:
            return null;
    }
}

function extensionFromFilename(filename: string): string | null {
    const idx = filename.lastIndexOf(".");
    if (idx === -1 || idx === filename.length - 1) return null;
    const ext = filename.slice(idx + 1).toLowerCase().trim();
    return ext ? ext.replace(/[^a-z0-9]+/g, "") : null;
}

// GET /api/poems - List approved poems
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const [poems, total] = await Promise.all([
            prisma.poem.findMany({
                where: { status: "approved" },
                include: { author: true },
                orderBy: { approvedAt: "desc" },
                skip,
                take: limit,
            }),
            prisma.poem.count({ where: { status: "approved" } }),
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
        console.error("GET poems error:", error);
        return NextResponse.json({ error: "Ancient spirits are taking too long to respond." }, { status: 500 });
    }
}

// POST /api/poems - Submit new poem
export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const authorName = formData.get("authorName") as string;
        const email = formData.get("email") as string;
        const image = formData.get("image") as File | null;

        if (!title || !content || !authorName || !email) {
            return NextResponse.json({ error: "The void requires more substance." }, { status: 400 });
        }

        // 1. Find or create user
        const user = await prisma.user.upsert({
            where: { email },
            update: { name: authorName },
            create: { email, name: authorName },
        });

        // 2. Upload image to R2 if provided
        let imageUrl = null;
        if (image && image.size > 0) {
            const ext = extensionFromMimeType(image.type) || extensionFromFilename(image.name) || "bin";
            const objectKey = `poems/${Date.now()}-${randomUUID()}.${ext}`;
            const buffer = Buffer.from(await image.arrayBuffer());

            await r2.send(
                new PutObjectCommand({
                    Bucket: R2_BUCKET_NAME,
                    Key: objectKey,
                    Body: buffer,
                    ContentType: image.type,
                    CacheControl: "public, max-age=31536000, immutable",
                })
            );

            // Store the object key (not a URL) so env changes won't break existing records.
            imageUrl = objectKey;
        }

        // 3. Create poem
        const poem = await prisma.poem.create({
            data: {
                title,
                content,
                authorId: user.id,
                imageUrl,
                status: "pending",
            },
        });

        // 4. Trigger moderation email
        try {
            const { sendModerationEmail } = await import("@/lib/notifications");
            await sendModerationEmail({
                title,
                poemId: poem.id,
                excerpt: content.substring(0, 200),
                authorName,
                submittedAt: new Date(),
            });
        } catch (emailError) {
            console.error("Moderation email failed:", emailError);
        }

        return NextResponse.json({ success: true, poem }, { status: 201 });
    } catch (error) {
        console.error("POST poem error:", error);
        return NextResponse.json({ error: "The spirit world is currently unreachable." }, { status: 500 });
    }
}
