import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';
import { apiJson, authHeaders } from '../../config/api';
import { isAdmin as isAdminStored } from '../../config/user';

type Course = {
  id: string | number;
  title: string;
  description: string;
  duration: number;
  authors: string[]; // author IDs
  creationDate: string;
};

type Author = {
  id: string;
  name: string;
};

type CoursesResponse =
  | { successful: true; result: Course[] }
  | { successful: false; result?: string; message?: string };

type AuthorsResponse =
  | { successful: true; result: Author[] }
  | { successful: false; result?: string; message?: string };

export default function Courses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[]>([]);
  const [authorsMap, setAuthorsMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [query, setQuery] = useState('');
  const [toast, setToast] = useState<string>('');

  const isAdmin = useMemo(() => isAdminStored(), []);

  useEffect(() => {
    const controller = new AbortController();

    const loadAll = async () => {
      try {
        setLoading(true);
        setError('');
        setToast('');

        const headers = authHeaders();

        const [coursesRes, authorsRes] = await Promise.all([
          apiJson<CoursesResponse>('/courses/all', {
            method: 'GET',
            headers,
            signal: controller.signal,
          }),
          apiJson<AuthorsResponse>('/authors/all', {
            method: 'GET',
            headers,
            signal: controller.signal,
          }).catch(() => null),
        ]);

        // courses
        if (!coursesRes.ok || (coursesRes.data as any)?.successful === false) {
          const msg =
            (coursesRes.data as any)?.message ||
            (coursesRes.data as any)?.result ||
            `Failed to load courses (${coursesRes.status})`;
          throw new Error(msg);
        }

        const list: Course[] = Array.isArray(coursesRes.data)
          ? (coursesRes.data as any)
          : (coursesRes.data as any)?.result ?? [];

        setCourses(list);

        // authors (optional)
        if (authorsRes && authorsRes.ok && (authorsRes.data as any)?.successful !== false) {
          const authorList: Author[] = Array.isArray(authorsRes.data)
            ? (authorsRes.data as any)
            : (authorsRes.data as any)?.result ?? [];

          const map: Record<string, string> = {};
          authorList.forEach((a) => {
            map[String(a.id)] = a.name;
          });
          setAuthorsMap(map);
        } else {
          setAuthorsMap({});
        }
      } catch (e) {
        if ((e as any)?.name === 'AbortError') return;
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadAll();
    return () => controller.abort();
  }, []);

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;

    return courses.filter((c) => {
      const hay = `${c.title} ${c.description}`.toLowerCase();
      return hay.includes(q);
    });
  }, [courses, query]);

  const handleDelete = async (courseId: string | number) => {
    if (!isAdmin) {
      setToast('You are not allowed to delete courses (admin only).');
      return;
    }

    const ok = window.confirm('Delete this course? This action cannot be undone.');
    if (!ok) return;

    setToast('');
    setError('');

    const res = await apiJson<any>(`/courses/${courseId}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });

    if (!res.ok || res.data?.successful === false) {
      const msg =
        res.data?.message || res.data?.result || `Delete failed (${res.status}).`;
      setToast(msg);
      return;
    }

    setCourses((prev) => prev.filter((c) => String(c.id) !== String(courseId)));
    setToast('Course deleted.');
  };

  return (
    <main>
      <div className="container">
        <div className="page-head">
          <div className="page-title">
            <h1>Courses</h1>
            <p className="page-subtitle">
              Browse, search, and manage courses.
              {!loading ? <span className="pill">{courses.length} total</span> : null}
            </p>
          </div>

          <div className="page-actions">
            <button type="button" onClick={() => navigate('/courses/add')}>
              Create course
            </button>
          </div>
        </div>

        <div className="toolbar">
          <div className="search">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title or description..."
              aria-label="search courses"
            />
            {query ? (
              <button type="button" className="btn-ghost" onClick={() => setQuery('')}>
                Clear
              </button>
            ) : null}
          </div>

          <div className="toolbar-right">
            {!loading ? (
              <span className="muted">
                Showing <b>{filteredCourses.length}</b>
              </span>
            ) : (
              <span className="muted">Loading…</span>
            )}
          </div>
        </div>

        {toast ? <div className="alert alert--success">{toast}</div> : null}

        {loading ? (
          <div className="grid">
            <div className="skeleton-card" />
            <div className="skeleton-card" />
            <div className="skeleton-card" />
          </div>
        ) : null}

        {error ? <div className="alert alert--error">{error}</div> : null}

        {!loading && !error && filteredCourses.length === 0 ? (
          <div className="empty">
            <div className="empty-card">
              <div className="empty-title">No courses found</div>
              <div className="empty-text">
                {courses.length === 0
                  ? 'There are no courses yet. Create the first one to get started.'
                  : 'Try a different keyword or clear the search.'}
              </div>
              <div className="empty-actions">
                {courses.length === 0 ? (
                  <button type="button" onClick={() => navigate('/courses/add')}>
                    Create course
                  </button>
                ) : (
                  <button type="button" className="btn-ghost" onClick={() => setQuery('')}>
                    Clear search
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {!loading && !error && filteredCourses.length > 0 ? (
          <div className="grid">
            {filteredCourses.map((c) => (
              <CourseCard
                key={c.id}
                id={c.id}
                title={c.title}
                description={c.description}
                duration={c.duration}
                authors={c.authors.map((id) => authorsMap[String(id)] ?? String(id))}
                creationDate={c.creationDate}
                onShow={() => navigate(`/courses/${c.id}`)}
                canDelete={isAdmin}
                onDelete={() => handleDelete(c.id)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
