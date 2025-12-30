import crypto from "crypto";
import { sendEmail } from "@/lib/email";

// Generate a secure moderation token
export function generateModerationToken(poemId: string, action: "approve" | "reject"): string {
  const secret = process.env.MODERATION_SECRET || "fallback-secret-change-me";
  const payload = `${poemId}:${action}:${Date.now()}`;
  const hmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(`${payload}:${hmac}`).toString("base64url");
}

// Verify a moderation token
export function verifyModerationToken(token: string): { poemId: string; action: string } | null {
  try {
    const secret = process.env.MODERATION_SECRET || "fallback-secret-change-me";
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const parts = decoded.split(":");

    if (parts.length !== 4) return null;

    const [poemId, action, timestamp, providedHmac] = parts;
    const payload = `${poemId}:${action}:${timestamp}`;
    const expectedHmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");

    // Verify HMAC
    if (providedHmac !== expectedHmac) return null;

    // Check if token is not older than 7 days
    const tokenAge = Date.now() - parseInt(timestamp);
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    if (tokenAge > maxAge) return null;

    return { poemId, action };
  } catch {
    return null;
  }
}

export function generateModerationLink(poemId: string, action: "approve" | "reject") {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const token = generateModerationToken(poemId, action);
  return `${baseUrl}/api/poems/moderate-link?token=${token}`;
}

interface ModerationEmailData {
  title: string;
  poemId: string;
  excerpt: string;
  authorName: string;
  submittedAt: Date;
}

export async function sendModerationEmail(data: ModerationEmailData) {
  const { title, poemId, excerpt, authorName, submittedAt } = data;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const approveLink = generateModerationLink(poemId, "approve");
  const rejectLink = generateModerationLink(poemId, "reject");
  const adminDashboardUrl = `${baseUrl}/admin/moderation`;

  // Dynamic import to avoid circular dependencies
  const { moderationNotificationEmail } = await import("@/lib/email-templates");

  const html = moderationNotificationEmail({
    title,
    excerpt: excerpt.substring(0, 200),
    authorName,
    submittedAt: submittedAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    approveUrl: approveLink,
    rejectUrl: rejectLink,
    adminDashboardUrl,
  });

  return sendEmail({
    to: process.env.ADMIN_EMAIL || "mubarick391@gmail.com",
    subject: `🌟 New Poem Submission: ${title}`,
    html,
  });
}
