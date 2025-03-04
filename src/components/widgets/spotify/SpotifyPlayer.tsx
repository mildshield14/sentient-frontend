import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../scss/Spotify.scss";

declare global {
    interface Window {
        onSpotifyWebPlaybackSDKReady: () => void;
        Spotify: any;
    }
}

interface SpotifyPlayerProps {
    onError: (message: string) => void;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ onError }) => {
    const [player, setPlayer] = useState<any>(null);
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [playlists, setPlaylists] = useState<any[]>([]);
    const [isSDKReady, setIsSDKReady] = useState(false);
    const [loading, setLoading] = useState(true);
    const [localError, setLocalError] = useState<string | null>(null);
    const [currentTrack, setCurrentTrack] = useState<any>(null);

    // Retrieve the token stored during the OAuth flow.
    const token = localStorage.getItem("spotifyAccessToken") || "";

    // Load Spotify Web Playback SDK
    useEffect(() => {
        if (!window.Spotify) {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            document.body.appendChild(script);
        } else {
            setIsSDKReady(true);
        }
        window.onSpotifyWebPlaybackSDKReady = () => {
            setIsSDKReady(true);
        };
    }, []);

    // Initialize the Spotify player when the SDK is ready.
    useEffect(() => {
        if (isSDKReady && token) {
            const playerInstance = new window.Spotify.Player({
                name: "Web Playback SDK Player",
                getOAuthToken: (cb: (token: string) => void) => {
                    cb(token);
                },
                volume: 0.5,
            });

            // When the player is ready, store the device ID.
            playerInstance.addListener("ready", ({ device_id }: any) => {
                console.log("Spotify Player is ready with Device ID:", device_id);
                setDeviceId(device_id);
            });
            playerInstance.addListener("initialization_error", ({ message }: any) => {
                console.error("Initialization Error:", message);
                setLocalError(message);
                onError(message);
            });
            playerInstance.addListener("authentication_error", ({ message }: any) => {
                console.error("Authentication Error:", message);
                setLocalError(message);
                onError(message);
            });
            playerInstance.addListener("account_error", ({ message }: any) => {
                console.error("Account Error:", message);
                onError(message);
            });
            playerInstance.addListener("playback_error", ({ message }: any) => {
                console.error("Playback Error:", message);
                setLocalError(message);
                onError(message);
            });

            // Listen for state changes to update the current track widget.
            playerInstance.addListener("player_state_changed", (state: any) => {
                if (state && state.track_window && state.track_window.current_track) {
                    console.log("Player state changed:", state);
                    setCurrentTrack(state.track_window.current_track);
                } else {
                    setCurrentTrack(null);
                }
            });

            playerInstance.connect();
            setPlayer(playerInstance);
        }
    }, [isSDKReady, token, onError]);

    // Fetch the user's playlists.
    useEffect(() => {
        if (token) {
            axios
                .get("https://api.spotify.com/v1/me/playlists", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    // @ts-ignore
                    console.log("Fetched Playlists:", res.data.items);
                    // @ts-ignore
                    setPlaylists(res.data.items);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching playlists:", err);
                    setLoading(false);
                });
        }
    }, [token]);

    // Function to start playback for a selected playlist.
    const playPlaylist = (playlistUri: string) => {
        if (!deviceId) {
            console.error("Device ID not available yet");
            return;
        }
        axios
            .put(
                `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
                { context_uri: playlistUri },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(() => {
                console.log("Started playback for playlist:", playlistUri);
            })
            .catch((err) => {
                console.error("Error starting playback:", err);
            });
    };

    // Playback controls
    const handlePause = () => {
        if (player) {
            player.pause().catch((err: any) =>
                console.error("Error pausing playback:", err)
            );
        }
    };

    const handlePlay = () => {
        if (player) {
            player.resume().catch((err: any) =>
                console.error("Error resuming playback:", err)
            );
        }
    };

    const handleNext = () => {
        if (player) {
            player.nextTrack().catch((err: any) =>
                console.error("Error skipping to next track:", err)
            );
        }
    };

    const handlePrevious = () => {
        if (player) {
            player.previousTrack().catch((err: any) =>
                console.error("Error going to previous track:", err)
            );
        }
    };

    return (
        <div className="spotify-player-container">
            <h2 className="spotify-player-container__title">Spotify Player</h2>
            {localError && (
                <div className="spotify-player-container__error-message">
                    {localError}
                </div>
            )}
            {loading ? (
                <p className="spotify-player-container__loading-msg">
                    Loading playlists...
                </p>
            ) : playlists.length > 0 ? (
                <div className="spotify-player-container__playlist">
                    <h3 className="spotify-player-container__playlist-title">
                        Your Playlists:
                    </h3>
                    <ul className="spotify-player-container__playlist__list">
                        {playlists.map((playlist) => (
                            <li
                                className="spotify-player-container__playlist__list-items"
                                key={playlist.id}
                            >
                                <span className="spotify-player-container__playlist__list-items__name">
                                    {playlist.name}
                                </span>
                                <img
                                    onClick={() => playPlaylist(playlist.uri)}
                                    src={
                                        playlist.images && playlist.images.length > 0
                                            ? playlist.images[0].url
                                            : "https://thumbs.dreamstime.com/b/question-mark-icon-design-vector-illustration-symbol-344863772.jpg"
                                    }
                                    alt={playlist.name}
                                    className="spotify-player-container__playlist__list-items__image"
                                />
                                <button
                                    className="spotify-player-container__playlist__list__button"
                                    onClick={() => playPlaylist(playlist.uri)}
                                >
                                    Play
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No playlists found.</p>
            )}
            {currentTrack && (
                <div className="spotify-player-container__current-track">
                    <h3 className="spotify-player-container__current-track__title">Now Playing</h3>
                    <div className={"spotify-player-container__current-track-right"}>
                    <img
                        className="spotify-player-container__current-track__img"
                        src={currentTrack.album.images[0]?.url}
                        alt={currentTrack.name}
                    />
                    </div>
                    <div className={"spotify-player-container__current-track-container"}>
                        <div className={"spotify-player-container__current-track-right"}>
                            <p className="spotify-player-container__current-track__name">{currentTrack.name}</p>
                            <p className="spotify-player-container__current-track__artist">
                                {currentTrack.artists.map((artist: any) => artist.name).join(", ")}
                            </p>
                        </div>

                            <div className="spotify-player-container__current-track__player-controls">
                                <button
                                    className="spotify-player-container__player-controls__button spotify-player-container__player-controls__previous"
                                    onClick={handlePrevious}>Previous
                                </button>
                                <button
                                    className="spotify-player-container__player-controls__button spotify-player-container__player-controls__pause"
                                    onClick={handlePause}>Pause
                                </button>
                                <button
                                    className="spotify-player-container__player-controls__button spotify-player-container__player-controls__play"
                                    onClick={handlePlay}>Play
                                </button>
                                <button
                                    className="spotify-player-container__player-controls__button spotify-player-container__player-controls__next"
                                    onClick={handleNext}>Next
                                </button>
                            </div>

                    </div>

                </div>
            )}
        </div>
    );
};
export default SpotifyPlayer;
