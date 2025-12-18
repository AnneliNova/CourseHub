import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const hideHeader =
    location.pathname === '/login' || location.pathname === '/registration';

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header>
      {!hideHeader && (
        <div>
          {token ? (
            <>
              {user.name && <span>{user.name}</span>}
              <button data-testid="logout" onClick={logout}>
                LOGOUT
              </button>
            </>
          ) : (
            <Link to="/login">
              <button>LOGIN</button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
