import { useEffect, useState } from "react";
import { getMenuItemsByCategory } from "../../../../services/menuService";
import "./TeaSandwiches.css";

export const TeaSandwiches = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getMenuItemsByCategory("Tea Sandwiches").then(setItems);
    }, []);

    return (
        <div className="menuCategoryPage">
            <h1 className="pageTitle">Tea Sandwiches</h1>

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
