import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    localStorage.setItem('token', data.result);
    localStorage.setItem('user', JSON.stringify({ name: data.user.name }));

    navigate('/courses');
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={submit}>
        <label>
          Email:
          <input
            data-testid="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            data-testid="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button data-testid="login-button" type="submit">
          Login
        </button>
      </form>

      <Link data-testid="mock-link" to="/registration">
        Registration
      </Link>
    </div>
  );
}
