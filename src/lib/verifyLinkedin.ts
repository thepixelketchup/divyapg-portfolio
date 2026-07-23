// Heuristic-only check: LinkedIn blocks scraping and there is no LinkedIn API access here,
// so this cannot confirm someone actually owns the profile. It only filters out submissions
// where the name and LinkedIn URL clearly don't belong to the same person, so the request
// still routes to a human (Divya) for the real verification before anything is sent out.

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

export function extractLinkedinSlug(url: string): string | null {
    try {
        const parsed = new URL(url.trim());
        if (!/(^|\.)linkedin\.com$/.test(parsed.hostname)) return null;

        const match = parsed.pathname.match(/\/in\/([^/]+)/i);
        return match ? decodeURIComponent(match[1]) : null;
    } catch {
        return null;
    }
}

export function isPlausibleLinkedinMatch(fullName: string, linkedinUrl: string): boolean {
    const slug = extractLinkedinSlug(linkedinUrl);
    if (!slug) return false;

    const normalizedSlug = normalize(slug);
    const nameTokens = fullName.trim().split(/\s+/).filter(t => t.length >= 2);
    if (nameTokens.length === 0 || !normalizedSlug) return false;

    const firstName = normalize(nameTokens[0]);
    const lastName = normalize(nameTokens[nameTokens.length - 1]);

    const firstMatches = firstName.length > 0 && normalizedSlug.includes(firstName);
    const lastMatches = lastName.length > 0 && normalizedSlug.includes(lastName);

    // Single-word names only need to match once; otherwise require both first and last name.
    return nameTokens.length === 1 ? firstMatches : firstMatches && lastMatches;
}
