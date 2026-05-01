import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateTimeline, TimelineItem, UserProfile } from '../utils/timelineEngine';
import { CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';

export function Timeline() {
  const location = useLocation();
  const navigate = useNavigate();
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  
  // Retrieve profile from location state
  const profile = location.state?.profile as UserProfile | undefined;

  useEffect(() => {
    if (profile) {
      setTimeline(generateTimeline(profile));
    }
  }, [profile]);

  if (!profile) {
    return (
      <div className="card text-center">
        <AlertCircle size={48} style={{ margin: '0 auto', color: 'var(--color-primary)', marginBottom: '1rem' }} />
        <h2>No Profile Data Found</h2>
        <p>Please complete the intake form first to generate your personalized timeline.</p>
        <button onClick={() => navigate('/intake')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Go to Intake Form
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ marginBottom: '2rem' }}>
        <h2>Your Personalized Election Timeline</h2>
        <p>Based on your profile, here are the critical steps you need to take to ensure you are ready for the upcoming elections.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {timeline.map((item, index) => (
          <div key={item.id} style={{
            display: 'flex',
            gap: '1rem',
            padding: '1.5rem',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            backgroundColor: 'var(--color-surface)',
            position: 'relative'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: item.priority === 'high' ? 'var(--color-primary)' : 'var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              {index + 1}
            </div>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {item.title}
                {item.form && (
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.5rem',
                    backgroundColor: 'rgba(26, 115, 232, 0.1)',
                    color: 'var(--color-primary)',
                    borderRadius: '4px'
                  }}>
                    {item.form}
                  </span>
                )}
              </h3>
              <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem' }}>{item.description}</p>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                <span><strong>Deadline:</strong> {item.deadline}</span>
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none' }}>
                    Official Portal <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'rgba(26, 115, 232, 0.05)', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} color="var(--color-primary)" /> Next Steps
        </h4>
        <p style={{ margin: 0, fontSize: '0.95rem' }}>
          Save this timeline or check back regularly. If you have questions about specific forms, use our AI Assistant.
        </p>
      </div>
    </div>
  );
}
