export const TROPHY_BASE_URL = "https://m.np.playstation.com/api/trophy";
export const USER_BASE_URL =
  "https://m.np.playstation.com/api/userProfile/v1/internal/users";
export const SEARCH_BASE_URL = "https://m.np.playstation.com/api/search";
export const AUTH_BASE_URL = "https://ca.account.sony.com/api/authz/v3/oauth";

export const call = async (config, authorization, bodyPayload) => {
  const response = await fetch(config.url, {
    method: config?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${authorization.accessToken}`,
      "Content-Type": "application/json",
      ...config?.headers,
    },
    body: JSON.stringify(bodyPayload),
  });

  return await response.json();
};

export const buildRequestUrl = (
  baseUrl,
  endpointUrl,
  options = {},
  args = {}
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- This is an intentional pick.
  const { headerOverrides, ...pickedOptions } = options;

  const concatenated = `${baseUrl}/${endpointUrl}`;
  const withoutDoubleSlashes = concatenated.replace(/([^:]\/)\/+/g, "$1");

  let withArgs = withoutDoubleSlashes;
  const queryParamValues = {};

  for (const [argKey, argValue] of Object.entries({
    ...args,
    ...pickedOptions,
  })) {
    if (withArgs.includes(`:${argKey}`)) {
      withArgs = withArgs.replace(`:${argKey}`, String(argValue));
    } else if (argValue !== undefined) {
      queryParamValues[argKey] = String(argValue);
    }
  }

  const queryString = new URLSearchParams(queryParamValues).toString();
  return queryString.length > 0 ? `${withArgs}?${queryString}` : withArgs;
};
