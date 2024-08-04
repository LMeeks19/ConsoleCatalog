import express from "express";
import cors from "cors";

import {
  exchangeNpssoForCode,
  exchangeCodeForAccessToken,
} from "./requests/auth.js";

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

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});

app.use(cors());

app.get("/users-list/:id", async (req, res) => {
  const myNpsso =
    "H1mOuYChrds3Ik81oyKDDD73zLgnRlThbZWuJDrJlqeJHD2eRgYPt0LGuxLcVgLx";
  const accessCode = await exchangeNpssoForCode(myNpsso);
  const authorization = await exchangeCodeForAccessToken(accessCode);
  const user = await getTitleTrophyGroups(
    { accessToken: authorization.accessToken },
    "NPWR20188_00",
  );

  res.send({
    user: user,
  });
});

