// src/components/auth/Holidays/Christmas.jsx

import { useEffect, useMemo, useState, useRef } from "react";
import { getMenuItemsByCategory } from "../../../services/menuService";
import "./Christmas.css";

import { startChristmasConfetti } from "../../../assets/christmasConfetti";

import ChristmasBack from "./Christmasback.png";
import ChristmasLogo from "./Christmas.png";

const CATEGORY_CONFIG = [
    { dbCategory: "Christmas Holiday Teas", displayName: "Holiday Teas" },
    { dbCategory: "Christmas Cocktails", displayName: "Cocktails" },
    { dbCategory: "Christmas Italian Sodas", displayName: "Italian Sodas" },
    { dbCategory: "Christmas Warm Holiday Drinks", displayName: "Warm Holiday Drinks" },
    { dbCategory: "Christmas Holiday Cookies", displayName: "Holiday Cookies" },
    { dbCategory: "Christmas Holiday Skewers", displayName: "Holiday Skewers" },
    { dbCategory: "Christmas Dips", displayName: "Dips" },
    { dbCategory: "Christmas Soup & Grilled Cheese", displayName: "Soup & Grilled Cheese" }
];

export const Christmas = () => {
    const [menuByCategory, setMenuByCategory] = useState({});
    const pageRef = useRef(null);

    useEffect(() => {
        const stop = startChristmasConfetti(pageRef.current);
        return stop;
    }, []);

    useEffect(() => {
        Promise.all(
            CATEGORY_CONFIG.map(async (c) => {
                const items = await getMenuItemsByCategory(c.dbCategory);
                return [c.dbCategory, items];
            })
        ).then((pairs) => {
            const next = {};
            for (const [key, items] of pairs) {
                next[key] = items ?? [];
            }
            setMenuByCategory(next);
        });
    }, []);

    const categories = useMemo(() => {
        return CATEGORY_CONFIG.map((c) => ({
            ...c,
            items: menuByCategory[c.dbCategory] ?? []
        }));
    }, [menuByCategory]);

    return (
        <main
            ref={pageRef}
            className="christmasPage"
            style={{ backgroundImage: `url(${ChristmasBack})` }}
        >
            <div className="christmasWrap">
                <img
                    className="christmasLogo"
                    src={ChristmasLogo}
                    alt="Christmas at The Rose & Ribbon Tea Parlor"
                />

                <h1 className="christmasTitle">
                    Celebrate Christmas with us!
                </h1>

                <section className="christmasCard christmasIntroCard">
                    <p className="christmasBodyText">
                        For Christmas, we’re turning the parlor into a cozy, candlelit holiday dream:
                        a special seasonal menu, warm drinks, and festive favorites with our signature
                        flair. A live jazz band will be playing Christmas classics all evening,
                        and there will be opportunities to take photos with Santa.
                        <br /><br />
                        We’ll also be hosting a food, toy, and gift drive for the women and children
                        at our local women’s shelter. Come celebrate, cozy up, and help us send a little
                        extra warmth into the world.
                    </p>
                </section>

                <div className="christmasGrid">
                    {categories.map((cat) => (
                        <section key={cat.dbCategory} className="christmasCard">
                            <h2 className="christmasCardTitle">
                                {cat.displayName}
                            </h2>

                            {cat.items.length ? (
                                <ul className="christmasList">
                                    {cat.items.map((item) => (
                                        <li key={item.id} className="christmasListItem">
                                            <strong>{item.name}</strong> — {item.description} —{" "}
                                            <strong>${Number(item.price).toFixed(2)}</strong>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="christmasBodyText">Coming soon…</p>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
};