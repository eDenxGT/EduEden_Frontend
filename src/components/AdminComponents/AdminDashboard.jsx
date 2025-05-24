/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, BookOpen, DollarSign, GraduationCap } from 'lucide-react';
import { getDataForAdminDashboard } from "@/api/backendCalls/admin";
import moment from 'moment';
import { StatCardSkeleton, RecentActivitySkeleton, RecentOrdersSkeleton } from '@/components/CommonComponents/Skeletons/PageSkeleton';
import StatCard from "../CommonComponents/StatCard";

const AdminDashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: getDataForAdminDashboard,
  });

  if (isError) return <div>Error fetching dashboard data</div>;

  const { recentActivities, totalStats } = data || {};

  return (
    <div className="container mx-auto p-6 ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading ? (
          <>
            <StatCardSkeleton color="bg-indigo-100" />
            <StatCardSkeleton color="bg-emerald-100" />
            <StatCardSkeleton color="bg-amber-100" />
            <StatCardSkeleton color="bg-rose-100" />
          </>
        ) : (
          <>
            <StatCard
              icon={<Users className="h-6 w-6 text-indigo-600" />}
              title="Total Tutors"
              value={totalStats?.totalTutors}
              color="bg-indigo-100"
            />
            <StatCard
              icon={<GraduationCap className="h-6 w-6 text-emerald-600" />}
              title="Total Students"
              value={totalStats?.totalStudents}
              color="bg-emerald-100"
            />
            <StatCard
              icon={<BookOpen className="h-6 w-6 text-amber-600" />}
              title="Total Courses"
              value={totalStats?.totalCourses}
              color="bg-amber-100"
            />
            <StatCard
              icon={<DollarSign className="h-6 w-6 text-rose-600" />}
              title="Total Revenue"
              value={`$${totalStats?.totalRevenue?.toFixed(2)}`}
              color="bg-rose-100"
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <>
            <RecentActivitySkeleton color="bg-indigo-50" />
            <RecentActivitySkeleton color="bg-emerald-50" />
            <RecentActivitySkeleton color="bg-amber-50" />
            <RecentOrdersSkeleton color="bg-rose-50" />
          </>
        ) : (
          <>
            <RecentActivityCard
              title="Recent Tutors Registration"
              items={recentActivities?.tutors?.slice(0, 5)}
              color="bg-indigo-50"
              iconColor="text-indigo-600"
            />
            <RecentActivityCard
              title="Recent Students Registration"
              items={recentActivities?.students?.slice(0, 5)}
              color="bg-emerald-50"
              iconColor="text-emerald-600"
            />
            <RecentActivityCard
              title="Recent Courses"
              items={recentActivities?.courses?.slice(0, 5)}
              color="bg-amber-50"
              iconColor="text-amber-600"
            />
            <RecentOrdersCard 
              orders={recentActivities?.orders?.slice(0, 5)} 
              color="bg-rose-50"
            />
          </>
        )}
      </div>
    </div>
  );
};

const RecentActivityCard = ({ title, items, color, iconColor }) => (
  <Card className={`${color} border-none shadow-md hover:shadow-lg transition-shadow duration-300`}>
    <CardHeader>
      <CardTitle className="text-xl font-semibold text-gray-800">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[300px]">
        {items?.map((item, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4 bg-white p-3 rounded-lg shadow-sm">
            <Avatar>
              <AvatarFallback className={`${iconColor} bg-opacity-20`}>
                {item?.full_name?.charAt(0) || item?.title?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-gray-800">
                {item?.full_name || item?.title}
              </p>
              <p className="text-xs text-gray-500">
                {moment(item?.created_at).fromNow()}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </CardContent>
  </Card>
);

const RecentOrdersCard = ({ orders, color }) => (
  <Card className={`${color} border-none shadow-md hover:shadow-lg transition-shadow duration-300`}>
    <CardHeader>
      <CardTitle className="text-xl font-semibold text-gray-800">Recent Orders</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea className="h-[300px]">
        {orders?.map((order, index) => (
          <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-gray-800">{order?.studentName}</p>
              <p
                className={`text-sm font-semibold ${
                  order?.status === "success" ? "text-emerald-500" : "text-rose-500"
                }`}
              >
                {order.status}
              </p>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {order?.courseTitles.join(", ")}
            </p>
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-800">₹{order?.amount?.toFixed(2)}</p>
              <p className="text-xs text-gray-500">
                {moment(order?.created_at).fromNow()}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </CardContent>
  </Card>
);

export default AdminDashboard;

