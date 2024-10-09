import { Game, GameSummary } from "../../interfaces/interfaces";
import {
  AchievementResponseObject,
  XBXProfileObject,
  XBXProfileSummariesObject,
  XBXTitlesObject,
} from "../../interfaces/xbox/profile-interfaces";

const BASE_API_URL = "http://localhost:3000";

export async function getXBXTitleById(id: string): Promise<Game[]> {
  const response = await fetch(`${BASE_API_URL}/xbox/titles/${id}`);
  return response.json();
}

export async function getXBXTitles(searchTerm: string): Promise<GameSummary[]> {
  const response = await fetch(
    `${BASE_API_URL}/xbox/titles/search/${searchTerm}`
  );
  return response.json();
}

export async function getXBXProfilesByUsername(
  searchTerm: string
): Promise<XBXProfileSummariesObject> {
  const response = await fetch(
    `${BASE_API_URL}/xbox/profiles/search/${searchTerm}`
  );
  return response.json();
}

export async function getXBXProfileByUsername(
  searchTerm: string
): Promise<XBXProfileObject> {
  const response = await fetch(
    `${BASE_API_URL}/xbox/profiles/search/${searchTerm}`
  );
  return response.json();
}

export async function getXBXProfileTitles(
  xuid: string
): Promise<XBXTitlesObject> {
  const response = await fetch(`${BASE_API_URL}/xbox/profiles/${xuid}/titles`);
  return response.json();
}

export async function getXBXProfileTitleAchievements(
  xuid: string,
  titleId: string
): Promise<AchievementResponseObject> {
  const response = await fetch(
    `${BASE_API_URL}/xbox/profiles/${xuid}/titles/${titleId}/achievements`
  );
  return response.json();
}
