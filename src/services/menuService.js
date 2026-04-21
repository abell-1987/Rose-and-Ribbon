const API_URL = "http://localhost:8088";

export const getAllMenuItems = () =>
    fetch(`${API_URL}/menuItems`).then((r) => r.json());

export const getMenuItemsByCategory = (categoryName) =>
    fetch(
        `${API_URL}/menuItems?categoryId=${encodeURIComponent(categoryName)}`
    ).then((r) => r.json());
