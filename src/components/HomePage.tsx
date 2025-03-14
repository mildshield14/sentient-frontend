import { faLinkedin } from "@fortawesome/free-brands-svg-icons";import  { useState } from "react";
import SpotifyLogin from "./widgets/spotify/SpotifyLogin";
import SpotifyPlayer from "./widgets/spotify/SpotifyPlayer";
import YouTubePlayer from "./widgets/YoutubePlayer";

function HomePage({ username }: { username: string | null }) {
    const token = localStorage.getItem("spotifyAccessToken");
    const [playerType, setPlayerType] = useState<"spotify" | "youtube">("spotify");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    return (
        <div className="home-page">
            <div className="greetings">
                Hello, <span className="greetings__name">{username}!</span>
            </div>
            <div>
                {token ? (
                    <>
                        {playerType === "spotify" ? (
                            <>
                                <SpotifyPlayer onError={setErrorMessage} />
                                {errorMessage && (
                                    <div className="error-container">
                                        <p>Error: {errorMessage}</p>
                                        <p>
                                            It appears your Spotify account might not support this feature (a Premium account is required).
                                            Alternatively, you can switch to the YouTube player.
                                        </p>
                                        <button onClick={() => setPlayerType("youtube")}>
                                            Switch to YouTube
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <YouTubePlayer />
                        )}
                    </>
                ) : (
                    <SpotifyLogin />
                )}
            </div>
        </div>
    );
}

export default HomePage;
