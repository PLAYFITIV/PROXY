import { useEffect } from "react";

import spashIcon from "@/assets/splash-icon.png";

function App() {
  useEffect(() => {
    const redirectToApp = () => {
      const baseURL = "playfit-indivisualiv://";
      const queryParams = new URLSearchParams({
        token: "12345",
      });

      // Redirect to custom URL scheme with query params
      window.location.href = `${baseURL}?${queryParams.toString()}`;
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
