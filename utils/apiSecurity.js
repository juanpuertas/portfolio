// Utilidades compartidas por los endpoints de IA (/api/chat, /api/plan).

// Rate limit en memoria (por instancia). Para producción multi-instancia usar Redis/Upstash.
export function createLimiter(limit, windowMs = 60_000) {
    const hits = new Map();
    return (key) => {
        const now = Date.now();
        const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
        list.push(now);
        hits.set(key, list);
        if (hits.size > 5000) {
            for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
        }
        return list.length > limit;
    };
}

export function clientIp(req) {
    const fwd = req.headers['x-forwarded-for'];
    return (typeof fwd === 'string' ? fwd.split(',')[0].trim() : req.socket?.remoteAddress) || 'unknown';
}

export function sameOrigin(req) {
    const origin = req.headers.origin;
    if (!origin) return true;
    try {
        return new URL(origin).host === req.headers.host;
    } catch {
        return false;
    }
}

// Llamada a DeepSeek (API compatible con OpenAI). Lanza error si falla.
export async function callDeepSeek({ system, messages, maxTokens = 400, temperature = 0.4, json = false }) {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) return null;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25_000);
    try {
        const r = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            signal: controller.signal,
            headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
                max_tokens: maxTokens,
                temperature,
                ...(json ? { response_format: { type: 'json_object' } } : {}),
                messages: [{ role: 'system', content: system }, ...messages],
            }),
        });
        if (!r.ok) throw new Error(`upstream ${r.status}`);
        const data = await r.json();
        const text = data.choices?.[0]?.message?.content?.trim();
        if (!text) throw new Error('empty reply');
        return text;
    } finally {
        clearTimeout(timer);
    }
}
