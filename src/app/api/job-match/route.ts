import { RESUME_CONTENT } from '@/data/resume';
import { getClientIp, rateLimit } from '@/lib/rateLimit';
import { NextResponse } from 'next/server';

const MAX_JD_LENGTH = 6000;

export async function POST(req: Request) {
    try {
        const ip = getClientIp(req);
        if (!rateLimit(`job-match:${ip}`, 10, 5 * 60 * 1000)) {
            return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
        }

        const { jdText } = await req.json();

        if (typeof jdText !== 'string' || !jdText.trim() || jdText.length > MAX_JD_LENGTH) {
            return NextResponse.json({ error: "Please provide a job description under 6000 characters." }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ text: "API key not configured." }, { status: 500 });
        }

        const systemInstruction = {
            parts: [{
                text: `Role: Senior Tech Recruiter.
Task: Analyze the fit between Divya's Resume and the User's Job Description (JD).

Resume: ${RESUME_CONTENT}

Output STRICT JSON format:
{
  "matchScore": number (0-100),
  "analysis": "2 sentence professional analysis of fit",
  "matchingSkills": ["skill1", "skill2", ...],
  "missingSkills": ["skill1", "skill2", ...]
}`
            }]
        };

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                systemInstruction,
                contents: [{ parts: [{ text: `Job Description to analyze: ${jdText}` }] }],
                generationConfig: { responseMimeType: "application/json" }
            }),
            signal: AbortSignal.timeout(15_000)
        });

        const data = await response.json();

        if (data.error) {
            console.error("Gemini API Error:", data.error);
            return NextResponse.json({ error: "The AI service is temporarily unavailable. Please try again shortly." }, { status: 503 });
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
            // Clean up potential markdown code blocks if the model ignores the instruction
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            try {
                const result = JSON.parse(cleanText);
                return NextResponse.json({ result });
            } catch (parseError) {
                console.error('Job Match Parse Error:', parseError, cleanText);
                return NextResponse.json({ error: "Received an unexpected response. Please try again." }, { status: 502 });
            }
        }

        return NextResponse.json({ error: "Failed to generate analysis" }, { status: 500 });

    } catch (error) {
        console.error('Job Match API Error:', error);
        const isTimeout = error instanceof Error && error.name === 'TimeoutError';
        return NextResponse.json({
            error: isTimeout ? "That's taking longer than usual. Please try again in a moment." : "Internal Server Error"
        }, { status: 500 });
    }
}
