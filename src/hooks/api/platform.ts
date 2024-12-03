import { SWR_KEYS } from "@/constants/models/swr";

import { usePlayfitGet } from "@/lib/helpers/swr";

export const useGetAppLink = (
  os?: string
): {
  data: string | undefined;
  error: Error | undefined;
  isLoading: boolean;
} => {
  if (!os) {
    return { data: undefined, error: undefined, isLoading: false };
  }

  return usePlayfitGet(SWR_KEYS.PLATFORM_GET_APP_LINK, { os: os });
};
