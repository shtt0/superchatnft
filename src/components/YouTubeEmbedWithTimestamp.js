import React, { useEffect, useState } from "react";

const YouTubeEmbedWithTimestamp = ({ videoId }) => {
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    // YouTube IFrame Player APIを初期化
    const onYouTubeIframeAPIReady = () => {
      const playerInstance = new window.YT.Player("youtube-player", {
        videoId: videoId,
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
      setPlayer(playerInstance);
    };

    // APIスクリプトの読み込みを監視
    if (window.YT) {
      onYouTubeIframeAPIReady();
    } else {
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    }

    return () => {
      if (player !== null) {
        player.destroy();
      }
    };
  }, [videoId]);

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      const interval = setInterval(() => {
        setCurrentTime(player.getCurrentTime());
      }, 1000);
      return () => clearInterval(interval);
    }
  };

  return (
    <div>
      <div id="youtube-player"></div>
      <div>
        <h3>Current Time: {Math.floor(currentTime)} seconds</h3>
      </div>
    </div>
  );
};

export default YouTubeEmbedWithTimestamp;
