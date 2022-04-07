export default function Category({category}) {
  // I need todo it this way as the css file for the color get striped down to what we are using
  // So if I do it dynamically it is not smart enought to see what is dynamically creted
  // e.g. text-${colors[1]}

  switch (category) {
    case 'Flutter':
      return (
        <h4 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-tr from-flutter-blue-500 to-sky-50 animate-text">
          {category}
        </h4>
      );
    case 'Raspberry Pi':
      return (
        <h4 className="text-lg font-medium tracking-tight md:text-lg text-rose-500 dark:text-rose-500">
          {category}
        </h4>
      );
    case 'Xamarin':
      return (
        <h4 className="text-lg font-medium tracking-tight text-sky-500 md:text-lg dark:text-sky-500">
          {category}
        </h4>
      );
      case 'Book Review':
        return (
          <h4 className="text-lg font-medium tracking-tight text-teal-500 md:text-lg dark:text-teal-500">
            {category}
          </h4>
        );
    default:
      return (
        <h4 className="text-lg font-medium tracking-tight text-gray-900 md:text-lg dark:text-gray-100">
          {category}
        </h4>
      );
  }

 
}
