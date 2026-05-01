import { Link } from 'react-router-dom';
import { Landmark, Info, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header role="banner" className="header-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" aria-label="CivicGuide Home" className="header-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
        <Landmark size={24} color="var(--color-primary)" />
        CivicGuide
      </Link>
      <nav role="navigation" aria-label="Main Navigation" className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <Link to="/" aria-label="Dashboard">Home</Link>
        <Link to="/assistant" aria-label="AI Civic Assistant">Assistant</Link>
        <Link to="/journey" aria-label="Election Journey">Journey</Link>
        <Link to="/glossary" aria-label="Civic Glossary">Glossary</Link>
        <Link to="/quiz" aria-label="Civic Quiz">Quiz</Link>
        <Link to="/trust" title="Trust Center" aria-label="Trust Center and Source Verification">
          <Info size={20} />
        </Link>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link to="/profile" title="View Profile" aria-label="User Profile" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <img src={user.photoURL} alt={`Profile avatar for ${user.displayName}`} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--color-primary)' }} />
            </Link>
            <button 
              onClick={logout} 
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }} 
              title="Logout"
              aria-label="Logout from session"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <Link to="/login" aria-label="User Login" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none', color: 'var(--color-primary)', fontWeight: 500 }}>
            <LogIn size={18} /> Login
          </Link>
        )}
      </nav>
    </header>
  );
}
