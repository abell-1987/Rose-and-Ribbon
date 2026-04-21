import { useEffect, useMemo, useState } from "react";
import { getMenuItemsByCategory } from "../../../services/menuService";
import "./JaneBday.css";

import JaneBack from "./JaneBdayback.png";
import JaneLogo from "./JaneBday.png";

const CATEGORY_CONFIG = [
    { dbCategory: "JaneBday Teas", displayName: "Teas" },
    { dbCategory: "JaneBday Cocktails", displayName: "Cocktails" },
    { dbCategory: "JaneBday Italian Sodas", displayName: "Italian Sodas" },
    { dbCategory: "JaneBday Cupcakes", displayName: "Cupcakes" },
    { dbCategory: "JaneBday Popcorn", displayName: "Popcorn" },
    { dbCategory: "JaneBday Sweet Pastries", displayName: "Sweet Pastries" },
    { dbCategory: "JaneBday Savory Pastries", displayName: "Savory Pastries" },
    { dbCategory: "JaneBday Tea Sandwiches", displayName: "Tea Sandwiches" },
    { dbCategory: "JaneBday Crudite Cups", displayName: "Crudité Cups" },
    { dbCategory: "JaneBday Personal Charcuterie", displayName: "Personal Charcuterie" },
];

export const JaneBday = () => {
    const [menuByCategory, setMenuByCategory] = useState({});

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
            className="janeBdayPage"
            style={{ backgroundImage: `url(${JaneBack})` }}
        >
            <div className="janeBdayWrap">
                <img
                    className="janeBdayLogo"
                    src={JaneLogo}
                    alt="Jane Austen's Birthday at The Rose & Ribbon Tea Parlor"
                />

                <h1 className="janeBdayTitle">Celebrate Jane Austen&apos;s Birthday with us!</h1>

                <section className="janeBdayCard janeBdayIntroCard">
                    <p className="janeBdayBodyText">
                        Before The Rose &amp; Ribbon Tea Parlor ever poured its first pot, our owner and founder, Dr. Penelope Ashcroft,
                        spent years in the classroom as an English literature professor specializing in the works of Jane Austen.
                        Somewhere between spirited seminar debates and rereading the same beloved scenes “for research,” Dr. Ashcroft
                        realized she wanted to bring that literary magic off the page and into real life — with teacups, treats, and a
                        little bit of sparkle. So she left academia, tied on a ribbon, and built a place where Regency class meets modern
                        sass.
                        <br />
                        <br />
                        Which means we absolutely could not plan holiday events without honoring one of our favorite girls. Join us for a
                        cozy celebration featuring a screening of the 2005 film version of <em>Pride &amp; Prejudice</em>, plus elevated
                        takes on classic movie-theater and birthday favorites (done the Rose &amp; Ribbon way, of course).
                        <br />
                        <br />
                        You’ll also get the chance to sample select menu items that are typically only available when you book a private
                        tea party with us — a little “VIP at Pemberley” moment, if you will. Come dressed comfy-cute, bring your favorite
                        Austen opinions, and be prepared to swoon, snack, and sip like it’s your own birthday.
                    </p>
                </section>

                <div className="janeBdayGrid">
                    {categories.map((cat) => (
                        <section key={cat.dbCategory} className="janeBdayCard">
                            <h2 className="janeBdayCardTitle">{cat.displayName}</h2>

                            {cat.items.length ? (
                                <ul className="janeBdayList">
                                    {cat.items.map((item) => (
                                        <li key={item.id} className="janeBdayListItem">
                                            <strong className="janeBdayItemName">{item.name}</strong> — {item.description} —{" "}
                                            <strong className="janeBdayItemPrice">${Number(item.price).toFixed(2)}</strong>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="janeBdayBodyText">Coming soon…</p>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
};