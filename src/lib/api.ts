import { apiUrl, movieDBApiUrl, movieDBToken } from "@/utils/constant";

function getFetchConfig(customConfig: RequestInit) {
  const headers = { "Content-Type": "application/json" };
  const config = {
    method: customConfig?.body ? "POST" : "GET",
    body: customConfig?.body,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig?.headers,
    },
  };

  if (customConfig?.body) {
    config.body = JSON.stringify(customConfig.body);
  }

  return config;
}

async function fetchWrapper(
  endpoint: string,
  baseURL: string,
  customConfig: RequestInit
) {
  const config = getFetchConfig(customConfig);

  return fetch(`${baseURL}${endpoint}`, config).then(async (response) => {
    if (!response.ok) {
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    }

    return await response.json();
  });
}

export const movieDBApi = {
  get: async (endpoint: string, customConfig: RequestInit = {}) => {
    return await fetchWrapper(endpoint, movieDBApiUrl, {
      ...customConfig,
      headers: { Authorization: `Bearer ${movieDBToken}` },
    });
  },
};

export const api = {
  get: async (endpoint: string, customConfig: RequestInit = {}) => {
    return await fetchWrapper(endpoint, apiUrl, customConfig);
  },
};
