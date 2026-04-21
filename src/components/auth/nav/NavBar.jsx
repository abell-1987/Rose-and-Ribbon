import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getPartiesByUserId, getLoggedInUserId } from "../../../services/userService";
import "./NavBar.css";

export const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const userId = getLoggedInUserId();
    const isLoggedIn = Boolean(userId);

    const [showMyParties, setShowMyParties] = useState(false);

    const refreshPartyCount = useMemo(() => {
        return async () => {
            setShowMyParties(false);
            if (!userId) return;

            const parties = await getPartiesByUserId(userId);
            setShowMyParties((parties?.length ?? 0) > 1);
        };
    }, [userId]);

    useEffect(() => {
        refreshPartyCount();
    }, [refreshPartyCount]);

    useEffect(() => {
        refreshPartyCount();
    }, [location.pathname, refreshPartyCount]);

    useEffect(() => {
        const handler = () => refreshPartyCount();
        window.addEventListener("rr:user-updated", handler);
        return () => window.removeEventListener("rr:user-updated", handler);
    }, [refreshPartyCount]);

    const handleLogout = () => {
        localStorage.removeItem("roseribbon_user");
        setShowMyParties(false);
        navigate("/");
    };

    return (
        <nav className="rrNav">
            <div className="rrNav__left">
                <Link className="rrNav__link" to="/">Home</Link>
                <Link className="rrNav__link" to="/login">Login</Link>
                <Link className="rrNav__link" to="/menu">Menu</Link>
                <Link className="rrNav__link" to="/testimonials">Testimonials</Link>

                {/* ✅ Holiday Events Dropdown */}
                <div className="dropdown">
                    <a
                        className="rrNav__link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Holiday Events
                    </a>

                    <ul className="dropdown-menu dropdown-menu-dark">
                        <li><Link className="dropdown-item" to="/holidays/nye">New Year's Eve</Link></li>
                        <li><Link className="dropdown-item" to="/holidays/galentines">Galentine's Day</Link></li>
                        <li><Link className="dropdown-item" to="/holidays/pride">Pride</Link></li>
                        <li><Link className="dropdown-item" to="/holidays/halloween">Halloween</Link></li>
                        <li><Link className="dropdown-item" to="/holidays/jane-bday">Jane Austen's B-Day</Link></li>
                        <li><Link className="dropdown-item" to="/holidays/christmas">Christmas</Link></li>
                    </ul>
                </div>
            </div>

            <div className="rrNav__right">
                <Link className="rrNav__link" to="/register">
                    Book a party with us!
                </Link>

                {isLoggedIn && showMyParties && (
                    <Link className="rrNav__link" to="/party-picker">
                        My Parties
                    </Link>
                )}

                {isLoggedIn && (
                    <button className="rrNav__logout" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};