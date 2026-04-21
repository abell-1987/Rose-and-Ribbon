import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOccasions } from "../../services/occasionService";
import { getAllMenuItems } from "../../services/menuService";
import {
    deleteAllTeaPartyMenuItemsForParty,
    deleteParty,
    deleteUser,
    getLoggedInUserId,
    getPartiesByUserId,
    getPartyById,
    getTeaPartyMenuItemsByPartyId,
    getUserById,
    patchParty,
} from "../../services/userService";
import "./ViewPartyDetails.css";

const CATEGORIES_IN_ORDER = [
    "House Teas",
    "Cocktails",
    "Italian Sodas",
    "Sweet Pastries",
    "Savory Pastries",
    "Tarts",
    "Tea Sandwiches",
    "Salads",
];

export const ViewPartyDetails = () => {
    const navigate = useNavigate();
    const { partyId } = useParams();

    const userId = useMemo(() => getLoggedInUserId(), []);

    const [user, setUser] = useState(null);
    const [party, setParty] = useState(null);
    const [occasions, setOccasions] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [chosenMenuItemIds, setChosenMenuItemIds] = useState([]);

    const [newDate, setNewDate] = useState("");

    useEffect(() => {
        if (!userId) return;

        getUserById(userId).then(setUser);

        getPartyById(partyId).then((p) => {
            setParty(p);
            setNewDate(p?.partyDate ?? "");
        });

        getOccasions().then(setOccasions);
        getAllMenuItems().then(setMenuItems);

        getTeaPartyMenuItemsByPartyId(partyId).then((rows) => {
            const ids = rows.map((r) => Number(r.menuItemId)).filter(Boolean);
            setChosenMenuItemIds(ids);
        });
    }, [userId, partyId]);

    if (!userId) return <p>Not logged in.</p>;
    if (!user || !party) return <p>Loading party details...</p>;

    if (Number(party.userId) !== Number(userId)) {
        return (
            <div style={{ padding: "2rem" }}>
                <p>Party not found.</p>
            </div>
        );
    }

    const occasionName =
        occasions.find((o) => o.id === party.occasionId)?.name ?? "—";

    const selectedItems = menuItems.filter((mi) =>
        chosenMenuItemIds.includes(Number(mi.id))
    );

    const display = {};
    for (const cat of CATEGORIES_IN_ORDER) display[cat] = [];

    for (const item of selectedItems) {
        const cat = item.categoryId;
        if (!display[cat]) display[cat] = [];
        display[cat].push(item.name);
    }

    const handleReschedule = async () => {
        if (!newDate) return;

        await patchParty(party.id, { partyDate: newDate });

        const refreshed = await getPartyById(party.id);
        setParty(refreshed);
        setNewDate(refreshed?.partyDate ?? newDate);

        window.alert("Party successfully rescheduled");
    };

    const handleCancel = async () => {
        await deleteAllTeaPartyMenuItemsForParty(party.id);
        await deleteParty(party.id);

        window.alert("Party successfully canceled. We hope to see you soon!");

        const remaining = await getPartiesByUserId(userId);

        // ✅ If this was their last party, delete the user + log out + go Home
        if (remaining.length === 0) {
            await deleteUser(userId);

            localStorage.removeItem("roseribbon_user");
            window.dispatchEvent(new Event("rr:user-updated"));

            navigate("/");
            return;
        }

        window.dispatchEvent(new Event("rr:user-updated"));

        if (remaining.length > 1) {
            navigate("/party-picker");
        } else {
            navigate(`/party/${remaining[0].id}`);
        }
    };

    return (
        <div className="partyDetails">
            <h1 className="pageTitle">View party details below:</h1>

            <div className="partyDetails__meta regencyCard">
                <p>
                    <strong>Name:</strong> {user.name}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <p>
                    <strong>Phone:</strong> {user.phone}
                </p>
                <p>
                    <strong>Occasion:</strong> {occasionName}
                </p>
                <p>
                    <strong>Total Price:</strong> ${party.totalPrice}
                </p>
            </div>

            <div className="partyDetails__grid">
                {Object.entries(display).map(([category, names]) => (
                    <div key={category} className="partyDetails__card regencyCard">
                        <h2 className="cardHeading">{category}</h2>
                        {names.length ? (
                            <ul>
                                {names.map((n) => (
                                    <li key={n}>{n}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="muted">None</p>
                        )}
                    </div>
                ))}
            </div>

            <div className="partyDetails__actions">
                <div className="partyDetails__reschedule">
                    <h2>Choose your date:</h2>
                    <input
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                    />
                    <button onClick={handleReschedule}>Reschedule</button>
                </div>

                <button className="danger" onClick={handleCancel}>
                    Cancel Party
                </button>
            </div>
        </div>
    );
};
