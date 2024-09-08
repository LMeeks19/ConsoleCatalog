import { call, buildRequestUrl, USER_BASE_URL } from "./utils.js";

export const getProfileFromUserName = async (authorization, userName) => {
  const url = `https://us-prof.np.community.playstation.net/userProfile/v1/users/${userName}/profile2?fields=npId,onlineId,accountId,avatarUrls,plus,aboutMe,languagesUsed,trophySummary(@default,level,progress,earnedTrophies),isOfficiallyVerified,personalDetail(@default,profilePictureUrls),personalDetailSharing,personalDetailSharingRequestMessageFlag,primaryOnlineStatus,requestMessageFlag,blocking,friendRelation,following,consoleAvailability`;

  const response = await call({ url }, authorization);

  if (response?.error) {
    throw new Error(response?.error?.message ?? "Unexpected Error");
  }

  return response;
};

export const getBasicPresence = async (authorization, accountId, options) => {
  const url = buildRequestUrl(
    USER_BASE_URL,
    "/:accountId/basicPresences?type=primary",
    options,
    {
      accountId,
    }
  );

  const response = await call({ url }, authorization);

  if (response?.error) {
    throw new Error(response?.error?.message ?? "Unexpected Error");
  }

  return response;
};

export const getProfileFromAccountId = async (
  authorization,
  accountId,
  options
) => {
  const url = buildRequestUrl(USER_BASE_URL, "/:accountId/profiles", options, {
    accountId,
  });
  const response = await call({ url }, authorization);

  if (response?.error) {
    throw new Error(response?.error?.message ?? "Unexpected Error");
  }

  return response;
};

export const getUserFriendsAccountIds = async (
  authorization,
  accountId,
  options
) => {
  const url = buildRequestUrl(USER_BASE_URL, "/:accountId/friends", options, {
    accountId,
  });

  const response = await call({ url }, authorization);

  // If you are unable to access the user's friends list, a
  // "Not permitted by access control" error will be thrown.
  if (response?.error) {
    throw new Error(response?.error?.message ?? "Unexpected Error");
  }

  return response;
};
