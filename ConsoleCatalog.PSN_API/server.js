import express from "express";
import cors from "cors";
import { authenticatePSN } from "./requests/playstation/auth.js";
import { makeUniversalSearch } from "./requests/playstation/search.js";
import {
  getProfileFromUserName,
  getBasicPresence,
  getProfileFromAccountId,
  getUserFriendsAccountIds,
} from "./requests/playstation/user.js";
import {
  getUserTitles,
  getUserTrophiesEarnedForTitle,
  getUserTrophyGroupEarningsForTitle,
  getUserTrophyProfileSummary,
} from "./requests/playstation/trophy/user.js";
import {
  getTitleTrophies,
  getTitleTrophyGroups,
} from "./requests/playstation/trophy/title.js";

import { authenticateGames } from "./requests/games/auth.js";
import {
  getPSNTitlesBySearch,
  getPSNUpcomingTitles,
  getPSNRecentTitles
} from "./requests/games/search.js";

const app = express();
const PORT = 3000;

var psn_auth = null;
var games_auth = null;

app.listen(PORT, async () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
  try {
    psn_auth = await authenticatePSN();
    console.log("Authentication with the PSN API was successful");
  } catch (ex) {
    console.log("Authentication with the PSN API was unsuccessful");
  }
  try {
    games_auth = await authenticateGames();
    console.log("Authentication with the Games API was successful");
  } catch (ex) {
    console.log("Authentication with the Games API was unsuccessful");
  }
});

app.use(cors());

// Playstation API Calls
app.get("/playstation/profiles/:username", async (req, res) => {
  const profile = await getProfileFromUserName(
    { accessToken: psn_auth.accessToken },
    req.params.username
  );

  res.send(profile);
});

app.get("/playstation/profiles/:accountId/basic", async (req, res) => {
  const basicPresence = await getBasicPresence(
    { accessToken: psn_auth.accessToken },
    req.params.accountId
  );

  res.send(basicPresence);
});

app.get("/playstation/profiles/:accountId", async (req, res) => {
  const profile = await getProfileFromAccountId(
    { accessToken: psn_auth.accessToken },
    req.params.accountId
  );

  res.send(profile);
});

app.get("/playstation/profiles/:accountId/friends", async (req, res) => {
  const friendsIds = await getUserFriendsAccountIds(
    { accessToken: psn_auth.accessToken },
    req.params.accountId
  );

  res.send(friendsIds);
});

app.get("/playstation/profiles/:accountId/titles/:offset", async (req, res) => {
  const userTitles = await getUserTitles(
    { accessToken: psn_auth.accessToken },
    req.params.accountId,
    { limit: 10, offset: req.params.offset }
  );

  res.send(userTitles);
});

app.get(
  "/playstation/profiles/:accountId/:titleId/trophies",
  async (req, res) => {
    const userTrophiesForTitles = await getUserTrophiesEarnedForTitle(
      { accessToken: psn_auth.accessToken },
      req.params.accountId,
      req.params.titleId
    );

    res.send(userTrophiesForTitles);
  }
);

app.get(
  "/playstation/profiles/:accountId/:titleId/trophy/group",
  async (req, res) => {
    const userTrophyGroupForTitles = await getUserTrophyGroupEarningsForTitle(
      { accessToken: psn_auth.accessToken },
      req.params.accountId,
      req.params.titleId
    );

    res.send(userTrophyGroupForTitles);
  }
);

app.get("/playstation/profiles/:accountId/trophy/summary", async (req, res) => {
  const userTrophyProfileSummary = await getUserTrophyProfileSummary(
    { accessToken: psn_auth.accessToken },
    req.params.accountId
  );

  res.send(userTrophyProfileSummary);
});

app.get("/playstation/PS5/:titleId", async (req, res) => {
  const titleTrophies = await getTitleTrophies(
    { accessToken: psn_auth.accessToken },
    req.params.titleId,
    "all"
  );

  res.send(titleTrophies);
});

app.get("/playstation/PS4/:titleId", async (req, res) => {
  const titleTrophies = await getTitleTrophies(
    { accessToken: psn_auth.accessToken },
    req.params.titleId,
    "all",
    {
      npServiceName: "trophy",
    }
  );

  res.send(titleTrophies);
});

app.get("/playstation/PS5/:titleId/trophy/groups", async (req, res) => {
  const titleTrophyGroups = await getTitleTrophyGroups(
    { accessToken: psn_auth.accessToken },
    req.params.titleId,
    "all"
  );

  res.send(titleTrophyGroups);
});

app.get("/playstation/PS4/:titleId/trophy/groups", async (req, res) => {
  const titleTrophyGroups = await getTitleTrophyGroups(
    { accessToken: psn_auth.accessToken },
    req.params.titleId,
    "all",
    {
      npServiceName: "trophy",
    }
  );

  res.send(titleTrophyGroups);
});

app.get("/playstation/profiles/:searchTerm", async (req, res) => {
  const profiles = await makeUniversalSearch(
    { accessToken: psn_auth.accessToken },
    req.params.searchTerm,
    "SocialAllAccounts"
  );

  res.send({
    profiles: profiles,
  });
});

// Playstation Games API Call
app.get("/playstation/titles/search/:searchTerm", async (req, res) => {
  const titles = await getPSNTitlesBySearch(
    games_auth.access_token,
    req.params.searchTerm
  );

  res.send(titles);
});

app.get("/playstation/titles/upcoming/:month/:year", async (req, res) => {
  const upcomingTitles = await getPSNUpcomingTitles(
    games_auth.access_token,
    req.params.month,
    req.params.year
  );
  res.send(upcomingTitles);
});

app.get("/playstation/titles/recent/:offset", async (req, res) => {
  const upcomingTitles = await getPSNRecentTitles(
    games_auth.access_token,
    req.params.offset
  );
  res.send(upcomingTitles);
});
