import { Game, GameSummary, Profile, PSNProfileTrophyTitleObject } from "./interfaces";

const BASE_API_URL = "http://localhost:3000";

export async function getTitleById(id: string): Promise<Game[]> {
  const response = await fetch(`${BASE_API_URL}/playstation/titles/${id}`);
  return response.json();
}

export async function getTitles(searchTerm: string): Promise<GameSummary[]> {
  const response = await fetch(
    `${BASE_API_URL}/playstation/titles/search/${searchTerm}`
  );
  return response.json();
}

export async function getPSNProfile(username: string): Promise<Profile> {
  const response = await fetch(
    `${BASE_API_URL}/playstation/profiles/${username}`
  );
  return response.json();
}

export async function getPSNProfileTitles(accountId: string, offset: number): Promise<PSNProfileTrophyTitleObject> {
  const response = await fetch(
    `${BASE_API_URL}/playstation/profiles/${accountId}/titles/${offset}`
  );
  return response.json();
}
