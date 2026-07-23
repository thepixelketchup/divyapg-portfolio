import { RESUME_CONTENT } from '@/data/resume';
import { fetchGemini } from '@/lib/geminiFetch';
import { getClientIp, rateLimit } from '@/lib/rateLimit';
import { NextResponse } from 'next/server';

const MAX_ROLE_LENGTH = 100;

export async function POST(req: Request) {
    try {
        const ip = getClientIp(req);
        if (!rateLimit(`summary:${ip}`, 15, 5 * 60 * 1000)) {
            return NextResponse.json({ text: "Too many requests. Please try again in a few minutes." }, { status: 429 });
        }

        const { targetRole } = await req.json();

        if (typeof targetRole !== 'string' || !targetRole.trim() || targetRole.length > MAX_ROLE_LENGTH) {
            return NextResponse.json({ text: "Invalid role provided." }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ text: "API key not configured." }, { status: 500 });
        }

        const systemInstruction = {
            parts: [{
                text: `Act as Divya. Resume: ${RESUME_CONTENT}`
            }]
        };

        const data = await fetchGemini(apiKey, {
            systemInstruction,
            contents: [{
                parts: [{
                    text: `Generate a concise, impactful 2-sentence professional summary of Divya's resume specifically tailored for a ${targetRole}. Focus on what matters most to a ${targetRole}.`
                }]
            }]
        });

        if (data.error) {
            console.error("Gemini API Error:", data.error);
            return NextResponse.json({ text: "The AI service is temporarily unavailable. Please try again shortly." }, { status: 503 });
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        return NextResponse.json({ text: text || "Unable to generate a summary right now." });
    } catch (error) {
        console.error('Summary API Error:', error);
        const isTimeout = error instanceof Error && error.name === 'TimeoutError';
        return NextResponse.json({
            text: isTimeout ? "That's taking longer than usual. Please try again in a moment." : "Internal Server Error"
        }, { status: 500 });
    }
}
