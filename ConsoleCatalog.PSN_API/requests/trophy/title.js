import { call, buildRequestUrl, TROPHY_BASE_URL } from "../../utils.js";

export const getTitleTrophies = async (
  authorization,
  npCommunicationId,
  trophyGroupId,
  options
) => {
  const url = buildRequestUrl(
    TROPHY_BASE_URL,
    "/v1/npCommunicationIds/:npCommunicationId/trophyGroups/:trophyGroupId/trophies",
    options,
    { npCommunicationId, trophyGroupId }
  );

  return await call({ url, headers: options?.headerOverrides }, authorization);
};

export const getTitleTrophyGroups = async (
  authorization,
  npCommunicationId,
  options
) => {
  const url = buildRequestUrl(
    TROPHY_BASE_URL,
    "/v1/npCommunicationIds/:npCommunicationId/trophyGroups",
    options,
    { npCommunicationId }
  );

  return await call({ url, headers: options?.headerOverrides }, authorization);
};
