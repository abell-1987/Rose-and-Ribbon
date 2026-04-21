// src/assets/halloweenConfetti.js

function rand(min, max) {
    return Math.random() * (max - min) + min;
}
function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function startHalloweenConfetti(containerEl, options = {}) {
    if (!containerEl) throw new Error("startHalloweenConfetti: container required");

    const {
        pieceCount = 90,
        emojiWeight = 0.45, // percent of pieces that are emojis
    } = options;

    const computed = window.getComputedStyle(containerEl).position;
    if (computed === "static") {
        containerEl.style.position = "relative";
    }
    containerEl.style.overflow = "hidden";

    const overlay = document.createElement("div");
    overlay.className = "halloween-confetti-overlay";
    containerEl.appendChild(overlay);

    // Fall distance based on container height
    const setFallDistance = () => {
        const h = Math.max(containerEl.scrollHeight, containerEl.clientHeight);
        overlay.style.setProperty("--fallDistance", `${h + 120}px`);
    };
    setFallDistance();

    const ro = new ResizeObserver(() => setFallDistance());
    ro.observe(containerEl);
    window.addEventListener("resize", setFallDistance);

    // ✅ Purple + Lime solids
    const solidChoices = [
        { color: "#6a0dad" }, // purple
        { color: "#b6ff2b" }, // lime green
    ];

    // ✅ Pumpkin + Spider emojis
    const emojiChoices = ["🎃", "🕷️"];

    const pieces = [];

    function createPiece() {
        const isEmoji = Math.random() < emojiWeight;

        const left = rand(0, 100);

        // ✅ Slower, floatier fall
        const duration = rand(18, 30);
        const delay = rand(0, 2.5);

        const drift = rand(-22, 22);
        const spin = rand(120, 520);
        const opacity = rand(0.85, 1);

        let el;

        if (isEmoji) {
            el = document.createElement("span");
            el.className = "halloween-confetti-piece emoji";
            el.textContent = pick(emojiChoices);

            const fontSize = rand(14, 18);
            el.style.fontSize = `${fontSize}px`;
            el.style.lineHeight = "1";
        } else {
            const choice = pick(solidChoices);
            el = document.createElement("span");
            el.className = "halloween-confetti-piece solid";
            el.style.backgroundColor = choice.color;

            el.style.width = `${rand(5, 10)}px`;
            el.style.height = `${rand(6, 14)}px`;
            el.style.borderRadius = `${rand(0, 3)}px`;
        }

        el.style.left = `${left}%`;
        el.style.opacity = opacity;
        el.style.animationDuration = `${duration}s`;
        el.style.animationDelay = `${delay}s`;
        el.style.setProperty("--drift", `${drift}px`);
        el.style.setProperty("--spin", `${spin}deg`);

        overlay.appendChild(el);
        pieces.push(el);
    }

    for (let i = 0; i < pieceCount; i++) createPiece();

    const interval = setInterval(() => {
        const removeCount = Math.floor(pieces.length * 0.15);

        for (let i = 0; i < removeCount; i++) {
            const idx = Math.floor(Math.random() * pieces.length);
            pieces[idx]?.remove();
            pieces.splice(idx, 1);
            createPiece();
        }
    }, 11000);

    return function stopHalloweenConfetti() {
        clearInterval(interval);
        ro.disconnect();
        window.removeEventListener("resize", setFallDistance);
        overlay.remove();
    };
}