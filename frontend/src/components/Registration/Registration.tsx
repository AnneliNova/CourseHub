import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

type RegisterResponse =
  | { successful: true; result?: any; message?: string }
  | { successful: false; result?: string; message?: string };

export default function Registration() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data: RegisterResponse = await res.json().catch(() => ({} as RegisterResponse));

      if (!res.ok || (data as any)?.successful === false) {
        const statusBased =
          res.status === 400 ? 'Registration failed. Please check your data.' : `Registration failed (${res.status}).`;

        const msg = (data as any)?.message || (data as any)?.result || statusBased;
        setError(msg);
        return;
      }

      setSuccess('Account created successfully. You can log in now.');
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
              required
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
            <small className="help">Use at least 6–8 characters.</small>
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Register'}
          </button>

          {error ? <div className="alert alert--error">{error}</div> : null}
          {success ? <div className="alert alert--success">{success}</div> : null}

          <div className="auth-footer">
            <span>Already have an account?</span>
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
