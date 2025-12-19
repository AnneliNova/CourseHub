import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorItem from './components/AuthorItem/AuthorItem';
import { apiJson, authHeaders } from '../../config/api';
import { isAdmin as isAdminStored } from '../../config/user';

type Author = {
  id: string;
  name: string;
};

type ApiResponse<T> =
  | { successful: true; result: T }
  | { successful: false; result?: string; message?: string };

export default function CreateCourse() {
  const navigate = useNavigate();
  const isAdmin = useMemo(() => isAdminStored(), []);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState<number>(60);

  const [authors, setAuthors] = useState<Author[]>([]);
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<string[]>([]);

  const [loadingAuthors, setLoadingAuthors] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    const loadAuthors = async () => {
      setError('');
      setLoadingAuthors(true);

      try {
        const res = await apiJson<ApiResponse<Author[] | string>>('/authors/all', {
          method: 'GET',
          headers: authHeaders(),
        });

        if (!res.ok || (res.data as any)?.successful === false) {
          const msg =
            (res.data as any)?.message ||
            (res.data as any)?.result ||
            `Failed to load authors (${res.status})`;
          setError(msg);
          setAuthors([]);
          return;
        }

        const list = Array.isArray((res.data as any).result) ? ((res.data as any).result as Author[]) : [];
        setAuthors(list);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Network error while loading authors');
      } finally {
        setLoadingAuthors(false);
      }
    };

    loadAuthors();
  }, []);

  const toggleAuthor = (id: string) => {
    setSelectedAuthorIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const validate = () => {
    if (!isAdmin) return 'Only admin can create courses.';
    if (!title.trim()) return 'Title is required.';
    if (!description.trim()) return 'Description is required.';
    if (!duration || Number.isNaN(duration) || duration <= 0) return 'Duration must be a positive number.';
    if (!selectedAuthorIds.length) return 'Please select at least one author.';
    return '';
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);

    try {
      const res = await apiJson<ApiResponse<any>>('/courses/add', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          duration: Number(duration),
          authors: selectedAuthorIds,
        }),
      });

      if (!res.ok || (res.data as any)?.successful === false) {
        const msg =
          (res.data as any)?.message ||
          (res.data as any)?.result ||
          `Failed to create course (${res.status})`;
        setError(msg);
        return;
      }

      setSuccess('Course created successfully!');
      setTimeout(() => navigate('/courses'), 600);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Network error while saving course');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main>
      <div className="container" style={{ paddingTop: 18, paddingBottom: 32 }}>
        <div className="page-head">
          <div className="page-title">
            <h1>Create New Course</h1>
            <p className="page-subtitle">Fill in course details and select authors.</p>
          </div>

          <div className="page-actions">
            <button type="button" className="btn-ghost" onClick={() => navigate('/courses')}>
              ← Back
            </button>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'grid', gap: 12 }}>
            {!isAdmin ? (
              <div className="alert alert--error">Only admin can create courses.</div>
            ) : null}

            <div style={{ display: 'grid', gap: 6 }}>
              <label htmlFor="title" style={{ fontWeight: 600 }}>
                Title
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. React for Beginners"
                disabled={!isAdmin}
              />
            </div>

            <div style={{ display: 'grid', gap: 6 }}>
              <label htmlFor="description" style={{ fontWeight: 600 }}>
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short course overview..."
                rows={4}
                disabled={!isAdmin}
              />
            </div>

            <div style={{ display: 'grid', gap: 6, maxWidth: 240 }}>
              <label htmlFor="duration" style={{ fontWeight: 600 }}>
                Duration (minutes)
              </label>
              <input
                id="duration"
                type="number"
                min={1}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                disabled={!isAdmin}
              />
            </div>

            <div style={{ display: 'grid', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ fontWeight: 600 }}>Authors</div>
                {loadingAuthors ? <span style={{ fontSize: 13, opacity: 0.75 }}>Loading…</span> : null}
              </div>

              {!loadingAuthors && authors.length === 0 ? (
                <div style={{ fontSize: 14, opacity: 0.8 }}>
                  No authors found.
                </div>
              ) : null}

              <div className="authors-box">
                {authors.map((a) => (
                  <AuthorItem
                    key={a.id}
                    id={a.id}
                    name={a.name}
                    checked={selectedAuthorIds.includes(a.id)}
                    onToggle={toggleAuthor}
                  />
                ))}
              </div>
            </div>

            {error ? <div className="alert alert--error">{error}</div> : null}
            {success ? <div className="alert alert--success">{success}</div> : null}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
              <button type="button" className="btn-ghost" onClick={() => navigate('/courses')} disabled={saving}>
                Cancel
              </button>

              <button type="button" onClick={handleSave} disabled={saving || !isAdmin}>
                {saving ? 'Saving…' : 'Save Course'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
