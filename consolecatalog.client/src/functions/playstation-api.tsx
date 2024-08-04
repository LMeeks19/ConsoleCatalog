import {
  exchangeCodeForAccessToken,
  exchangeNpssoForCode,
  getUserTitles,
} from "psn-api";

export async function getPSNProfile(username: string) {
  const myNpsso =
    "H1mOuYChrds3Ik81oyKDDD73zLgnRlThbZWuJDrJlqeJHD2eRgYPt0LGuxLcVgLx";
  const accessCode = await exchangeNpssoForCode(myNpsso);
  const authorisation = await exchangeCodeForAccessToken(accessCode);
  const trophyTitlesResponse = await getUserTitles(
    { accessToken: authorisation.accessToken },
    "me"
  );

  return trophyTitlesResponse;
}
