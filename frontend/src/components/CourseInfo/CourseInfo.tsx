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
