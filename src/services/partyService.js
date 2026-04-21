const API = "http://localhost:8088";

export const getPartiesByUserId = (userId) => {
    return fetch(`${API}/parties?userId=${userId}&_sort=partyDate&_order=desc`).then(
        (r) => r.json(),
    );
};

export const getPartyById = (partyId) => {
    return fetch(`${API}/parties/${partyId}`).then((r) => r.json());
};

export const createParty = (party) => {
    return fetch(`${API}/parties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(party),
    }).then((r) => r.json());
};

export const patchParty = (partyId, partial) => {
    return fetch(`${API}/parties/${partyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partial),
    }).then((r) => r.json());
};

export const deleteParty = (partyId) => {
    return fetch(`${API}/parties/${partyId}`, { method: "DELETE" });
};
