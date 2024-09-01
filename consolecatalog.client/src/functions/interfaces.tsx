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

export interface GameSummary {
  id: number;
  total_rating: number;
  cover: Cover;
  name: string;
  platforms: Platform[];
  first_release_date: number;
}

export interface UpcomingGameSummary {
  id: number;
  date: number;
  game: GameSummary;
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

export interface Profile {
  psnProfile: PSNProfile;
}

export interface PSNProfile {
  aboutMe: string;
  accountId: string;
  avatarUrls: AvatarUrl[];
  blocking: boolean;
  consoleAvailability: ConsoleAvailability;
  following: false;
  friendRelation: string;
  isOfficiallyVerified: boolean;
  languagesUsed: string[];
  npId: string;
  onlineId: string;
  personalDetail: PersonalDetail;
  personalDetailSharing: string;
  personalDetailSharingRequestMessageFlag: boolean;
  plus: number;
  presences: Presence[];
  primaryOnlineStatus: string;
  requestMessageFlag: boolean;
  trophySummary: TrophySummary;
  trophyTitles: TrophyTitleObject;
}

export interface TrophyTitleObject {
  nextOffset: number;
  previousOffset: number;
  totalItemCount: number;
  trophyTitles: TrophyTitle[];
}

export interface TrophyTitle {
  definedTrophies: DefinedTrophies;
  earnedTrophies: EarnedTrophies;
  hasTrophyGroups: boolean;
  hiddenFlag: boolean;
  lastUpdatedDateTime: Date;
  npCommunicationId: string;
  npServiceName: string;
  progress: number;
  trophyGroupCount: number;
  trophySetVersion: string;
  trophyTitleDetail: string;
  trophyTitleIconUrl: string;
  trophyTitleName: string;
  trophyTitlePlatform: string;
}

export interface AvatarUrl {
  avatarUrl: string;
  size: string;
}

export interface ConsoleAvailability {
  availabilityStatus: string;
}

export interface PersonalDetail {
  firstName: string;
  lastName: string;
}

export interface Presence {
  hasBroadcastData: boolean;
  lastOnlineDate: Date;
  onlineStatus: string;
}

export interface TrophySummary {
  earnedTrophies: EarnedTrophies;
  level: number;
  progress: number;
}

export interface EarnedTrophies extends TrophyTypes {}
export interface DefinedTrophies extends TrophyTypes {}

export interface TrophyTypes {
  bronze: number;
  gold: number;
  platinum: number;
  silver: number;
}

export interface TitleTrophies {
  hasTrophyGroups: boolean;
  totelItemCount: number;
  trophies: Trophy[];
  trophySetVersion: string;
  
  lastUpdatedDateTime: Date;
}

export interface Trophy {
  trophyDetail: string;
  trophyGroupId: string;
  trophyHidden: boolean;
  trophyIconUrl: string;
  trophyId: number;
  trophyName: string;
  trophyType: string;

  earned: boolean;
  earnedDateTime?: string;
  trophyEarnedRate: string;
  trophyRare: number;
}

