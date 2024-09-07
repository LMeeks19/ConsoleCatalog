import {
  Game,
  GameSummary,
  TrophyTitleObject,
  TitleTrophiesObject,
  PSNProfileObject,
  EarnedTitleTrophiesObject,
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

export async function getPSNProfileByUsername(username: string): Promise<PSNProfileObject> {
  const response = await fetch(
    `${BASE_API_URL}/playstation/profiles/${username}`
  );
  return response.json();
}

export async function getPSNProfileByAccountId(accountId: string): Promise<PSNProfileObject> {
  const response = await fetch(
    `${BASE_API_URL}/playstation/${accountId}/profiles`
  );
  return response.json();
}

export async function getPSNProfileTitles(
  accountId: string,
): Promise<TrophyTitleObject> {
  const response = await fetch(
    `${BASE_API_URL}/playstation/profiles/${accountId}/titles`
  );
  return response.json();
}

export async function getPSNProfileTrophiesForTitle(
  accountId: string,
  titleId: string,
  platform: string
): Promise<EarnedTitleTrophiesObject> {
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

export async function getPSNTitleTrophies(titleId: string, platform: string): Promise<TitleTrophiesObject> {
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
