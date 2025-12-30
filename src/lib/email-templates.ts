/**
 * Professional Email Templates for Silent Voice
 * 
 * Responsive HTML email templates with mystical branding
 */

// Color palette (must use inline styles for email compatibility)
const colors = {
    obsidian900: "#0F172A",
    obsidian800: "#1E293B",
    gold600: "#D4AF37",
    gold400: "#FBBF24",
    slate50: "#F8FAFC",
    slate300: "#CBD5E1",
    slate400: "#94A3B8",
    mystic700: "#4C1D95",
    emerald500: "#10B981",
    red500: "#EF4444",
};

/**
 * Base email template wrapper with header and footer
 */
export function baseTemplate(content: string, preheaderText?: string): string {
    return `
<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings xmlns:o="urn:schemas-microsoft-com:office:office">
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <style>
        td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
    </style>
    <![endif]-->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;1,400&display=swap');
        
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; width: 100%; background-color: ${colors.obsidian900}; }
        table { border-collapse: collapse; }
        img { max-width: 100%; height: auto; border: 0; }
        
        .brand-font { font-family: 'Cinzel', 'Georgia', serif; }
        .poetry-font { font-family: 'Crimson Text', 'Georgia', serif; font-style: italic; }
        .ui-font { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; padding: 16px !important; }
            .button { display: block !important; width: 100% !important; text-align: center !important; }
            .button + .button { margin-top: 12px !important; margin-left: 0 !important; }
            h1 { font-size: 24px !important; }
            .poem-excerpt { font-size: 16px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: ${colors.obsidian900};">
    ${preheaderText ? `<div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; color: ${colors.obsidian900};">${preheaderText}</div>` : ""}
    
    <!-- Main Container -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: ${colors.obsidian900};">
        <tr>
            <td align="center" style="padding: 40px 16px;">
                <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
                    
                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding-bottom: 32px;">
                            <table role="presentation" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="width: 48px; height: 1px; background: linear-gradient(to right, transparent, ${colors.gold600});"></td>
                                    <td style="padding: 0 16px;">
                                        <span class="brand-font" style="font-family: 'Cinzel', 'Georgia', serif; font-size: 11px; letter-spacing: 4px; text-transform: uppercase; color: ${colors.gold600};">
                                            Silent Voice
                                        </span>
                                    </td>
                                    <td style="width: 48px; height: 1px; background: linear-gradient(to left, transparent, ${colors.gold600});"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Content Card -->
                    <tr>
                        <td style="background-color: ${colors.obsidian800}; border: 1px solid rgba(212, 175, 55, 0.15); border-radius: 16px; padding: 40px;">
                            ${content}
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding-top: 32px;">
                            <p class="ui-font" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; color: ${colors.slate400}; margin: 0;">
                                © ${new Date().getFullYear()} Silent Voice • The Digital Sanctuary
                            </p>
                            <p class="ui-font" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: rgba(148, 163, 184, 0.5); margin: 8px 0 0 0;">
                                Where whispered words find eternal resonance
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`.trim();
}

/**
 * Primary button style for emails
 */
function primaryButton(href: string, text: string, color: string = colors.gold600, textColor: string = colors.obsidian900): string {
    return `
        <a href="${href}" class="button" style="display: inline-block; background-color: ${color}; color: ${textColor}; font-family: 'Cinzel', 'Georgia', serif; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; padding: 14px 28px; border-radius: 8px; mso-padding-alt: 0;">
            <!--[if mso]><i style="mso-font-width: 150%; mso-text-raise: 24pt;">&nbsp;</i><![endif]-->
            <span style="mso-text-raise: 12pt;">${text}</span>
            <!--[if mso]><i style="mso-font-width: 150%;">&nbsp;</i><![endif]-->
        </a>
    `.trim();
}

/**
 * Secondary/outline button style for emails
 */
function secondaryButton(href: string, text: string, borderColor: string = colors.red500): string {
    return `
        <a href="${href}" class="button" style="display: inline-block; background-color: transparent; color: ${borderColor}; font-family: 'Cinzel', 'Georgia', serif; font-size: 12px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; padding: 12px 26px; border: 2px solid ${borderColor}; border-radius: 8px; margin-left: 12px;">
            ${text}
        </a>
    `.trim();
}

interface ModerationEmailParams {
    title: string;
    excerpt: string;
    authorName: string;
    submittedAt: string;
    approveUrl: string;
    rejectUrl: string;
    adminDashboardUrl: string;
}

/**
 * Moderation notification email for new poem submissions
 */
export function moderationNotificationEmail(params: ModerationEmailParams): string {
    const { title, excerpt, authorName, submittedAt, approveUrl, rejectUrl, adminDashboardUrl } = params;

    const content = `
        <!-- Title -->
        <h1 class="brand-font" style="font-family: 'Cinzel', 'Georgia', serif; font-size: 28px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: ${colors.gold600}; text-align: center; margin: 0 0 8px 0;">
            New Poem Submission
        </h1>
        <p class="poetry-font" style="font-family: 'Crimson Text', 'Georgia', serif; font-style: italic; font-size: 16px; color: ${colors.slate400}; text-align: center; margin: 0 0 32px 0;">
            "A new voice seeks entry into the sanctuary."
        </p>
        
        <!-- Divider -->
        <div style="width: 60px; height: 1px; background: linear-gradient(to right, transparent, ${colors.gold600}, transparent); margin: 0 auto 32px auto;"></div>
        
        <!-- Poem Details -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
            <tr>
                <td style="padding: 16px; background-color: rgba(15, 23, 42, 0.5); border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.1);">
                    <p class="brand-font" style="font-family: 'Cinzel', 'Georgia', serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${colors.gold600}; margin: 0 0 8px 0;">
                        Title
                    </p>
                    <h2 class="ui-font" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 20px; font-weight: 500; color: ${colors.slate50}; margin: 0;">
                        ${title}
                    </h2>
                </td>
            </tr>
        </table>
        
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
            <tr>
                <td width="50%" style="padding: 12px 16px; background-color: rgba(15, 23, 42, 0.5); border-radius: 8px 0 0 8px; border: 1px solid rgba(212, 175, 55, 0.1); border-right: none;">
                    <p class="brand-font" style="font-family: 'Cinzel', 'Georgia', serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${colors.gold600}; margin: 0 0 4px 0;">
                        Author
                    </p>
                    <p class="ui-font" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: ${colors.slate300}; margin: 0;">
                        ${authorName}
                    </p>
                </td>
                <td width="50%" style="padding: 12px 16px; background-color: rgba(15, 23, 42, 0.5); border-radius: 0 8px 8px 0; border: 1px solid rgba(212, 175, 55, 0.1); border-left: none;">
                    <p class="brand-font" style="font-family: 'Cinzel', 'Georgia', serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${colors.gold600}; margin: 0 0 4px 0;">
                        Submitted
                    </p>
                    <p class="ui-font" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: ${colors.slate300}; margin: 0;">
                        ${submittedAt}
                    </p>
                </td>
            </tr>
        </table>
        
        <!-- Poem Excerpt -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
            <tr>
                <td style="padding: 24px; background-color: rgba(15, 23, 42, 0.5); border-radius: 8px; border: 1px solid rgba(212, 175, 55, 0.1); border-left: 3px solid ${colors.gold600};">
                    <p class="brand-font" style="font-family: 'Cinzel', 'Georgia', serif; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: ${colors.gold600}; margin: 0 0 12px 0;">
                        Preview
                    </p>
                    <p class="poetry-font poem-excerpt" style="font-family: 'Crimson Text', 'Georgia', serif; font-style: italic; font-size: 18px; line-height: 1.7; color: ${colors.slate300}; margin: 0;">
                        "${excerpt}${excerpt.length >= 200 ? "..." : ""}"
                    </p>
                </td>
            </tr>
        </table>
        
        <!-- Action Buttons -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding: 8px 0;">
                    ${primaryButton(approveUrl, "✓ Approve", colors.emerald500, colors.slate50)}
                    ${secondaryButton(rejectUrl, "✗ Reject", colors.red500)}
                </td>
            </tr>
        </table>
        
        <!-- Divider -->
        <div style="width: 100%; height: 1px; background-color: rgba(212, 175, 55, 0.1); margin: 32px 0;"></div>
        
        <!-- Admin Dashboard Link -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center">
                    <p class="ui-font" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: ${colors.slate400}; margin: 0 0 12px 0;">
                        Or manage all submissions in the admin dashboard:
                    </p>
                    <a href="${adminDashboardUrl}" class="ui-font" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; color: ${colors.gold400}; text-decoration: underline;">
                        ${adminDashboardUrl}
                    </a>
                </td>
            </tr>
        </table>
    `;

    return baseTemplate(content, `New poem submission: "${title}" by ${authorName}`);
}

interface ApprovalEmailParams {
    title: string;
    authorName: string;
    poemUrl: string;
}

/**
 * Email sent to author when their poem is approved
 */
export function poemApprovedEmail(params: ApprovalEmailParams): string {
    const { title, authorName, poemUrl } = params;

    const content = `
        <!-- Icon -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
            <tr>
                <td align="center">
                    <div style="width: 64px; height: 64px; border-radius: 50%; border: 2px solid ${colors.emerald500}; display: inline-flex; align-items: center; justify-content: center;">
                        <span style="font-size: 28px;">✓</span>
                    </div>
                </td>
            </tr>
        </table>
        
        <!-- Title -->
        <h1 class="brand-font" style="font-family: 'Cinzel', 'Georgia', serif; font-size: 24px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: ${colors.emerald500}; text-align: center; margin: 0 0 8px 0;">
            Sacred Approval
        </h1>
        <p class="poetry-font" style="font-family: 'Crimson Text', 'Georgia', serif; font-style: italic; font-size: 16px; color: ${colors.slate400}; text-align: center; margin: 0 0 32px 0;">
            "Your words have been enshrined in the sanctuary."
        </p>
        
        <!-- Message -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
            <tr>
                <td style="text-align: center;">
                    <p class="ui-font" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; line-height: 1.6; color: ${colors.slate300}; margin: 0;">
                        Dear <strong>${authorName}</strong>,
                    </p>
                    <p class="ui-font" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; line-height: 1.6; color: ${colors.slate300}; margin: 16px 0 0 0;">
                        Your poem <strong>"${title}"</strong> has been approved and is now live in the Silent Voice sanctuary, where it will resonate eternally with fellow seekers of poetic truth.
                    </p>
                </td>
            </tr>
        </table>
        
        <!-- View Poem Button -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding: 16px 0;">
                    ${primaryButton(poemUrl, "View Your Poem")}
                </td>
            </tr>
        </table>
    `;

    return baseTemplate(content, `Your poem "${title}" has been approved!`);
}

interface RejectionEmailParams {
    title: string;
    authorName: string;
    reason?: string;
}

/**
 * Email sent to author when their poem is rejected
 */
export function poemRejectedEmail(params: RejectionEmailParams): string {
    const { title, authorName, reason } = params;

    const content = `
        <!-- Title -->
        <h1 class="brand-font" style="font-family: 'Cinzel', 'Georgia', serif; font-size: 24px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: ${colors.slate300}; text-align: center; margin: 0 0 8px 0;">
            Submission Update
        </h1>
        <p class="poetry-font" style="font-family: 'Crimson Text', 'Georgia', serif; font-style: italic; font-size: 16px; color: ${colors.slate400}; text-align: center; margin: 0 0 32px 0;">
            "Every voice deserves to be heard, but not every moment is the right one."
        </p>
        
        <!-- Message -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
            <tr>
                <td style="text-align: center;">
                    <p class="ui-font" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; line-height: 1.6; color: ${colors.slate300}; margin: 0;">
                        Dear <strong>${authorName}</strong>,
                    </p>
                    <p class="ui-font" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; line-height: 1.6; color: ${colors.slate300}; margin: 16px 0 0 0;">
                        After careful consideration, your poem <strong>"${title}"</strong> was not selected for the sanctuary at this time.
                    </p>
                    ${reason ? `
                    <p class="ui-font" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; line-height: 1.6; color: ${colors.slate400}; margin: 16px 0 0 0; padding: 16px; background-color: rgba(15, 23, 42, 0.5); border-radius: 8px;">
                        <em>Note: ${reason}</em>
                    </p>
                    ` : ""}
                    <p class="ui-font" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; line-height: 1.6; color: ${colors.slate300}; margin: 16px 0 0 0;">
                        We encourage you to continue your poetic journey and submit again when inspiration strikes.
                    </p>
                </td>
            </tr>
        </table>
    `;

    return baseTemplate(content, `Update on your poem submission: "${title}"`);
}
