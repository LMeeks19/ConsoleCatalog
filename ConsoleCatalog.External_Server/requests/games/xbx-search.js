import {
  BASE_GAMES_URL,
  CLIENT_ID,
 
  FULL_GAME_FIELDS,
  FULL_GAME_SUMMARY_FIELDS,
} from "./utils.js";

export async function getXBXTitlesBySearch(accessToken, searchTerm) {
  const response = await fetch(BASE_GAMES_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
    body: `fields ${FULL_GAME_SUMMARY_FIELDS}; where name ~ *"${searchTerm}"* & category = (0,8,9) & version_parent = null & platforms = (12,49,169); limit 50; sort name asc;`,
  });
  return response.json();
}

export async function getXBXUpcomingTitles(accessToken, m, y) {
  const currentDate = new Date();

  let month = Number(m);
  let year = Number(y);

  const date =
    year === currentDate.getUTCFullYear() && month === currentDate.getUTCMonth()
      ? currentDate.getDate()
      : 1;

  let startDate = new Date();
  startDate.setUTCFullYear(year, month, date);
  startDate.setUTCHours(0);
  startDate.setUTCMinutes(0);
  startDate.setUTCSeconds(0);
  let finalStartDate = Math.round(startDate.getTime() / 1000);

  let endDate = new Date();
  endDate.setUTCFullYear(year, month + 1, 1);
  endDate.setUTCHours(0);
  endDate.setUTCMinutes(0);
  endDate.setUTCSeconds(0);
  let finalEndDate = Math.round(endDate.getTime() / 1000);

  const response = await fetch(BASE_GAMES_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
    body: `fields ${FULL_GAME_SUMMARY_FIELDS}; where platforms = (49,169) & version_parent = null & category = (0,8,9) & first_release_date > ${finalStartDate} & first_release_date < ${finalEndDate}; sort first_release_date asc; limit 20;`,
  });
  return response.json();
}

export async function getXBXRecentTitles(accessToken, offset) {
  let currentDate = Math.round(Date.now() / 1000);

  const response = await fetch(BASE_GAMES_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
    body: `fields ${FULL_GAME_SUMMARY_FIELDS}; where platforms = (49,169) & version_parent = null & category = (0,8,9) & first_release_date < ${currentDate}; sort first_release_date desc; limit 20; offset ${offset};`,
  });
  return response.json();
}

export async function getXBXAcclaimedTitles(accessToken, offset) {

  const response = await fetch(BASE_GAMES_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
    body: `fields ${FULL_GAME_SUMMARY_FIELDS}; where platforms = (12,49,169) & platforms != (7,8,9,48,167) & version_parent = null & category = (0,8,9); sort total_rating desc; limit 20; offset ${offset};`,
  });
  return response.json();
}

export async function getTitleById(accessToken, id) {
  const response = await fetch(BASE_GAMES_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
    body: `fields ${FULL_GAME_FIELDS}; where id = ${id};`,
  });

  return response.json();
}
