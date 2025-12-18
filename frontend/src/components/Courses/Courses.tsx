import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';

type Course = {
  id: string | number;
  title: string;
  description: string;
  duration: number;
  authors: string[];
  creationDate: string;
};

export default function Courses() {
  const navigate = useNavigate();

  const token = useMemo(() => localStorage.getItem('token'), []);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await fetch('http://localhost:4000/courses/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: token } : {}),
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to load courses (${res.status})`);
        }

        const data = await res.json();

        // Backend can return either an array or { result: [...] }
        const list: Course[] = Array.isArray(data) ? data : data?.result ?? [];

        setCourses(list);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [token]);

  return (
    <main>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <h1>Courses</h1>

          <button type="button" onClick={() => navigate('/courses/add')}>
            Create course
          </button>
        </div>

        {loading ? (
          <div className="card" style={{ marginTop: 14 }}>
            Loading courses...
          </div>
        ) : null}

        {error ? (
          <div className="alert alert--error" style={{ marginTop: 14 }}>
            {error}
          </div>
        ) : null}

        {!loading && !error && courses.length === 0 ? (
          <div className="card" style={{ marginTop: 14 }}>
            No courses yet.
          </div>
        ) : null}

        <div style={{ display: 'grid', gap: 14, marginTop: 14 }}>
          {courses.map((c) => (
            <CourseCard
              key={c.id}
              id={c.id}
              title={c.title}
              description={c.description}
              duration={c.duration}
              authors={c.authors}
              creationDate={c.creationDate}
              onShow={() => navigate(`/courses/${c.id}`)}
              onDelete={() => {
                // Поки що UI-only
                // тут можна буде викликати DELETE /courses/:id для admin
                alert('Delete action will be implemented later.');
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
