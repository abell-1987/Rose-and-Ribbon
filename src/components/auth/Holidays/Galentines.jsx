// src/components/auth/Holidays/Galentines.jsx

import { useEffect, useMemo, useState } from "react";
import { getMenuItemsByCategory } from "../../../services/menuService";
import { enableGalentinesConfetti } from "../../../assets/galentinesConfetti";
import "./Galentines.css";

import GalBack from "./Galentinesback.png";
import GalLogo from "./Galentines.png";

const CATEGORY_CONFIG = [
    { dbCategory: "Galentines Teas", displayName: "Teas" },
    { dbCategory: "Galentines Cocktails", displayName: "Cocktails" },
    { dbCategory: "Galentines Italian Sodas", displayName: "Italian Sodas" },
    { dbCategory: "Galentines Sweet Pastries", displayName: "Sweet Pastries" },
    { dbCategory: "Galentines Savory Pastries", displayName: "Savory Pastries" },
    { dbCategory: "Galentines Tarts", displayName: "Tarts" },
    { dbCategory: "Galentines Tea Sandwiches", displayName: "Tea Sandwiches" },
    { dbCategory: "Galentines Salads", displayName: "Salads" },
];

export const Galentines = () => {
    const [menuByCategory, setMenuByCategory] = useState({});

    useEffect(() => {
        const cleanupConfetti = enableGalentinesConfetti();

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

        return () => {
            if (typeof cleanupConfetti === "function") cleanupConfetti();
        };
    }, []);

    const categories = useMemo(() => {
        return CATEGORY_CONFIG.map((c) => ({
            ...c,
            items: menuByCategory[c.dbCategory] ?? [],
        }));
    }, [menuByCategory]);

    return (
        <main
            className="galPage"
            style={{
                backgroundImage: `url(${GalBack})`,
                // ✅ Tile the background so the global app background never peeks through
                backgroundRepeat: "repeat",
                backgroundPosition: "top left",
                // tweak this if you want larger/smaller tiles
                backgroundSize: "520px auto",
                backgroundAttachment: "fixed",
            }}
        >
            {/* ✅ Confetti layer lives behind content and below navbar */}
            <div className="galConfettiLayer" aria-hidden="true"></div>

            <div className="galWrap">
                <img
                    className="galLogo"
                    src={GalLogo}
                    alt="Galentine's Day at The Rose & Ribbon Tea Parlor"
                />

                <h1 className="galTitle">Celebrate Galentine&apos;s Day with us!</h1>

                <section className="galCard galIntroCard">
                    <p className="galBodyText">
                        Our Galentine’s Day gathering is an evening devoted to laughter, indulgence, and the simple joy of spending time with your favorite people. Sip beautifully blended teas, enjoy decadent pastries, and create lasting memories together.

                        We’re pleased to welcome a local perfumer who will guide guests through crafting their own custom solid perfume — a charming keepsake from the evening. Guests may also enjoy relaxing spa manicures provided by talented local nail artists. In the spirit of community and care, a portion of the event’s proceeds will benefit a local women’s shelter.
                    </p>

                    <p className="galBodyText galPriceLine">
                        <strong>Price per 8-person table:</strong> $640
                    </p>
                </section>

                <div className="galGrid">
                    {categories.map((cat) => (
                        <section key={cat.dbCategory} className="galCard">
                            <h2 className="galCardTitle">{cat.displayName}</h2>

                            {cat.items.length ? (
                                <ul className="galList">
                                    {cat.items.map((item) => (
                                        <li key={item.id} className="galListItem">
                                            <strong>{item.name}</strong> — {item.description}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="galBodyText">Coming soon…</p>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
};