import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Compass, CheckCircle2, MapPin, Search } from 'lucide-react';

interface JourneyStep {
  id: string;
  stage: string;
  title: string;
  description: string;
  action: string;
  link?: string;
  linkText?: string;
}

const INDIA_STEPS: JourneyStep[] = [
  {
    id: 'in1',
    stage: '1. Pre-Election Phase',
    title: 'Electoral Roll Registration (India)',
    description: 'Continuous updating of voter records via Electoral Registration Officers. Eligible citizens submit Form 6 to register as first-time voters or update existing voter card information.',
    action: 'Register online or check your name on the electoral roll.',
    link: 'https://voters.eci.gov.in',
    linkText: 'Check ECI Services'
  },
  {
    id: 'in2',
    stage: '2. Election Announcement',
    title: 'Model Code of Conduct (MCC)',
    description: 'The Election Commission of India (ECI) announces key dates for filing and polling. The MCC strictly governs election campaigns and official party announcements.',
    action: 'Observe local campaigning guidelines and ethical voting practices.',
    link: 'https://eci.gov.in',
    linkText: 'Read ECI Press Notes'
  },
  {
    id: 'in3',
    stage: '3. Nomination & Campaign',
    title: 'Candidate Information Review',
    description: 'Voters can view public sworn affidavits of candidates detailing assets, educational qualifications, and criminal history for transparent decision-making.',
    action: 'Download candidate information affidavits.',
    link: 'https://affidavit.eci.gov.in',
    linkText: 'Search Affidavits'
  },
  {
    id: 'in4',
    stage: '4. Polling Day',
    title: 'Voting at the Polling Booth',
    description: 'Voters visit their assigned polling booth in India. Officers check voter IDs (Voter ID, Aadhaar, Passport) and issue a printed VVPAT slip upon button press.',
    action: 'Locate your booth on the map, bring your valid ID, and vote.',
    link: 'https://voters.eci.gov.in',
    linkText: 'Locate Polling Station'
  },
  {
    id: 'in5',
    stage: '5. Counting & Results',
    title: 'Declaration of Results',
    description: 'EVMs and VVPATs are securely opened and counted under the eyes of party agents. Public live results are broadcast in real-time.',
    action: 'Monitor live election counting updates on the official portal.',
    link: 'https://results.eci.gov.in',
    linkText: 'View Official Results'
  }
];

const USA_STEPS: JourneyStep[] = [
  {
    id: 'us1',
    stage: '1. Voter Registration (USA)',
    title: 'Register & Review Deadlines',
    description: 'Eligible citizens verify their details with their state board of elections. Specific state deadlines apply for mail-in, online, or in-person registration.',
    action: 'Register to vote or update registration info.',
    link: 'https://vote.gov',
    linkText: 'Register on Vote.gov'
  },
  {
    id: 'us2',
    stage: '2. Early & Absentee Voting',
    title: 'Requesting Mail-in Ballots',
    description: 'Voters can request an absentee ballot or review regional early voting dates to cast their vote prior to Election Day in person.',
    action: 'Verify your absentee/early voting deadlines.',
    link: 'https://www.usa.gov/absentee-voting',
    linkText: 'Check Absentee Status'
  },
  {
    id: 'us3',
    stage: '3. Ballot Preparation',
    title: 'Review Local Ballots',
    description: 'Voters prepare by downloading sample local ballots to understand current candidates, state initiatives, and down-ballot contests.',
    action: 'Download sample ballot and research local proposals.',
    link: 'https://www.usa.gov/voter-research',
    linkText: 'Research Ballot Details'
  },
  {
    id: 'us4',
    stage: '4. Polling Day',
    title: 'Casting Your Ballot',
    description: 'Citizens vote at assigned local polling places. Valid state forms of identification must be presented in states where ID is required.',
    action: 'Locate your voting site on the map and cast your vote.',
    link: 'https://www.usa.gov/confirm-voter-registration',
    linkText: 'Confirm Your Voter Status'
  },
  {
    id: 'us5',
    stage: '5. Election Night & Beyond',
    title: 'Review Certified Outcomes',
    description: 'Results are compiled across counties and certified by the Secretary of State. Provisional and mail-in ballots are verified.',
    action: 'Track live local and federal election updates.',
    link: 'https://www.fec.gov',
    linkText: 'View FEC Reports'
  }
];

export function Journey() {
  const { user } = useAuth();
  
  // Dynamic switch option right in UI state
  const [selectedCountry, setSelectedCountry] = useState<'India' | 'United States'>(
    (user?.country as 'India' | 'United States') || 'India'
  );
  
  // Interactive Map search parameters
  const [mapQuery, setMapQuery] = useState('');
  const [mapUrl, setMapUrl] = useState<string>('');

  const steps = selectedCountry === 'United States' ? USA_STEPS : INDIA_STEPS;

  // Default coordinate iframes
  const defaultUsIframe = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.18237072528!2d-77.0365298!3d38.8951100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c6de5af6e45b%3A0xc2524522d4885d2a!2sWashington%2C%20DC!5e0!3m2!1sen!2sus!4v1714545367200";
  const defaultInIframe = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9255866761047!2d77.5921869!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167098e98327%3A0x6e2f69e6b7f9ca1e!2sVidhana%20Soudha!5e0!3m2!1sen!2sin!4v1714545564800";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mapQuery.trim()) return;
    const query = encodeURIComponent(mapQuery);
    setMapUrl(`https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`);
  };

  const activeMapSource = mapUrl || (selectedCountry === 'United States' ? defaultUsIframe : defaultInIframe);

  return (
    <div className="card" style={{ maxWidth: '950px', margin: '2rem auto', padding: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.25rem', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Compass color="var(--color-primary)" /> {selectedCountry} Election Journey Timeline
          </h2>
          <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.95rem' }}>
            Dynamic country timeline with search-enabled polling booth mapping support.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)' }}>Country:</span>
          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value as any);
              setMapUrl('');
              setMapQuery('');
            }}
            style={{
              padding: '0.45rem 0.75rem',
              borderRadius: '20px',
              border: '1px solid var(--color-border)',
              backgroundColor: '#fff',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: 'var(--color-text)',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="India">India</option>
            <option value="United States">United States</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Timeline track line */}
          <div style={{
            position: 'absolute',
            left: '20px',
            top: '20px',
            bottom: '20px',
            width: '4px',
            backgroundColor: 'rgba(26, 115, 232, 0.2)',
            zIndex: 0
          }} />

          {steps.map((step) => (
            <div key={step.id} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexShrink: 0,
                boxShadow: 'var(--shadow-sm)'
              }}>
                <CheckCircle2 size={20} />
              </div>

              <div style={{
                flex: 1,
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '1.25rem',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {step.stage}
                </span>
                <h3 style={{ margin: '0.25rem 0 0.5rem 0' }}>{step.title}</h3>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: 'var(--color-text)', lineHeight: 1.45 }}>
                  {step.description}
                </p>
                <div style={{ fontSize: '0.825rem', padding: '0.5rem 0.75rem', backgroundColor: 'rgba(26, 115, 232, 0.05)', borderLeft: '3px solid var(--color-primary)', borderRadius: '0 4px 4px 0', color: 'var(--color-text)', fontWeight: 500, marginBottom: '0.75rem' }}>
                  <strong>Action:</strong> {step.action}
                </div>
                {step.link && (
                  <a href={step.link} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.45rem 1rem', fontSize: '0.8rem', textDecoration: 'none' }}>
                    {step.linkText || 'Learn More'}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div style={{ border: '1px solid var(--color-border)', borderRadius: '12px', overflow: 'hidden', padding: '1.25rem', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <h3 style={{ margin: '0 0 0.35rem 0', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin color="var(--color-primary)" size={20} /> Local Polling Booth Map
            </h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
              Locate polling places, regional election offices, or search specifically for an address.
            </p>
          </div>

          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }} role="search" aria-label="Polling booth search">
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--color-text-light)' }} />
              <input
                type="text"
                placeholder="Search polling booth/address..."
                aria-label="Enter your street address or polling location to search the map"
                value={mapQuery}
                onChange={(e) => setMapQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.6rem 0.6rem 2.25rem',
                  borderRadius: '6px',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
            </div>
            <button type="submit" aria-label="Search map location" className="btn btn-primary" style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}>Search</button>
          </form>

          <div style={{ width: '100%', height: '400px', backgroundColor: '#e2e8f0', borderRadius: '8px', overflow: 'hidden', position: 'relative' }} role="application" aria-label="Interactive map displaying polling booth location">
            <iframe
              src={activeMapSource}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Interactive map of voter polling booth location"
            />
          </div>
          <div style={{ backgroundColor: '#fff', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>Citizen Tip:</h4>
            <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--color-text-light)', lineHeight: 1.4 }}>
              When visiting your polling center on election day, ensure you have multiple valid ID documents (Voter Slip, Aadhaar, Driving License, or state ID).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
