import express from "express";
import cors from "cors";
import {
  authenticatePSN,
  reAuthenticatePSN,
} from "./requests/playstation/auth.js";
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
  getPSNRecentTitles,
  getTitleById,
  getPSNAcclaimedTitles,
} from "./requests/games/psn-search.js";
import { getGameInfo } from "./requests/playstation/games/info.js";
import { getGamesSummaries } from "./requests/playstation/games/summaries.js";
import { getXBXUser } from "./requests/xbox/user.js";
import {
  getXBXAcclaimedTitles,
  getXBXRecentTitles,
  getXBXTitlesBySearch,
  getXBXUpcomingTitles,
} from "./requests/games/xbx-search.js";

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
    console.log("Authentication with the PSN API failed");
    console.log(ex.message);
  }
  try {
    games_auth = await authenticateGames();
    console.log("Authentication with the Games API was successful");
  } catch (ex) {
    console.log("Authentication with the Games API failed");
    console.log(ex.message);
  }
});

setInterval(async () => {
  try {
    psn_auth = await reAuthenticatePSN(psn_auth.refreshToken);
    console.log("ReAuthentication with the PSN API was successful");
  } catch {
    console.log("ReAuthentication with the PSN API failed");
  }
}, 3600000);

app.use(cors());

// Playstation API Calls
app.get("/playstation/profiles/:username", async (req, res) => {
  try {
    const profile = await getProfileFromUserName(
      { accessToken: psn_auth?.accessToken },
      req.params.username
    );

    res.send(profile);
  } catch {
    res.send();
  }
});

app.get("/playstation/profiles/:accountId/basic", async (req, res) => {
  const basicPresence = await getBasicPresence(
    { accessToken: psn_auth?.accessToken },
    req.params.accountId
  );

  res.send(basicPresence);
});

app.get("/playstation/profiles/:accountId", async (req, res) => {
  const profile = await getProfileFromAccountId(
    { accessToken: psn_auth?.accessToken },
    req.params.accountId
  );

  res.send(profile);
});

app.get("/playstation/profiles/:accountId/friends", async (req, res) => {
  const friendsIds = await getUserFriendsAccountIds(
    { accessToken: psn_auth?.accessToken },
    req.params.accountId
  );

  res.send(friendsIds);
});

app.get("/playstation/profiles/:accountId/titles", async (req, res) => {
  try {
    const userTitles = await getUserTitles(
      { accessToken: psn_auth?.accessToken },
      req.params.accountId
    );

    res.send(userTitles);
  } catch {
    res.send();
  }
});

app.get(
  "/playstation/profiles/:accountId/titles/new/:titleId/groups/:trophyGroupId/trophies",
  async (req, res) => {
    try {
      const userTrophiesForTitles = await getUserTrophiesEarnedForTitle(
        { accessToken: psn_auth?.accessToken },
        req.params.accountId,
        req.params.titleId,
        req.params.trophyGroupId
      );
      res.send(userTrophiesForTitles);
    } catch {
      res.send();
    }
  }
);

app.get(
  "/playstation/profiles/:accountId/titles/old/:titleId/groups/:trophyGroupId/trophies",
  async (req, res) => {
    try {
      const userTrophiesForTitles = await getUserTrophiesEarnedForTitle(
        { accessToken: psn_auth?.accessToken },
        req.params.accountId,
        req.params.titleId,
        req.params.trophyGroupId,
        { npServiceName: "trophy" }
      );
      res.send(userTrophiesForTitles);
    } catch {
      res.send();
    }
  }
);

app.get(
  "/playstation/profiles/:accountId/titles/new/:titleId/groups",
  async (req, res) => {
    const userTrophyGroupForTitles = await getUserTrophyGroupEarningsForTitle(
      { accessToken: psn_auth?.accessToken },
      req.params.accountId,
      req.params.titleId
    );

    res.send(userTrophyGroupForTitles);
  }
);

app.get(
  "/playstation/profiles/:accountId/titles/old/:titleId/groups",
  async (req, res) => {
    const userTrophyGroupForTitles = await getUserTrophyGroupEarningsForTitle(
      { accessToken: psn_auth?.accessToken },
      req.params.accountId,
      req.params.titleId,
      { npServiceName: "trophy" }
    );

    res.send(userTrophyGroupForTitles);
  }
);

app.get("/playstation/profiles/:accountId/trophy/summary", async (req, res) => {
  const userTrophyProfileSummary = await getUserTrophyProfileSummary(
    { accessToken: psn_auth?.accessToken },
    req.params.accountId
  );

  res.send(userTrophyProfileSummary);
});

app.get(
  "/playstation/titles/new/:titleId/groups/:trophyGroupId/trophies",
  async (req, res) => {
    try {
      const titleTrophies = await getTitleTrophies(
        { accessToken: psn_auth?.accessToken },
        req.params.titleId,
        req.params.trophyGroupId
      );

      res.send(titleTrophies);
    } catch {
      res.send();
    }
  }
);

app.get(
  "/playstation/titles/old/:titleId/groups/:trophyGorupId/trophies",
  async (req, res) => {
    try {
      const titleTrophies = await getTitleTrophies(
        { accessToken: psn_auth?.accessToken },
        req.params.titleId,
        req.params.trophyGorupId,
        {
          npServiceName: "trophy",
        }
      );

      res.send(titleTrophies);
    } catch {
      res.send();
    }
  }
);

app.get("/playstation/titles/new/:titleId/groups", async (req, res) => {
  const titleTrophyGroups = await getTitleTrophyGroups(
    { accessToken: psn_auth?.accessToken },
    req.params.titleId
  );

  res.send(titleTrophyGroups);
});

app.get("/playstation/titles/old/:titleId/groups", async (req, res) => {
  const titleTrophyGroups = await getTitleTrophyGroups(
    { accessToken: psn_auth?.accessToken },
    req.params.titleId,
    {
      npServiceName: "trophy",
    }
  );

  res.send(titleTrophyGroups);
});

app.get("/playstation/profiles/all/:searchTerm", async (req, res) => {
  const profiles = await makeUniversalSearch(
    { accessToken: psn_auth?.accessToken },
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

app.get("/playstation/titles/acclaimed/:offset", async (req, res) => {
  const acclaimedTitles = await getPSNAcclaimedTitles(
    games_auth.access_token,
    req.params.offset
  );
  res.send(acclaimedTitles);
});

app.get("/playstation/titles/browse", async (req, res) => {
  const upcomingTitles = await getPSNUpcomingTitles(
    games_auth.access_token,
    new Date().getMonth().toString(),
    new Date().getFullYear().toString()
  );
  const recentTitles = await getPSNRecentTitles(games_auth.access_token, "0");
  const acclaimedTitles = await getPSNAcclaimedTitles(
    games_auth.access_token,
    "0"
  );

  res.send({
    upcomingTitles: upcomingTitles,
    recentTitles: recentTitles,
    acclaimedTitles: acclaimedTitles,
  });
});

app.get("/playstation/titles/:id", async (req, res) => {
  const title = await getTitleById(games_auth.access_token, req.params.id);
  res.send(title);
});

app.get("/playstation/games/search/:searchTerm", async (req, res) => {
  try {
    const products = await getGamesSummaries(req.params.searchTerm);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/playstation/games/:id", async (req, res) => {
  try {
    const products = await getGameInfo(req.params.id);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/xbox/profiles/search/:username", async (req, res) => {
  const user = await getXBXUser(req.params.username);
  res.send(user);
});

app.get("/xbox/titles/search/:searchTerm", async (req, res) => {
  const titles = await getXBXTitlesBySearch(
    games_auth.access_token,
    req.params.searchTerm
  );

  res.send(titles);
});

app.get("/xbox/titles/upcoming/:month/:year", async (req, res) => {
  const upcomingTitles = await getXBXUpcomingTitles(
    games_auth.access_token,
    req.params.month,
    req.params.year
  );
  res.send(upcomingTitles);
});

app.get("/xbox/titles/recent/:offset", async (req, res) => {
  const upcomingTitles = await getXBXRecentTitles(
    games_auth.access_token,
    req.params.offset
  );
  res.send(upcomingTitles);
});

app.get("/xbox/titles/acclaimed/:offset", async (req, res) => {
  const acclaimedTitles = await getXBXAcclaimedTitles(
    games_auth.access_token,
    req.params.offset
  );
  res.send(acclaimedTitles);
});

app.get("/xbox/titles/browse", async (req, res) => {
  const upcomingTitles = await getXBXUpcomingTitles(
    games_auth.access_token,
    new Date().getMonth().toString(),
    new Date().getFullYear().toString()
  );
  const recentTitles = await getXBXRecentTitles(games_auth.access_token, "0");
  const acclaimedTitles = await getXBXAcclaimedTitles(
    games_auth.access_token,
    "0"
  );

  res.send({
    upcomingTitles: upcomingTitles,
    recentTitles: recentTitles,
    acclaimedTitles: acclaimedTitles,
  });
});

app.get("/xbox/titles/:id", async (req, res) => {
  const title = await getTitleById(games_auth.access_token, req.params.id);
  res.send(title);
});
