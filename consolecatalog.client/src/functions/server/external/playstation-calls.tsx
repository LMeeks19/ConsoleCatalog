import {
  Game,
  GameSummary,
  TrophyTitleObject,
  TitleTrophies,
  PSNProfileObject,
} from "../../interfaces";

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

export async function getPSNProfile(username: string): Promise<PSNProfileObject> {
  const response = await fetch(
    `${BASE_API_URL}/playstation/profiles/${username}`
  );
  return response.json();
}

export async function getPSNProfileTitles(
  accountId: string,
  offset: number
): Promise<TrophyTitleObject> {
  const response = await fetch(
    `${BASE_API_URL}/playstation/profiles/${accountId}/titles/${offset}`
  );
  return response.json();
}

export async function getPSNProfileTrophiesForTitle(
  accountId: string,
  titleId: string,
  platform: string
): Promise<TitleTrophies> {
  if (platform === "PS5") {
    const response = await fetch(
      `${BASE_API_URL}/playstation/profiles/${accountId}/titles/new/${titleId}/trophies`
    );
    return response.json();
  }
  const response = await fetch(
    `${BASE_API_URL}/playstation/profiles/${accountId}/titles/old/${titleId}/trophies`
  );
  return response.json();
}

export async function getPSNTitleTrophies(titleId: string, platform: string): Promise<TitleTrophies> {
  if (platform === "PS5") {
    const response = await fetch(
      `${BASE_API_URL}/playstation/titles/new/${titleId}/trophies`
    );
    return response.json();
  }
  const response = await fetch(
    `${BASE_API_URL}/playstation/titles/old/${titleId}/trophies`
  );
  return response.json();
}
