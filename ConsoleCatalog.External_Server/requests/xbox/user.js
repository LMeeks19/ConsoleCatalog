const XBX_BASE_URL = "https://xbl.io/api/v2";

const XBX_API_KEY = process.env.XBX_API_KEY;

export async function getXBXUserBySearch(username) {
  const response = await fetch(`${XBX_BASE_URL}/search/${username}`, {
    headers: {
      Accept: "application/json",
      "x-authorization": XBX_API_KEY,
    },
  });
  return response.json();
}

export async function getXBXUser(xuid) {
  const response = await fetch(`${XBX_BASE_URL}/account/${xuid}`, {
    headers: {
      Accept: "application/json",
      "x-authorization": XBX_API_KEY,
    },
  });
  return response.json();
}

export async function getXBXUserSummary(xuid) {
  const response = await fetch(`${XBX_BASE_URL}/player/summary/${xuid}`, {
    headers: {
      Accept: "application/json",
      "Accept-Language": "en-GB",
      "x-authorization": XBX_API_KEY,
    },
  });
  return response.json();
}

export async function getXBXUserTitleHistory(xuid) {
  const response = await fetch(`${XBX_BASE_URL}/player/titleHistory/${xuid}`, {
    headers: {
      Accept: "application/json",
      "Accept-Language": "en-GB",
      "x-authorization": XBX_API_KEY,
    },
  });
  return response.json();
}

export async function getXBXUserTitleAchieveents(xuid, titleId) {
  const response = await fetch(`${XBX_BASE_URL}/achievements/player/${xuid}/${titleId}`, {
    headers: {
      Accept: "application/json",
      "x-authorization": XBX_API_KEY,
    },
  });
  return response.json();
}
