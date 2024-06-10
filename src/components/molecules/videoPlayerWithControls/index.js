import React from "react";
import ReactPlayer from "react-player";

const VideoPlayerWithControls = ({ isPlaying }) => {
  // const url =
  //   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  // const thumbnailUrl =
  //   "https://upload.wikimedia.org/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png";
  const url =
  "https://www.youtube.com/watch?v=C5SOyd2BznE";
const thumbnailUrl =
  "https://img.youtube.com/vi/C5SOyd2BznE/hqdefault.jpg";
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <ReactPlayer
        url={url}
        playing={true}
        muted={true}
        width="100%"
        height="100%"
        controls={true}
        light={thumbnailUrl}
      />
    </div>
  );
};

export default VideoPlayerWithControls;
