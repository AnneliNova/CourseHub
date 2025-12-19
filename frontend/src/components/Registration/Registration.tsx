import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiJson } from '../../config/api';

type RegisterResponse =
  | { successful: true; result: string }
  | { successful: false; result?: string; message?: string };

export default function Registration() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const { ok, status, data } = await apiJson<RegisterResponse>('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || null,
          email: email.trim(),
          password,
        }),
      });

      if (!ok || (data as any)?.successful === false) {
        const msg =
          (data as any)?.message ||
          (data as any)?.result ||
          (status === 400 ? 'Invalid registration data.' : `Registration failed (${status}).`);
        setError(msg);
        return;
      }

      setSuccess('Account created! You can log in now.');
      setTimeout(() => navigate('/login'), 600);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="auth-page">
        <h2 className="auth-title auth-title--fancy">Registration</h2>

        <form className="auth-card" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Optional"
            />
          </label>

          <label>
            Email:
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password:
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Creating…' : 'Create account'}
          </button>

          {error ? <div className="alert alert--error">{error}</div> : null}
          {success ? <div className="alert alert--success">{success}</div> : null}

          <div className="auth-footer auth-footer--aligned">
            <span>Already have an account?</span>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
