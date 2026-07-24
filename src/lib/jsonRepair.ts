// Gemini's JSON mode occasionally reports finishReason: STOP while the emitted text is
// missing its closing brackets/braces (or ends mid-string) — genuinely invalid JSON, not a
// length/token-budget truncation. This heuristically closes whatever was left open so a
// mostly-complete response can still be salvaged instead of failing outright.
export function repairTruncatedJson(text: string): string {
    let result = text.trim().replace(/,\s*$/, '');

    const stack: string[] = [];
    let inString = false;
    let escaped = false;

    for (const char of result) {
        if (inString) {
            if (escaped) {
                escaped = false;
            } else if (char === '\\') {
                escaped = true;
            } else if (char === '"') {
                inString = false;
            }
            continue;
        }

        if (char === '"') {
            inString = true;
        } else if (char === '{' || char === '[') {
            stack.push(char === '{' ? '}' : ']');
        } else if (char === '}' || char === ']') {
            stack.pop();
        }
    }

    if (inString) {
        result += '"';
    }

    while (stack.length > 0) {
        result += stack.pop();
    }

    return result;
}
