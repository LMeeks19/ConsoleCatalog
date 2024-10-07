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
  xuid: string;
  isIdentityShared: boolean;
  displayName: any;
  realName: string;
  displayPicRaw: string;
  gamertag: string;
  gamerScore: string;
  detail: Detail;
  titles: XBXTitles[];
}

interface Detail {
  accountTier: string;
  bio: any;
  isVerified: boolean;
  location: any;
  tenure: any;
  watermarks: string[];
  blocked: boolean;
  mute: boolean;
  followerCount: number;
  followingCount: number;
  hasGamePass: boolean;
}

export interface XBXTitlesObject {
  xuid: string;
  titles: XBXTitles[];
}

export interface XBXTitles {
  id: string;
  titleId: string;
  name: string;
  devices: string[]
  displayImage: string;
  modernTitleId: string;
  isBundle: boolean;
  achievement: Achievement;
}

interface Achievement {
  currentAchievements: number,
  totalAchievements: number,
  currentGamerscore: number,
  totalGamerscore: number,
  progressPercentage: number,
}
