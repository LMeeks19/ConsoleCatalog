import { Platforms } from "./enums";
import { COVER_BIG_URL, COVER_SMALL } from "./utils";

export function getFullCardImageUrl(imageId: string) {
  return `${COVER_BIG_URL}/${imageId}.jpg`;
}

export function getFullSearchImageUrl(imageId: string) {
  return `${COVER_SMALL}/${imageId}.jpg`;
}

export function getRatingColour(rating: number): string {
  if (rating > 90) return "amazing";
  else if (rating > 70) return "good";
  else if (rating > 50) return "average";
  else if (rating > 30) return "bad";
  return "awful";
}

export function isPSTitle(abbreviation: string): boolean {
  return (
    abbreviation === Platforms.PS1 ||
    abbreviation === Platforms.PS2 ||
    abbreviation === Platforms.PS3 ||
    abbreviation === Platforms.PS4 ||
    abbreviation === Platforms.PS5
  );
}
