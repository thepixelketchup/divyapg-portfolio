import { getClientIp, rateLimit } from '@/lib/rateLimit';
import { withTimeout } from '@/lib/withTimeout';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
    try {
        const ip = getClientIp(req);
        if (!rateLimit(`send-email:${ip}`, 5, 60 * 60 * 1000)) {
            return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
        }

        const { emailDraft, messages } = await req.json();

        if (!emailDraft || typeof emailDraft !== 'string') {
            return NextResponse.json({ error: "Missing email draft content" }, { status: 400 });
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "RESEND_API_KEY is not configured in environment variables." }, { status: 500 });
        }

        const resend = new Resend(apiKey);

        // Format full chat history for body and attachment
        const transcriptText = Array.isArray(messages)
            ? messages.map((m: { role: string; text: string }) => `[${m.role.toUpperCase()}]: ${m.text}`).join('\n\n')
            : 'No transcript recorded.';

        const fullEmailText = `Hi Divya,

A new potential project/job opportunity lead was collected by your AI Assistant:

========================================
LEAD DETAILS
========================================
${emailDraft}

========================================
FULL CHAT TRANSCRIPT
========================================
${transcriptText}

---
Sent automatically from Divya's Portfolio AI Agent.`;

        const data = await withTimeout(
            resend.emails.send({
                from: 'Portfolio AI Agent <onboarding@resend.dev>',
                to: ['divya@thecuriousbunny.nl'],
                subject: 'New Opportunity Lead + Chat Log (via Portfolio AI Agent)',
                text: fullEmailText,
                attachments: [
                    {
                        filename: 'chat_transcript.txt',
                        content: Buffer.from(transcriptText, 'utf-8').toString('base64'),
                    }
                ]
            }),
            10_000,
            'Email service timed out'
        );

        return NextResponse.json({ success: true, data });
    } catch (error: unknown) {
        console.error('Send Email Error:', error);
        const message = error instanceof Error ? error.message : "Failed to send email";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
