import logo from "./logo.png";
import "./Home.css";

export const Home = () => {
    return (
        <main className="homePage">
            <img
                src={logo}
                alt="The Rose & Ribbon Tea Parlour"
                className="homeLogo"
            />

            <div className="regencyCard homeCard">
                <p className="homeText">
                    Welcome to The Rose & Ribbon Tea Parlor, where Regency-era elegance meets a
                    touch of modern sass. We’re delighted you’ve chosen us for your next
                    celebration. Whether it’s a grand affair or a just-because gathering,
                    you're in the right place. Peruse our menu, indulge your curiosity, and when
                    you’re ready, book a tea party that’s equal parts grace, charm, and
                    personality. We look forward to serving you.
                </p>
            </div>
        </main>
    );
};
