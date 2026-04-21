import { useEffect, useState } from "react";
import { getMenuItemsByCategory } from "../../../../services/menuService";
import "./SavoryPastries.css";

export const SavoryPastries = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getMenuItemsByCategory("Savory Pastries").then(setItems);
    }, []);

    return (
        <div className="menuCategoryPage">
            <h1 className="pageTitle">Savory Pastries</h1>

            <div className="menuItemsGrid">
                {items.map((item) => (
                    <div key={item.id} className="regencyCard menuItemCard">
                        <h2 className="cardHeading menuItemName">{item.name}</h2>
                        <p className="menuItemDesc">{item.description}</p>
                        <p className="menuItemPrice">${item.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
