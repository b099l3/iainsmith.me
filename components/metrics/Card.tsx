export default function MetricCard({ header, link, metric, isCurrency, isRunDistance = false }) {
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg metric-card dark:bg-gray-900 dark:border-gray-800 max-w-72">
      <a
        aria-label={header}
        target="_blank"
        rel="noopener noreferrer"
        href={link}
      >
        <div className="flex items-center text-gray-900 dark:text-gray-100">
          {header}
          <svg
            className="w-4 h-4 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </a>
      <p className="mt-2 text-3xl font-bold text-black spacing-sm dark:text-white">
        {metric > 0 && isCurrency && '$'}
        {metric > 0 ? metric.toLocaleString() : '-'}
        {metric > 0 && isRunDistance && ' mi'}
      </p>
    </div>
  );
}
