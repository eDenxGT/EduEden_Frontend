import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const SkeletonCard = ({ className }) => (
  <Card className={`${className} border-none shadow-md animate-pulse`}>
    <CardHeader className="space-y-2">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </CardHeader>
    <CardContent>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </CardContent>
  </Card>
);

export const StatCardSkeleton = ({ className }) => (
  <Card className={`${className} border-none shadow-md animate-pulse`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
    </CardHeader>
    <CardContent>
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
    </CardContent>
  </Card>
);

export const RecentActivitySkeleton = ({ className }) => (
  <Card className={`${className} border-none shadow-md`}>
    <CardHeader>
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center space-x-4 animate-pulse">
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const RecentOrdersSkeleton = ({ className }) => (
  <Card className={`${className} border-none shadow-md`}>
    <CardHeader>
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="p-4 animate-pulse">
            <div className="flex justify-between items-center mb-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-1/6"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);
