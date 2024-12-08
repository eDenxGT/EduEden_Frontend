import React from 'react';

const VideoHeader = ({ title }) => {
  return (
    <div className="absolute top-4 left-4 right-4">
      <h2 className="text-white text-xl font-semibold">{title}</h2>
    </div>
  );
};

export default VideoHeader;