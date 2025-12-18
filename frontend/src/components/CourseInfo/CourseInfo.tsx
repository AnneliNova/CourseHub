// import { useParams, useNavigate } from "react-router-dom";
// import CourseCard from "../Courses/CourseCard.tsx"

// export default function CourseInfo() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const course = CourseCard.find((c) => c.id === Number(id));

//   if (!course) return <p>Course not found</p>;

//   return (
//     <div className="p-8">
//       <h1 data-testid="course-title" className="text-3xl font-bold mb-4">
//         {course.title}
//       </h1>

//       {/* ТЕСТ хоче duration */}
//       <p>{course.duration}</p>

//       <button
//         data-testid="back-button"
//         onClick={() => navigate(-1)}
//         className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
//       >
//         Back
//       </button>
//     </div>
//   );
// }




// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { MOCKED_COURSES_LIST } from '../../mocks/index.ts';
// import { formatDuration } from '../../utils/formatters.ts';
// import { Link } from 'react-router-dom';

// export default function CourseInfo() {
//   const { courseId } = useParams<{ courseId: string }>();

//   const course = MOCKED_COURSES_LIST.find((c) => c.id === courseId);

//   if (!course) return <p>Course not found</p>;

//   return (
//     <div className="p-8">
//       <h1 data-testid="course-title" className="text-3xl font-bold mb-4">
//         {course.title}
//       </h1>

//       <p data-testid="course-duration" className="mb-4">
//         {formatDuration(course.duration)}
//       </p>

//       <Link to="/courses" data-testid="mock-link" className="inline-block">
//         <button
//           data-testid="back-button"
//           className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
//         >
//           Back
//         </button>
//       </Link>
//     </div>
//   );
// }


import { useParams, Link } from 'react-router-dom';
import { MOCKED_COURSES_LIST } from '../../mocks/index.ts';

export default function CourseInfo() {
  const { courseId } = useParams();

  const course = MOCKED_COURSES_LIST.find(
    (c) => String(c.id) === String(courseId)
  );

  if (!course) return <p>Course not found</p>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>

      <Link data-testid="mock-link" to="/courses">
        Back
      </Link>
    </div>
  );
}
