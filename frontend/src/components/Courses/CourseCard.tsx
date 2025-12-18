// import React from 'react';
// import { getCourseDuration, formatCreationDate } from '../../utils/formatters.ts'

// interface CourseCardProps {
//   id: string;
//   title: string;
//   description: string;
//   duration: number;
//   authors: string[]; 
//   creationDate: string; 
//   onShow?: () => void;
//   onDelete?: () => void;
// }

// const CourseCard: React.FC<CourseCardProps> = ({ 
//   title, 
//   description, 
//   duration, 
//   authors, 
//   creationDate,
//   onShow, 
//   onDelete, 
// }) => {
//   const formattedDuration = getCourseDuration(duration);
//   const formattedDate = formatCreationDate(creationDate);
//   const authorsText = authors.length > 0 ? authors.join(', ') : 'No authors';

//   return (
//     <div className="p-4 border rounded-lg shadow-md hover:shadow-xl transition duration-300 bg-white flex justify-between items-start space-x-6">
      
//       {/* Ліва частина: Назва та опис */}
//       <div className="flex-1 min-w-0">
//         <h3 className="text-2xl font-bold mb-2 text-blue-700">{title}</h3>
//         <p className="text-gray-600 mb-4 line-clamp-3 overflow-hidden text-sm md:text-base">
//           {description}
//         </p>
//       </div>

//       {/* Права частина: Метадані та кнопки */}
//       <div className="w-64 flex flex-col items-start justify-between space-y-3 pt-1 min-w-[250px]">
//         <div className="text-sm text-gray-700 space-y-1 w-full">
          
//           {/* Відображаємо відформатовану тривалість */}
//           <p className="flex justify-between w-full">
//             <span className="font-semibold text-gray-800">Duration:</span>
//             <span className="font-medium">{formattedDuration}</span>
//           </p>
          
//           {/* Відображаємо відформатовану дату */}
//           <p className="flex justify-between w-full">
//             <span className="font-semibold text-gray-800">Created:</span>
//             <span className="font-medium">{formattedDate}</span>
//           </p>
          
//           {/* Відображаємо список авторів */}
//           <p className="flex flex-col items-start w-full mt-2">
//             <span className="font-semibold text-gray-800 mb-1">Authors:</span>
//             <span className="text-gray-600 text-xs italic break-words w-full">{authorsText}</span>
//           </p>
//         </div>

//         {/* Кнопки Show Course та Delete */}
//         <div className="flex space-x-2 mt-4 self-end">
//           <button 
//             onClick={onShow}
//             className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-150 text-sm"
//           >
//             Show Course
//           </button>
//           <button 
//             onClick={onDelete}
//             className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-150 text-sm"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;

import React from 'react';
import { formatDuration, formatCreationDate } from '../../utils/formatters';

interface CourseCardProps {
  id: string | number;
  title: string;
  description: string;
  duration: number;
  authors: string[]; 
  creationDate: string; 
  onShow?: () => void;
  onDelete?: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  title, 
  description, 
  duration, 
  authors, 
  creationDate,
  onShow, 
  onDelete, 
}) => {
  const formattedDuration = formatDuration(duration);
  const formattedDate = formatCreationDate(creationDate);
  const authorsText = authors && authors.length > 0 ? authors.join(', ') : 'No authors';

  return (
    <div className="p-4 border rounded-lg shadow-md hover:shadow-xl transition duration-300 bg-white flex justify-between items-start space-x-6">
      <div className="flex-1 min-w-0">
        <h3 className="text-2xl font-bold mb-2 text-blue-700">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3 overflow-hidden text-sm md:text-base">
          {description}
        </p>
      </div>

      <div className="w-64 flex flex-col items-start justify-between space-y-3 pt-1 min-w-[250px]">
        <div className="text-sm text-gray-700 space-y-1 w-full">
          <p className="flex justify-between w-full">
            <span className="font-semibold text-gray-800">Duration:</span>
            <span className="font-medium">{formattedDuration}</span>
          </p>

          <p className="flex justify-between w-full">
            <span className="font-semibold text-gray-800">Created:</span>
            <span className="font-medium">{formattedDate}</span>
          </p>

          <p className="flex flex-col items-start w-full mt-2">
            <span className="font-semibold text-gray-800 mb-1">Authors:</span>
            <span className="text-gray-600 text-xs italic break-words w-full">{authorsText}</span>
          </p>
        </div>

        <div className="flex space-x-2 mt-4 self-end">
          <button 
            onClick={onShow}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-150 text-sm"
          >
            Show Course
          </button>
          <button 
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-150 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
