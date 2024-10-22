export interface LoginDetails {
  username: string | null;
  password: string | null;
}

export interface RegisterDetails {
  username: string | null;
  playstationGamertag: string | null;
  xboxGamertag: string | null;
  password: string | null;
  confirm_password: string | null;
}

export interface SubObjective {
  id?: string;
  userId: string;
  trophyId: number;
  titleId: string;
  details: string;
  createdDate: Date;
  isComplete: boolean;
}

export interface FormError {
  field: string;
  message: string;
}

export interface BarProps {
  page: string;
  icon?: string;
}

export interface SelectedDate {
  month: number;
  year: number;
}

export interface User {
  id: string;
  username: string;
  playstationGamertag: string | null;
  xboxGamertag: string | null;
  password: string;
}

export interface GameSummariesObject {
  upcomingTitles: GameSummary[];
  recentTitles: GameSummary[];
  acclaimedTitles: GameSummary[];
}

export interface GameSummary {
  id: number;
  total_rating: number;
  cover: Cover;
  name: string;
  platforms: Platform[];
  first_release_date: number;
}

export interface Game {
  id: number;
  bundles: Bundle[];
  cover: Cover;
  dlcs: Dlc[];
  expansions: Expansion[];
  first_release_date: number;
  genres: Genre[];
  name: string;
  platforms: Platform[];
  screenshots: Screenshot[];
  storyline: string;
  summary: string;
  themes: Theme[];
  total_rating: number;
  total_rating_count: number;
  rating: number;
  rating_count: number;
  aggregated_rating: number;
  aggregated_rating_count: number;
  age_ratings: AgeRating[];
}

export interface AgeRating {
  id: number;
  synopsis: string;
  category: number;
  content_descriptions: ContentDescription[];
}

export interface ContentDescription {
  id: number;
  description: string;
}

export interface AddOn {
  id: number;
  cover: Cover;
  name: string;
}

export interface Bundle extends AddOn {}
export interface Expansion extends AddOn {}
export interface Dlc extends AddOn {}

export interface Image {
  id: number;
  image_id: string;
}

export interface Cover extends Image {}
export interface Screenshot extends Image {}

export interface Tone {
  id: number;
  name: string;
}
export interface Genre extends Tone {}
export interface Theme extends Tone {}

export interface Platform {
  id: number;
  abbreviation: string;
  name: string;
}
