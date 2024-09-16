export interface GameSummaryObject {
    searchUrl: string;
    searchResults: GameSummary[];
}

export interface GameSummary {
    id: string;
    titleId: string,
    name: string,
    type: string,
    platforms: string[],
    current_price: string,
    original_price: string,
    discount: string,
    image_url: string,
}