import { useEffect, useState } from "react";
import { getMenuItemsByCategory } from "../../../../services/menuService";
import "./HouseTeas.css";

export const HouseTeas = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getMenuItemsByCategory("House Teas").then(setItems);
    }, []);

    return (
        <div className="menuCategoryPage">
            <h1 className="pageTitle">House Teas</h1>

            <div className="menuItemsGrid">
                {items.map((tea) => (
                    <div key={tea.id} className="regencyCard menuItemCard">
                        <h2 className="cardHeading menuItemName">{tea.name}</h2>
                        <p className="menuItemDesc">{tea.description}</p>
                        <p className="menuItemPrice">${tea.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
