import {
  EarnedTitleTrophy,
  ProfileTitleTrophiesProps,
  PSNProfile,
  TitleTrophy,
  Trophy,
  TrophyTitle,
  TrophyTitleObject,
} from "../../interfaces";
import { mergeTrophyArrays } from "../../methods";
import {
  getPSNProfileByUsername,
  getPSNProfileTitles,
  getPSNProfileTrophiesForTitle,
  getPSNTitleTrophies,
} from "../external/playstation-calls";


export async function getProfileByOnlineId(
  onlineId: string
): Promise<PSNProfile | null> {
  const profile_response = await fetch(
    `/playstation/getProfileByOnlineId/${onlineId}`
  );
  let psnProfile = null;
  try {
    psnProfile = (await profile_response.json()) as PSNProfile;
  } catch {}
  if (psnProfile === null) {
    let psn_profile_response = await getPSNProfileByUsername(onlineId);
    if (psn_profile_response !== null) {
      psn_profile_response.profile.trophyTitles = await getPSNProfileTitles(
        psn_profile_response.profile.accountId
      );
      psnProfile = await postProfile(psn_profile_response.profile);
    }
  }
  return psnProfile;
}

export async function postProfile(psnProfile: PSNProfile): Promise<PSNProfile> {
  const response = await fetch(`/playstation/postProfile`, {
    method: "POST",
    body: JSON.stringify(psnProfile),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function putProfile(psnProfile: PSNProfile): Promise<PSNProfile> {
  const response = await fetch(`/playstation/putProfile`, {
    method: "PUT",
    body: JSON.stringify(psnProfile),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function postProfileTitles(
  trophyTitleObject: TrophyTitleObject
): Promise<TrophyTitleObject> {
  const response = await fetch(`/playstation/postProfileTitles`, {
    method: "POST",
    body: JSON.stringify(trophyTitleObject),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function getProfileTitles(
  trophyTitlesObjectId: number,
  offset: number
): Promise<TrophyTitle[]> {
  const response = await fetch(
    `/playstation/getProfileTitles/${trophyTitlesObjectId}/${offset}`
  );
  return await response.json();
}

export async function getProfileTitleTrophies(
  psnProfileId: number,
  titleTrophiesProps: ProfileTitleTrophiesProps
): Promise<Trophy[]> {
  try {
    let titleTrophies = await getTitleTrophies(titleTrophiesProps);
    let earnedTitileTrophies = await getEarnedTitleTrophies(
      psnProfileId,
      titleTrophiesProps
    );
    return mergeTrophyArrays(
      titleTrophies,
      earnedTitileTrophies,
      psnProfileId,
      titleTrophiesProps.titleId
    );
  } catch {}
  return [] as Trophy[];
}

export async function getTitleTrophies(
  titleTrophiesProps: ProfileTitleTrophiesProps
): Promise<TitleTrophy[]> {
  const response = await fetch(
    `/playstation/getTitleTrophies/${titleTrophiesProps.titleId}`
  );
  let titleTrophies = [] as TitleTrophy[];
  try {
    titleTrophies = (await response.json()) as TitleTrophy[];
  } catch {}
  if (titleTrophies.length === 0) {
    let titleTrophies_response = await getPSNTitleTrophies(
      titleTrophiesProps.titleId,
      titleTrophiesProps.platform
    );
    if (titleTrophies_response !== null) {
      titleTrophies_response.trophies.forEach((tt) => {
        tt.titleId = titleTrophiesProps.titleId;
      });
      titleTrophies = await postTitleTrophies(
        titleTrophies_response.trophies as TitleTrophy[]
      );
    }
  }
  return titleTrophies;
}

export async function getEarnedTitleTrophies(
  psnProfileId: number,
  titleTrophiesProps: ProfileTitleTrophiesProps
): Promise<EarnedTitleTrophy[]> {
  const response = await fetch(
    `/playstation/getEarnedTitleTrophies/${psnProfileId}/${titleTrophiesProps.titleId}`
  );
  let earnedTitleTrophies = [] as EarnedTitleTrophy[];
  try {
    earnedTitleTrophies = (await response.json()) as EarnedTitleTrophy[];
  } catch {}
  if (earnedTitleTrophies.length === 0) {
    let earnedTitleTrophies_response = await getPSNProfileTrophiesForTitle(
      titleTrophiesProps.accountId,
      titleTrophiesProps.titleId,
      titleTrophiesProps.platform
    );
    if (
      earnedTitleTrophies_response !== null &&
      earnedTitleTrophies_response.trophies.some(
        (earnedTrophy) => earnedTrophy.earned
      )
    ) {
      earnedTitleTrophies_response.trophies.forEach((ett) => {
        ett.psnProfileId = psnProfileId;
        ett.titleId = titleTrophiesProps.titleId;
      });
      earnedTitleTrophies = await postProfileEarnedTitleTrophies(
        earnedTitleTrophies_response.trophies.filter(
          (earnedTrophy) => earnedTrophy.earned
        ) as EarnedTitleTrophy[]
      );
    }
  }
  return earnedTitleTrophies;
}

export async function postTitleTrophies(
  titleTrophies: TitleTrophy[]
): Promise<TitleTrophy[]> {
  const response = await fetch(`/playstation/postTitleTrophies`, {
    method: "POST",
    body: JSON.stringify(titleTrophies),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function postProfileEarnedTitleTrophies(
  earnedTitleTrophies: EarnedTitleTrophy[]
): Promise<EarnedTitleTrophy[]> {
  const response = await fetch(`/playstation/postEarnedTitleTrophies`, {
    method: "POST",
    body: JSON.stringify(earnedTitleTrophies),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}
