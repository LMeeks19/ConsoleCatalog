export interface XBXProfileSummariesObject {
  people: XBXProfileSummary[];
}

export interface XBXProfileSummary {
  xuid: string;
  gamertag: string;
  displayPicRaw: string;
}

export interface XBXProfileObject {
  people: XBXProfile[];
}

export interface XBXProfile {
  id: number;
  xuid: string;
  isIdentityShared: boolean;
  displayName: string;
  realName: string;
  displayPicRaw: string;
  gamertag: string;
  gamerScore: string;
  detail: Detail;
  titleHistory: TitleHistory
  titles: XBXTitles[];
  titlesCount: number;
}

interface Detail {
  id: number;
  accountTier: string;
  bio: string;
  isVerified: boolean;
  followerCount: number;
  followingCount: number;
  hasGamePass: boolean;
}

export interface XBXTitlesObject {
  xuid: string;
  titles: XBXTitles[];
}

export interface XBXTitles {
  id: number;
  titleId: string;
  name: string;
  devices: string[]
  displayImage: string;
  modernTitleId: string;
  isBundle: boolean;
  achievement: OverallAchievement;
}

interface OverallAchievement {
  id: number;
  currentAchievements: number,
  totalAchievements: number,
  currentGamerscore: number,
  totalGamerscore: number,
  progressPercentage: number,
}

interface TitleHistory {
  id: number;
  lastPlayedDate: Date;
}

export interface AchievementResponse {
  id: number;
  name: string;
  titleAssociations: TitleAssociations[]
  progressState: string;
  progression: ProgressionResponse;
  mediaAssets: MediaAssets[];
  description: string;
  rewards: Rewards[];
  rarity: Rarity;
}

interface TitleAssociations {
  id: number;
  name: string;
}

interface ProgressionResponse {
  id: number;
  requirements: Requirement[]
  timeUnlocked: Date
}

interface Requirement {
  id: number;
  current: string;
  target: string;
}

interface MediaAssets {
  id: number;
  name: string;
  url: string;
}

interface Rewards {
  id: number;
  value: string;
}

interface Rarity {
  id: number;
  currentCategory: string;
  currentPercentage: number;
}

export interface Achievement{
  id: number;
  name: string;
  titleAssociations: TitleAssociations
  progressState: string;
  progression: Progression;
  mediaAssets: MediaAssets;
  description: string;
  rewards: Rewards;
  rarity: Rarity;
}

interface Progression {
  id: number;
  requirements: Requirement
  timeUnlocked: string
}


