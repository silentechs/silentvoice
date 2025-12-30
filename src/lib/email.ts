const RESEND_API_URL = "https://api.resend.com/emails";

function parseRecipients(to: string | string[]): string[] {
    if (Array.isArray(to)) {
        return to.map((email) => email.trim()).filter(Boolean);
    }

    return to
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean);
}

export async function sendEmail({
    to,
    subject,
    html,
    text,
    replyTo,
}: {
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
    replyTo?: string;
}) {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM || process.env.FROM_EMAIL || "Silent Voice Sanctuary <onboarding@resend.dev>";

    if (!apiKey) {
        const error = new Error("RESEND_API_KEY is not set");
        console.error("Email error:", error);
        return { success: false, error };
    }

    const recipients = parseRecipients(to);

    try {
        const response = await fetch(RESEND_API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from,
                to: recipients,
                subject,
                html,
                text,
                replyTo,
            }),
        });

        const data = (await response.json().catch(() => null)) as { id?: string; message?: string } | null;

        if (!response.ok) {
            const error = new Error(data?.message || `Resend request failed (${response.status})`);
            console.error("Email error:", error);
            return { success: false, error };
        }

        return { success: true, messageId: data?.id || null };
    } catch (error) {
        console.error("Email error:", error);
        return { success: false, error };
    }
}
