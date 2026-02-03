export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="min-h-screen bg-transparent text-white">
        <div className="container mx-auto space-y-16">
          {/* Header Skeleton */}
          <div className="space-y-4">
            <div className="h-10 bg-gray-700 rounded w-64"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>

          {/* Category Rows Skeleton */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 bg-gray-700 rounded w-48"></div>
              <div className="flex gap-4 overflow-x-hidden">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-64 w-56 bg-gray-700 rounded flex-shrink-0"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}