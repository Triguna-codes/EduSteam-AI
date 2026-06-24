/**
 * EDUSTEAM AI - Core Application Script
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize the new Welcome Screen & Star Animation
    initWelcomeScreen();
    initStarCanvas();

    // 2. Initialize your existing app features
    initAudioEngine();
    initWorkspaceLauncher();
    initTabEngine();
    initFocusTimer();
});

/* ==========================================================================
   NEW: Welcome Screen & Animation Logic
   ========================================================================== */

function initWelcomeScreen() {
    const btn = document.getElementById("enter-app-btn");
    const screen = document.getElementById("welcome-screen");
    const app = document.getElementById("main-app");

    if (!btn || !screen || !app) return;

    btn.addEventListener("click", () => {
        screen.style.opacity = '0';
        setTimeout(() => {
            screen.classList.add('hidden');
            app.classList.remove('hidden');
        }, 800);
    });
}

function initStarCanvas() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = Array.from({length: 100}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        a: Math.random(),
        speed: 0.005 + Math.random() * 0.01
    }));

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.a += s.speed;
            const alpha = (Math.sin(s.a) + 1) / 2;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(180,210,255,${alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
}

/* ==========================================================================
   EXISTING: Your App Functionality
   ========================================================================== */

function initAudioEngine() {
    const modeButtons = document.querySelectorAll(".mode-btn");
    const currentGenreText = document.getElementById("current-genre");
    const ytPlayer = document.getElementById("youtube-player");

    const youtubeStreams = {
        lofi: "https://www.youtube.com/embed/lTRiuFIWV54?autoplay=1&loop=1",
        classical: "https://www.youtube.com/embed/_4kHxtiuML0?autoplay=1&loop=1",
        "video-game": "https://www.youtube.com/embed/k7LhdJPUTQ0?autoplay=1&loop=1"
    };

    if (!modeButtons.length || !currentGenreText || !ytPlayer) return;

    modeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            modeButtons.forEach(b => b.classList.remove("active-vibe"));
            btn.classList.add("active-vibe");
            const chosenGenre = btn.getAttribute("data-genre");
            currentGenreText.innerText = chosenGenre.toUpperCase();
            if (youtubeStreams[chosenGenre]) {
                ytPlayer.parentElement.style.display = 'block';
                ytPlayer.src = youtubeStreams[chosenGenre];
            }
        });
    });
}

function initWorkspaceLauncher() {
    const launchBtn = document.getElementById("launch-workspace-btn");
    const vibeGate = document.getElementById("vibe-gate");
    const workspace = document.getElementById("workspace-display");
    if (launchBtn) {
        launchBtn.addEventListener("click", () => {
            vibeGate.classList.add("hidden");
            workspace.classList.remove("hidden");
        });
    }
}

function initTabEngine() {
    const navButtons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".workspace-section");
    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            navButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            sections.forEach(s => s.classList.add("hidden"));
            document.getElementById(btn.getAttribute("data-target")).classList.remove("hidden");
        });
    });
}

function initFocusTimer() {
    const timeInput = document.getElementById("timer-minutes-input");
    const startBtn = document.getElementById("start-timer-btn");
    const resetBtn = document.getElementById("reset-timer-btn");
    const minDisplay = document.getElementById("minutes");
    const secDisplay = document.getElementById("seconds");
    let timerInstance, timeRemaining = 1500, isRunning = false;

    function updateDisplay() {
        const m = Math.floor(timeRemaining / 60);
        const s = timeRemaining % 60;
        minDisplay.textContent = m.toString().padStart(2, '0');
        secDisplay.textContent = s.toString().padStart(2, '0');
    }

    startBtn?.addEventListener("click", () => {
        if (isRunning) { clearInterval(timerInstance); isRunning = false; startBtn.textContent = "Start"; }
        else {
            isRunning = true; startBtn.textContent = "Pause";
            timerInstance = setInterval(() => {
                if (timeRemaining > 0) { timeRemaining--; updateDisplay(); }
                else { clearInterval(timerInstance); alert("Focus block complete!"); isRunning = false; }
            }, 1000);
        }
    });

    resetBtn?.addEventListener("click", () => {
        clearInterval(timerInstance);
        timeRemaining = (timeInput ? parseInt(timeInput.value, 10) : 25) * 60;
        updateDisplay();
        isRunning = false;
        startBtn.textContent = "Start";
    });
}

window.toggleBrainy = function () {
    const drawer = document.getElementById("brainy-drawer");
    if (drawer) drawer.classList.toggle("open");
};


