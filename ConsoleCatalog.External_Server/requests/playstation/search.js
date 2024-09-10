import { call, buildRequestUrl, SEARCH_BASE_URL } from "./utils.js";

export const makeUniversalSearch = async (
  authorization,
  searchTerm,
  domain
) => {
  const url = buildRequestUrl(SEARCH_BASE_URL, "/v1/universalSearch");

  return await call({ url, method: "POST" }, authorization, {
    searchTerm,
    domainRequests: [
      {
        domain,
      },
    ],
  });
};
