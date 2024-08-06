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
    icon?: string;
  }

  export interface GameSummary {

  }

  export interface Game {
    id: number;
    aggregated_rating: number;
    cover: Cover;
    name: string;
    platforms: Platform[];
  }

  interface Cover {
    id: number
    alpha_channel: boolean;
    animated: boolean;
    checksum: string; 
    game: number; 
    game_localization: number;
    height: number;
    image_id: string;
    url: string;
    width: number;
  }

  interface Platform {
    id: number
    abbreviation: string;
    alternative_name: string;
    category: string;
    checksum: string;
    created_at: Date;
    generation: number;
    name: string;
    platform_family: number;
    platform_logo: number;
    slug: string;
    summary: string;
    updated_at: Date;
    url: string;
    versions: number[];
    websites: number[];
  }