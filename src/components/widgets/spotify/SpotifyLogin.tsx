const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${
  import.meta.env.VITE_SPOTIFY_CLIENT_ID
}&response_type=code&redirect_uri=http://localhost:5173/callback&scope=streaming%20user-read-email%20user-read-private%20playlist-read-private%20playlist-read-collaborative%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

const SpotifyLogin = () => {
  return (
    <div className="music__button music__button__spotify spotify-login">
      <a href={AUTH_URL}>Login with Spotify</a>
    </div>
  );
};

export default SpotifyLogin;
