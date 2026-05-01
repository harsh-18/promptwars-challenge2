import { Link } from 'react-router-dom';
import { Landmark, Info, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" className="header-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
        <Landmark size={24} color="var(--color-primary)" />
        CivicGuide
      </Link>
      <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <Link to="/">Home</Link>
        <Link to="/assistant">Assistant</Link>
        <Link to="/journey">Journey</Link>
        <Link to="/glossary">Glossary</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/trust" title="Trust Center">
          <Info size={20} />
        </Link>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to="/profile" title="View Profile" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img src={user.photoURL} alt={user.displayName} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--color-primary)' }} />
            </Link>
            <button onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }} title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none', color: 'var(--color-primary)', fontWeight: 500 }}>
            <LogIn size={18} /> Login
          </Link>
        )}
      </nav>
    </header>
  );
}
