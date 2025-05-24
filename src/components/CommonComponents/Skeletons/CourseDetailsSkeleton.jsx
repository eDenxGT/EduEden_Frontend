import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export const CourseDetailsSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation link skeleton */}
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="space-y-6">
              {/* Course Header */}
              <div>
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="w-5 h-5 mr-1" />
                      ))}
                    </div>
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>

              {/* Course Preview */}
              <Skeleton className="w-full aspect-video rounded-lg" />

              {/* Course Description */}
              <div>
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-2" />
                <Skeleton className="h-4 w-4/5" />
              </div>

              {/* Curriculum */}
              <div>
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[380px]">
            <Card className="p-6">
              <div className="space-y-6">
                <Skeleton className="h-8 w-1/2" />
                
                <div className="space-y-4">
                  {[...Array(4)].map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Skeleton className="w-5 h-5" />
                      <div>
                        <Skeleton className="h-3 w-24 mb-1" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                </div>

                <div className="space-y-4">
                  <Skeleton className="h-5 w-40" />
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Skeleton className="w-5 h-5" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  ))}
                </div>

                <div>
                  <Skeleton className="h-5 w-40 mb-3" />
                  <div className="flex items-center gap-4">
                    {[...Array(4)].map((_, index) => (
                      <Skeleton key={index} className="w-8 h-8" />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

