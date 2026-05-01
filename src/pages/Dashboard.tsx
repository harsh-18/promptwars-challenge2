import { Link } from 'react-router-dom';
import { Map, MessageSquare, ClipboardCheck, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Dashboard() {
  const { user } = useAuth();

  // Dynamically calculate profile completeness %
  let completeness = 0;
  if (user) {
    if (user.displayName) completeness += 20;
    if (user.email) completeness += 20;
    if (user.state) completeness += 20;
    if (user.country) completeness += 20;
    if (user.ageGroup) completeness += 20;
  }

  return (
    <div className="dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ flex: '1 1 400px' }}>
          <h1 style={{ marginBottom: '0.5rem' }}>Understand Your Election Journey</h1>
          <p style={{ margin: 0 }}>
            CivicGuide helps you navigate the electoral process with official, nonpartisan information. 
            Whether you're a first-time voter or just need to check your status, we've got you covered.
          </p>
        </div>

        {user && (
          <div className="card" style={{ flex: '1 1 300px', padding: '1.25rem', border: '1px solid var(--color-border)', backgroundColor: '#fafafa', borderLeft: '4px solid var(--color-primary)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 color="var(--color-primary)" size={20} /> Voter Profile Status
            </h4>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', margin: '0.75rem 0 0.5rem 0' }}>
              <div style={{ width: `${completeness}%`, height: '100%', backgroundColor: 'var(--color-primary)', transition: 'width 0.4s ease' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span>Profile completeness</span>
              <span style={{ fontWeight: 700 }}>{completeness}%</span>
            </div>
            {completeness < 100 && (
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: 'var(--color-text-light)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <AlertCircle size={12} color="var(--color-primary)" /> Complete optional details during sign up for a more accurate experience.
              </p>
            )}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <div className="card">
          <h3><Map style={{ verticalAlign: 'middle', marginRight: '0.5rem', color: 'var(--color-primary)' }} /> Where do I start?</h3>
          <p>Get a personalized checklist based on your situation.</p>
          <Link to="/intake" className="btn btn-primary" style={{ marginTop: '1rem' }}>Get Started</Link>
        </div>

        <div className="card">
          <h3><MessageSquare style={{ verticalAlign: 'middle', marginRight: '0.5rem', color: 'var(--color-primary)' }} /> Ask the Assistant</h3>
          <p>Have a specific question about the voting process? Ask our AI assistant.</p>
          <Link to="/assistant" className="btn btn-secondary" style={{ marginTop: '1rem' }}>Ask a Question</Link>
        </div>
        
        <div className="card">
          <h3><ClipboardCheck style={{ verticalAlign: 'middle', marginRight: '0.5rem', color: 'var(--color-primary)' }} /> The Election Journey</h3>
          <p>See all the steps from registration to results.</p>
          <Link to="/journey" className="btn btn-secondary" style={{ marginTop: '1rem' }}>View Steps</Link>
        </div>

        <div className="card">
          <h3><BookOpen style={{ verticalAlign: 'middle', marginRight: '0.5rem', color: 'var(--color-primary)' }} /> Learn the Basics</h3>
          <p>Confused by terms like EVM, VVPAT, or ERO? Check our glossary.</p>
          <Link to="/glossary" className="btn btn-secondary" style={{ marginTop: '1rem' }}>Open Glossary</Link>
        </div>
      </div>
    </div>
  );
}
