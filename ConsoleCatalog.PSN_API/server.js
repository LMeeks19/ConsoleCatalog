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
  console.log('Authentication with the PSN API was successful')
});

app.use(cors());

app.get("/profile/:username", async (req, res) => {
  const profile = await getProfileFromUserName(
    { accessToken: authorisation.accessToken },
    req.query.username
  );

  res.send({
    profile: profile,
  });
});

app.get("/profile/:accountId/basic", async (req, res) => {
  const basicPresence = await getBasicPresence(
    { accessToken: authorisation.accessToken },
    req.query.accountId
  );

  res.send({
    basicPresence: basicPresence,
  });
});

app.get("/profile/:accountId", async (req, res) => {
  const profile = await getProfileFromAccountId(
    { accessToken: authorisation.accessToken },
    req.query.accountId
  );

  res.send({
    profile: profile,
  });
});

app.get("/profile/:accountId/friends", async (req, res) => {
  const friendsIds = await getUserFriendsAccountIds(
    { accessToken: authorisation.accessToken },
    req.query.accountId
  );

  res.send({
    friendsIds: friendsIds,
  });
});

app.get("/profile/:accountId/titles", async (req, res) => {
  const userTitles = await getUserTitles(
    { accessToken: authorisation.accessToken },
    req.query.accountId
  );

  res.send({
    userTitles: userTitles,
  });
});

app.get("/profile/:accountId/:titleId/trophies", async (req, res) => {
  const userTrophiesForTitles = await getUserTrophiesEarnedForTitle(
    { accessToken: authorisation.accessToken },
    req.query.accountId,
    req.query.titleId
  );

  res.send({
    userTrophiesForTitles: userTrophiesForTitles,
  });
});

app.get("/profile/:accountId/:titleId/trophy/group", async (req, res) => {
  const userTrophyGroupForTitles = await getUserTrophyGroupEarningsForTitle(
    { accessToken: authorisation.accessToken },
    req.query.accountId,
    req.query.titleId
  );

  res.send({
    userTrophyGroupForTitles: userTrophyGroupForTitles,
  });
});

app.get("/profile/:accountId/trophy/summary", async (req, res) => {
  const userTrophyProfileSummary = await getUserTrophyProfileSummary(
    { accessToken: authorisation.accessToken },
    req.query.accountId
  );

  res.send({
    userTrophyProfileSummary: userTrophyProfileSummary,
  });
});

app.get("/PS5/:titleId", async (req, res) => {
  const titleTrophies = await getTitleTrophies(
    { accessToken: authorisation.accessToken },
    req.query.titleId,
    "all"
  );

  res.send({
    titleTrophies: titleTrophies,
  });
});

app.get("/PS4/:titleId", async (req, res) => {
  const titleTrophies = await getTitleTrophies(
    { accessToken: authorisation.accessToken },
    req.query.titleId,
    "all",
    {
      npServiceName: "trophy",
    }
  );

  res.send({
    titleTrophies: titleTrophies,
  });
});

app.get("/PS5/:titleId/trophy/groups", async (req, res) => {
  const titleTrophyGroups = await getTitleTrophyGroups(
    { accessToken: authorisation.accessToken },
    req.query.accountId,
    "all"
  );

  res.send({
    titleTrophyGroups: titleTrophyGroups,
  });
});

app.get("/PS4/:titleId/trophy/groups", async (req, res) => {
  const titleTrophyGroups = await getTitleTrophyGroups(
    { accessToken: authorisation.accessToken },
    req.query.accountId,
    "all",
    {
      npServiceName: "trophy",
    }
  );

  res.send({
    titleTrophyGroups: titleTrophyGroups,
  });
});

app.get("/title/:searchTerm", async (req, res) => {
  const profiles = await makeUniversalSearch(
    { accessToken: authorisation.accessToken },
    req.query.searchTerm,
    "SocialAllAccounts"
  );

  res.send({
    profiles: profiles,
  });
});
