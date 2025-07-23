const RecipeSkeleton = () => {
  return (
    <div className="w-full h-60 border-2 border-gray-200 rounded-md overflow-hidden flex  gap-2 shadow-md">
      <div className=" bg-gray-200 p-4 aspect-video h-full relative animate-pulse"></div>
      <div className="flex flex-col gap-2 py-4 px-4 w-full">
        <div className="h-10 w-1/2 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-full mt-auto">
          <div className="w-full h-4 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default RecipeSkeleton
