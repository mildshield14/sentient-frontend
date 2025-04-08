import { useEffect, useState } from "react";
import axios from "axios";
import "../../scss/Music.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SpotifyLogin from "../widgets/spotify/SpotifyLogin";
import SpotifyPlayer from "../widgets/spotify/SpotifyPlayer";
import YouTubePlayer from "../widgets/YoutubePlayer";

function Music() {
  const [isMusicOpen, setIsMusicOpen] = useState(true);
  const token = localStorage.getItem("spotifyAccessToken");
  const [playerType, setPlayerType] = useState<"spotify" | "youtube">(
    "spotify"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recommendedTracks, setRecommendedTracks] = useState<any[]>([]);
  const userId = localStorage.getItem("userId");
  const [mood, setMood] = useState("happy");

  useEffect(() => {
    if (!userId) return;

    axios
        .get(`${import.meta.env.VITE_DOMAIN}/recommendations`, {
          params: { userId, mood }, // pass as query params
        })
        .then((response) => {
          console.log("Got recommendations:", response.data.recommendations);
          setRecommendedTracks(response.data.recommendations.tracks || []);
        })
        .catch((error) => {
          console.error("Error fetching recommendations:", error);
        });
  }, [userId, mood]);

  const toggleMusic = () => {
    console.log(`toggleMusic called, isMusicOpen is: ${isMusicOpen}`);
    setIsMusicOpen(!isMusicOpen);
  };

  useEffect(() => {
    console.log("Music component mounted/updated. isMusicOpen:", isMusicOpen);
  }, [isMusicOpen]);

  return (
    isMusicOpen && (
      <div className="music">
        <div className="music__container">
          <div className="music__header">
            <div className="music__header__text">Listen to your music</div>
            <div onClick={toggleMusic} className="music__header__cross">
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
          <div className="music__body">
            {token ? (
              <>
                {playerType === "spotify" ? (
                        <>
                        <SpotifyPlayer onError={setErrorMessage}/>
                        {/*<h2>Recommendations for {mood}</h2>*/}
                        {/*<ul>*/}
                        {/*  {recommendedTracks.map((track) => (*/}
                        {/*      <li key={track.id}>*/}
                        {/*        {track.name} by {track.artists.map((a: any) => a.name).join(", ")}*/}
                        {/*      </li>*/}
                        {/*  ))}*/}
                        {/*</ul>*/}
                    {errorMessage && (
                        <div className="error-container">
                          <p>Error: {errorMessage}</p>
                          <p>
                            It appears your Spotify account might not support this
                            feature (a Premium account is required).
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
          <div className="music__between__or">OR</div>
          <div className="music__button music__button__youtube">
            <span>Connect with YouTube</span>
          </div>
        </div>
      </div>
    )
  );
}

export default Music;
