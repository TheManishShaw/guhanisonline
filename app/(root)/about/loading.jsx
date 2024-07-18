import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <>
      <div className="flex items-center container py-20 mx-auto h-auto px-4 mb-20 bg-muted hover:shadow-white/25 hover:shadow-md  rounded-lg">
        <div className="w-full">
          <div className="flex items-center justify-center gap-6 mb-10 px-6">
            <div className="flex-grow">
              <div className="flex justify-between">
                <div className="w-full">
                  <Skeleton className="h-10 w-52 lg:w-32 bg-gray-300 rounded-md mb-1" />
                  <Skeleton className="h-4 w-full bg-gray-300 rounded-md mt-6" />
                  <Skeleton className="h-4 w-56 bg-gray-300 rounded-md mt-6" />
                </div>
              </div>
            </div>
            <div className="relative h-64 w-96">
              <Skeleton className="absolute inset-0 rounded-md bg-gray-300" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex mb-20 items-center max-w-7xl mx-auto h-64 px-4 py-0.5 bg-muted hover:shadow-white/25 hover:shadow-md hover:scale-[1.002] rounded-lg">
        <div className="w-full">
          <div className="flex items-center justify-center gap-6 mb-10 px-6">
            <div className="relative h-28 w-32">
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
                  <Skeleton className="h-8 w-28 mt-4 bg-gray-300 rounded-md " />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-center ml-4">
            <Skeleton className="h-12 w-full bg-gray-300 rounded-md" />
            <Skeleton className="h-12 w-full bg-gray-300 rounded-md" />
          </div>
        </div>
      </div>
    </>
  );
};

export default loading;
