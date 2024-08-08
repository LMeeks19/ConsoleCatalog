import { GameSummary } from "../functions/interfaces";

export async function getTitles(searchTerm: string): Promise<GameSummary[]> {
  const response = await fetch(`http://localhost:3000/playstation/titles/search/${searchTerm}`);
  return response.json();
}