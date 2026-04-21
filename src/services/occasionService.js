const API_URL = "http://localhost:8088";

export const getOccasions = () =>
    fetch(`${API_URL}/occasions`).then((r) => r.json());
