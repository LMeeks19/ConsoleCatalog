export const CLIENT_ID = process.env.CLIENT_ID
export const CLIENT_SECRET = process.env.CLIENT_SECRET

export const BASE_AUTH_URL = "https://id.twitch.tv/oauth2/token";
export const BASE_GAMES_URL = "https://api.igdb.com/v4/games";
export const BASE_RELEASE_DATES_URL = "https://api.igdb.com/v4/release_dates";

export const GAME_SUMMARY_FIELDS = "id,total_rating,name,first_release_date";

export const GAME_FIELDS =
  "first_release_date,id,name,storyline,summary,total_rating,total_rating_count,rating,rating_count,aggregated_rating,aggregated_rating_count";
export const ADD_ON_FIELDS =
  "bundles.id,bundles.name,bundles.cover.id,bundles.cover.image_id,expansions.id,expansions.name,expansions.cover.id,expansions.cover.image_id,dlcs.id,dlcs.name,dlcs.cover.id,dlcs.cover.image_id";
export const COVER_FIELDS = "cover.id,cover.image_id";
export const SCREENSHOT_FIELDS = "screenshots.id,screenshots.image_id";
export const TONE_FIELDS = "genres.id,genres.name,themes.id,themes.name";
export const PLATFORM_FIELDS =
  "platforms.id,platforms.abbreviation,platforms.name";
export const AGE_RATING_FIELDS = "age_ratings.id,age_ratings.category,age_ratings.synopsis,age_ratings.content_descriptions.id,age_ratings.content_descriptions.description"

export const IMAGE_FIELDS = `${COVER_FIELDS},${SCREENSHOT_FIELDS}`;

export const FULL_GAME_SUMMARY_FIELDS = `${GAME_SUMMARY_FIELDS},${COVER_FIELDS},${PLATFORM_FIELDS}`;
export const FULL_GAME_FIELDS = `${GAME_FIELDS},${ADD_ON_FIELDS},${IMAGE_FIELDS},${TONE_FIELDS},${PLATFORM_FIELDS},${AGE_RATING_FIELDS}`;
