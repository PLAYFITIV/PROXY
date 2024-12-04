import useSWR, { SWRConfiguration } from "swr";

import { playfitFetcher } from "@/lib/helpers/axios";

import { SWR_KEYS } from "@/constants/models/swr";

export function appendQueryParams(
  key: SWR_KEYS | undefined,
  queryParams: Record<
    string,
    string | number | boolean | Array<string | number | boolean>
  >
): string | undefined {
  if (!key) {
    return undefined;
  }

  const params = new URLSearchParams();

  for (const paramKey in queryParams) {
    const value = queryParams[paramKey];
    if (Array.isArray(value)) {
      value.forEach((v) => {
        params.append(paramKey, String(v));
      });
    } else {
      params.append(paramKey, String(value));
    }
  }

  const queryString = params.toString();
  return queryString ? `${key}?${queryString}` : key;
}

/**
 * GET Helper
 * Automatically fetches and caches data using SWR.
 * @param key SWR key
 * @param queryParams Query parameters
 * @param options SWR options
 * @returns SWR response
 */
export function usePlayfitGet<
  RequestQueries extends
    | Record<
        string,
        string | number | boolean | Array<string | number | boolean>
      >
    | undefined,
  ResponseData,
>(
  key: SWR_KEYS | undefined,
  queryParams?: RequestQueries,
  options: SWRConfiguration = {}
) {
  const keyWithQueries: string | undefined = queryParams
    ? appendQueryParams(key, queryParams)
    : key;

  const { data, error, isLoading } = useSWR<ResponseData>(
    keyWithQueries,
    playfitFetcher,
    options
  );

  return {
    data,
    error,
    isLoading,
  };
}
