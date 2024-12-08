import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Play, Pause, Volume2, VolumeX, Maximize2, ChevronDown, Clock, MessageSquare, FileText, Settings } from 'lucide-react';
import Button from '@/components/CommonComponents/Button';

const CoursePlayer = ({ courseTitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const playerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const [activeTab, setActiveTab] = useState('description');
  
  const studentAvatars = [
    '/placeholder.svg?height=32&width=32',
    '/placeholder.svg?height=32&width=32',
    '/placeholder.svg?height=32&width=32',
    '/placeholder.svg?height=32&width=32',
    '/placeholder.svg?height=32&width=32'
  ];

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
      setCurrentTime(formatTime(videoRef.current.currentTime));
    }
  };

  const handleProgressBarClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value;
    setVolume(value);
    videoRef.current.volume = value;
    setIsMuted(value === 0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleVideoClick = () => {
    togglePlay();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    }
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    const video = videoRef.current;
    
    const handleLoadedMetadata = () => {
      setDuration(formatTime(video.duration));
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleProgress);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleProgress);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
   <>
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-sm text-gray-700 max-w-xl">
            {courseTitle || "Complete Website Responsive Design: from Figma to Webflow to Website Design"}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            text="Write A Review"
            className="bg-white text-gray-700 border hover:bg-gray-50"
          />
          <Button 
            text="Next Lecture"
            className="bg-orange-500 text-white hover:bg-orange-600"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Video Section */}
        <div className="flex-1">
          <div 
            ref={playerRef}
            className="relative bg-black aspect-video"
            onMouseMove={showControlsTemporarily}
            onMouseLeave={() => setShowControls(false)}
          >
            <video
              ref={videoRef}
              className="w-full h-full cursor-pointer"
              src="https://res.cloudinary.com/edueden/video/upload/v1732459221/lecture_videos/lecture_video_TEstvudei.mp4_1732459219214.mp4"
              onClick={handleVideoClick}
              onDoubleClick={toggleFullscreen}
            />
            
            {/* Video Controls */}
            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex flex-col space-y-2">
                {/* Progress Bar */}
                <div 
                  ref={progressRef}
                  className="w-full h-1 bg-gray-200 rounded-full cursor-pointer"
                  onClick={handleProgressBarClick}
                >
                  <div 
                    className="h-1 bg-orange-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center space-x-4">
                    <button onClick={togglePlay}>
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </button>
                    <span className="text-sm">{currentTime} / {duration}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button onClick={toggleMute}>
                        {isMuted ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-20 h-1 bg-white rounded-full"
                      />
                    </div>
                    <button onClick={toggleFullscreen}>
                      <Maximize2 className="w-5 h-5" />
                    </button>
                    <button>
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Contents Sidebar */}
        <div className="w-96 border-l">
          <div className="p-4 border-b">
            <h2 className="text-lg font-medium">Course Contents</h2>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-green-500">15% Completed</span>
              <div className="w-32 bg-gray-200 rounded-full h-1">
                <div className="bg-green-500 w-[15%] h-1 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="overflow-auto h-[calc(100vh-12rem)]">
            {/* Getting Started Section */}
            <div className="border-b">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center space-x-2">
                  <ChevronDown className="w-4 h-4" />
                  <span className="text-sm font-medium">Getting Started</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 space-x-2">
                  <span>4 lectures</span>
                  <span>•</span>
                  <span>51m</span>
                  <span>•</span>
                  <span>25% finish (1/4)</span>
                </div>
              </div>

              {/* Lecture Items */}
              <div className="bg-gray-50">
                <div className="flex items-center p-4 border-t">
                  <div className="w-4 h-4 border border-green-500 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm">1. What is Webflow?</span>
                  </div>
                  <span className="text-xs text-gray-500">07:31</span>
                </div>

                <div className="flex items-center p-4 border-t">
                  <div className="w-4 h-4 border border-gray-300 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <span className="text-sm">2. Sign up in Webflow</span>
                  </div>
                  <span className="text-xs text-gray-500">07:31</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">2. Sign up in Webflow</h1>
        
        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {studentAvatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Student ${index + 1}`}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <div className="ml-3">
              <span className="font-semibold">512</span>
              <span className="text-gray-500 text-sm ml-1">students watching</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>Last updated: Oct 26, 2020</span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm">
            <MessageSquare className="w-4 h-4 mr-1" />
            <span>Comments: 154</span>
          </div>
        </div>

        <div className="border-b">
          <nav className="flex gap-8">
            <button
              className={`py-3 px-1 relative ${
                activeTab === 'description'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`py-3 px-1 relative flex items-center gap-2 ${
                activeTab === 'attachFile'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('attachFile')}
            >
              Attach File
              <span className="bg-orange-100 text-orange-500 text-xs px-1.5 py-0.5 rounded">
                01
              </span>
            </button>
            <button
              className={`py-3 px-1 relative ${
                activeTab === 'comments'
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('comments')}
            >
              Comments
            </button>
          </nav>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === 'description' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Lectures Description</h2>
            <p className="text-gray-600">
              We cover everything you need to build your first website. From creating your first page through to uploading your website to the internet.
            </p>
            <p className="text-gray-600">
              We'll use the world's most popular (and free) web design tool called Visual Studio Code. There are exercise files you can download and then work along with me. At the end of each video I have a downloadable version of where we are in the process so that you can compare your project with mine. This will enable you to see easily where you might have a
problem. We will delve into all the good stuff such as how to create your very own mobile burger menu from scratch learning some basic JavaScript and jQuery.
            </p>
            <p className="text-gray-600">
              If that all sounds a little too fancy - don't worry, this course is aimed at people new to web design and who have never coded before. We'll start right at the beginning and work our way through step by step.
            </p>
          </div>
        )}

        {activeTab === 'attachFile' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Attach Files (01)</h2>
            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="font-medium">Create account on webflow.pdf</p>
                  <p className="text-sm text-gray-500">12.8 MB</p>
                </div>
              </div>
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                Download File
              </button>
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Comments</h2>
            <p className="text-gray-500">No comments yet.</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default CoursePlayer;

