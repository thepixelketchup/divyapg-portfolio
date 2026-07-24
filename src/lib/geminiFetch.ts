const GEMINI_MODEL = 'gemini-3.5-flash-lite';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

interface GeminiFetchOptions {
    retries?: number;
    retryDelayMs?: number;
    timeoutMs?: number;
}

export interface GeminiResponse {
    error?: { code?: number; status?: string; message?: string };
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
}

// Gemini returns 503/UNAVAILABLE under load ("high demand... usually temporary, try again")
// — worth a couple of quick retries before surfacing a failure to the user.
function isTransientGeminiError(error: { code?: number; status?: string }): boolean {
    return error?.code === 503 || error?.status === 'UNAVAILABLE';
}

export async function fetchGemini(apiKey: string, body: Record<string, unknown>, options: GeminiFetchOptions = {}): Promise<GeminiResponse> {
    const { retries = 2, retryDelayMs = 700, timeoutMs = 25_000 } = options;

    let data: GeminiResponse = {};

    for (let attempt = 0; attempt <= retries; attempt++) {
        const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(timeoutMs),
        });
        data = await response.json();

        if (!data.error || !isTransientGeminiError(data.error) || attempt === retries) {
            return data;
        }

        await new Promise(resolve => setTimeout(resolve, retryDelayMs * (attempt + 1)));
    }

    return data;
}
