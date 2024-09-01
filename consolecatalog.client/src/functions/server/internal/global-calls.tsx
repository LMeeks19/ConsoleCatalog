import { RegisterDetails, SubObjective } from "../../interfaces";

export async function getUserByUsername(username: string | null) {
  const response = await fetch(`/user/getUserByUsername/${username}`);
  return await response.json();
}

export async function getUserById(id: string | null) {
  const response = await fetch(`/user/getUserById/${id}`);
  return await response.json();
}

export async function postUser(registerDetails: RegisterDetails) {
  const response = await fetch(`/user`, {
    method: "POST",
    body: JSON.stringify(registerDetails),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function getSubObjective(id: string): Promise<SubObjective> {
  const response = await fetch(`/objectives/getSubObjective/${id}`);
  return await response.json();
}

export async function getSubObjectives(userId: string, titleId: string, trophyId: number): Promise<SubObjective[]> {
  const response = await fetch(`/objectives/getSubObjectives/${userId}/${titleId}/${trophyId}`);
  return await response.json();
}

export async function postSubObjective(subObjective: SubObjective): Promise<SubObjective> {
  const response = await fetch(`/objectives/postSubObjective`, {
    method: "POST",
    body: JSON.stringify(subObjective),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function postSubObjectives(subObjectives: SubObjective[]): Promise<SubObjective[]> {
  const response = await fetch(`/objectives/postSubObjectives`, {
    method: "POST",
    body: JSON.stringify(subObjectives),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function putSubObjective(subObjective: SubObjective): Promise<SubObjective> {
  const response = await fetch(`/objectives/putSubObjective`, {
    method: "POST",
    body: JSON.stringify(subObjective),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function deleteSubObjective(subObjective: SubObjective): Promise<string> {
  const response = await fetch(
    `/objectives/deleteSubObjective/${subObjective.id}`,
    {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }
  );
  return await response.json();
}

export async function deleteSubObjectives(subObjectives: SubObjective[]): Promise<string[]> {
  const response = await fetch(`/objectives/deleteSubObjectives`, {
    method: "DELETE",
    body: JSON.stringify(subObjectives),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}
