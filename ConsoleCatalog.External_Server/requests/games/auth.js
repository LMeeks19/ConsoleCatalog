import { BASE_AUTH_URL, CLIENT_ID, CLIENT_SECRET } from "./utils.js";

export async function authenticateGames() {
  const response = await fetch(
    `${BASE_AUTH_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`,
    { method: "POST" }
  );
  return response.json();
}
