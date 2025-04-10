import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import DateTime from "../components/DateTime";
import Weather from "../components/Weather";
import Music from "../components/navbar-components/Music";
import SpotifyLogin from "./widgets/spotify/SpotifyLogin";
import SpotifyPlayer from "./widgets/spotify/SpotifyPlayer";
import YouTubePlayer from "./widgets/YoutubePlayer";
import axios from "axios";
import "../scss/Home.scss";
import { BeatLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faArrowRightFromBracket,
  faGear,
  faMusic,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";

function HomePage({
  id,
  handleLogout,
  size,
}: {
  id: string | null;
  handleLogout: () => void;
  size: string;
}) {
  const token = localStorage.getItem("spotifyAccessToken");
  const [playerType, setPlayerType] = useState<"spotify" | "youtube">(
    "spotify"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [image, setImage] = useState(null);
  const [quote, setQuote] = useState(null);
  const [weather, setWeather] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isMusicOpen, setIsMusicOpen] = useState(false);

  const toggleMusic = () => {
    console.log(`toggleMusic called, isMusicOpen is: ${isMusicOpen}`);
    setIsMusicOpen(!isMusicOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageResponse = await axios.get(
          `${import.meta.env.VITE_DOMAIN}/image`
        );
        console.log("Image Data:", imageResponse.data[0]);
        setImage(imageResponse.data[0]);
      } catch (error) {
        setImage({
          urls: "../../images/background.jpg",
          description: "Default Image",
        });
        console.error("Error fetching image data:", error);
      }
    };
    fetchData();

    localStorage.setItem("userId", id);
  }, []);

  useEffect(() => {
    if (!id) {
      id = localStorage.getItem("userId");
    }
    if (id) {
      axios
        .get(`${import.meta.env.VITE_DOMAIN}/user/${id}`)
        .then((response) => {
          setProfilePhoto(response.data.photo);
          setUsername(response.data.username);
        })
        .catch((error) => {
          setProfilePhoto("../../images/logo-default.png");
          setUsername("User Unknown");
        });
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quoteResponse = await axios.get(
          `${import.meta.env.VITE_DOMAIN}/quote`
        );
        console.log("Quote Data:", quoteResponse.data);
        setQuote(quoteResponse.data);
      } catch (error) {
        console.error("Error fetching quote data:", error);
      }

      try {
        const profilePhotoResponse = await axios.get(
          `${import.meta.env.VITE_DOMAIN}/user/${id}`
        );
        console.log("Profile Photo Data:", profilePhotoResponse.data);
        setProfilePhoto(profilePhotoResponse.data.photo);
        setUsername(profilePhotoResponse.data.username);
      } catch (error) {
        setProfilePhoto("../../images/logo-default.png");
        setUsername("User Unknown");
        console.error("Error fetching profile photo data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {image ? (
        <div
          className="home-page"
          style={{
            backgroundImage: `url("${image.urls}")`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className={`home-page__left-bar ${
              isMenuOpen
                ? "home-page__left-bar--activated"
                : "home-page__left-bar--not-activated"
            }`}
          >
            <div className="home-page__left-bar__1">
              <div className="home-page__left-bar__1-logo">
                <div>
                  <FontAwesomeIcon icon={faBars} onClick={toggleMenu} />
                </div>
                {isMenuOpen && size != "small" && (
                  <div className="logo-title"></div>
                )}
              </div>
            </div>
            <div className="home-page__left-bar__2">
              <div className="home-page__left-bar__2-todo">
                <div>
                  <FontAwesomeIcon icon={faListCheck} />
                </div>
                {isMenuOpen && size != "small" && <div>To Do</div>}
              </div>
              <div
                onClick={toggleMusic}
                className={`home-page__left-bar__2-music ${
                  isMusicOpen
                    ? "home-page__left-bar__2-music--activated"
                    : "home-page__left-bar__2-music--not-activated"
                }`}
              >
                <div>
                  <FontAwesomeIcon icon={faMusic} />
                </div>
                {isMenuOpen && size != "small" && <div>Music</div>}
              </div>
              <div className="home-page__left-bar__2-settings">
                <div>
                  <FontAwesomeIcon icon={faGear} />
                </div>
                {isMenuOpen && size != "small" && <div>Settings</div>}
              </div>
              <div className="home-page__left-bar__2-profile">
                {isMenuOpen && (
                  <div>
                    <img
                      className="home-page__left-bar__2-profile__img"
                      src={profilePhoto}
                      alt="profile picture"
                    />
                  </div>
                )}
                {isMenuOpen && size != "small" && (
                  <div className="home-page__left-bar__2-profile__username">
                    {username}
                  </div>
                )}
                <div>
                  <FontAwesomeIcon
                    onClick={handleLogout}
                    icon={faArrowRightFromBracket}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`home-page__background-image ${
              isMenuOpen
                ? "home-page__background-image--activated"
                : "home-page__background-image--not-activated"
            }`}
          >
            <div className="home-page__weather">
              <Weather />
            </div>
            <div
              className={`home-page__music ${
                isMenuOpen
                  ? "home-page__music--activated"
                  : "home-page__music--not-activated"
              }`}
            >
              {isMusicOpen && <Music />}
            </div>
            <DateTime />
            <div className="home-page__quote">
              {quote ? (
                <>
                  <p>"{quote.content}"</p>
                  <p>{quote.author}</p>
                </>
              ) : (
                "No quote available"
              )}
            </div>
            {image ? (
              <div className="home-page__background-image__description">
                <p>{image.description}</p>
                <p>By: {image.author} </p>
                <p>From: {image.location}</p>
              </div>
            ) : (
              <p></p>
            )}{" "}
            {/*<div>*/}
            {/*    {token ? (*/}
            {/*        <>*/}
            {/*            {playerType === "spotify" ? (*/}
            {/*                <>*/}
            {/*                    <SpotifyPlayer onError={setErrorMessage} />*/}
            {/*                    {errorMessage && (*/}
            {/*                        <div className="error-container">*/}
            {/*                            <p>Error: {errorMessage}</p>*/}
            {/*                            <p>*/}
            {/*                                It appears your Spotify account might not support this feature (a Premium account is required).*/}
            {/*                                Alternatively, you can switch to the YouTube player.*/}
            {/*                            </p>*/}
            {/*                            <button onClick={() => setPlayerType("youtube")}>*/}
            {/*                                Switch to YouTube*/}
            {/*                            </button>*/}
            {/*                        </div>*/}
            {/*                    )}*/}
            {/*                </>*/}
            {/*            ) : (*/}
            {/*                <YouTubePlayer />*/}
            {/*            )}*/}
            {/*        </>*/}
            {/*    ) : (*/}
            {/*        <SpotifyLogin />*/}
            {/*    )}*/}
            {/*</div>*/}
          </div>

          {/*<div>*/}
          {/*    {token ? (*/}
          {/*        <>*/}
          {/*            {playerType === "spotify" ? (*/}
          {/*                <>*/}
          {/*                    <SpotifyPlayer onError={setErrorMessage} />*/}
          {/*                    {errorMessage && (*/}
          {/*                        <div className="error-container">*/}
          {/*                            <p>Error: {errorMessage}</p>*/}
          {/*                            <p>*/}
          {/*                                It appears your Spotify account might not support this feature (a Premium account is required).*/}
          {/*                                Alternatively, you can switch to the YouTube player.*/}
          {/*                            </p>*/}
          {/*                            <button onClick={() => setPlayerType("youtube")}>*/}
          {/*                                Switch to YouTube*/}
          {/*                            </button>*/}
          {/*                        </div>*/}
          {/*                    )}*/}
          {/*                </>*/}
          {/*            ) : (*/}
          {/*                <YouTubePlayer />*/}
          {/*            )}*/}
          {/*        </>*/}
          {/*    ) : (*/}
          {/*        <SpotifyLogin />*/}
          {/*    )}*/}
          {/*</div>*/}
        </div>
      ) : (
        <BeatLoader />
      )}
    </>
  );
}

export default HomePage;
