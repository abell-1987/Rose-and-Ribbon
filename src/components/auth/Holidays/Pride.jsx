import { useEffect, useMemo, useState } from "react";
import { getMenuItemsByCategory } from "../../../services/menuService";
import { enablePrideConfetti } from "../../../assets/prideConfetti";
import "./Pride.css";

import PrideBack from "./Prideback.png";
import PrideLogo from "./Pride.png";

const CATEGORY_CONFIG = [
    { dbCategory: "Pride Teas", displayName: "Teas" },
    { dbCategory: "Pride Coffee Drinks", displayName: "Coffee Drinks" },
    { dbCategory: "Pride Cocktails", displayName: "Cocktails" },
    { dbCategory: "Pride Italian Sodas", displayName: "Italian Sodas" },
    { dbCategory: "Pride Sweet Pastries", displayName: "Sweet Pastries" },
    { dbCategory: "Pride Savory Pastries", displayName: "Savory Pastries" },
    { dbCategory: "Pride Biscotti", displayName: "Biscotti" },
    { dbCategory: "Pride Tarts", displayName: "Tarts" },

    {
        dbCategory: "Pride Omelets",
        displayName: "Omelets",
        note: "Comes with your choice of fresh fruit or breakfast potatoes.",
    },
    {
        dbCategory: "Pride Waffles",
        displayName: "Waffles",
        note: "Comes with your choice of fresh fruit or breakfast potatoes.",
    },
    {
        dbCategory: "Pride Eggs Benedict",
        displayName: "Eggs Benedict",
        note: "Comes with your choice of fresh fruit or breakfast potatoes.",
    },

    {
        dbCategory: "Pride Bagels",
        displayName: "Bagels",
        note: "Comes on your choice of a plain, asiago, everything, or whole wheat everything bagel. Comes with your choice of fresh fruit or breakfast potatoes.",
    },

    {
        dbCategory: "Pride Biscuits",
        displayName: "Biscuits",
        note: "Comes with your choice of fresh fruit or breakfast potatoes.",
    },
];

const formatPrice = (value) => {
    const n = Number(value);
    if (Number.isNaN(n)) return "";
    return `$${n.toFixed(2)}`;
};

export const Pride = () => {
    const [menuByCategory, setMenuByCategory] = useState({});

    useEffect(() => {
        enablePrideConfetti();
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
            className="pridePage"
            style={{
                backgroundImage: `url(${PrideBack})`,
            }}
        >
            <div className="prideConfettiLayer" aria-hidden="true"></div>
            <div className="prideWrap">
                <img
                    className="prideLogo"
                    src={PrideLogo}
                    alt="Pride Month at The Rose & Ribbon Tea Parlor"
                />

                <h1 className="prideTitle">Celebrate Pride Month with us!</h1>

                <section className="prideCard prideIntroCard">
                    <p className="prideBodyText">
                        Celebrate Pride the proper way — with sparkle, laughter, and absolutely no apologies. Our Pride Month Drag Brunch is a joyful, high-energy gathering dedicated to bold self-expression, fabulous performances, and the simple magic of being exactly who you are.
                        <br />
                        <br />
                        Sip bright, playful teas, indulge in decadent brunch treats, and prepare to be thoroughly entertained by a dazzling live drag show that promises glamour, charisma, and more than a few unforgettable moments. Guests can also join in the fun with Drag Trivia for a chance to win a door prize, because a little friendly competition pairs beautifully with champagne and sass.
                        <br />
                        <br />
                        In the spirit of love and community, a portion of the event’s proceeds will benefit The Trevor Project — celebrating, supporting, and uplifting LGBTQ+ youth.
                        <br />
                        <br />
                        Come hungry, come radiant, and most importantly, come as your full, unapologetic self.
                    </p>
                </section>

                <div className="prideGrid">
                    {categories.map((cat) => (
                        <section key={cat.dbCategory} className="prideCard">
                            <h2 className="prideCardTitle">{cat.displayName}</h2>

                            {cat.note ? <p className="prideCategoryNote">{cat.note}</p> : null}

                            {cat.items.length ? (
                                <ul className="prideList">
                                    {cat.items.map((item) => (
                                        <li key={item.id} className="prideListItem">
                                            <strong>{item.name}</strong> — {item.description} {" "}
                                            <span className="prideItemPrice">
                                                {formatPrice(item.price)}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="prideBodyText">Coming soon…</p>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
};