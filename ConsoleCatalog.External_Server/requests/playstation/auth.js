import fetch from "isomorphic-unfetch";
import { AUTH_BASE_URL } from "./utils.js";

export const NPSSO = process.env.NPSSO;

export async function authenticatePSN() {
  const accessCode = await exchangeNpssoForCode(NPSSO);
  const authorisation = await exchangeCodeForAccessToken(accessCode);
  return authorisation;
}

export async function reAuthenticatePSN(refreshToken) {
  const authorisation = await exchangeRefreshTokenForAuthTokens(refreshToken);
  return authorisation;
}

const exchangeNpssoForCode = async (npssoToken) => {
  const queryString = new URLSearchParams({
    access_type: "offline",
    client_id: "09515159-7237-4370-9b40-3806e67c0891",
    redirect_uri: "com.scee.psxandroid.scecompcall://redirect",
    response_type: "code",
    scope: "psn:mobile.v2.core psn:clientapp",
  }).toString();

  const requestUrl = `${AUTH_BASE_URL}/authorize?${queryString}`;

  // This never returns a 200. As of Oct 10 2021, it seems to return a 302.
  const { headers: responseHeaders } = await fetch(requestUrl, {
    headers: {
      Cookie: `npsso=${npssoToken}`,
    },
    redirect: "manual",
  });

  // The access code itself is stored in a header on the response.
  // We'll perform a few validations to ensure it's actually there.
  if (
    !responseHeaders.has("location") ||
    !responseHeaders.get("location")?.includes("?code=")
  ) {
    throw new Error(`
      There was a problem retrieving your PSN access code. Is your NPSSO code valid?
      To get a new NPSSO code, visit https://ca.account.sony.com/api/v1/ssocookie.
    `);
  }

  const redirectLocation = responseHeaders.get("location");
  const redirectParams = new URLSearchParams(
    redirectLocation.split("redirect/")[1]
  );

  return redirectParams.get("code");
};

const exchangeCodeForAccessToken = async (accessCode) => {
  const requestUrl = `${AUTH_BASE_URL}/token`;

  const res = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic MDk1MTUxNTktNzIzNy00MzcwLTliNDAtMzgwNmU2N2MwODkxOnVjUGprYTV0bnRCMktxc1A=",
    },
    body: new URLSearchParams({
      code: accessCode,
      redirect_uri: "com.scee.psxandroid.scecompcall://redirect",
      grant_type: "authorization_code",
      token_format: "jwt",
    }).toString(),
  });

  const raw = await res.json();

  return {
    accessToken: raw.access_token,
    expiresIn: raw.expires_in,
    idToken: raw.id_token,
    refreshToken: raw.refresh_token,
    refreshTokenExpiresIn: raw.refresh_token_expires_in,
    scope: raw.scope,
    tokenType: raw.token_type,
  };
};

export const exchangeRefreshTokenForAuthTokens = async (refreshToken) => {
  const requestUrl = `${AUTH_BASE_URL}/token`;

  const res = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic MDk1MTUxNTktNzIzNy00MzcwLTliNDAtMzgwNmU2N2MwODkxOnVjUGprYTV0bnRCMktxc1A=",
    },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      grant_type: "refresh_token",
      token_format: "jwt",
      scope: "psn:mobile.v2.core psn:clientapp",
    }).toString(),
  });

  const raw = await res.json();

  return {
    accessToken: raw.access_token,
    expiresIn: raw.expires_in,
    idToken: raw.id_token,
    refreshToken: raw.refresh_token,
    refreshTokenExpiresIn: raw.refresh_token_expires_in,
    scope: raw.scope,
    tokenType: raw.token_type,
  };
};
