export default function ProsCard({ title, pros }) {
  return (
    <div className="w-full p-6 my-4 border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/50 rounded-xl">
      <span>{title}</span>
      <div className="mt-4">
        {pros.map((pro) => (
          <div key={pro} className="flex items-center mb-2 font-medium">
            <div className="w-4 h-4 mr-2">
              <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24">
                <g fill="currentColor">
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z"/>
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
