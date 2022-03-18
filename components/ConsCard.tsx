export default function ConsCard({ title, cons }) {
  return (
    <div className="w-full p-6 my-6 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/50 rounded-xl">
      <span>{title}</span>
      <div className="mt-4">
        {cons.map((con) => (
          <div key={con} className="flex items-center mb-2 font-medium">
            <div className="w-4 h-4 mr-2">
              <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                <g fill="currentColor" >
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"/>
                </g>
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
