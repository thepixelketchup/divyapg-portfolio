import { RESUME_CONTENT } from '@/data/resume';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { messages, userInput } = await req.json();

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ text: "API key not configured." }, { status: 500 });
        }

        const chatHistory = messages.map((m: any) => `${m.role}: ${m.text}`).join('\n');

        // Construct the prompt with context
        const prompt = `System: You are an intelligent Intake Assistant for Divya Prakash Gupta.
              
    YOUR GOAL:
    If the user implies they have a job, project, or opportunity:
    1. Enthusiastically confirm Divya is **IMMEDIATELY AVAILABLE**.
    2. Politely gather these details (ask conversationally, not all at once unless provided):
       - Client/Company Name
       - Start Date
       - Job Description/Profile (Tech stack?)
       - Budget/Salary
    3. Once you have enough info, summarize it and ask: "Shall I draft an email to Divya with these details?"
    4. If they say YES to drafting/sending, output this EXACT tag at the end of your response: [PREPARE_EMAIL_DRAFT]
    5. Provide the scheduling link: https://calendly.com/divyapgupta and encourage them to book a slot ASAP.

    General Rules:
    - Resume Context: ${RESUME_CONTENT}
    - Be professional but high-energy.
    - If they just want to chat about tech, answer normally based on the resume.
    
    Chat History:
    ${chatHistory}
    User: ${userInput}`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";

        return NextResponse.json({ text });
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ text: "Internal Server Error" }, { status: 500 });
    }
}
