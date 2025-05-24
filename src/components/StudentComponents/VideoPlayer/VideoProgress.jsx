import React from 'react';

const VideoProgress = ({ progress, duration }) => {
  const progressPercentage = (progress / duration) * 100;

  return (
    <div className="w-full bg-gray-600 h-1 rounded-full overflow-hidden">
      <div
        className="h-full bg-red-500"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};

export default VideoProgress;