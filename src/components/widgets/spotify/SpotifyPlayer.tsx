import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../scss/Spotify.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
  faShuffle,
  faRepeat,
  faVolumeHigh,
  faVolumeLow,
} from "@fortawesome/free-solid-svg-icons";

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    Spotify: any;
  }
}

interface SpotifyPlayerProps {
  onError: (message: string) => void;
  mood: string | null;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ onError, mood }) => {
  const [player, setPlayer] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [isSDKReady, setIsSDKReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPauseOpen, setIsPauseOpen] = useState(true);
  const   [isPlaying, setIsPlaying] = useState(true);

  // for volume, shuffle, repeat
  const [volume, setVolume] = useState<number>(0.5);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "context" | "track">(
    "off"
  );

  // timeline
  const [progressMs, setProgressMs] = useState<number>(0);
  const [durationMs, setDurationMs] = useState<number>(0);

  mood = "happy";
  const token = localStorage.getItem("spotifyAccessToken") || "";
  const togglePause = () => {
    setIsPauseOpen(!isPauseOpen);
  };

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

  useEffect(() => {
    if (isSDKReady && token) {
      const playerInstance = new window.Spotify.Player({
        name: "Web Playback SDK Player",
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token);
        },
        volume: 0.5,
      });

      playerInstance.addListener("ready", ({ device_id }: any) => {
        setDeviceId(device_id);
      });
      playerInstance.addListener("initialization_error", ({ message }: any) => {
        setLocalError(message);
        onError(message);
      });
      playerInstance.addListener("authentication_error", ({ message }: any) => {
        setLocalError(message);
        onError(message);
      });
      playerInstance.addListener("account_error", ({ message }: any) => {
        onError(message);
      });
      playerInstance.addListener("playback_error", ({ message }: any) => {
        setLocalError(message);
        onError(message);
      });


      // Update track and timeline info
      playerInstance.addListener("player_state_changed", (state: any) => {
        if (state && state.track_window?.current_track) {
          setCurrentTrack(state.track_window.current_track);
          setProgressMs(state.position);
          setDurationMs(state.duration);
          setIsPlaying(true);
        } else {
          setCurrentTrack(null);
          setProgressMs(0);
          setDurationMs(0);
          setIsPlaying(false);
        }
      });

      playerInstance.connect();
      setPlayer(playerInstance);
    }
  }, [isSDKReady, token, onError]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (player) {
      interval = setInterval(async () => {
        const state = await player.getCurrentState();
        if (state) {
          setProgressMs(state.position);
          setDurationMs(state.duration);
          setIsPlaying(!state.paused);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [player]);

  useEffect(() => {
    if (token) {
      axios
        .get("https://api.spotify.com/v1/me/playlists", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setPlaylists(res.data.items);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [token]);

  const playTracks = (trackUris: string[]) => {
    if (!deviceId) return;
    axios
      .put(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        { uris: trackUris },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .catch((err) => console.error("Error starting playback:", err));
  };

  const handlePause = () => {
    if (player) {
      player
        .pause()
        .catch((err: any) => console.error("Error pausing playback:", err));
    }
  };

  const handlePlay = () => {
    if (player) {
      player
        .resume()
        .catch((err: any) => console.error("Error resuming playback:", err));
    }
  };

  const handleNext = () => {
    if (player) {
      player
        .nextTrack()
        .catch((err: any) =>
          console.error("Error skipping to next track:", err)
        );
    }
  };

  const handlePrevious = () => {
    if (player) {
      player
        .previousTrack()
        .catch((err: any) => console.error("Error going previous track:", err));
    }
  };

  const playPlaylist = (playlistUri: string) => {
    if (!deviceId) return;
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
      .catch((err) => console.error("Error starting playback:", err));
  };

  // volume slider
  const changeVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (player) {
      player
        .setVolume(newVolume)
        .catch((err: any) => console.error("Error setting volume:", err));
    }
  };

  // shuffle
  const toggleShuffle = () => {
    if (!deviceId) return;
    axios
      .put(
        `https://api.spotify.com/v1/me/player/shuffle?state=${!isShuffled}&device_id=${deviceId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setIsShuffled(!isShuffled);
      })
      .catch((err) => console.error("Error toggling shuffle:", err));
  };

  // repeat cycles: off -> context -> track
  const toggleRepeat = () => {
    if (!deviceId) return;
    let nextMode: "off" | "context" | "track" = "off";
    if (repeatMode === "off") nextMode = "context";
    else if (repeatMode === "context") nextMode = "track";
    else nextMode = "off";

    axios
      .put(
        `https://api.spotify.com/v1/me/player/repeat?state=${nextMode}&device_id=${deviceId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setRepeatMode(nextMode);
      })
      .catch((err) => console.error("Error toggling repeat:", err));
  };

  // progress bar
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  const handleSeek = (newPos: number) => {
    if (player) {
      player
        .seek(newPos)
        .catch((err: any) => console.error("Error seeking:", err));
    }
  };

  return (
    <div className="spotify-player-container">
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
            Your Playlists
          </h3>
          <ul className="spotify-player-container__playlist__list">
            {playlists.map((playlist) => (
              <li
                className="spotify-player-container__playlist__list-items"
                key={playlist.id}
              >
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
                <span className="spotify-player-container__playlist__list-items__name">
                  {playlist.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No playlists found.</p>
      )}

      {currentTrack && (
        <div className="spotify-player-container__current-track">
          <h3 className="spotify-player-container__current-track__title">
            Now Playing
          </h3>
          <div className="spotify-player-container__current-track-right">
            <img
              className="spotify-player-container__current-track__img"
              src={currentTrack.album.images[0]?.url}
              alt={currentTrack.name}
            />
          </div>
          <div className="spotify-player-container__current-track-container">
            <div className="spotify-player-container__current-track-right">
              <p className="spotify-player-container__current-track__name">
                {currentTrack.name}
              </p>
              <p className="spotify-player-container__current-track__artist">
                {currentTrack.artists
                  .map((artist: any) => artist.name)
                  .join(", ")}
              </p>
            </div>
            {/* Progress / Seek Bar */}
            <div className="spotify-player-container__progress">
              <div className="spotify-player-container__progress__time icon-color__1">
                {formatTime(progressMs)}
              </div>
              <input
                className="spotify-player-container__progress__input icon-color__2"
                type="range"
                min={0}
                max={durationMs}
                value={progressMs}
                onChange={(e) => handleSeek(parseInt(e.target.value, 10))}
              />
              <div className="spotify-player-container__progress__time icon-color__1">
                {formatTime(durationMs)}
              </div>
            </div>
            <div className="spotify-player-container__current-track__player-controls">
              <div
                className={`spotify-player-container__player-controls__button spotify-player-container__player-controls__shuffle ${
                  isShuffled ? "icon-color__2" : "icon-color__1"
                }`}
              >
                <FontAwesomeIcon icon={faShuffle} onClick={toggleShuffle} />
              </div>
              <div className="spotify-player-container__player-controls__button spotify-player-container__player-controls__previous icon-color__2">
                <FontAwesomeIcon
                  onClick={handlePrevious}
                  icon={faBackwardStep}
                />
              </div>
              {isPauseOpen ? (
                <div className="spotify-player-container__player-controls__button spotify-player-container__player-controls__play">
                  <FontAwesomeIcon
                    onClick={() => {
                      handlePause();
                      togglePause();
                    }}
                    icon={faPause}
                  />
                </div>
              ) : (
                <div className="spotify-player-container__player-controls__button spotify-player-container__player-controls__play">
                  <FontAwesomeIcon
                    onClick={() => {
                      handlePlay();
                      togglePause();
                    }}
                    icon={faPlay}
                  />
                </div>
              )}
              <div className="spotify-player-container__player-controls__button spotify-player-container__player-controls__next icon-color__2">
                <FontAwesomeIcon onClick={handleNext} icon={faForwardStep} />
              </div>
              <div
                className={`spotify-player-container__player-controls__button spotify-player-container__player-controls__repeat ${
                  repeatMode === "off" ? "icon-color__1" : "icon-color__2"
                }`}
              >
                <FontAwesomeIcon icon={faRepeat} onClick={toggleRepeat} />
              </div>
            </div>
            <div className="spotify-player-container__volume">
              <FontAwesomeIcon className="icon-color__1" icon={faVolumeLow} />
              <input
                className="spotify-player-container__volume__input icon-color__2"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => changeVolume(parseFloat(e.target.value))}
              />
              <FontAwesomeIcon className="icon-color__1" icon={faVolumeHigh} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifyPlayer;
