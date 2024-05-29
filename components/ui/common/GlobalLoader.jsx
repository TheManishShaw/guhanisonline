import React from "react";

const GlobalLoader = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="space-y-4 text-center">
        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
          Loading content...
        </p>
      </div>
    </div>
  );
};

export default GlobalLoader;
