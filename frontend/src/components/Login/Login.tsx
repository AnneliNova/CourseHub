import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

type LoginResponse =
  | { successful: true; result: string; user?: { name?: string; email?: string } }
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
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await res.json().catch(() => ({} as LoginResponse));

      if (!res.ok || (data as any)?.successful === false) {
        const statusBased =
          res.status === 400 || res.status === 401
            ? 'Invalid email or password.'
            : `Login failed (${res.status}).`;

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

      const user = (data as any)?.user;
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
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
            {/* <small className="help"> email.</small> */}
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
            {loading ? 'Logging in...' : 'Login'}
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
