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
  achievement: Achievement;
}

interface Achievement {
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
