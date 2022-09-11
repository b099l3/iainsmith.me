export default function Category({category}) {
  // I need todo it this way as the css file for the color get striped down to what we are using
  // So if I do it dynamically it is not smart enought to see what is dynamically creted
  // e.g. text-${colors[1]}

  switch (category) {
    case 'Flutter':
      return (
        <span className="flex px-4 py-1 text-xs font-semibold text-white rounded-full cursor-pointer bg-gradient-to-tr from-flutter-blue-500 to-sky-500 animate-text align-center w-max">
          {category}
        </span>
      );
    default:
      return (
        <span className="flex px-4 py-1 text-xs font-semibold text-white rounded-full cursor-pointer bg-gradient-to-tr from-gray-900 to-gray-100 animate-text align-center w-max">
          {category}
        </span>
      );
  }

 
}
