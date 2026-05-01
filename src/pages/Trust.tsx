
import { ShieldCheck, Lock, Scale, Award } from 'lucide-react';

export function Trust() {
  return (
    <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldCheck color="var(--color-primary)" /> CivicGuide Trust & Privacy Center
        </h2>
        <p style={{ margin: 0, color: 'var(--color-text-light)' }}>
          We are committed to providing reliable, unbiased, and secure tools to every voter.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ padding: '1.25rem', border: '1px solid var(--color-border)', borderRadius: '8px', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Lock size={28} color="var(--color-primary)" />
          <h3 style={{ margin: 0 }}>Privacy by Design</h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-light)', lineHeight: 1.5 }}>
            We do not collect or store any sensitive Personally Identifiable Information (PII) such as your real name, EPIC number, address, or phone number.
          </p>
        </div>

        <div style={{ padding: '1.25rem', border: '1px solid var(--color-border)', borderRadius: '8px', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Scale size={28} color="var(--color-primary)" />
          <h3 style={{ margin: 0 }}>Strict Nonpartisanship</h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-light)', lineHeight: 1.5 }}>
            Our AI engine filters out political biases. It only answers operational questions regarding the electoral process.
          </p>
        </div>

        <div style={{ padding: '1.25rem', border: '1px solid var(--color-border)', borderRadius: '8px', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Award size={28} color="var(--color-primary)" />
          <h3 style={{ margin: 0 }}>Source Integrity</h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-light)', lineHeight: 1.5 }}>
            Every answer is strictly grounded in directly referenced documentation from the Election Commission of India (ECI).
          </p>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>Sustainable Operations & Open Core Model</h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          CivicGuide is launched under the **Apache 2.0 license** for the hackathon to guarantee code accessibility. As we expand to the App Store and Google Play Store, we will incorporate premium subscription tiers for advanced notifications, local polling warnings, and exclusive membership benefits.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ flex: 1, minWidth: '220px', padding: '1rem', borderRadius: '6px', borderLeft: '4px solid #10b981', backgroundColor: '#f0fdf4' }}>
            <h4 style={{ margin: '0 0 0.25rem 0', color: '#065f46' }}>Open & Free Access</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#047857' }}>All current tools are open to the public without registration or charge.</p>
          </div>
          <div style={{ flex: 1, minWidth: '220px', padding: '1rem', borderRadius: '6px', borderLeft: '4px solid #3b82f6', backgroundColor: '#eff6ff' }}>
            <h4 style={{ margin: '0 0 0.25rem 0', color: '#1e40af' }}>Subscription Upgrades</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#1d4ed8' }}>Future tiers will introduce custom local ballot alerts and mobile app priority features.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
