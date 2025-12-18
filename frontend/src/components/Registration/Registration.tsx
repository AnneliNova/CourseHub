import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Registration() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    navigate('/login');
  };

  return (
    <div>
      <h2>Registration</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            id="name"
            data-testid="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email:
          <input
            id="email"
            data-testid="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            id="password"
            data-testid="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button data-testid="mock-button" type="submit">
        Register
        </button>
      </form>

      <Link data-testid="mock-link" to="/login">
        Login
      </Link>
    </div>
  );
}
