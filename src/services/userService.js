const API_URL = "http://localhost:8088";

/** -------------------------
 *  Auth helper
 *  ------------------------- */
export const getLoggedInUserId = () => {
  const stored = localStorage.getItem("roseribbon_user");
  const parsed = stored ? JSON.parse(stored) : null;
  return parsed?.id ? Number(parsed.id) : null;
};

/** -------------------------
 *  Users
 *  ------------------------- */
export const getUserById = (id) =>
  fetch(`${API_URL}/users/${id}`).then((r) => r.json());

export const getUsersByEmail = (email) =>
  fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`).then((r) =>
    r.json()
  );

export const createUser = (newUser) =>
  fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  }).then((r) => r.json());

export const patchUser = (id, data) =>
  fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const deleteUser = (id) =>
  fetch(`${API_URL}/users/${id}`, { method: "DELETE" });

/** -------------------------
 *  Parties
 *  ------------------------- */
export const getPartyById = (partyId) =>
  fetch(`${API_URL}/parties/${partyId}`).then((r) => r.json());

export const getPartiesByUserId = (userId) =>
  fetch(`${API_URL}/parties?userId=${userId}`).then((r) => r.json());

export const createParty = (party) =>
  fetch(`${API_URL}/parties`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(party),
  }).then((r) => r.json());

export const patchParty = (partyId, data) =>
  fetch(`${API_URL}/parties/${partyId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const deleteParty = (partyId) =>
  fetch(`${API_URL}/parties/${partyId}`, { method: "DELETE" });

/** -------------------------
 *  Tea Party Menu Items (join table)
 *  ------------------------- */
export const getTeaPartyMenuItemsByPartyId = (partyId) =>
  fetch(`${API_URL}/teaPartyMenuItems?partyId=${partyId}`).then((r) => r.json());

export const createTeaPartyMenuItem = (row) =>
  fetch(`${API_URL}/teaPartyMenuItems`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(row),
  }).then((r) => r.json());

export const deleteTeaPartyMenuItem = (id) =>
  fetch(`${API_URL}/teaPartyMenuItems/${id}`, { method: "DELETE" });

export const deleteAllTeaPartyMenuItemsForParty = async (partyId) => {
  const rows = await getTeaPartyMenuItemsByPartyId(partyId);
  await Promise.all((rows || []).map((row) => deleteTeaPartyMenuItem(row.id)));
};
