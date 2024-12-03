import { useEffect, useState } from "react";

import splashIcon from "@/assets/splash-icon.png";

import { SYSTEM_MSGS } from "@/lib/models/proxy";

import { useGetAppLink } from "@/hooks/api/platform";

function App() {
  const [isError, setIsError] = useState(false);
  const [playfitOs, setPlayfitOs] = useState<string | undefined>(undefined);
  const [queryString, setQueryString] = useState<string | undefined>(undefined);

  const { data, error, isLoading } = useGetAppLink(playfitOs);

  useEffect(() => {
    // Parse all query params
    const currentQueryParams = new URLSearchParams(window.location.search);
    setQueryString(currentQueryParams.toString());

    // Parse state param from query params
    const stateParam = currentQueryParams.get("state");
    if (!stateParam) {
      setIsError(true);
      return;
    }

    try {
      // Parse platform param from decoded state param
      const parsedState = JSON.parse(decodeURIComponent(stateParam));
      const playfitOsParam = parsedState.playfit_os || undefined;

      if (!playfitOsParam) {
        setIsError(true);
        return;
      }

      setPlayfitOs(playfitOsParam);
    } catch {
      setIsError(true);
      return;
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsError(true);
    }

    if (data && queryString) {
      window.location.href = `${data}?${queryString}`;
    }

    // Should not happen
    setIsError(true);
  }, [data, error, isLoading, queryString]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <img src={splashIcon} alt="Centered PNG" className="w-[200px]" />
      <div className="text-sm text-white font-bold">
        {isError ? SYSTEM_MSGS.ERROR : SYSTEM_MSGS.PENDING}
      </div>
    </div>
  );
}

export default App;
