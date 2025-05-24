import React from 'react';
import { BiPlay, BiPause, BiVolumeFull, BiCog } from 'react-icons/bi';
import { MdFullscreen } from 'react-icons/md';

const VideoControls = ({ playing, onPlayPause, progress, duration }) => {
  const formatTime = (seconds) => {
    const pad = (num) => (`0${Math.floor(num)}`).slice(-2);
    const minutes = seconds / 60;
    const hours = minutes / 60;
    
    if (hours >= 1) {
      return `${pad(hours)}:${pad(minutes % 60)}:${pad(seconds % 60)}`;
    }
    return `${pad(minutes)}:${pad(seconds % 60)}`;
  };

  return (
    <div className="flex items-center justify-between text-white mt-2">
      <div className="flex items-center space-x-4">
        <button
          onClick={onPlayPause}
          className="hover:text-gray-300 transition-colors"
        >
          {playing ? <BiPause size={24} /> : <BiPlay size={24} />}
        </button>
        <span className="text-sm">
          {formatTime(progress)} / {formatTime(duration)}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <button className="hover:text-gray-300 transition-colors">
          <BiVolumeFull size={24} />
        </button>
        <button className="hover:text-gray-300 transition-colors">
          <BiCog size={24} />
        </button>
        <button className="hover:text-gray-300 transition-colors">
          <MdFullscreen size={24} />
        </button>
      </div>
    </div>
  );
};

export default VideoControls;