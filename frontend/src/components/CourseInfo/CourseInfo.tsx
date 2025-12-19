import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatCreationDate, formatDuration } from '../../utils/formatters';
import { apiJson, authHeaders } from '../../config/api';
import { isAdmin as isAdminStored } from '../../config/user';

type Course = {
  id: string;
  title: string;
  description: string;
  duration: number;
  creationDate: string;
  authors: string[]; // author IDs
};

type Author = {
  id: string;
  name: string;
};

type CourseResponse =
  | { successful: true; result: Course }
  | { successful: false; result?: string; message?: string };

type AuthorsResponse =
  | { successful: true; result: Author[] }
  | { successful: false; result?: string; message?: string };

export default function CourseInfo() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isAdmin = useMemo(() => isAdminStored(), []);

  useEffect(() => {
    const load = async () => {
      if (!courseId) {
        setError('Course id is missing.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const courseRes = await apiJson<CourseResponse>(`/courses/${courseId}`, {
          method: 'GET',
          headers: authHeaders(),
        });

        if (!courseRes.ok || courseRes.data?.successful === false) {
          const msg =
            courseRes.data?.message ||
            courseRes.data?.result ||
            `Failed to load course (${courseRes.status})`;
          throw new Error(msg);
        }

        const loadedCourse: Course = (courseRes.data as any)?.result ?? null;
        if (!loadedCourse) throw new Error('Course not found.');
        setCourse(loadedCourse);

        const authorsRes = await apiJson<AuthorsResponse>('/authors/all', {
          method: 'GET',
          headers: authHeaders(),
        });

        if (authorsRes.ok && authorsRes.data?.successful !== false) {
          const loadedAuthors: Author[] = Array.isArray(authorsRes.data)
            ? (authorsRes.data as any)
            : (authorsRes.data as any)?.result ?? [];
          setAuthors(loadedAuthors);
        } else {
          setAuthors([]);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [courseId]);

  const authorNames = useMemo(() => {
    if (!course || !authors.length) return [];
    const map = new Map(authors.map((a) => [a.id, a.name]));
    return (course.authors || []).map((id) => map.get(id) || id);
  }, [course, authors]);

  const handleDelete = async () => {
    if (!course) return;

    if (!isAdmin) {
      setError('You are not allowed to delete courses (admin only).');
      return;
    }

    const ok = window.confirm('Delete this course? This action cannot be undone.');
    if (!ok) return;

    const res = await apiJson<any>(`/courses/${course.id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });

    if (!res.ok || res.data?.successful === false) {
      const msg = res.data?.message || res.data?.result || `Delete failed (${res.status}).`;
      setError(msg);
      return;
    }

    navigate('/courses');
  };

  if (loading) {
    return (
      <main>
        <div className="container">
          <div className="card">Loading course…</div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="container">
          <div className="alert alert--error">{error}</div>
          <div style={{ marginTop: 12 }}>
            <Link to="/courses">← Back to courses</Link>
          </div>
        </div>
      </main>
    );
  }

  if (!course) {
    return (
      <main>
        <div className="container">
          <div className="card">Course not found.</div>
          <div style={{ marginTop: 12 }}>
            <Link to="/courses">← Back to courses</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container">
        <div className="courseinfo-head">
          <div>
            <h1 className="courseinfo-title">{course.title}</h1>
            <p className="courseinfo-subtitle">
              Created {formatCreationDate(course.creationDate)} • Duration {formatDuration(course.duration)}
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Link className="btn-ghost-link" to="/courses">
              ← Back
            </Link>

            {isAdmin ? (
              <button type="button" className="danger" onClick={handleDelete}>
                Delete
              </button>
            ) : null}
          </div>
        </div>

        <div className="courseinfo-layout">
          <section className="card courseinfo-main">
            <h2 className="section-title">Description</h2>
            <p className="courseinfo-description">{course.description}</p>
          </section>

          <aside className="card courseinfo-side">
            <h2 className="section-title">Details</h2>

            <div className="kv">
              <div className="kv-row">
                <div className="kv-key">Course ID</div>
                <div className="kv-value">{course.id}</div>
              </div>
              <div className="kv-row">
                <div className="kv-key">Creation date</div>
                <div className="kv-value">{formatCreationDate(course.creationDate)}</div>
              </div>
              <div className="kv-row">
                <div className="kv-key">Duration</div>
                <div className="kv-value">{formatDuration(course.duration)}</div>
              </div>
            </div>

            <div style={{ marginTop: 14 }}>
              <div className="kv-key" style={{ marginBottom: 6 }}>
                Authors
              </div>

              {authorNames.length ? (
                <ul className="authors-list">
                  {authorNames.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              ) : (
                <div className="muted">{course.authors?.length ? 'Authors as IDs.' : 'No authors'}</div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
