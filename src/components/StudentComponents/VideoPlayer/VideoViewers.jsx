import React from 'react';

const VideoViewers = ({ count }) => {
  return (
    <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded-full">
      <span className="text-white text-sm">{count} Students watching</span>
    </div>
  );
};

export default VideoViewers;