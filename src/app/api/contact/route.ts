import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

const CONTACT_REASONS: Record<string, string> = {
    feedback: "Platform Feedback",
    collaboration: "Collaboration Request",
    support: "Support Request",
    general: "General Inquiry",
};

export async function POST(request: Request) {
    try {
        const { name, email, subject, message, reason } = await request.json();

        // Validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        const reasonLabel = CONTACT_REASONS[reason] || "General Inquiry";
        const adminEmail = process.env.ADMIN_EMAIL || "mubarick391@gmail.com";

        // Send email to founder
        const html = contactEmailTemplate({
            name,
            email,
            subject,
            message,
            reason: reasonLabel,
        });

        const result = await sendEmail({
            to: adminEmail,
            subject: `🌟 [${reasonLabel}] ${subject}`,
            html,
            replyTo: email,
        });

        if (!result.success) {
            throw new Error("Failed to send email");
        }

        // Send confirmation email to user
        const confirmationHtml = confirmationEmailTemplate({ name, subject });
        await sendEmail({
            to: email,
            subject: `We received your message - Silent Voice`,
            html: confirmationHtml,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}

// Email template for contact message to founder
function contactEmailTemplate({
    name,
    email,
    subject,
    message,
    reason,
}: {
    name: string;
    email: string;
    subject: string;
    message: string;
    reason: string;
}): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Georgia, 'Times New Roman', serif; background-color: #0F172A; margin: 0; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #1E293B; border: 1px solid rgba(212, 175, 55, 0.15); border-radius: 16px; overflow: hidden;">
        <!-- Header -->
        <div style="padding: 32px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.1);">
            <div style="display: inline-block; padding: 8px 16px; background-color: rgba(212, 175, 55, 0.1); border-radius: 20px; margin-bottom: 16px;">
                <span style="font-size: 12px; letter-spacing: 2px; color: #D4AF37; text-transform: uppercase;">
                    ${reason}
                </span>
            </div>
            <h1 style="margin: 0; font-size: 24px; color: #F8FAFC; font-weight: normal; letter-spacing: 2px;">
                New Contact Message
            </h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 32px;">
            <!-- Sender Info -->
            <div style="background-color: rgba(15, 23, 42, 0.5); border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 3px solid #D4AF37;">
                <table style="width: 100%;">
                    <tr>
                        <td style="padding: 8px 0;">
                            <span style="font-size: 11px; letter-spacing: 2px; color: #D4AF37; text-transform: uppercase;">From</span>
                            <p style="margin: 4px 0 0 0; font-size: 16px; color: #F8FAFC;">${name}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;">
                            <span style="font-size: 11px; letter-spacing: 2px; color: #D4AF37; text-transform: uppercase;">Email</span>
                            <p style="margin: 4px 0 0 0; font-size: 14px; color: #94A3B8;">
                                <a href="mailto:${email}" style="color: #FBBF24; text-decoration: none;">${email}</a>
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0;">
                            <span style="font-size: 11px; letter-spacing: 2px; color: #D4AF37; text-transform: uppercase;">Subject</span>
                            <p style="margin: 4px 0 0 0; font-size: 16px; color: #F8FAFC;">${subject}</p>
                        </td>
                    </tr>
                </table>
            </div>
            
            <!-- Message -->
            <div style="margin-bottom: 24px;">
                <span style="font-size: 11px; letter-spacing: 2px; color: #D4AF37; text-transform: uppercase;">Message</span>
                <div style="margin-top: 12px; padding: 20px; background-color: rgba(15, 23, 42, 0.5); border-radius: 12px; border: 1px solid rgba(212, 175, 55, 0.1);">
                    <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #CBD5E1; white-space: pre-wrap;">${message}</p>
                </div>
            </div>
            
            <!-- Reply Button -->
            <div style="text-align: center;">
                <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" 
                   style="display: inline-block; padding: 14px 32px; background-color: #D4AF37; color: #0F172A; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; border-radius: 8px;">
                    Reply to ${name}
                </a>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="padding: 24px; background-color: rgba(15, 23, 42, 0.5); border-top: 1px solid rgba(212, 175, 55, 0.1); text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #64748B;">
                Sent from Silent Voice Sanctuary contact form
            </p>
        </div>
    </div>
</body>
</html>
    `.trim();
}

// Confirmation email template for user
function confirmationEmailTemplate({
    name,
    subject,
}: {
    name: string;
    subject: string;
}): string {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Georgia, 'Times New Roman', serif; background-color: #0F172A; margin: 0; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #1E293B; border: 1px solid rgba(212, 175, 55, 0.15); border-radius: 16px; overflow: hidden;">
        <!-- Header -->
        <div style="padding: 32px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.1);">
            <table style="margin: 0 auto;">
                <tr>
                    <td style="width: 48px; height: 1px; background: linear-gradient(to right, transparent, #D4AF37);"></td>
                    <td style="padding: 0 16px;">
                        <span style="font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: #D4AF37;">
                            Silent Voice
                        </span>
                    </td>
                    <td style="width: 48px; height: 1px; background: linear-gradient(to left, transparent, #D4AF37);"></td>
                </tr>
            </table>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 32px; text-align: center;">
            <div style="width: 64px; height: 64px; margin: 0 auto 24px; border: 2px solid #10B981; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 28px;">✓</span>
            </div>
            
            <h1 style="margin: 0 0 16px 0; font-size: 24px; color: #F8FAFC; font-weight: normal; letter-spacing: 3px; text-transform: uppercase;">
                Message Received
            </h1>
            
            <p style="margin: 0 0 24px 0; font-size: 16px; color: #94A3B8; line-height: 1.6;">
                Dear ${name},
            </p>
            
            <p style="margin: 0 0 24px 0; font-size: 16px; color: #94A3B8; line-height: 1.6;">
                Thank you for reaching out to Silent Voice Sanctuary. We've received your message regarding "<strong style="color: #F8FAFC;">${subject}</strong>".
            </p>
            
            <p style="margin: 0 0 32px 0; font-size: 16px; color: #94A3B8; line-height: 1.6;">
                Mubarick will review your message and get back to you within 24-48 hours.
            </p>
            
            <div style="width: 60px; height: 1px; background: linear-gradient(to right, transparent, #D4AF37, transparent); margin: 32px auto;"></div>
            
            <p style="margin: 0; font-size: 14px; font-style: italic; color: #64748B;">
                "In silence, we listen. In response, we connect."
            </p>
        </div>
        
        <!-- Footer -->
        <div style="padding: 24px; background-color: rgba(15, 23, 42, 0.5); border-top: 1px solid rgba(212, 175, 55, 0.1); text-align: center;">
            <a href="${baseUrl}" style="font-size: 12px; color: #FBBF24; text-decoration: none;">
                Visit Silent Voice Sanctuary
            </a>
            <p style="margin: 12px 0 0 0; font-size: 11px; color: #475569;">
                © ${new Date().getFullYear()} Silent Voice • The Digital Sanctuary
            </p>
        </div>
    </div>
</body>
</html>
    `.trim();
}

