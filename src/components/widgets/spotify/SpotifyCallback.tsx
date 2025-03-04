import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function SpotifyCallback() {
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const code = queryParams.get("code");

        if (code) {
            axios
                .post("http://localhost:8080/spotifylogin", { code })
                .then((response) => {
                    console.log("Token exchange success:", response.data);
                    // Store the token and username
                    // @ts-ignore
                    localStorage.setItem("spotifyAccessToken", response.data.accessToken);
                    // Force a full reload to update the App's authentication state
                    window.location.href = "/home";
                })
                .catch((error) => {
                    console.error("Error during token exchange:", error);
                    window.location.href = "/login";
                });
        }
    }, [location.search]);

    return <div>Loading... Please wait.</div>;
}

export default SpotifyCallback;
