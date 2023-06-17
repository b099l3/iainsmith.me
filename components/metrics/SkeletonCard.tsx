export default function SkeletonCard({header}) {
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg metric-card dark:bg-gray-900 dark:border-gray-800 max-w-72 animate-pulse">
      <div className="flex items-center text-gray-800 dark:text-gray-300">
        {header}
      </div>
      <p className="mt-2 text-3xl font-bold text-gray-200 spacing-sm dark:text-gray-800">
        ----
      </p>
    </div>
  );
}
