import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import VideoControls from './VideoControls';
import VideoHeader from './VideoHeader';
import VideoProgress from './VideoProgress';
import VideoViewers from './VideoViewers';

const VideoPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  const handleProgress = (state) => {
    setProgress(state.playedSeconds);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative bg-black rounded-lg overflow-hidden">
        <ReactPlayer
          ref={playerRef}
          url="https://res.cloudinary.com/edueden/video/upload/v1732459221/lecture_videos/lecture_video_TEstvudei.mp4_1732459219214.mp4"
          width="100%"
          height="100%"
          playing={playing}
          onProgress={handleProgress}
          onDuration={handleDuration}
          className="aspect-video"
        />
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <VideoProgress progress={progress} duration={duration} />
          <VideoControls 
            playing={playing} 
            onPlayPause={handlePlayPause}
            progress={progress}
            duration={duration}
          />
        </div>

        <VideoHeader title="2. Sign up in Webflow" />
        <VideoViewers count={512} />
      </div>
    </div>
  );
}

export default VideoPlayer;