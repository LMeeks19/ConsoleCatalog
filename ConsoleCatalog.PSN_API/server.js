import express from "express";
import cors from "cors";
import { authenticate } from "./requests/auth.js";

import {
  getProfileFromUserName,
  getBasicPresence,
  getProfileFromAccountId,
  getUserFriendsAccountIds,
} from "./requests/user.js";

import {
  getUserTitles,
  getUserTrophiesEarnedForTitle,
  getUserTrophyGroupEarningsForTitle,
  getUserTrophyProfileSummary,
} from "./requests/trophy/user.js";

import {
  getTitleTrophies,
  getTitleTrophyGroups,
} from "./requests/trophy/title.js";

import { makeUniversalSearch } from "./requests/search.js";

const app = express();
const PORT = 3000;
var authorisation = null;

app.listen(PORT, async () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
  authorisation = await authenticate();
  console.log("Authentication with the PSN API was successful");
});

app.use(cors());

app.get("/profiles/:username", async (req, res) => {
  const profile = await getProfileFromUserName(
    { accessToken: authorisation.accessToken },
    req.params.username
  );

  res.send(profile);
});

app.get("/profiles/:accountId/basic", async (req, res) => {
  const basicPresence = await getBasicPresence(
    { accessToken: authorisation.accessToken },
    req.params.accountId
  );

  res.send(basicPresence);
});

app.get("/profiles/:accountId", async (req, res) => {
  const profile = await getProfileFromAccountId(
    { accessToken: authorisation.accessToken },
    req.params.accountId
  );

  res.send(profile);
});

app.get("/profiles/:accountId/friends", async (req, res) => {
  const friendsIds = await getUserFriendsAccountIds(
    { accessToken: authorisation.accessToken },
    req.params.accountId
  );

  res.send(friendsIds);
});

app.get("/profiles/:accountId/titles/:offset", async (req, res) => {
  const userTitles = await getUserTitles(
    { accessToken: authorisation.accessToken },
    req.params.accountId,
    { limit: 10, offset: req.params.offset }
  );

  res.send(userTitles);
});

app.get("/profiles/:accountId/:titleId/trophies", async (req, res) => {
  const userTrophiesForTitles = await getUserTrophiesEarnedForTitle(
    { accessToken: authorisation.accessToken },
    req.params.accountId,
    req.params.titleId
  );

  res.send(userTrophiesForTitles);
});

app.get("/profiles/:accountId/:titleId/trophy/group", async (req, res) => {
  const userTrophyGroupForTitles = await getUserTrophyGroupEarningsForTitle(
    { accessToken: authorisation.accessToken },
    req.params.accountId,
    req.params.titleId
  );

  res.send(userTrophyGroupForTitles);
});

app.get("/profiles/:accountId/trophy/summary", async (req, res) => {
  const userTrophyProfileSummary = await getUserTrophyProfileSummary(
    { accessToken: authorisation.accessToken },
    req.params.accountId
  );

  res.send(userTrophyProfileSummary);
});

app.get("/PS5/:titleId", async (req, res) => {
  const titleTrophies = await getTitleTrophies(
    { accessToken: authorisation.accessToken },
    req.params.titleId,
    "all"
  );

  res.send(titleTrophies);
});

app.get("/PS4/:titleId", async (req, res) => {
  const titleTrophies = await getTitleTrophies(
    { accessToken: authorisation.accessToken },
    req.params.titleId,
    "all",
    {
      npServiceName: "trophy",
    }
  );

  res.send(titleTrophies);
});

app.get("/PS5/:titleId/trophy/groups", async (req, res) => {
  const titleTrophyGroups = await getTitleTrophyGroups(
    { accessToken: authorisation.accessToken },
    req.params.titleId,
    "all"
  );

  res.send(titleTrophyGroups);
});

app.get("/PS4/:titleId/trophy/groups", async (req, res) => {
  const titleTrophyGroups = await getTitleTrophyGroups(
    { accessToken: authorisation.accessToken },
    req.params.titleId,
    "all",
    {
      npServiceName: "trophy",
    }
  );

  res.send(titleTrophyGroups);
});

app.get("/profiles/:searchTerm", async (req, res) => {
  const profiles = await makeUniversalSearch(
    { accessToken: authorisation.accessToken },
    req.params.searchTerm,
    "SocialAllAccounts"
  );

  res.send({
    profiles: profiles,
  });
});

app.get("/titles/:searchTerm", async (req, res) => {
  const authToken = await auth();
  const titles = await getTitles(authToken.access_token, req.params.searchTerm);

  res.send(titles);
});

async function auth() {
  const response = await fetch(
    "https://id.twitch.tv/oauth2/token?client_id=lpm1svjpeapgiyruyx8pratk8x54om&client_secret=yl42dzj8517v4v4zbrq06qma664vbw&grant_type=client_credentials",
    { method: "POST" }
  );
  return response.json();
}

async function getTitles(accessToken, searchTerm) {
  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": "lpm1svjpeapgiyruyx8pratk8x54om",
      Authorization: `Bearer ${accessToken}`,
    },
    body: `fields id,aggregated_rating,cover.*,name,platforms.*; search "${searchTerm}"; where category = (0,3,8,9) & version_parent = null & platforms = (9,48,167); limit 50;`,
  });
  return response.json();
}
