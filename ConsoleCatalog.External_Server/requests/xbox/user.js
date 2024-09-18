const XBX_BASE_URL = "https://xbl.io/api/v2/";

export async function getXBXUser(username) {
  const response = await fetch(`${XBX_BASE_URL}/search/${username}`, {
    headers: {
      Accept: "application/json",
      "x-authorization": "76823f2d-bca8-43a1-95d0-adda627b2c3e",
    },
  });
  return response.json();
}
