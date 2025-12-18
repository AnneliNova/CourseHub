import { Link, useNavigate, useLocation } from 'react-router-dom';

type User = {
  name?: string;
  email?: string;
  role?: string;
};

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const user: User = JSON.parse(localStorage.getItem('user') || '{}');

  const hideHeader =
    location.pathname === '/login' || location.pathname === '/registration';

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (hideHeader) return null;

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Logo / Brand */}
        <Link to="/courses" className="logo">
          Course<span>Hub</span>
        </Link>

        {/* Right side */}
        <div className="header-right">
          {token && (
            <div className="user-info">
              <div className="user-name">
                {user.name || user.email}
              </div>
              {user.role && (
                <div className="user-role">
                  {user.role}
                </div>
              )}
            </div>
          )}

          {token ? (
            <button
              className="logout-btn"
              data-testid="logout"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button>Login</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
