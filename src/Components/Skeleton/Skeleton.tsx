import React from "react";

const SkeletonDefault: React.FC = () => {
  return (
    <div role="status" className="mt-6 animate-pulse">
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
      {/* <span>Loading...</span> */}
    </div>
  );
};

export { SkeletonDefault };
