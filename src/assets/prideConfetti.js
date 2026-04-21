// src/assets/prideConfetti.js
let didInit = false;

export const enablePrideConfetti = () => {
    const layer = document.querySelector(".prideConfettiLayer");
    if (!layer) {
        // If you don't see confetti, it usually means the layer div isn't in Pride.jsx yet.
        return;
    }

    // ✅ Ensure the confetti fall distance matches the full Pride page height
    const setFallDistance = () => {
        const page = document.querySelector(".pridePage");
        if (!page) return;

        const h = page.scrollHeight;
        page.style.setProperty("--fall", `${h}px`);
    };

    setFallDistance();
    window.addEventListener("resize", setFallDistance);

    // Prevent stacking duplicate confetti if the page remounts
    if (didInit) return;
    didInit = true;

    const CONFETTI_COUNT = 80;

    // Solid rainbow colors (no gradients on the pieces themselves)
    const colors = [
        "#ff3b3b", // red
        "#ff8a00", // orange
        "#ffe600", // yellow
        "#00d26a", // green
        "#00b7ff", // blue
        "#7a4dff", // indigo
        "#ff3bd5", // pink/violet
    ];

    for (let i = 0; i < CONFETTI_COUNT; i++) {
        const piece = document.createElement("div");
        piece.className = "prideConfetti";

        const size = Math.random() * 6 + 6; // 6px–12px
        const left = Math.random() * 100; // vw within the Pride page area
        const duration = Math.random() * 8 + 16; // 10s–16s (slow-ish)
        const delay = Math.random() * 8; // 0s–8s
        const drift = (Math.random() * 80 - 40).toFixed(1); // -40px to +40px
        const spin = (Math.random() * 540 + 360).toFixed(0); // 360–900deg

        piece.style.setProperty("--x", `${left}vw`);
        piece.style.setProperty("--size", `${size}px`);
        piece.style.setProperty("--dur", `${duration}s`);
        piece.style.setProperty("--delay", `${delay}s`);
        piece.style.setProperty("--drift", `${drift}px`);
        piece.style.setProperty("--spin", `${spin}deg`);

        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // mix shapes a bit (still solid colors)
        const r = Math.random();
        if (r < 0.5) {
            piece.style.borderRadius = "2px"; // square-ish
        } else if (r < 0.8) {
            piece.style.borderRadius = "999px"; // capsule
            piece.style.width = `${size * 0.55}px`;
            piece.style.height = `${size * 1.35}px`;
        } else {
            // tiny circle
            piece.style.borderRadius = "50%";
            piece.style.width = `${size * 0.7}px`;
            piece.style.height = `${size * 0.7}px`;
        }

        layer.appendChild(piece);
    }
};