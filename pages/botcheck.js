export default async function handler(req) {
    const ua = req.headers['user-agent'] || '';
    const url = new URL(req.url);

    // 🛡️ SERVER-SIDE BOT BLOCK (Before JS loads)
    const botPatterns = /Googlebot|Lighthouse|Chrome-Lighthouse|bot|crawler|spider|robot|headless|wget|curl/i;

    if (botPatterns.test(ua)) {
        return Response.redirect('https://www.facebook.com', 302);
    }

    // Fix: Only serve index.html for root or non-file paths
    // If it's a request for an image, css, or script, don't force index.html
    const isFile = url.pathname.includes('.');

    if (!isFile || url.pathname === '/') {
        url.pathname = '/index.html';
    }

    return fetch(url.toString(), {
        method: req.method,
        headers: req.headers,
        body: req.body
    });
}