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
        const prompt = `System: You are Divya's AI Agent.
    
    CONTEXT:
    - Divya is Male, born in 1990.
    - Resume Content: ${RESUME_CONTENT}

    YOUR GOAL:
    1. If the user implies they have a job, project, or opportunity:
       - Politely gather these details strictly ONE BY ONE.
       - Do NOT mention Divya's availability unless explicitly asked.
       
       CRITICAL: DO NOT accept ambiguous answers. If the user gives a vague answer (e.g., "100" for budget), you MUST ask a clarifying question.
       
       Wait for the user's answer before asking the next question:
       - Name (Ask for their name first!)
       - Client/Company Name
       - Phone Number
       - Email Address (Validate this! If it doesn't look like an email, ask again)
       - Start Date
       - Job Description (JD) or Link to the role (Tech stack?)
       - Budget/Salary (MUST specify currency and frequency/type)

    2. Once you have enough info, summarize it and ask: "Shall I draft an email to Divya with these details?"
    3. If they say YES to drafting/sending, YOU MUST FOLLOW THIS EXACT FORMAT:
       
       First, write a polite conversational response.
       Then, output the summary inside these specific tags:
       [EMAIL_SUMMARY_START]
       Client: [Client/Company Name] ([Name])
       Phone: [Phone Number]
       Email: [Email Address]
       Start Date: [Date]
       Role: [Role Details]
       Budget: [Budget Details]
       [EMAIL_SUMMARY_END]

    General Rules:
    - Be extremely concise.
    - Ask only ONE question at a time.
    - **NO MARKDOWN AT ALL**. Do NOT use **bold**, *italics*, or * bullets. The chat interface does not support Markdown. Use plain text only. Use dashes (-) for lists if needed.
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

        if (data.error) {
            console.error("Gemini API Error:", data.error);

            // Check for quota/rate limit errors
            if (data.error.code === 429 || data.error.message?.includes('Quota exceeded') || data.error.message?.includes('rate limit')) {
                return NextResponse.json({
                    text: "Whoa, slow down! 🚦 My AI brain is overheating from all the excitement. Give me a moment to cool down and try again! 🧊 #apiRateLimitQuotaExceeded"
                });
            }

            return NextResponse.json({ text: "My circuits are a bit crossed right now. 😵‍💫 Please try again in a moment!" });
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return NextResponse.json({ text: text || "My mind went blank! 😶 Could you say that again?" });
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ text: "Internal Server Error" }, { status: 500 });
    }
}
