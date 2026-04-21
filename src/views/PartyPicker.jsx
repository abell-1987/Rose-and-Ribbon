import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPartiesByUserId, getLoggedInUserId } from "../services/userService";

export const PartyPicker = () => {
    const navigate = useNavigate();

    const userId = useMemo(() => getLoggedInUserId(), []);

    const [parties, setParties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        getPartiesByUserId(userId).then((list) => {
            const sorted = [...list].sort((a, b) =>
                String(a.partyDate || "").localeCompare(String(b.partyDate || ""))
            );

            setParties(sorted);
            setLoading(false);

            if (sorted.length === 1) {
                navigate(`/party/${sorted[0].id}`, { replace: true });
            }
        });
    }, [userId, navigate]);

    if (!userId) return <p>Not logged in.</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1rem" }}>
            <h1 className="pageTitle">Which party do you need to view?</h1>

            <div className="regencyCard" style={{ maxWidth: "520px", margin: "0 auto" }}>
                {parties.length === 0 ? (
                    <p>No parties found.</p>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {parties.map((p) => (
                            <li key={p.id} style={{ margin: "0.75rem 0" }}>
                                <Link
                                    to={`/party/${p.id}`}
                                    style={{ color: "white", textDecoration: "underline" }}
                                >
                                    {p.partyDate || "No date set"}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
