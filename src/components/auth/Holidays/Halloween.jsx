// src/components/auth/Holidays/Halloween.jsx

import { useEffect, useMemo, useState, useRef } from "react";
import { getMenuItemsByCategory } from "../../../services/menuService";
import "./Halloween.css";
import { startHalloweenConfetti } from "../../../assets/halloweenConfetti";

import HallBack from "./Halloweenback.png";
import HallLogo from "./Halloween.png";

const CATEGORY_CONFIG = [
    { dbCategory: "Halloween Teas", displayName: "Halloween Teas" },
    { dbCategory: "Halloween Cocktails", displayName: "Cocktails" },
    { dbCategory: "Halloween Italian Sodas", displayName: "Italian Sodas" },
    { dbCategory: "Halloween Enchanted Apples", displayName: "Enchanted Apples" },
    { dbCategory: "Halloween Popcorn Balls", displayName: "Popcorn Balls" },
    { dbCategory: "Halloween Cake Pops", displayName: "Cake Pops" },
    { dbCategory: "Halloween Sliders", displayName: "Sliders" },
    { dbCategory: "Halloween Flatbread Pizzas", displayName: "Flatbread Pizzas" },
];

export const Halloween = () => {
    const [menuByCategory, setMenuByCategory] = useState({});
    const pageRef = useRef(null);

    useEffect(() => {
        const stop = startHalloweenConfetti(pageRef.current);
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
            ref={pageRef}
            className="halloweenPage"
            style={{
                backgroundImage: `url(${HallBack})`,
            }}
        >
            <div className="halloweenWrap">
                <img
                    className="halloweenLogo"
                    src={HallLogo}
                    alt="Halloween at The Rose & Ribbon Tea Parlor"
                />

                <h1 className="halloweenTitle">Celebrate Halloween with us!</h1>

                <section className="halloweenCard halloweenIntroCard">
                    <p className="halloweenBodyText">
                        Put on your most scandalously spectacular costume and join us for a night that’s equal parts spooky and sparkly.
                        We’re serving up Halloween twists on beloved favorites (plus a few classic treats that absolutely deserve a dramatic entrance),
                        and yes — there will be a costume contest with a prize, so come prepared to be stared at (affectionately).
                        <br />
                        <br />
                        The evening also features a murder mystery dinner theater show — you bring the alibi, we’ll bring the suspense —
                        plus tarot and palm readings for anyone who wants a little extra fate with their frosting. Come for the vibes, stay for the
                        theatrics… and leave with a story you’ll tell all season.
                    </p>
                </section>

                <div className="halloweenGrid">
                    {categories.map((cat) => (
                        <section key={cat.dbCategory} className="halloweenCard">
                            <h2 className="halloweenCardTitle">{cat.displayName}</h2>

                            {cat.items.length ? (
                                <ul className="halloweenList">
                                    {cat.items.map((item) => (
                                        <li key={item.id} className="halloweenListItem">
                                            <strong>{item.name}</strong> — {item.description} —{" "}
                                            <span className="halloweenItemPrice">${Number(item.price).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="halloweenBodyText">Coming soon…</p>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
};