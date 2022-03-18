

export default function AlertWithImage({ type, title, message, image }) {
  switch (type) {
    case 'info':
      return (
        <div className="w-full p-5 my-4 border-2 border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/50 rounded-xl">
              <div key={message} className="flex items-start mb-2 font-medium">
                <div className="w-6 h-6 mr-4">
                  <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24">
                    <g
                      fill="currentColor"
                    >
                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.001 5.75c.69 0 1.251.56 1.251 1.25s-.561 1.25-1.251 1.25-1.249-.56-1.249-1.25.559-1.25 1.249-1.25zm2.001 12.25h-4v-1c.484-.179 1-.201 1-.735v-4.467c0-.534-.516-.618-1-.797v-1h3v6.265c0 .535.517.558 1 .735v.999z"/>
                    </g>
                  </svg>
                </div>
                <span className="text-lg text-blue-500" >{`${title ? title : '' }`}</span>
            </div>
            <span><img className="rounded-lg" src={image} /></span>
            <div className="mt-2"><span>{message}</span></div>
          </div>
      );
      case 'warn':
      return (
        <div className="w-full p-5 my-4 border-2 border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-900/50 rounded-xl">
              <div key={message} className="flex items-start mb-2 font-medium">
                <div className="w-6 h-6 mr-4">
                  <svg className="w-6 h-6 text-orange-500" viewBox="0 0 24 24">
                    <g
                      fill="currentColor"
                    >
                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.31 7.526c-.099-.807.528-1.526 1.348-1.526.771 0 1.377.676 1.28 1.451l-.757 6.053c-.035.283-.276.496-.561.496s-.526-.213-.562-.496l-.748-5.978zm1.31 10.724c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
                    </g>
                  </svg>
                </div>
                <span className="mb-px text-lg text-orange-500" >{`${title ? title : 'Hey!' }`}</span>
              </div>
              <span><img className="rounded-lg" src={image} /></span>
              <div className="mt-2"><span>{message}</span></div>
          </div>
      );
      case 'success':
      return (
        <div className="w-full p-5 my-4 border-2 border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/50 rounded-xl">
              <div key={message} className="flex items-start mb-2 font-medium">
                <div className="w-6 h-6 mr-4">
                  <svg className="w-6 h-6 text-emerald-500" viewBox="0 0 24 24">
                    <g
                      fill="currentColor"
                    >
                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.31 7.526c-.099-.807.528-1.526 1.348-1.526.771 0 1.377.676 1.28 1.451l-.757 6.053c-.035.283-.276.496-.561.496s-.526-.213-.562-.496l-.748-5.978zm1.31 10.724c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
                    </g>
                  </svg>
                </div>
                <span className="mb-px text-lg text-emerald-500" >{`${title ? title : 'WooHoo!' }`}</span>
              </div>
              <span><img className="rounded-lg" src={image} /></span>
              <div className="mt-2"><span>{message}</span></div>
          </div>
      );
      case 'failure':
      return (
        <div className="w-full p-5 my-4 border-2 border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-900/50 rounded-xl">
              <div key={message} className="flex items-start mb-2 font-medium">
                <div className="w-6 h-6 mr-4">
                  <svg className="w-6 h-6 text-rose-500" viewBox="0 0 24 24">
                    <g
                      fill="currentColor"
                    >
                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.31 7.526c-.099-.807.528-1.526 1.348-1.526.771 0 1.377.676 1.28 1.451l-.757 6.053c-.035.283-.276.496-.561.496s-.526-.213-.562-.496l-.748-5.978zm1.31 10.724c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
                    </g>
                  </svg>
                </div>
                <span className="mb-px text-lg text-rose-500" >{`${title ? title : 'Oh No!' }`}</span>
              </div>
              <span><img className="rounded-lg" src={image} /></span>
              <div className="mt-2"><span>{message}</span></div>
          </div>
      );
    default:
      break;
  }
  
}
