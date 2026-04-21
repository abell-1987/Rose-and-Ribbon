// src/assets/galentinesConfetti.js

export const enableGalentinesConfetti = () => {
    const CONFETTI_COUNT = 70;

    const shades = [
        "#ff7fb2",               // title pink
        "rgba(255,170,210,0.95)", // border pink
        "rgba(255,200,225,0.9)",  // soft highlight pink
    ];

    // ✅ Confetti must live INSIDE the Galentines page so it stays behind content
    const layer = document.querySelector(".galConfettiLayer");
    if (!layer) {
        // If someone calls this before the page renders, fail gracefully.
        return () => { };
    }

    // ✅ Prevent duplicates if user navigates away/back (or hot reload)
    layer.querySelectorAll(".galHeart").forEach((n) => n.remove());

    for (let i = 0; i < CONFETTI_COUNT; i++) {
        const heart = document.createElement("div");

        // ✅ This MUST match the CSS selector (.galHeart)
        heart.className = "galHeart";

        const size = Math.random() * 8 + 4;         // 8px - 20px
        const left = Math.random() * 100;            // vw across the page
        const duration = Math.random() * 8 + 10;      // 6s - 12s
        const delay = Math.random() * 8;             // 0s - 8s
        const drift = (Math.random() * 80 - 40).toFixed(1); // -40px to +40px
        const alpha = (Math.random() * 0.35 + 0.55).toFixed(2); // 0.55 - 0.90

        heart.style.left = `${left}vw`;
        heart.style.setProperty("--size", `${size}px`);
        heart.style.setProperty("--dur", `${duration}s`);
        heart.style.setProperty("--delay", `${delay}s`);
        heart.style.setProperty("--drift", `${drift}px`);
        heart.style.setProperty("--alpha", alpha);
        heart.style.setProperty(
            "--pink",
            shades[Math.floor(Math.random() * shades.length)]
        );

        layer.appendChild(heart);
    }

    // ✅ return cleanup so the page can remove hearts on unmount
    return () => {
        layer.querySelectorAll(".galHeart").forEach((n) => n.remove());
    };
};