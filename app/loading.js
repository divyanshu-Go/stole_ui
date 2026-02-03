export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Hero Section Skeleton */}
      <section className="w-full flex flex-col py-40">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-16 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-16 bg-gray-700 rounded w-2/3 mx-auto mb-4"></div>
          <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto mt-5"></div>
        </div>
      </section>

      {/* Stats Section Skeleton */}
      <div className="flex py-40 px-6 items-center justify-center flex-wrap gap-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center max-w-[200px] h-[200px] flex flex-col items-center">
            <div className="w-10 h-10 md:w-12 md:h-12 mb-4 bg-gray-700 rounded"></div>
            <div className="h-12 bg-gray-700 rounded w-20 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-32 mx-auto mt-4"></div>
          </div>
        ))}
      </div>

      {/* Featured Elements Skeleton */}
      <section className="flex flex-col py-12 pb-[600px]">
        <div className="h-8 bg-gray-700 rounded w-48 mb-10"></div>
        <div className="flex gap-10 w-full overflow-x-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[400px] w-[300px] bg-gray-700 rounded flex-shrink-0"></div>
          ))}
        </div>
      </section>
    </div>
  );
}