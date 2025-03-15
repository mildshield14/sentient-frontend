import { faLinkedin } from "@fortawesome/free-brands-svg-icons";import  {useEffect, useState } from "react";
import SpotifyLogin from "./widgets/spotify/SpotifyLogin";
import SpotifyPlayer from "./widgets/spotify/SpotifyPlayer";
import YouTubePlayer from "./widgets/YoutubePlayer";
import axios from "axios";
import "../scss/Home.scss";
import { BeatLoader } from 'react-spinners';

function HomePage({ username }: { username: string | null }) {
    const token = localStorage.getItem("spotifyAccessToken");
    const [playerType, setPlayerType] = useState<"spotify" | "youtube">("spotify");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [image, setImage] = useState(null);
    const [quote, setQuote] = useState(null);
    const [weather, setWeather] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [imageResponse, quoteResponse, weatherResponse] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_DOMAIN}/image`),
                    axios.get(`${import.meta.env.VITE_DOMAIN}/quote`),
                    // axios.get(`${import.meta.env.VITE_DOMAIN}/weather`),
                ]);
                console.log("Image Data:", imageResponse.data[0]);
                console.log("Quote Data:", quoteResponse.data);
                // console.log("Weather Data:", weatherResponse.data);
                setImage(imageResponse.data[0]);
                setQuote(quoteResponse.data);
                // setWeather(weatherResponse.data);

            } catch (error) {
                setImage({ urls: "../../images/background.jpg", description: "Default Image" });
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    return (
        <div className="home-page">
            {/*<div className="greetings">*/}
            {/*    Hello, <span className="greetings__name">{username}!</span>*/}
            {/*</div>*/}
            <div className="home-page__left-bar">

            </div>

            <div className="home-page__background-image__container">
                {image ? <img className="home-page__background-image" src={image.urls} alt={image.description}/>
                    :<BeatLoader/>}
                <div className="home-page__weather">
                </div>
                <div className="home-page__quote">
                </div>
                {image ?   <div className="home-page__background-image__description"><p>{image.description}</p><p>By: {image.author} </p><p>From: {image.location}</p></div>
            : <p></p>}
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
