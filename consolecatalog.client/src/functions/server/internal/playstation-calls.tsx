import {
  DefinedTrophies,
  DefinedTrophyGroupObject,
  EarnedTitleTrophy,
  EarnedTrophyGroupObject,
  ProfileTitleTrophiesProps,
  PSNProfile,
  TitleTrophy,
  Trophy,
  TrophyGroupObject,
  TrophyTitle,
  TrophyTitleObject,
} from "../../interfaces";
import { mergeTrophyArrays, mergeTrophyGroupObjects } from "../../methods";
import {
  getPSNProfileByUsername,
  getPSNProfileTitles,
  getPSNProfileTrophiesForTitle,
  getPSNProfileTrophiesGroupsForTitle,
  getPSNTitleTrophies,
  getTrophiesGroupsForTitle,
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
    `/playstation/getTitleTrophies/${titleTrophiesProps.titleId}/groups/${titleTrophiesProps.trophyGroupId}`
  );
  let titleTrophies = [] as TitleTrophy[];
  try {
    titleTrophies = (await response.json()) as TitleTrophy[];
  } catch {}
  if (titleTrophies.length === 0) {
    let titleTrophies_response = await getPSNTitleTrophies(
      titleTrophiesProps.titleId,
      titleTrophiesProps.platform,
      titleTrophiesProps.trophyGroupId
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
    `/playstation/getEarnedTitleTrophies/${psnProfileId}/titles/${titleTrophiesProps.titleId}/groups/${titleTrophiesProps.trophyGroupId}`
  );
  let earnedTitleTrophies = [] as EarnedTitleTrophy[];
  try {
    earnedTitleTrophies = (await response.json()) as EarnedTitleTrophy[];
  } catch {}
  if (earnedTitleTrophies.length === 0) {
    let earnedTitleTrophies_response = await getPSNProfileTrophiesForTitle(
      titleTrophiesProps.accountId,
      titleTrophiesProps.titleId,
      titleTrophiesProps.platform,
      titleTrophiesProps.trophyGroupId
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
        ett.trophyGroupId = titleTrophiesProps.trophyGroupId;
      });
      earnedTitleTrophies = await postProfileEarnedTitleTrophies(
        earnedTitleTrophies_response.trophies.filter(
          (earnedTrophy) => earnedTrophy.earned
        )
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

export async function putTitleTrophies(
  psnProfileId: number,
  accountId: string,
  titleId: string,
  platform: string,
  trophyGroupId: string
): Promise<Trophy[]> {
  let updatedTrophies = [] as TitleTrophy[];
  try {
    const psnDefinedTrophies_response = await getPSNTitleTrophies(
      titleId,
      platform,
      trophyGroupId
    );
    psnDefinedTrophies_response.trophies.forEach((ut) => {
      ut.titleId = titleId;
    });
    updatedTrophies = await putDefinedTitleTrophies(
      psnDefinedTrophies_response.trophies
    );
  } catch {}

  let updatedEarnedTrophies = [] as EarnedTitleTrophy[];
  try {
    const psnEarnedTrophies_response = await getPSNProfileTrophiesForTitle(
      accountId,
      titleId,
      platform,
      trophyGroupId
    );
    psnEarnedTrophies_response.trophies.forEach((uet) => {
      uet.titleId = titleId;
      uet.psnProfileId = psnProfileId;
      uet.trophyGroupId = trophyGroupId
    });
    updatedEarnedTrophies = await putEarnedTitleTrophies(
      psnEarnedTrophies_response.trophies.filter((ett) => ett.earned)
    );
  } catch {}

  return mergeTrophyArrays(
    updatedTrophies,
    updatedEarnedTrophies,
    psnProfileId,
    titleId
  );
}

export async function putDefinedTitleTrophies(
  titleTrophies: TitleTrophy[]
): Promise<TitleTrophy[]> {
  const response = await fetch(`/playstation/putTitleTrophies`, {
    method: "PUT",
    body: JSON.stringify(titleTrophies),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function putEarnedTitleTrophies(
  earnedTitleTrophies: EarnedTitleTrophy[]
): Promise<EarnedTitleTrophy[]> {
  const response = await fetch(`/playstation/putEarnedTitleTrophies`, {
    method: "PUT",
    body: JSON.stringify(earnedTitleTrophies),
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

export async function getProfileTrophyGroups(
  psnProfileId: number,
  accountId: string,
  titleId: string,
  platform: string
): Promise<TrophyGroupObject> {
  try {
    let definedTrophyGroupObject = await getDefinedTrophyGroupObject(
      titleId,
      platform
    );
    let earnedTrophyGroupObject = await getEarnedTrophyGroupObject(
      psnProfileId,
      accountId,
      titleId,
      platform
    );
    return mergeTrophyGroupObjects(
      definedTrophyGroupObject,
      earnedTrophyGroupObject
    );
  } catch {}
  return {} as TrophyGroupObject;
}

export async function getDefinedTrophyGroupObject(
  titleId: string,
  platform: string
): Promise<DefinedTrophyGroupObject> {
  const response = await fetch(
    `/playstation/getDefinedTrophyGroupObject/${titleId}/groups`
  );
  let definedTrophyGroupObject = null;
  try {
    definedTrophyGroupObject =
      (await response.json()) as DefinedTrophyGroupObject;
  } catch {}
  if (definedTrophyGroupObject === null) {
    let definedTrophyGroupObject_response = await getTrophiesGroupsForTitle(
      titleId,
      platform
    );
    if (definedTrophyGroupObject_response !== null) {
      definedTrophyGroupObject = await postDefinedTrophyGroupObject(
        definedTrophyGroupObject_response as DefinedTrophyGroupObject
      );
    }
  }
  return definedTrophyGroupObject!;
}

export async function postDefinedTrophyGroupObject(
  definedTrophyGroupObject: DefinedTrophyGroupObject
): Promise<DefinedTrophyGroupObject> {
  const response = await fetch(`/playstation/postDefinedTrophyGroupObject`, {
    method: "POST",
    body: JSON.stringify(definedTrophyGroupObject),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function putDefinedTrophyGroupObject(
  definedTrophyTitleObject: DefinedTrophyGroupObject
): Promise<DefinedTrophyGroupObject> {
  const response = await fetch(`/playstation/putDefinedTrophyGroupObject`, {
    method: "PUT",
    body: JSON.stringify(definedTrophyTitleObject),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function getEarnedTrophyGroupObject(
  psnProfileId: number,
  accountId: string,
  titleId: string,
  platform: string
): Promise<EarnedTrophyGroupObject> {
  const response = await fetch(
    `/playstation/getEarnedTrophyGroupObject/${psnProfileId}/${titleId}/groups`
  );
  let earnedTrophyGroupObject = null;
  try {
    earnedTrophyGroupObject =
      (await response.json()) as EarnedTrophyGroupObject;
  } catch {}
  if (earnedTrophyGroupObject === null) {
    let earnedTrophyGroupObject_response =
      await getPSNProfileTrophiesGroupsForTitle(accountId, titleId, platform);
    if (earnedTrophyGroupObject_response !== null) {
      earnedTrophyGroupObject_response.npCommunicationId = titleId;
      earnedTrophyGroupObject_response.psnProfileId = psnProfileId;
      earnedTrophyGroupObject = await postEarnedTrophyGroupObject(
        earnedTrophyGroupObject_response
      );
    }
  }
  return earnedTrophyGroupObject!;
}

export async function postEarnedTrophyGroupObject(
  earnedTrophyGroupObject: EarnedTrophyGroupObject
): Promise<EarnedTrophyGroupObject> {
  const response = await fetch(`/playstation/postEarnedTrophyGroupObject`, {
    method: "POST",
    body: JSON.stringify(earnedTrophyGroupObject),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function putEarnedTrophyGroupObject(
  earnedTrophyTitleObject: EarnedTrophyGroupObject
): Promise<EarnedTrophyGroupObject> {
  const response = await fetch(`/playstation/putEarnedTrophyGroupObject`, {
    method: "PUT",
    body: JSON.stringify(earnedTrophyTitleObject),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function putTrophyGroupObject(
  psnProfileId: number,
  accountId: string,
  titleId: string,
  platform: string
): Promise<TrophyGroupObject> {
  let updatedDefinedTrophyGroupObject = {} as DefinedTrophyGroupObject;
  try {
    const psnDefinedTrophyGroupObject_response =
      await getTrophiesGroupsForTitle(titleId, platform);
    updatedDefinedTrophyGroupObject = await putDefinedTrophyGroupObject(
      psnDefinedTrophyGroupObject_response
    );
  } catch {}

  let updatedEarnedTrophyGroupObject = {} as EarnedTrophyGroupObject;
  try {
    const psnEarnedTrophyGroupObject_response =
      await getPSNProfileTrophiesGroupsForTitle(accountId, titleId, platform);
    psnEarnedTrophyGroupObject_response.npCommunicationId = titleId;
    psnEarnedTrophyGroupObject_response.psnProfileId = psnProfileId;
    updatedEarnedTrophyGroupObject = await putEarnedTrophyGroupObject(
      psnEarnedTrophyGroupObject_response
    );
  } catch {}

  return mergeTrophyGroupObjects(
    updatedDefinedTrophyGroupObject,
    updatedEarnedTrophyGroupObject
  );
}
