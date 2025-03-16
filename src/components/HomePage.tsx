import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
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

function HomePage({ id, handleLogout, size }: { id: string | null, handleLogout: () => void, size: string }) {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imageResponse = await axios.get(`${import.meta.env.VITE_DOMAIN}/image`);
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
  }, []);
  
    useEffect(() => {
      const fetchData = async () => {
      try {
        const quoteResponse = await axios.get(`${import.meta.env.VITE_DOMAIN}/quote`);
        console.log("Quote Data:", quoteResponse.data);
        setQuote(quoteResponse.data);
      } catch (error) {
        console.error("Error fetching quote data:", error);
      }

      try {
        const profilePhotoResponse = await axios.get(`${import.meta.env.VITE_DOMAIN}/user/${id}`);
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
    <div className="home-page">
      {/*<div className="greetings">*/}
      {/*    Hello, <span className="greetings__name">{username}!</span>*/}
      {/*</div>*/}
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
            {isMenuOpen  && size!="small"  && <div className="logo-title"></div>}
          </div>

        </div>
        <div className="home-page__left-bar__2">
          <div className="home-page__left-bar__2-todo">
            <div>
              <FontAwesomeIcon icon={faListCheck} />
            </div>
            {isMenuOpen  && size!="small" && <div>To Do</div>}
          </div>
          <div className="home-page__left-bar__2-music">
            <div>
              <FontAwesomeIcon icon={faMusic} />
            </div>
            {isMenuOpen  && size!="small" && <div>Music</div>}
          </div>
          <div className="home-page__left-bar__2-settings">
            <div>
              <FontAwesomeIcon icon={faGear} />
            </div>
            {isMenuOpen && size!="small" && <div>Settings</div>}
          </div>
          <div className="home-page__left-bar__2-profile">
              {isMenuOpen && (
                  <div>
                    <img  className="home-page__left-bar__2-profile__img" src={profilePhoto} alt="profile picture"/>
                  </div>
              )}
            {isMenuOpen  && size!="small" && (
                <div className="home-page__left-bar__2-profile__username">{username}</div>
            )}
            <div>
              <FontAwesomeIcon onClick={handleLogout} icon={faArrowRightFromBracket} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`home-page__background-image__container ${
          isMenuOpen
            ? "home-page__background-image__container--activated"
            : "home-page__background-image__container--not-activated"
        }`}
      >
        {image ? (
          <img
            className="home-page__background-image"
            src={image.urls}
            alt={image.description}
          />
        ) : (
          <BeatLoader />
        )}
        <div className="home-page__weather"></div>
        <div className="home-page__quote"></div>
        {image ? (
          <div className="home-page__background-image__description">
            <p>{image.description}</p>
            <p>By: {image.author} </p>
            <p>From: {image.location}</p>
          </div>
        ) : (
          <p></p>
        )}
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
  );
}

export default HomePage;
