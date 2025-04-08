import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function SpotifyCallback() {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
   const mood="happy"
    const userId = localStorage.getItem("userId");
    if (code) {
      axios
        .post(`${import.meta.env.VITE_DOMAIN}/spotifylogin`, { code, userId, mood})
        .then((response) => {mood
          console.log("Token exchange success:", response.data);
          // Store the token and username
          // @ts-ignore
          localStorage.setItem("spotifyAccessToken", response.data.accessToken);
          localStorage.setItem("spotifyUserId", response.data.userId);
          console.log("response.data.userId", response.data.userId);
          // Force a full reload to update the App's authentication state
          window.location.href = "/home";
        })
        .catch((error) => {
          console.error("Error during token exchange:", error);
          window.location.href = "/home";
        });
    }
  }, [location.search]);

  return <div>Loading... Please wait.</div>;
}

export default SpotifyCallback;
