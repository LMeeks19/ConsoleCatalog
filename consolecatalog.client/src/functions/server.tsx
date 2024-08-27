import { RegisterDetails } from "./interfaces";

export async function getUserByUsername(username: string | null) {
  const response = await fetch(`/user/getUserByUsername/${username}`);
  return await response.json();
}

export async function getUserById(id: string | null) {
  const response = await fetch(`/user/getUserById/${id}`);
  return await response.json();
}

export async function putUser(registerDetails: RegisterDetails) {
  const response = await fetch(`user`, {
    method: "POST",
    body: JSON.stringify(registerDetails),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}
