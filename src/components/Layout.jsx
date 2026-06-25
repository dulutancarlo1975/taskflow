import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';

const navLinkClass = ({ isActive }) => (isActive ? 'is-active' : undefined);

export default function Layout() {
  const { user } = useAuth();

  if (user) {
    return <Outlet />;
  }

  return (
    <>
      <header className="site-header ui-header">
        <div className="header-inner">
          <Link to="/" className="header-brand">
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt="TaskFlow logo"
              className="logo-img"
              width="72"
              height="72"
            />
            <div>
              <h1>TaskFlow</h1>
              <p className="tagline">Intelligent Task Manager</p>
            </div>
          </Link>
          <nav className="site-nav" aria-label="Main navigation">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>
          <div className="header-actions">
            <Button variant="secondary" size="sm" to="/login">
              Log In
            </Button>
            <Button variant="primary" size="sm" to="/register">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <Outlet />

      <footer className="site-footer ui-footer">
        <p>© 2026 JOHN CARLO R. DULUTAN — IT0043 TaskFlow Enterprise Lab (TW291)</p>
        <p>FEU Institute of Technology · React + REST API</p>
      </footer>
    </>
  );
}
