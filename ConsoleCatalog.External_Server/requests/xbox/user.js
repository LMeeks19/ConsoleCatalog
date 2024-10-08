const XBX_BASE_URL = "https://xbl.io/api/v2/";

export async function getXBXUserBySearch(username) {
  const response = await fetch(`${XBX_BASE_URL}/search/${username}`, {
    headers: {
      Accept: "application/json",
      "x-authorization": "5b773cbb-009b-4b91-aa34-87e36cd3761d",
    },
  });
  return response.json();
}

export async function getXBXUser(xuid) {
  const response = await fetch(`${XBX_BASE_URL}/account/${xuid}`, {
    headers: {
      Accept: "application/json",
      "x-authorization": "5b773cbb-009b-4b91-aa34-87e36cd3761d",
    },
  });
  return response.json();
}

export async function getXBXUserSummary(xuid) {
  const response = await fetch(`${XBX_BASE_URL}/player/summary/${xuid}`, {
    headers: {
      Accept: "application/json",
      "Accept-Language": "en-GB",
      "x-authorization": "5b773cbb-009b-4b91-aa34-87e36cd3761d",
    },
  });
  return response.json();
}

export async function getXBXUserTitleHistory(xuid) {
  const response = await fetch(`${XBX_BASE_URL}/player/titleHistory/${xuid}`, {
    headers: {
      Accept: "application/json",
      "Accept-Language": "en-GB",
      "x-authorization": "5b773cbb-009b-4b91-aa34-87e36cd3761d",
    },
  });
  return response.json();
}
