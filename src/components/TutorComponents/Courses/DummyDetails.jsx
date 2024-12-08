import React from 'react';
import { Clock, Users, MessageCircle, Book, FileText, Globe, File, Eye, Star, StarHalf, MoreVertical, Bell, Search, Play, Calendar, User } from 'lucide-react';
import Card from '../../../components/CommonComponents/Card';

const CourseDetails = ({ isDarkMode }) => {
  const courseData = {
    title: "2021 Complete Python Bootcamp From Zero to Hero in Python",
    description: "3 in 1 Course: Learn to design websites with Figma, build with Webflow, and make a living freelancing.",
    uploadDate: "Jan 21, 2020",
    lastUpdated: "Sep 11, 2021",
    instructors: [
      { name: "Kevin Gilbert", avatar: "/placeholder.svg?height=40&width=40" },
      { name: "Kristin Watson", avatar: "/placeholder.svg?height=40&width=40" }
    ],
    rating: 4.8,
    totalRatings: "451,444",
    price: 13.99,
    revenue: "131,800,455.82",
    stats: [
      { icon: Book, value: "1,957", label: "Lecture", subtext: "(219.3 GB)" },
      { icon: MessageCircle, value: "51,429", label: "Total Commends" },
      { icon: Users, value: "9,419,418", label: "Students enrolled" },
      { icon: FileText, value: "Beginner", label: "Course level" },
      { icon: Globe, value: "Mandarin", label: "Course Language" },
      { icon: File, value: "142", label: "Attach File", subtext: "(14.4 GB)" },
      { icon: Clock, value: "19:37:51", label: "Hours" },
      { icon: Eye, value: "76,395,167", label: "Students viewed" }
    ],
    ratingDistribution: [
      { stars: 5, percentage: 67 },
      { stars: 4, percentage: 27 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 0 }
    ],
    lessons: [
      {
        title: "Introduction to the Course",
        thumbnail: "/placeholder.svg?height=200&width=300",
        duration: "31:05",
        date: "Nov 15, 2024",
        participants: 234,
        sections: [
          { title: "Welcome to the Course", duration: "5:20" },
          { title: "Course Overview", duration: "10:15" },
          { title: "Setting Up Your Development Environment", duration: "15:30" },
        ]
      },
      {
        title: "Python Basics",
        thumbnail: "/placeholder.svg?height=200&width=300",
        duration: "75:55",
        date: "Nov 20, 2024",
        participants: 189,
        sections: [
          { title: "Variables and Data Types", duration: "20:45" },
          { title: "Control Flow: If Statements and Loops", duration: "25:10" },
          { title: "Functions and Modules", duration: "30:00" },
        ]
      },
      {
        title: "Advanced Python Concepts",
        thumbnail: "/placeholder.svg?height=200&width=300",
        duration: "96:05",
        date: "Nov 25, 2024",
        participants: 156,
        sections: [
          { title: "Object-Oriented Programming", duration: "35:20" },
          { title: "Error Handling and Exceptions", duration: "20:15" },
          { title: "File I/O and Working with APIs", duration: "40:30" },
        ]
      },
    ]
  };

  const handlePlayClick = (lessonTitle) => {
    console.log(`Playing lesson: ${lessonTitle}`);
    // Add your logic to play the video
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Good Morning</p>
              <h1 className="text-xl font-bold">My Courses</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className={`relative ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-full px-4 py-2`}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className={`pl-8 bg-transparent focus:outline-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                />
              </div>
              <Bell className="w-6 h-6 text-gray-400" />
              <img
                src="/placeholder.svg?height=40&width=40"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <ol className="flex items-center space-x-2">
            {['Course', 'My Courses', 'Development', 'Web Development'].map((item, index) => (
              <React.Fragment key={item}>
                <li>
                  <a href="#" className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}>
                    {item}
                  </a>
                </li>
                {index < 3 && <span className="text-gray-500">/</span>}
              </React.Fragment>
            ))}
          </ol>
        </nav>

        {/* Main Content */}
        <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 mb-8`}>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Course"
                className="w-full rounded-lg"
              />
            </div>
            <div className="md:w-2/3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">
                    Uploaded: {courseData.uploadDate} • Last Updated: {courseData.lastUpdated}
                  </p>
                  <h1 className="text-2xl font-bold mt-2 mb-4">{courseData.title}</h1>
                  <p className="text-gray-500 mb-4">{courseData.description}</p>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex -space-x-2">
                      {courseData.instructors.map((instructor, index) => (
                        <img
                          key={index}
                          src={instructor.avatar}
                          alt={instructor.name}
                          className="w-10 h-10 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                    <div>
                      <p className="text-sm font-medium">Created by:</p>
                      <p className="text-sm text-gray-500">
                        {courseData.instructors.map(i => i.name).join(' • ')}
                      </p>
                    </div>
                  </div>
                </div>
                <button>
                  <MoreVertical className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-5 h-5 ${index < Math.floor(courseData.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill={index < Math.floor(courseData.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <span className="font-bold">{courseData.rating}</span>
                  <span className="text-gray-500">({courseData.totalRatings} Rating)</span>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Course prices</p>
                    <p className="text-xl font-bold">${courseData.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">USD dollar revenue</p>
                    <p className="text-xl font-bold">${courseData.revenue}</p>
                  </div>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                    Withdrew Money
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {courseData.stats.map((stat, index) => (
            <Card key={index} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  index % 4 === 0 ? 'bg-red-100' :
                  index % 4 === 1 ? 'bg-blue-100' :
                  index % 4 === 2 ? 'bg-green-100' :
                  'bg-yellow-100'
                }`}>
                  <stat.icon className={`w-6 h-6 ${
                    index % 4 === 0 ? 'text-red-500' :
                    index % 4 === 1 ? 'text-blue-500' :
                    index % 4 === 2 ? 'text-green-500' :
                    'text-yellow-500'
                  }`} />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-xl font-bold">{stat.value}</h3>
                    {stat.subtext && <span className="text-sm text-gray-500">{stat.subtext}</span>}
                  </div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Rating Distribution */}
        <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 mb-8`}>
          <h2 className="text-lg font-bold mb-6">Overall Course Rating</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4 text-center">
              <div className="text-5xl font-bold mb-2">{courseData.rating}</div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${index < Math.floor(courseData.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill={index < Math.floor(courseData.rating) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">Course Rating</p>
            </div>
            <div className="md:w-3/4">
              {courseData.ratingDistribution.map((rating, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 w-24">
                    <span className="text-sm">{rating.stars}</span>
                    <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  </div>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: `${rating.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm w-12">{rating.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Lessons Preview - Updated Design */}
        <div className="max-w-7xl mx-auto space-y-6">
          {courseData.lectures.map((lesson, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row overflow-hidden rounded-none border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              } shadow-sm`}
            >
              <div className="md:w-1/4 relative bg-[#FFD700]">
                <img
                  src={lesson.thumbnail}
                  alt={lesson.title}
                  className="w-full h-full object-cover aspect-[4/3]"
                />
              </div>
              
              <div className="flex-1 p-6">
                <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {lesson.title}
                </h3>
                
                <div className="flex flex-wrap gap-6  mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Date: {lesson.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-500" />
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Participants: {lesson.participants}+
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Duration: {lesson.duration}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => console.log(`Playing: ${lesson.title}`)}
                  className="bg-[#FF5A1F] hover:bg-[#FF4500] text-white px-6 py-2 rounded-none font-semibold transition-colors"
                >
                  View Lecture
                </button>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

