import { useEffect, useState } from 'react';
import CourseCard from './CourseCard';

type Course = {
  id: string;
  title: string;
  description: string;
  duration: number;
  creationDate: string;
  authors: string[];
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('http://localhost:4000/courses/all');
        if (!res.ok) throw new Error('Failed to load courses');

        const data = await res.json();
        setCourses(Array.isArray(data) ? data : data.result ?? []);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      }
    };

    load();
  }, []);

  return (
    <main>
      <div className="container">
        <h1>Courses</h1>

        {error ? <div className="alert alert--error">{error}</div> : null}

        {courses.length === 0 && !error ? <div className="card">No courses yet.</div> : null}

        <div className="grid">
          {courses.map((c) => (
            <div className="col-6" key={c.id}>
              <CourseCard course={c as any} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
