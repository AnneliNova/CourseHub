// import React from 'react';

// const CreateCourse: React.FC = () => {
//   return (
//     <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-gray-100">
//       <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Course</h1>
//       <p className="text-gray-600 mb-4">This is a placeholder for the course creation form.</p>
      
//       <div className="border p-4 rounded-lg bg-gray-50" data-testid="create-course-component">
//         <p className="text-gray-500 italic">Course form will be implemented here.</p>
//         <button 
//           className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
//         >
//           Save Course
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateCourse;

import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
