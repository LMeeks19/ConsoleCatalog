import { exchangeCodeForAccessToken, exchangeNpssoForCode, getProfileFromUserName } from "psn-api";

export async function getPSNUser() {
  const myNpsso = "H1mOuYChrds3Ik81oyKDDD73zLgnRlThbZWuJDrJlqeJHD2eRgYPt0LGuxLcVgLx";
  const accessCode = await exchangeNpssoForCode(myNpsso);
  const authorization = await exchangeCodeForAccessToken(accessCode);
  const user = await getProfileFromUserName(
    { accessToken: authorization.accessToken },
    "L0U13_M18",
    );

    return user;
}
