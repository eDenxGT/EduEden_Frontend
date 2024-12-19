import { Skeleton } from "@/components/ui/skeleton";

export const CourseCardSkeleton = () => (
    <div
      className={`flex flex-col rounded-none bg-white shadow-md transition-all duration-300 ease-in-out`}
    >
      <div className="relative h-48">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="p-4 flex flex-col flex-grow space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/6" />
        </div>
  
        <Skeleton className="h-5 w-3/4" />
  
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center">
            <Skeleton className="w-4 h-4" />
            <Skeleton className="h-4 w-12 ml-2" />
          </div>

        </div>
  

      </div>
    </div>
  );
  