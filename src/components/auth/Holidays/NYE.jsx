import { useEffect, useMemo, useState } from "react";
import { getMenuItemsByCategory } from "../../../services/menuService";
import "./NYE.css";

import NYEBack from "./NYEback.png";
import NYELogo from "./NYE.png";

const CATEGORY_CONFIG = [
    { dbCategory: "NYE Teas", displayName: "Teas" },
    { dbCategory: "NYE Cocktails", displayName: "Cocktails" },
    { dbCategory: "NYE Italian Sodas", displayName: "Italian Sodas" },
    { dbCategory: "NYE Sweet Pastries", displayName: "Sweet Pastries" },
    { dbCategory: "NYE Savory Pastries", displayName: "Savory Pastries" },
    { dbCategory: "NYE Tarts", displayName: "Tarts" },
    { dbCategory: "NYE Tea Sandwiches", displayName: "Tea Sandwiches" },
    { dbCategory: "NYE Salads", displayName: "Salads" },
];

const makeGlitter = (count = 90) => {
    // Creates a stable array of particles with random-but-bounded values
    return Array.from({ length: count }, (_, i) => {
        const size = Math.floor(Math.random() * 6) + 3; // 3–8px
        const left = Math.random() * 100; // vw %
        const delay = Math.random() * 6; // 0–6s
        const duration = Math.random() * 6 + 7; // 7–13s
        const drift = (Math.random() * 2 - 1) * 80; // -80px to +80px
        const twinkle = Math.random() * 1.2 + 0.6; // 0.6–1.8s
        const opacity = Math.random() * 0.35 + 0.25; // 0.25–0.6
        const blur = Math.random() < 0.35 ? 0.6 : 0; // some are softer
        const rotate = Math.random() * 360;

        return {
            id: `glitter-${i}`,
            style: {
                left: `${left}vw`,
                width: `${size}px`,
                height: `${size}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                "--drift": `${drift}px`,
                "--twinkle": `${twinkle}s`,
                opacity,
                filter: blur ? `blur(${blur}px)` : "none",
                transform: `rotate(${rotate}deg)`,
            },
        };
    });
};

export const NYE = () => {
    const tablePrice = 2400;

    const [menuByCategory, setMenuByCategory] = useState({});
    const [glitter, setGlitter] = useState([]);

    useEffect(() => {
        // Build glitter once on mount
        setGlitter(makeGlitter(95));
    }, []);

    useEffect(() => {
        Promise.all(
            CATEGORY_CONFIG.map(async (c) => {
                const items = await getMenuItemsByCategory(c.dbCategory);
                return [c.dbCategory, items];
            })
        ).then((pairs) => {
            const next = {};
            for (const [key, items] of pairs) next[key] = items ?? [];
            setMenuByCategory(next);
        });
    }, []);

    const categories = useMemo(() => {
        return CATEGORY_CONFIG.map((c) => ({
            ...c,
            items: menuByCategory[c.dbCategory] ?? [],
        }));
    }, [menuByCategory]);

    return (
        <main
            className="nyePage"
            style={{
                backgroundImage: `url(${NYEBack})`,
            }}
        >
            {/* ✨ Glitter layer (between background and content) */}
            <div className="nyeGlitterLayer" aria-hidden="true">
                {glitter.map((g) => (
                    <span key={g.id} className="nyeGlitter" style={g.style} />
                ))}
            </div>

            <div className="nyeWrap">
                <img
                    className="nyeLogo"
                    src={NYELogo}
                    alt="New Year's Eve at The Rose & Ribbon Tea Parlor"
                />

                <h1 className="nyeTitle">Celebrate New Year's Eve with us!</h1>

                <section className="nyeCard nyeIntroCard">
                    <p className="nyeBodyText">
                        For one glittering night, The Rose & Ribbon trades our usual Regency romance for full-on Art Deco drama — think champagne sparkle, jazz-age glamour, and a room that positively encourages a little mischief. Come dressed to dazzle (or to scandalize politely): the evening will feature a 1920’s costume contest, an open dance floor with a live big band, and an atmosphere designed for pure celebration. As the night unfolds, guests will also be treated to a vaudevillian-style burlesque show, bringing just the right touch of vintage decadence to the evening. When the clock strikes midnight, we’ll welcome the New Year in proper fashion with a balloon drop and a toast-worthy moment you won’t soon forget. Please note this event is exclusively for guests ages 21 and up.
                    </p>

                    <p className="nyeBodyText nyePriceLine">
                        <strong>Price per 8-person table:</strong> ${tablePrice}
                    </p>
                </section>

                <div className="nyeGrid">
                    {categories.map((cat) => (
                        <section key={cat.dbCategory} className="nyeCard">
                            <h2 className="nyeCardTitle">{cat.displayName}</h2>

                            {cat.items.length ? (
                                <ul className="nyeList">
                                    {cat.items.map((item) => (
                                        <li key={item.id} className="nyeListItem">
                                            <strong>{item.name}</strong> — {item.description}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="nyeBodyText">Coming soon…</p>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
};