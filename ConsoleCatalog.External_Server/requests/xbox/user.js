const XBX_BASE_URL = "https://xbl.io/api/v2/";

export async function getXBXUser(username) {
  const response = await fetch(`${XBX_BASE_URL}/search/${username}`, {
    headers: {
      Accept: "application/json",
      "x-authorization": "5b773cbb-009b-4b91-aa34-87e36cd3761d",
    },
  });
  return response.json();
}
