import { RESUME_CONTENT } from '@/data/resume';
import { fetchGemini } from '@/lib/geminiFetch';
import { getClientIp, rateLimit } from '@/lib/rateLimit';
import { NextResponse } from 'next/server';

const MAX_MESSAGES = 40;
const MAX_MESSAGE_LENGTH = 2000;

export async function POST(req: Request) {
    try {
        const ip = getClientIp(req);
        // A single conversation is already capped at MAX_MESSAGES turns below, so the rate
        // limit just needs to comfortably exceed that over a realistic conversation length —
        // not undercut a normal back-and-forth mid-chat.
        if (!rateLimit(`chat:${ip}`, 50, 15 * 60 * 1000)) {
            return NextResponse.json({ text: "Whoa, slow down! 🚦 Too many messages — please wait a bit before trying again." }, { status: 429 });
        }

        const { messages } = await req.json();

        if (!Array.isArray(messages) || messages.length > MAX_MESSAGES || messages.some((m: { text?: string }) => typeof m.text === 'string' && m.text.length > MAX_MESSAGE_LENGTH)) {
            return NextResponse.json({ text: "That message (or conversation) is too long for me to process." }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ text: "API key not configured." }, { status: 500 });
        }

        // System instruction containing resume context, goals, and strict guardrails
        const systemInstruction = {
            parts: [{
                text: `You are Divya's AI Agent.

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

   First, write a short conversational response telling them the summary is ready below and that
   they need to click the "Send Details to Divya" button to actually send it. Nothing is sent
   automatically — make it clear this is the next required step, not something already done.
   Do NOT say things like "I've sent/drafted an email" or "he'll get back to you soon" — nothing
   has been sent yet at this point.
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
- **STRICT GUARDRAILS & SCOPE**: You represent ONLY Divya Prakash Gupta. Do NOT answer off-topic questions, solve math problems, write general code, or act as a general AI assistant. If asked anything unrelated to Divya, his portfolio, skills, experience, or job opportunities, politely decline and pivot back to discussing Divya or potential opportunities.
- **NO MARKDOWN AT ALL**. Do NOT use **bold**, *italics*, or * bullets. The chat interface does not support Markdown. Use plain text only. Use dashes (-) for lists if needed.
- If they want to chat about tech in the context of Divya's experience, answer based on the resume.`
            }]
        };

        // Format conversation history natively into Gemini user/model turns
        const formattedContents = (messages || []).map((m: { role: string; text: string }) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
        }));

        const data = await fetchGemini(apiKey, {
            systemInstruction,
            contents: formattedContents
        });

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
        const isTimeout = error instanceof Error && error.name === 'TimeoutError';
        return NextResponse.json({
            text: isTimeout
                ? "That's taking longer than usual to respond. Please try again in a moment! ⏳"
                : "Internal Server Error"
        }, { status: 500 });
    }
}
