import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';

const navLinkClass = ({ isActive }) => (isActive ? 'is-active' : undefined);

export default function AuthenticatedLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <div className="app-shell">
      {mobileOpen && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close navigation menu"
          onClick={closeMobile}
        />
      )}

      <aside
        className={`app-sidebar${mobileOpen ? ' is-open' : ''}`}
        aria-label="Application navigation"
        id="app-sidebar"
      >
        <div className="sidebar-top">
          <Link to="/dashboard" className="sidebar-brand" onClick={closeMobile}>
            <img
              src={`${import.meta.env.BASE_URL}images/logo2.jpg`}
              alt="WorkBuddy logo"
              className="logo-img sidebar-logo"
              width="48"
              height="48"
            />
            <div>
              <h1 className="sidebar-title">WorkBuddy</h1>
            </div>
          </Link>

          <nav className="sidebar-nav">
            <NavLink to="/dashboard" end className={navLinkClass} onClick={closeMobile}>
              Dashboard
            </NavLink>
            <NavLink to="/tasks" className={navLinkClass} onClick={closeMobile}>
              Tasks
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-bottom">
          {user?.name && <p className="sidebar-user-name">{user.name}</p>}
          <Button variant="secondary" block onClick={handleLogout}>
            Log Out
          </Button>
        </div>
      </aside>

      <div className="app-shell-main">
        <div className="app-shell-toolbar">
          <button
            type="button"
            className="sidebar-toggle"
            aria-expanded={mobileOpen}
            aria-controls="app-sidebar"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
