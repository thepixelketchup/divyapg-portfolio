import { RESUME_CONTENT } from '@/data/resume';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { jdText } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ text: "API key not configured." }, { status: 500 });
        }

        const prompt = `
        Role: Senior Tech Recruiter.
        Task: Analyze the fit between Divya's Resume and the User's Job Description (JD).
        
        Resume: ${RESUME_CONTENT}
        Job Description: ${jdText}

        Output STRICT JSON format (no markdown code blocks):
        {
          "matchScore": number (0-100),
          "analysis": "2 sentence professional analysis of fit",
          "matchingSkills": ["skill1", "skill2", ...],
          "missingSkills": ["skill1", "skill2", ...]
        }
      `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            })
        });

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (text) {
            // Clean up potential markdown code blocks if the model ignores the instruction
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const result = JSON.parse(cleanText);
            return NextResponse.json({ result });
        }

        return NextResponse.json({ error: "Failed to generate analysis" }, { status: 500 });

    } catch (error) {
        console.error('Job Match API Error:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
