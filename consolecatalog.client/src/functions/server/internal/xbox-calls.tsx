import {
  XBXProfile,
  XBXTitle,
} from "../../interfaces/xbox/profile-interfaces";
import {
  getXBXProfileByUsername,
  getXBXProfileTitles,
} from "../external/xbox-calls";

export async function getXBXProfileByGamertag(
  gamertag: string
): Promise<XBXProfile | null> {
  const profile_response = await fetch(
    `/XBX/GetXBXProfileByGamertag/${gamertag}`
  );
  let xbxProfile = null;
  try {
    xbxProfile = (await profile_response.json()) as XBXProfile;
  } catch {}
  if (xbxProfile === null) {
    let xbx_profile_response = (await getXBXProfileByUsername(gamertag))
      .people[0];
    if (xbx_profile_response !== null) {
      var titlesObject = await getXBXProfileTitles(xbx_profile_response.xuid);
      xbx_profile_response.titles = titlesObject.titles;
      xbx_profile_response.titlesCount = titlesObject.titles.length;
      xbxProfile = await postXBXProfile(xbx_profile_response);
    }
  }
  return xbxProfile;
}

export async function postXBXProfile(
  xbxProfile: XBXProfile
): Promise<XBXProfile> {
  const response = await fetch(`/XBX/PostXBXProfile`, {
    method: "POST",
    body: JSON.stringify(xbxProfile),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function putXBXProfile(
  xbxProfile: XBXProfile
): Promise<XBXProfile> {
  const response = await fetch(`/XBX/PutXBXProfile`, {
    method: "PUT",
    body: JSON.stringify(xbxProfile),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  return await response.json();
}

export async function getProfileTitles(
  profileId: number,
  offset: number
): Promise<XBXTitle[]> {
  const response = await fetch(
    `/XBX/GetXBXProfileTitles/${profileId}/${offset}`
  );
  return await response.json();
}
