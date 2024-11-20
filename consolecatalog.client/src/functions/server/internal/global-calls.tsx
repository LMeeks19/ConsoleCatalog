import { SubObjectivePlatform } from "../../enums";
import { RegisterDetails, SubObjective, User } from "../../interfaces/interfaces";

export async function getUserByUsername(username: string | null): Promise<User> {
  const response = await fetch(`/User/GetUserByUsername/${username}`);
  return await response.json();
}

export async function getUserById(id: string | null): Promise<User> {
  const response = await fetch(`/User/GetUserById/${id}`);
  return await response.json();
}

export async function postUser(registerDetails: RegisterDetails): Promise<User> {
  const response = await fetch(`/User/PostUser`, {
    method: "POST",
    body: JSON.stringify(registerDetails),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function getSubObjective(id: string): Promise<SubObjective> {
  const response = await fetch(`/SubObjectives/GetSubObjective/${id}`);
  return await response.json();
}

export async function getSubObjectives(userId: string, titleId: string, trophyId: number, platform: SubObjectivePlatform): Promise<SubObjective[]> {
  const response = await fetch(`/SubObjectives/GetSubObjectives/${userId}/${platform}/${titleId}/${trophyId}`);
  return await response.json();
}

export async function postSubObjective(subObjective: SubObjective): Promise<SubObjective> {
  const response = await fetch(`/SubObjectives/PostSubObjective`, {
    method: "POST",
    body: JSON.stringify(subObjective),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function postSubObjectives(subObjectives: SubObjective[]): Promise<SubObjective[]> {
  const response = await fetch(`/SubObjectives/PostSubObjectives`, {
    method: "POST",
    body: JSON.stringify(subObjectives),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function putSubObjective(subObjective: SubObjective): Promise<SubObjective> {
  const response = await fetch(`/SubObjectives/PutSubObjective`, {
    method: "POST",
    body: JSON.stringify(subObjective),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function deleteSubObjective(subObjective: SubObjective): Promise<SubObjective[]> {
  const response = await fetch(
    `/SubObjectives/DeleteSubObjective/${subObjective.id}`,
    {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }
  );
  return await response.json();
}

export async function deleteSubObjectives(subObjectives: SubObjective[]): Promise<string[]> {
  const response = await fetch(`/SubObjectives/DeleteSubObjectives`, {
    method: "DELETE",
    body: JSON.stringify(subObjectives),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}
