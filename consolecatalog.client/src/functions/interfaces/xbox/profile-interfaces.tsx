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
  isFavorite: boolean;
  isFollowingCaller: boolean;
  isFollowedByCaller: boolean;
  isIdentityShared: boolean;
  addedDateTimeUtc: any;
  displayName: any;
  realName: string;
  displayPicRaw: string;
  showUserAsAvatar: string;
  gamertag: string;
  gamerScore: string;
  modernGamertag: string;
  modernGamertagSuffix: string;
  uniqueModernGamertag: string;
  xboxOneRep: string;
  isBroadcasting: boolean;
  isCloaked: any;
  isQuarantined: boolean;
  isXbox360Gamerpic: boolean;
  lastSeenDateTimeUtc: any;
  suggestion: any;
  recommendation: any;
  search: Search;
  titleHistory: any;
  multiplayerSummary: any;
  recentPlayer: any;
  follower: any;
  preferredColor: PreferredColor;
  presenceDetails: any;
  titlePresence: any;
  titleSummaries: any;
  presenceTitleIds: any;
  detail: Detail;
  communityManagerTitles: any;
  socialManager: any;
  broadcast: any;
  avatar: any;
  linkedAccounts: any;
  colorTheme: string;
  preferredFlag: string;
  preferredPlatforms: string[];
}

interface Search {
  Type: string;
  Reasons: string[];
}

interface PreferredColor {
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
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
