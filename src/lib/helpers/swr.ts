import useSWR, { mutate, SWRConfiguration } from "swr";

import { playfitFetcher, playfitApi } from "@/lib/helpers/axios";

import { SWR_KEYS } from "@/constants/models/swr";

// See https://swr.vercel.app/docs/api for more information on SWR

const resolveUrl = (key: SWR_KEYS, url?: string): string => url || key;

const handleMutate = async (key: SWR_KEYS, revalidate: boolean) => {
  if (revalidate) {
    await mutate(key);
  }
};

type QueryParamValue =
  | string
  | number
  | boolean
  | Array<string | number | boolean>;

export function appendQueryParams(
  key: SWR_KEYS | undefined,
  queryParams: Record<string, QueryParamValue>
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
export const usePlayfitGet = <
  RequestQueries extends Record<string, QueryParamValue> | undefined,
  ResponseData,
>(
  key: SWR_KEYS | undefined,
  queryParams?: RequestQueries,
  options: SWRConfiguration = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): { data: ResponseData | undefined; error: any; isLoading: boolean } => {
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
};

/**
 * POST Helper
 * Performs a POST request and optionally mutates/revalidates SWR cache.
 * @param key SWR_KEYS to revalidate
 * @param body Data to send in the POST request
 * @param url The URL to call POST
 * @param revalidate Whether to revalidate the SWR cache (default: true)
 * @returns The Axios response data
 */
export const usePlayfitPost = async <RequestBody, ResponseData>(
  key: SWR_KEYS,
  body: RequestBody,
  url?: string,
  revalidate: boolean = true
): Promise<ResponseData> => {
  try {
    const putUrl: string = resolveUrl(key, url);

    const response = await playfitApi.post<ResponseData>(putUrl, body);
    await handleMutate(key, revalidate);

    return response.data;
  } catch (error) {
    console.error("[playfitPost]", error);
    throw error;
  }
};

/**
 * PUT Helper
 * Updates a resource and optionally mutates/revalidates SWR cache.
 * @param key SWR_KEYS to revalidate
 * @param body Data to send in the PUT request
 * @param url The URL to call PUT
 * @param revalidate Whether to revalidate the SWR cache
 * @returns The updated resource or Axios response
 */
export const usePlayfitPut = async <RequestBody, ResponseData>(
  key: SWR_KEYS,
  body: RequestBody,
  url?: string,
  revalidate = true
): Promise<ResponseData> => {
  try {
    const putUrl: string = resolveUrl(key, url);

    const response = await playfitApi.put<ResponseData>(putUrl, body);
    await handleMutate(key, revalidate);

    return response.data;
  } catch (error) {
    console.error("[playfitPut]", error);
    throw error;
  }
};

/**
 * DELETE Helper
 * Deletes a resource and optionally mutates/revalidates SWR cache.
 * @param key SWR_KEYS to revalidate
 * @param id The ID of the resource to delete
 * @param url The URL to call DELETE
 * @param revalidate Whether to revalidate the SWR cache
 * @returns Axios response
 */
export const usePlayfitDelete = async <T>(
  key: SWR_KEYS,
  url?: string,
  revalidate = true
): Promise<T> => {
  try {
    const deleteUrl: string = resolveUrl(key, url);

    const response = await playfitApi.delete<T>(deleteUrl);
    await handleMutate(key, revalidate);

    return response.data;
  } catch (error) {
    console.error("[playfitDelete]", error);
    throw error;
  }
};
