const API_URL = "http://localhost:3000/api/shots";

export async function getAllShots() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getShotById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

export async function createShot(shot) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shot)
  });
  return res.json();
}

export async function updateShot(id, shot) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shot)
  });
  return res.json();
}

export async function deleteShot(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
