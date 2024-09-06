import { PSNProfile, TrophyTitle, TrophyTitleObject } from "../../interfaces";
import {
  getPSNProfileByAccountId,
  getPSNProfileByUsername,
  getPSNProfileTitles,
} from "../external/playstation-calls";

export async function getProfileById(id: string): Promise<PSNProfile> {
  const response = await fetch(`/playstation/getProfileById/${id}`);
  return await response.json();
}

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

export async function getProfileByAccountId(
  accountId: string
): Promise<PSNProfile> {
  const response = await fetch(
    `/playstation/getProfileByAccountId/${accountId}`
  );
  let psnProfile = (await response.json()) as PSNProfile;
  if (psnProfile === null) {
    let psn_response = await getPSNProfileByAccountId(accountId);
    psnProfile = await postProfile(psn_response.profile);
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

export async function getProfileTitles(trophyTitlesObjectId: number, offset: number): Promise<TrophyTitle[]> {
  const response = await fetch(`/playstation/getProfileTitles/${trophyTitlesObjectId}/${offset}`);
  return await response.json();
}
