export interface ProfileTitleTrophiesProps {
    accountId: string;
    titleId: string;
    trophyGroupId: string;
    platform: string;
  }

export interface PSNProfileObject {
    profile: PSNProfile;
  }
  
  export interface PSNProfile {
    id: number;
    aboutMe: string;
    accountId: string;
    avatarUrls: AvatarUrl[];
    blocking: boolean;
    following: false;
    friendRelation: string;
    isOfficiallyVerified: boolean;
    languagesUsed: string[];
    npId: string;
    onlineId: string;
    personalDetailId: number;
    personalDetail: PersonalDetail;
    personalDetailSharing: string;
    personalDetailSharingRequestMessageFlag: boolean;
    plus: number;
    primaryOnlineStatus: string;
    requestMessageFlag: boolean;
    trophySummaryId: number;
    trophySummary: TrophySummary;
    trophyTitlesId: number;
    trophyTitles: TrophyTitleObject;
  }
  
  export interface TrophyTitleObject {
    id: number;
    totalItemCount: number;
    trophyTitles: TrophyTitle[];
  }
  
  export interface TrophyTitle {
    id: number;
    trophyTitleObjectId: number;
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
    id: number;
    psnProfileId: string;
    avatarUrl: string;
    size: string;
  }
  
  export interface PersonalDetail {
    id: number;
    firstname: string;
    lastname: string;
  }
  
  export interface TrophySummary {
    id: number;
    earnedTrophies: EarnedTrophies;
    level: number;
    progress: number;
  }
  
  export interface EarnedTrophies extends TrophyTypes {}
  export interface DefinedTrophies extends TrophyTypes {}
  
  export interface TrophyTypes {
    id: number;
    bronze: number;
    gold: number;
    platinum: number;
    silver: number;
  }
  
  export interface TitleTrophiesObject {
    trophies: TitleTrophy[];
  }
  
  export interface EarnedTitleTrophiesObject {
    trophies: EarnedTitleTrophy[];
  }
  
  export interface Trophy {
    id: number;
    psnProfileId: number;
    titleId: string;
    trophyId: number;
    trophyHidden: boolean;
    trophyType: string;
    trophyName: string;
    trophyDetail?: string;
    trophyIconUrl: string;
    tropyGroupId: string;
    trophyProgressTargetValue?: string;
    earned: boolean;
    earnedDateTime?: string;
    trophyEarnedRate: string;
    trophyRare: number;
    progress?: string;
    progressRate?: number;
    progressedDateTime?: string;
  }
  
  export interface TitleTrophy {
    id: number;
    titleId: string;
    trophyId: number;
    trophyHidden: boolean;
    trophyType: string;
    trophyName: string;
    trophyDetail?: string;
    trophyIconUrl: string;
    tropyGroupId: string;
    trophyProgressTargetValue?: string;
  }
  
  export interface EarnedTitleTrophy {
    id: number;
    psnProfileId: number;
    titleId: string;
    trophyGroupId: string;
    trophyId: number;
    earned: boolean;
    earnedDateTime?: string;
    trophyEarnedRate: string;
    trophyRare: number;
    progress?: string;
    progressRate?: number;
    progressedDateTime?: string;
  }
  
  export interface TrophyGroupObject {
    id: number;
    definedTrophies: DefinedTrophies;
    npCommunicationId: string;
    trophyGroups: TrophyGroup[];
    trophyTitleIconUrl: string;
    trophyTitleName: string;
    earnedTrophies: EarnedTrophies;
    lastUpdatedDateTime: string;
    progress: number;
    trophyTitlePlatform: string;
  }
  
  export interface TrophyGroup {
    id: number;
    earnedTrophies: EarnedTrophies;
    lastUpdatedDateTime: string;
    trophyGroupId: string;
    definedTrophies: DefinedTrophies;
    trophyGroupIconUrl: string;
    trophyGroupName: string;
    progress: number;
  }
  
  export interface DefinedTrophyGroupObject {
    id: number;
    definedTrophies: DefinedTrophies;
    npCommunicationId: string;
    trophyGroups: DefinedTrophyGroup[];
    trophyTitleIconUrl: string;
    trophyTitleName: string;
    trophyTitlePlatform: string;
  }
  
  export interface DefinedTrophyGroup {
    id: number;
    definedTrophies: DefinedTrophies;
    trophyGroupIconUrl: string;
    trophyGroupId: string;
    trophyGroupName: string;
  }
  
  export interface EarnedTrophyGroupObject {
    id: number;
    psnProfileId: number;
    earnedTrophies: EarnedTrophies;
    npCommunicationId: string;
    lastUpdatedDateTime: string;
    progress: number;
    trophyGroups: EarnedTrophyGroup[];
  }
  
  export interface EarnedTrophyGroup {
    id: number;
    earnedTrophies: EarnedTrophies;
    lastUpdatedDateTime: string;
    progress: number;
    trophyGroupId: string;
  }
  
  export interface UniversalSearchObject {
    profiles: UniversalSearchProfiles;
  }
  
  export interface UniversalSearchProfiles {
    domainResponses: DomainRseponse[];
  }
  
  export interface DomainRseponse {
    results: ProfileResults[];
  }
  
  export interface ProfileResults {
    socialMetadata: PSNProfileSummary;
  }
  
  export interface PSNProfileSummary {
    accountId: string;
    onlineId: string;
    avatarUrl: string;
    profilePicUrl: string;
  }