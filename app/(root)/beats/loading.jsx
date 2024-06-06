import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="flex items-center px-4 py-0.5 bg-muted hover:shadow-white/25 hover:shadow-md hover:scale-[1.002] rounded-lg">
      <div className="relative w-10 h-10">
        <Skeleton className="absolute rounded-md inset-0 bg-gray-300" />
        <Skeleton className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-400" />
      </div>
      <div className="relative h-14 w-14">
        <Skeleton className="absolute inset-0 rounded-md bg-gray-300" />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between">
          <div>
            <Skeleton className="h-4 w-24 lg:w-32 bg-gray-300 rounded-md mb-1" />
            <Skeleton className="h-4 w-16 bg-gray-300 rounded-md" />
          </div>
          <div className="text-right">
            <Skeleton className="h-4 w-12 bg-gray-300 rounded-md mt-1" />
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center ml-4">
        <Skeleton className="h-6 w-16 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
};

export default loading;
