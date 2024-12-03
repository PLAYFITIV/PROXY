import { SWR_KEYS } from "@/constants/models/swr";

import { usePlayfitGet } from "@/lib/helpers/swr";

export const useGetAppLink = (
  os?: string
): {
  data: string | undefined;
  error: Error | undefined;
  isLoading: boolean;
} =>
  usePlayfitGet(
    os ? SWR_KEYS.PLATFORM_GET_APP_LINK : undefined,
    os ? { os: os } : {}
  );
