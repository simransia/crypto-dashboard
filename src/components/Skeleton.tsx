import React from "react";

const Skeleton = ({ expand }: { expand: boolean }) => {
  return (
    <div
      role="status"
      className={`border animate-pulse pb-5 border-gray-100 shadow rounded-md ${
        expand
          ? "h-full w-full"
          : "md:min-w-[75%] xl:min-w-[60%] xl:max-w-[60%] mt-20 mx-auto md:max-w-[75%]"
      }`}
    >
      <div className="w-full relative min-h-[400px]">
        <div className="h-4 bg-gray-200  dark:bg-gray-700 w-1/5 my-4"></div>
        <div className="h-2 bg-gray-200  dark:bg-gray-700 w-1/6 mb-6"></div>
        <div className="h-[2px] w-full bg-gray-200  dark:bg-gray-700 mb-10"></div>
        <div className="h-[400px] w-2/3 mx-auto relative">
          <div className="absolute left-0 bottom-0 h-full w-1 bg-gray-200 dark:bg-gray-700"></div>
          <div className="absolute left-4 bottom-40 w-20 h-[2px] bg-gray-100"></div>
          <div className="absolute bottom-10 left-4 w-60 h-[2px] bg-gray-100"></div>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
