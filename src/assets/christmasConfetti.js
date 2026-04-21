// src/assets/christmasConfetti.js
// Confetti stays BEHIND page content and INSIDE the page container (so it won't cover the navbar).

const EMOJIS = ["🎄", "🕯️", "✨"];

// darker-to-brighter greens (still "regular" confetti vibes)
// Green + Red confetti pieces
const CONFETTI_COLORS = [
    // Greens
    "rgba(20, 110, 55, 0.95)",
    "rgba(30, 140, 70, 0.95)",
    "rgba(40, 170, 85, 0.92)",
    "rgba(60, 200, 110, 0.90)",

    // Reds
    "rgba(150, 20, 30, 0.95)",
    "rgba(185, 30, 40, 0.95)",
    "rgba(210, 40, 55, 0.92)",
    "rgba(230, 60, 75, 0.90)"
];

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function startChristmasConfetti(containerEl) {
    if (!containerEl) return () => { };

    const overlay = document.createElement("div");
    overlay.className = "christmas-confetti-overlay";
    containerEl.appendChild(overlay);

    const pieces = [];
    const pieceCount = 46; // modest density, luxe + not distracting

    function setFallDistance() {
        const h = containerEl.clientHeight || 800;
        overlay.style.setProperty("--fallDistance", `${Math.ceil(h + 140)}px`);
    }

    setFallDistance();

    const onResize = () => setFallDistance();
    window.addEventListener("resize", onResize);

    for (let i = 0; i < pieceCount; i++) {
        const isEmoji = Math.random() < 0.55; // slightly more emojis than solids
        const el = document.createElement("span");
        el.className = `christmas-confetti-piece ${isEmoji ? "emoji" : "solid"}`;

        // horizontal start
        el.style.left = `${rand(0, 100)}%`;

        // slow durations (relative to Halloween style)
        const duration = rand(14, 22); // ✅ slow
        el.style.animationDuration = `${duration}s`;

        // staggered start times so it feels continuous
        el.style.animationDelay = `${rand(-duration, 0)}s`;

        // drift + spin
        el.style.setProperty("--drift", `${rand(-60, 60)}px`);
        el.style.setProperty("--spin", `${rand(-420, 420)}deg`);

        if (isEmoji) {
            el.textContent = pick(EMOJIS);
            el.style.fontSize = `${rand(14, 22)}px`;
            el.style.opacity = `${rand(0.75, 0.95)}`;
        } else {
            // "regular confetti" rectangles
            const w = rand(6, 10);
            const h = rand(10, 18);
            el.style.width = `${w}px`;
            el.style.height = `${h}px`;
            el.style.background = pick(CONFETTI_COLORS);
            el.style.opacity = `${rand(0.55, 0.85)}`;
        }

        overlay.appendChild(el);
        pieces.push(el);
    }

    // cleanup
    return function stopChristmasConfetti() {
        window.removeEventListener("resize", onResize);
        for (const p of pieces) p.remove();
        overlay.remove();
    };
}