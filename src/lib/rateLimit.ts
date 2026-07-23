// In-memory sliding-window limiter. Good enough as defense-in-depth on a long-lived Node
// process (e.g. `next start` on a VM); on serverless platforms (Vercel, etc.) each instance
// keeps its own counters, so this does not guarantee a global limit there — pair it with a
// shared store (Vercel KV, Upstash Redis) for a hard guarantee in that environment.

const buckets = new Map<string, number[]>();

export function getClientIp(req: Request): string {
    const forwardedFor = req.headers.get('x-forwarded-for');
    if (forwardedFor) return forwardedFor.split(',')[0].trim();
    return req.headers.get('x-real-ip') || 'unknown';
}

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const timestamps = (buckets.get(key) || []).filter(t => now - t < windowMs);

    if (timestamps.length >= limit) {
        buckets.set(key, timestamps);
        return false;
    }

    timestamps.push(now);
    buckets.set(key, timestamps);
    return true;
}
