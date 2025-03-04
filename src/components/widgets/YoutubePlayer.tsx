import React from "react";

const YouTubePlayer: React.FC = () => {
    return (
        <div className="youtube-player-container">
            <h2>Your YouTube Player</h2>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/videoseries?list=YOUR_PLAYLIST_ID"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="YouTube Player"
            ></iframe>
        </div>
    );
};

export default YouTubePlayer;
