import Image from "next/image";
import React from "react";

const GlobalLoading = () => {
  return (
    <div className="w-screen bg-black text-white text-4xl h-screen flex items-center justify-center">
      <Image
        src="/assets/images/login/placeholder.svg"
        width={400}
        height={200}
        className=" animate-pulse"
        alt="loading"
      />
    </div>
  );
};

export default GlobalLoading;
