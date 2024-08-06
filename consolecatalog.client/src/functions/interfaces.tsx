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
  
  export interface User {
    id: string;
    username: string;
    playstationGamertag: string | null;
    xboxGamertag: string | null;
    password: string;
  }

  export interface FormError {
    field: string;
    message: string;
  }

  export interface BarProps {
    page: string;
    icon: string;
  }

  export interface Game {
    id: number;
    age_ratings: any[];
    aggregated_rating: number;
    aggregated_rating_count: number;
    alternative_names: string[];
    artworks: any[];
    bundles: any[];
    category: number;
    checksum: string;
    collection: number;
    collections: any[];
    cover: any;
    created_at: number;
    dlcs: any[];
    expanded_games: any[];
    expansions: any[];
    external_games: any[];
    first_release_date: number;
    follows: number;
    forks: number;
    franchise: number;
    franchises: any[];
    game_engines: any[];
    game_localizations: any[];
    game_modes: any[];
    genres: any[];
    hypes: number;
    involved_companies: any[];
    keywords: any[];
    language_supports: any[];
    multiplayer_modes: any[];
    name: string;
    parent_game: number;
    platforms: any[];
    player_perspectives: any[];
    ports: any[];
    rating: number;
    rating_count: number;
    release_dates: any[];
    remakes: any[];
    remasters: any[];
    screenshots: any[];
    similar_games: any[];
    slug: string;
    standalone_expansions: any[];
    status: number;
    storyline: string;
    summary: string;
    tags: any[];
    themes: any[];
    total_rating: number;
    total_rating_count: number;
    updated_at: number;
    url: string;
    version_parent: number;
    version_title: string;
    videos: any[];
    websites: any[];
  }