import { DollarSign, Users, BookOpen, FileText, Calendar } from 'lucide-react';
import Card from '../../components/CommonComponents/Card';
import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const statsData = [
    { icon: DollarSign, title: "Total Revenue", value: "$1,234,567" },
    { icon: Users, title: "Total Tutors", value: "500" },
    { icon: Users, title: "Total Students", value: "10,000" },
    { icon: BookOpen, title: "Total Courses", value: "200" },
    { icon: FileText, title: "Total Quizzes", value: "1,000" },
    { icon: FileText, title: "Total Categories", value: "50" },
  ];

  const recentActivities = [
    { icon: Users, message: "New tutor registration: John Doe", date: "2 hours ago" },
    { icon: Users, message: "New tutor registration: John Doe", date: "2 hours ago" },
    { icon: Users, message: "New tutor registration: John Doe", date: "2 hours ago" },
  ];

  const lastOrders = [
    { icon: Calendar, event: "Web Development", date: "200$" },
    { icon: Calendar, event: "Web Development", date: "200$" },
    { icon: Calendar, event: "Web Development", date: "200$" },
  ];

  const isDarkMode = useSelector(state=>state.admin.toggleTheme);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800'}`}>
    
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <Card key={index} className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-6 transition-all duration-300 hover:shadow-xl`}>
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${isDarkMode ? 'bg-blue-600' : 'bg-[#ff6b35]'} rounded-md p-3 text-white`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                      {stat.title}
                    </dt>
                    <dd className="text-lg font-medium">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Revenue Growth
            </h2>
            <p>Revenue growth graph </p>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              User Growth
            </h2>
            <p>User growth graph </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 col-span-2`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Recent Activities
            </h2>
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li key={index} className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg flex items-start`}>
                  <span className={`flex-shrink-0 h-10 w-10 rounded-full ${isDarkMode ? 'bg-blue-900' : 'bg-[#FFEEE8]'} flex items-center justify-center`}>
                    <activity.icon className={`h-6 w-6 ${isDarkMode ? 'text-blue-300' : 'text-[#ff6b35]'}`} />
                  </span>
                  <div className="ml-3">
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {activity.message}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                      {activity.date}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Course Categories
            </h2>
            <p>Course categories chart </p>
          </Card>
        </div>

        <Card className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 mb-8`}>
          <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Last Orders
          </h2>
          <ul className="space-y-4">
            {lastOrders.map((order, index) => (
              <li key={index} className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg flex items-center`}>
                <span className={`flex-shrink-0 h-10 w-10 rounded-full ${isDarkMode ? 'bg-blue-900' : 'bg-[#FFEEE8]'} flex items-center justify-center mr-3`}>
                  <order.icon className={`h-6 w-6 ${isDarkMode ? 'text-blue-300' : 'text-[#ff6b35]'}`} />
                </span>
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {order.event}
                  </p>
                  {order.date && (
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {order.date}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;