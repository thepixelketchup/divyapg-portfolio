import { RESUME_CONTENT } from '@/data/resume';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { targetRole } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ text: "API key not configured." }, { status: 500 });
        }

        const prompt = `Act as Divya. Generate a concise, impactful 2-sentence professional summary of Divya's resume specifically tailored for a ${targetRole}. Focus on what matters most to a ${targetRole}. Resume: ${RESUME_CONTENT}`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        return NextResponse.json({ text });
    } catch (error) {
        console.error('Summary API Error:', error);
        return NextResponse.json({ text: "Internal Server Error" }, { status: 500 });
    }
}
