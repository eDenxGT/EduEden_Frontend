/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Star, X } from 'lucide-react';
import Button from "@/components/CommonComponents/Button";

const ReviewModal = ({ isOpen, onClose, onSubmit, isDarkMode }) => {
  const [rating, setRating] = useState(4);
  const [hoveredRating, setHoveredRating] = useState(0);

  if (!isOpen) return null;

  const getRatingText = (rating) => {
    if (rating >= 4.5) return "Amazing";
    if (rating >= 4) return "Good";
    if (rating >= 3) return "Average";
    if (rating >= 2) return "Poor";
    return "Bad";
  };

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleStarHover = (hoveredRating) => {
    setHoveredRating(hoveredRating);
  };

  const handleSubmit = () => {
    onSubmit(rating);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-none shadow-xl w-full max-w-md mx-4`}>
        <div className={`p-4 flex justify-between items-center border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Rate this course</h2>
          <button 
            onClick={onClose}
            className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-1`}>
              {rating.toFixed(1)} 
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg ml-2`}>
                ({getRatingText(rating)})
              </span>
            </div>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={() => handleStarHover(0)}
                  onClick={() => handleStarClick(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      (hoveredRating || rating) >= star
                        ? 'fill-yellow-300 text-yellow-300'
                        : isDarkMode ? 'text-gray-600' : 'text-gray-300'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <Button
              onClick={onClose}
              className={`flex-1 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
              text="Cancel"
            />
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              text="Submit Review"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;

