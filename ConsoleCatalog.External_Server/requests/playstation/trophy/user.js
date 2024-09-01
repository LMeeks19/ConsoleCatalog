import { call, buildRequestUrl, TROPHY_BASE_URL } from "../utils.js";

export const getUserTitles = async (authorization, accountId, options) => {
  const url = buildRequestUrl(
    TROPHY_BASE_URL,
    "/v1/users/:accountId/trophyTitles",
    options,
    { accountId }
  );

  return await call({ url, headers: options?.headerOverrides }, authorization);
};

export const getUserTrophiesEarnedForTitle = async (
  authorization,
  accountId,
  npCommunicationId,
  trophyGroupId,
  options
) => {
  const url = buildRequestUrl(
    TROPHY_BASE_URL,
    "/v1/users/:accountId/npCommunicationIds/:npCommunicationId/trophyGroups/:trophyGroupId/trophies",
    options,
    { accountId, npCommunicationId, trophyGroupId }
  );

  const response = await call(
    { url, headers: options?.headerOverrides },
    authorization
  );

  if (response?.error) {
    throw new Error(response?.error?.message ?? "Unexpected Error");
  }

  return response;
};

export const getUserTrophyGroupEarningsForTitle = async (
  authorization,
  accountId,
  npCommunicationId,
  options
) => {
  const url = buildRequestUrl(
    TROPHY_BASE_URL,
    "/v1/users/:accountId/npCommunicationIds/:npCommunicationId/trophyGroups",
    options,
    { accountId, npCommunicationId }
  );

  const response = await call(
    { url, headers: options?.headerOverrides },
    authorization
  );

  if (response?.error) {
    throw new Error(response?.error?.message ?? "Unexpected Error");
  }

  return response;
};

export const getUserTrophyProfileSummary = async (
  authorization,
  accountId,
  options
) => {
  const url = buildRequestUrl(
    TROPHY_BASE_URL,
    "/v1/users/:accountId/trophySummary",
    options,
    { accountId }
  );

  return await call({ url, headers: options?.headerOverrides }, authorization);
};
