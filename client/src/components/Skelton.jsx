import React from 'react';

const SkeletonAnimation = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="p-4 bg-white  rounded-lg shadow">
          <div className="animate-pulse h-40 bg-gray-300  rounded-md mb-4" />
          <div className="animate-pulse h-4 w-1/2 bg-gray-300  rounded mb-2" />
          <div className="animate-pulse h-4 w-1/4 bg-gray-300  rounded mb-2" />
          <div className="animate-pulse h-4 w-3/4 bg-gray-300  rounded mb-2" />
          <div className="flex items-center">
            <div className="h-8 w-8 animate-pulse bg-gray-300  rounded-full mr-2" />
            <div className="animate-pulse h-4 w-1/4 bg-gray-300  rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonAnimation;
