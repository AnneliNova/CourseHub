import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearAuth, getStoredUser } from '../../config/user';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const hideHeader =
    location.pathname === '/login' || location.pathname === '/registration';

  const token = localStorage.getItem('token');
  const user = getStoredUser();

  const logout = () => {
    clearAuth();
    navigate('/login');
  };

  if (hideHeader) return null;

  return (
    <header className="app-header">
      <div className="header-inner">
        <Link className="logo" to="/courses" aria-label="CourseHub home">
          Course<span>Hub</span>
        </Link>

        <div className="header-right">
          {token ? (
            <>
              <div className="user-info">
                <div className="user-name">{user?.name || user?.email || 'User'}</div>
                <div className="user-role">{user?.role || 'user'}</div>
              </div>

              <button className="logout-btn" data-testid="logout" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button type="button">Login</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
