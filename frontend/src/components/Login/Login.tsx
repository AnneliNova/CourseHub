import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiJson, authHeaders } from '../../config/api';
import { setStoredUser } from '../../config/user';

type LoginResponse =
  | { successful: true; result: string; user?: { name?: string; email?: string } }
  | { successful: false; result?: string; message?: string };

type MeResponse =
  | { successful: true; result: { id: string; name: string | null; email: string; role: string } }
  | { successful: false; result?: string; message?: string };

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { ok, status, data } = await apiJson<LoginResponse>('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!ok || (data as any)?.successful === false) {
        const statusBased =
          status === 400 || status === 401 ? 'Invalid email or password.' : `Login failed (${status}).`;
        const msg = (data as any)?.message || (data as any)?.result || statusBased;
        setError(msg);
        return;
      }

      const token = (data as any)?.result;
      if (!token) {
        setError('Login failed: token was not returned by the server.');
        return;
      }

      localStorage.setItem('token', token);

      // Try to load /users/me to get role (admin/user). If fails — still allow login.
      try {
        const me = await apiJson<MeResponse>('/users/me', {
          method: 'GET',
          headers: authHeaders(),
        });

        if (me.ok && (me.data as any)?.successful !== false && (me.data as any)?.result) {
          const u = (me.data as any).result;
          setStoredUser({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
          });
        } else {
          // fallback to login payload user (may not include role)
          const u = (data as any)?.user;
          if (u) setStoredUser({ name: u.name, email: u.email });
        }
      } catch {
        const u = (data as any)?.user;
        if (u) setStoredUser({ name: u.name, email: u.email });
      }

      navigate('/courses');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="auth-page">
        <h2 className="auth-title auth-title--fancy">Login</h2>

        <form className="auth-card" onSubmit={handleSubmit}>
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
              autoComplete="current-password"
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </button>

          {error ? <div className="alert alert--error">{error}</div> : null}

          <div className="auth-footer auth-footer--aligned">
            <span>Don’t have an account?</span>
            <Link to="/registration">Registration</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
