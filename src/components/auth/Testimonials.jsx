// src/components/auth/Testimonials.jsx
import "./Testimonials.css";

import ElizabethImg from "./Elizabeth.png";
import EmmaImg from "./Emma.png";
import AnneImg from "./Anne.png";
import ElinorImg from "./Elinor.png";

export const Testimonials = () => {
    const testimonials = [
        {
            id: "elizabeth",
            name: "Elizabeth Bennet",
            book: "Pride & Prejudice",
            image: ElizabethImg,
            imageAlt: "Elizabeth Bennet",
            imageSide: "right",
            occasion: "a Birthday celebration (with just enough mischief to be respectable)",
            favorites: [
                "a bergamot-forward black tea that feels both classic and a little daring",
                "the sparkling cocktail that has no business being that charming",
                "those crisp cucumber sandwiches that make you feel instantly put-together",
            ],
            quote: `I booked our party at The Rose & Ribbon Tea Parlor for ${"a Birthday celebration (with just enough mischief to be respectable)"}—and I should like it on record that I was prepared to be unimpressed. I was not. The room felt elegant without taking itself too seriously, and the whole affair encouraged laughter, excellent conversation, and the occasional raised eyebrow. My favorites included ${"a bergamot-forward black tea that feels both classic and a little daring"}, ${"the sparkling cocktail that has no business being that charming"}, and ${"those crisp cucumber sandwiches that make you feel instantly put-together"}. If you enjoy your refinement with a dash of sass, you will be exceedingly at home.`,
        },
        {
            id: "emma",
            name: "Emma Woodhouse",
            book: "Emma",
            image: EmmaImg,
            imageAlt: "Emma Woodhouse",
            imageSide: "left",
            occasion: "a Bridal Shower (obviously I curated the guest list perfectly)",
            favorites: [
                "the jasmine-kissed cocktail that feels like a compliment in a glass",
                "the rose-and-pistachio little cakes that look as good as they taste",
                "the custard tart with jewel-like fruit that makes everyone gasp politely",
            ],
            quote: `Naturally, I hosted ${"a Bridal Shower (obviously I curated the guest list perfectly)"} at The Rose & Ribbon Tea Parlor—because where else would one throw a celebration that requires both charm and control? The atmosphere is delightfully grand, yet there is a wink in it, which I appreciate. I still think about ${"the jasmine-kissed cocktail that feels like a compliment in a glass"}, ${"the rose-and-pistachio little cakes that look as good as they taste"}, and ${"the custard tart with jewel-like fruit that makes everyone gasp politely"}. Everyone left feeling adored, and more importantly: impressed.`,
        },
        {
            id: "anne",
            name: "Anne Elliot",
            book: "Persuasion",
            image: AnneImg,
            imageAlt: "Anne Elliot",
            imageSide: "right",
            occasion: "a Just Because gathering (the most sincere kind of celebration)",
            favorites: [
                "the chamomile-vanilla tea that feels like a soft landing",
                "the warm, gentle cocktail that tastes like patience rewarded",
                "the pear-and-blue-cheese salad that surprises you into liking it very much",
            ],
            quote: `I chose The Rose & Ribbon Tea Parlor for ${"a Just Because gathering (the most sincere kind of celebration)"}—and found it exactly what I had not known I needed: calm elegance, thoughtful details, and a sense that you may be quietly happy without apology. I especially loved ${"the chamomile-vanilla tea that feels like a soft landing"}, ${"the warm, gentle cocktail that tastes like patience rewarded"}, and ${"the pear-and-blue-cheese salad that surprises you into liking it very much"}. It was unhurried, beautiful, and I left with my spirits considerably improved.`,
        },
        {
            id: "elinor",
            name: "Elinor Dashwood",
            book: "Sense & Sensibility",
            image: ElinorImg,
            imageAlt: "Elinor Dashwood",
            imageSide: "left",
            occasion: "an Engagement Party (organized, tasteful, and quietly thrilling)",
            favorites: [
                "the sturdy black tea that behaves impeccably all afternoon",
                "the bourbon-and-tea style cocktail that is composed… until it isn’t",
                "the savory pastry with caramelized onion and cheese that vanishes immediately",
            ],
            quote: `For ${"an Engagement Party (organized, tasteful, and quietly thrilling)"} I wanted something polished, dependable, and still—somehow—fun. The Rose & Ribbon Tea Parlor delivered all three. The setting is refined, the service is smooth, and the mood encourages people to relax without losing their manners. My favorites were ${"the sturdy black tea that behaves impeccably all afternoon"}, ${"the bourbon-and-tea style cocktail that is composed… until it isn’t"}, and ${"the savory pastry with caramelized onion and cheese that vanishes immediately"}. I would recommend it to anyone who prefers their celebrations elegant—with a subtle edge.`,
        },
    ];

    // Use the already-built quote strings above, but keep favorites/occasion structured
    // for flexibility later if you want.
    const byId = (id) => testimonials.find((t) => t.id === id);

    // Replace the hardcoded quote placeholders with the structured values (cleaner)
    const normalized = testimonials.map((t) => {
        const occasion = t.occasion;
        const favorites = t.favorites;

        const base = (() => {
            switch (t.id) {
                case "elizabeth":
                    return `I booked our party at The Rose & Ribbon Tea Parlor for ${occasion}—and I should like it on record that I was prepared to be unimpressed. I was not. The room felt elegant without taking itself too seriously, and the whole affair encouraged laughter, excellent conversation, and the occasional raised eyebrow. My favorites included ${favorites[0]}, ${favorites[1]}, and ${favorites[2]}. If you enjoy your refinement with a dash of sass, you will be exceedingly at home.`;
                case "emma":
                    return `Naturally, I hosted ${occasion} at The Rose & Ribbon Tea Parlor—because where else would one throw a celebration that requires both charm and control? The atmosphere is delightfully grand, yet there is a wink in it, which I appreciate. I still think about ${favorites[0]}, ${favorites[1]}, and ${favorites[2]}. Everyone left feeling adored, and more importantly: impressed.`;
                case "anne":
                    return `I chose The Rose & Ribbon Tea Parlor for ${occasion}—and found it exactly what I had not known I needed: calm elegance, thoughtful details, and a sense that you may be quietly happy without apology. I especially loved ${favorites[0]}, ${favorites[1]}, and ${favorites[2]}. It was unhurried, beautiful, and I left with my spirits considerably improved.`;
                case "elinor":
                    return `For ${occasion} I wanted something polished, dependable, and still—somehow—fun. The Rose & Ribbon Tea Parlor delivered all three. The setting is refined, the service is smooth, and the mood encourages people to relax without losing their manners. My favorites were ${favorites[0]}, ${favorites[1]}, and ${favorites[2]}. I would recommend it to anyone who prefers their celebrations elegant—with a subtle edge.`;
                default:
                    return "";
            }
        })();

        return { ...t, quote: base };
    });

    return (
        <div className="testimonialsPage">
            <h1 className="pageTitle">Testimonials</h1>

            <div className="testimonialsStack">
                {normalized.map((t) => {
                    const isRight = t.imageSide === "right";

                    return (
                        <section
                            key={t.id}
                            className={`testimonialRow ${isRight ? "testimonialRow--right" : "testimonialRow--left"}`}
                        >
                            {!isRight && (
                                <img className="testimonialImg" src={t.image} alt={t.imageAlt} />
                            )}

                            <div className="regencyCard testimonialCard">
                                <h2 className="cardHeading testimonialName">{t.name}</h2>

                                <p className="testimonialText">“{t.quote}”</p>
                            </div>

                            {isRight && (
                                <img className="testimonialImg" src={t.image} alt={t.imageAlt} />
                            )}
                        </section>
                    );
                })}
            </div>
        </div>
    );
};