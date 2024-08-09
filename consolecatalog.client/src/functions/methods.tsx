import { BASE_CARD_IMAGE_URL, BASE_SEARCH_IMAGE_URL } from "./utils";

export function getFullCardImageUrl(imageId: string) {
  return `${BASE_CARD_IMAGE_URL}/${imageId}.jpg`;
}

export function getFullSearchImageUrl(imageId: string) {
  return `${BASE_SEARCH_IMAGE_URL}/${imageId}.jpg`;
}

export function getRatingColour(rating: number): string {
    if (rating > 90) return "amazing";
    else if (rating > 70) return "good";
    else if (rating > 50) return "average";
    else if (rating > 30) return "bad";
    return "awful";
  }
