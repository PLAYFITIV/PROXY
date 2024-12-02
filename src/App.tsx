import { useEffect } from "react";

import spashIcon from "@/assets/splash-icon.png";

function App() {
  useEffect(() => {
    const redirectToApp = () => {
      const baseURL = "playfit-indivisualiv://";
      const currentQueryParams = new URLSearchParams(window.location.search);

      // Redirect to custom URL scheme with query params
      window.location.href = `${baseURL}?${currentQueryParams.toString()}`;
    };

    redirectToApp();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black">
      <img src={spashIcon} alt="Centered PNG" className="w-[200px]" />
    </div>
  );
}

export default App;
