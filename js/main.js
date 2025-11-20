document.addEventListener('DOMContentLoaded', () => {
    loadNavigation();
    loadFooter();
    initCursor();
});

function loadNavigation() {
    // Determine depth to root
    const path = window.location.pathname;
    const isPages = path.includes('/pages/');
    const isTools = path.includes('/tools/');

    let root = './';
    if (isTools) root = '../../';
    else if (isPages) root = '../';

    const navHTML = `
    <header class="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-green-500/20">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="${root}index.html" class="text-2xl font-bold text-white font-mono hover:text-green-400 transition-colors">
                <span class="text-green-500">></span> Harsh_Bhogayata
            </a>
            
            <!-- Desktop Nav -->
            <nav class="hidden md:flex space-x-8 font-mono text-sm">
                <a href="${root}index.html" class="nav-link hover:text-green-400 transition-colors">//home</a>
                <a href="${root}pages/about.html" class="nav-link hover:text-green-400 transition-colors">//about</a>
                <a href="${root}pages/projects.html" class="nav-link hover:text-green-400 transition-colors">//projects</a>
                <a href="${root}pages/tools.html" class="nav-link hover:text-green-400 transition-colors text-cyan-400">//tools</a>
                <a href="${root}pages/contact.html" class="nav-link hover:text-green-400 transition-colors">//contact</a>
            </nav>

            <!-- Mobile Menu Button -->
            <button id="mobile-menu-btn" class="md:hidden text-white hover:text-green-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-black/95 border-b border-green-500/20 absolute w-full">
            <div class="px-6 py-4 space-y-4 font-mono">
                <a href="${root}index.html" class="block hover:text-green-400">//home</a>
                <a href="${root}pages/about.html" class="block hover:text-green-400">//about</a>
                <a href="${root}pages/projects.html" class="block hover:text-green-400">//projects</a>
                <a href="${root}pages/tools.html" class="block hover:text-green-400 text-cyan-400">//tools</a>
                <a href="${root}pages/contact.html" class="block hover:text-green-400">//contact</a>
            </div>
        </div>
    </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Mobile Menu Logic
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }

    // Highlight Active Link
    // Simple check for filename match
    const filename = path.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href').includes(filename)) {
            link.classList.add('text-green-400', 'font-bold');
        }
    });
}

function loadFooter() {
    const footerHTML = `
    <footer class="bg-black/90 border-t border-green-500/10 py-8 mt-20">
        <div class="container mx-auto px-6 text-center">
            <div class="flex justify-center space-x-6 mb-4">
                <a href="https://github.com/harshbhogayata" target="_blank" class="text-gray-400 hover:text-green-400 transition-colors"><i class="fab fa-github text-xl"></i></a>
                <a href="https://linkedin.com/in/harshbhogayata" target="_blank" class="text-gray-400 hover:text-blue-400 transition-colors"><i class="fab fa-linkedin text-xl"></i></a>
                <a href="mailto:harshmbhogayata@gmail.com" class="text-gray-400 hover:text-red-400 transition-colors"><i class="fas fa-envelope text-xl"></i></a>
            </div>
            <p class="text-gray-600 font-mono text-sm">
                &copy; ${new Date().getFullYear()} Harsh Bhogayata. <span class="text-green-500/50">System Secure.</span>
            </p>
        </div>
    </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function initCursor() {
    // Inject Interactive Background Div if not present
    if (!document.getElementById('interactive-bg')) {
        const bgDiv = document.createElement('div');
        bgDiv.id = 'interactive-bg';
        document.body.prepend(bgDiv);
    }

    // Mouse Tracking for Background Glow
    document.addEventListener('mousemove', e => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // Custom Cursor (Optional - keeping simple dot if desired, or removing if user wants ONLY the glow)
    // The user request "implement that background glow in cursor sitewide" implies the glow IS the cursor effect.
    // But let's keep a minimal cursor or just the glow. The provided snippet had a "typewriter-cursor" but no custom mouse cursor div.
    // I will remove the previous custom cursor div logic to match the "original" snippet's intent which relies on the radial gradient.
}

// --- Konami Code ---
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateGodMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateGodMode() {
    alert("GOD MODE ACTIVATED: Access Granted to All Systems.");
    document.documentElement.style.setProperty('--accent-primary', '#ff00ff');
    document.documentElement.style.setProperty('--text-primary', '#00ff00');
    document.body.style.fontFamily = "'Courier New', monospace";
    // Play sound if available
    playSound('access_granted');
}

// --- Soundboard ---
// Simple synthesized beeps using Web Audio API to avoid external assets
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
    } else if (type === 'click') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    } else if (type === 'access_granted') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554, now + 0.1);
        osc.frequency.setValueAtTime(659, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
    }
}

// Attach sounds to interactive elements
document.addEventListener('mouseover', (e) => {
    if (e.target.matches('a, button, input, .card-hover')) {
        playSound('hover');
    }
});

document.addEventListener('click', () => {
    playSound('click');
});

// --- Theme Switcher (Simple Implementation) ---
// This allows changing the primary accent color via console or future UI
window.setTheme = function (color) {
    const root = document.documentElement;
    if (color === 'red') {
        root.style.setProperty('--accent-primary', '#ef4444'); // Red-500
        root.style.setProperty('--text-primary', '#fca5a5');   // Red-300
    } else if (color === 'blue') {
        root.style.setProperty('--accent-primary', '#3b82f6'); // Blue-500
        root.style.setProperty('--text-primary', '#93c5fd');   // Blue-300
    } else {
        // Default Green
        root.style.setProperty('--accent-primary', '#22c55e'); // Green-500
        root.style.setProperty('--text-primary', '#86efac');   // Green-300
    }
};

// --- Global Dashboard Features ---

// Clock Update
function initClock() {
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        // Update immediately
        const update = () => {
            const now = new Date();
            const options = {
                timeZone: 'Asia/Kolkata',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            const timeString = now.toLocaleTimeString('en-GB', options) + ' IST';
            clockEl.innerText = timeString;
        };
        update();
        setInterval(update, 1000);
    }
}

// Random Hex String Generator for "Decryption" effects
function getRandomHex(length) {
    let result = '';
    const characters = 'ABCDEF0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Expose for inline scripts if needed
window.getRandomHex = getRandomHex;

// Initialize everything on load
document.addEventListener('DOMContentLoaded', () => {
    // If these were already called by the first listener, this is redundant but harmless.
    // However, initClock was NOT called in the first listener (lines 1-5), so we need it here.
    // Or better, we can just add it to the first listener and remove this one, but since I am replacing this block,
    // I will just ensure it runs.

    // Check if we need to run initClock (it might be safe to run again or check if running)
    initClock();

    // Re-run cursor init if it wasn't caught (redundant but safe)
    const cursor = document.querySelector('.cursor');
    if (cursor && !document.getElementById('custom-cursor')) {
        // initCursor already handles creation, so we might not need this if initCursor is robust.
        // But let's keep the logic simple and just run initClock here.
    }
});
