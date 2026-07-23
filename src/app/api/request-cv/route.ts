import { getClientIp, rateLimit } from '@/lib/rateLimit';
import { isPlausibleLinkedinMatch } from '@/lib/verifyLinkedin';
import { withTimeout } from '@/lib/withTimeout';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = {
    name: 100,
    email: 150,
    phone: 30,
    linkedinUrl: 300,
    company: 150,
    roleDetails: 3000,
    startDate: 50,
    budget: 100,
};

export async function POST(req: Request) {
    try {
        const ip = getClientIp(req);
        if (!rateLimit(`request-cv:${ip}`, 5, 60 * 60 * 1000)) {
            return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
        }

        const body = await req.json();
        const { name, email, phone, linkedinUrl, company, roleDetails, startDate, budget } = body || {};

        if (!name || !email || !phone || !linkedinUrl || !company || !roleDetails) {
            return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
        }

        if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
            return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
        }

        for (const [field, max] of Object.entries(MAX_LENGTHS)) {
            const value = body[field];
            if (value && typeof value === 'string' && value.length > max) {
                return NextResponse.json({ error: `${field} is too long.` }, { status: 400 });
            }
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "Email service is not configured." }, { status: 500 });
        }

        const matched = isPlausibleLinkedinMatch(name, linkedinUrl);
        const cvUrl = `${new URL(req.url).origin}/Divya-Prakash-Gupta-CV-2026-v0.1.pdf`;

        const resend = new Resend(apiKey);

        const emailBody = `A new CV request came in from the portfolio site.

========================================
LINKEDIN MATCH CHECK: ${matched ? 'PASSED (name plausibly matches LinkedIn slug)' : 'DID NOT PASS - verify manually before sending anything'}
========================================

Name: ${name}
Email: ${email}
Phone: ${phone}
LinkedIn: ${linkedinUrl}
Company/Client: ${company}
Start Date: ${startDate || 'Not provided'}
Budget: ${budget || 'Not provided'}

Opportunity Details:
${roleDetails}

========================================
CV file link (send this to the requester once verified): ${cvUrl}
========================================

Reply to this email to respond directly to ${email}.

---
Sent automatically from Divya's Portfolio CV Request form. No email or file was sent to the requester automatically.`;

        await withTimeout(
            resend.emails.send({
                from: 'Portfolio CV Requests <onboarding@resend.dev>',
                to: ['divya@thecuriousbunny.nl'],
                replyTo: email,
                subject: `CV Request from ${name}${matched ? '' : ' (LinkedIn match unverified)'}`,
                text: emailBody,
            }),
            10_000,
            'Email service timed out'
        );

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error('Request CV Error:', error);
        const message = error instanceof Error ? error.message : 'Failed to submit request';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
