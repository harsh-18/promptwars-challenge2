import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, LogIn, UserPlus, Globe } from 'lucide-react';

export function Login() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('India');
  const [state, setState] = useState('');
  const [ageGroup, setAgeGroup] = useState('18-25');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [firstTimeVoter, setFirstTimeVoter] = useState(false);
  const [movedRecently, setMovedRecently] = useState(false);
  
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Robust comprehensive Disposable email detection list
  const tempMailDomains = [
    'tempmail', 'mailinator', 'trashmail', 'dispostable', 'temp-mail',
    'guerrillamail', 'yopmail', '10minutemail', 'getnada', 'mohmal',
    'generator', 'throwaway', 'burner', 'fake', 'test', 'trash'
  ];

  const validateEmail = (emailStr: string) => {
    const lower = emailStr.toLowerCase();
    // Checks both exact matches and partial domain/substring containment
    return !tempMailDomains.some((domain) => lower.includes(domain));
  };

  const validatePassword = (pwd: string) => {
    // Password requirements: 8+ characters, at least one uppercase, at least one digit
    return pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd);
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Error: Temporary/disposable or test email domains are strictly forbidden to ensure voter security.');
      return;
    }

    if (activeTab === 'signup' && !validatePassword(password)) {
      setError('Error: Your password must be at least 8 characters long, contain at least one uppercase letter, and at least one digit.');
      return;
    }

    if (activeTab === 'signup' && !name.trim()) {
      setError('Full Name is required.');
      return;
    }

    // Save/Login the user profile
    login(email, activeTab === 'signup' ? name : email.split('@')[0], {
      country,
      state,
      ageGroup,
      gender,
      phoneNumber,
      bio,
      firstTimeVoter,
      movedRecently
    });

    navigate('/');
  };

  const handleSocialLogin = (provider: string) => {
    login(`${provider.toLowerCase()}@example.com`, `${provider} User`, {
      country: 'India',
      ageGroup: '25-45'
    });
    navigate('/');
  };

  // Indian States & UTs
  const indiaStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  // US States
  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  return (
    <div className="card" style={{ maxWidth: '650px', margin: '2rem auto', padding: '2.5rem', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <ShieldCheck color="var(--color-primary)" size={52} style={{ margin: '0 auto 0.75rem auto' }} />
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: '1.75rem' }}>Secure Voter Portal</h2>
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', color: 'var(--color-text-light)' }}>
          Authentic Voter Information & Identity Management
        </p>
      </div>

      <div style={{ display: 'flex', borderBottom: '2px solid var(--color-border)', marginBottom: '1.75rem' }}>
        <button
          onClick={() => { setActiveTab('signin'); setError(''); }}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'signin' ? '2px solid var(--color-primary)' : 'none',
            color: activeTab === 'signin' ? 'var(--color-primary)' : 'var(--color-text-light)',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '-2px'
          }}
        >
          Sign In
        </button>
        <button
          onClick={() => { setActiveTab('signup'); setError(''); }}
          style={{
            flex: 1,
            padding: '0.75rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'signup' ? '2px solid var(--color-primary)' : 'none',
            color: activeTab === 'signup' ? 'var(--color-primary)' : 'var(--color-text-light)',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '1rem',
            marginBottom: '-2px'
          }}
        >
          Sign Up / Register
        </button>
      </div>

      {error && (
        <div style={{ padding: '0.75rem 1rem', borderRadius: '6px', backgroundColor: '#fdf2f2', border: '1px solid #f8b4b4', color: '#9b1c1c', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {activeTab === 'signup' && (
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '6px',
                border: '1px solid var(--color-border)',
                outline: 'none'
              }}
            />
          </div>
        )}

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. john@example.com"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
              outline: 'none'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
              outline: 'none'
            }}
          />
          {activeTab === 'signup' && (
            <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.75rem', color: 'var(--color-text-light)' }}>
              Must contain 8+ chars, 1 uppercase, and 1 digit.
            </p>
          )}
        </div>

        {activeTab === 'signup' && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px', backgroundColor: '#fafafa' }}>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Residency Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: '#fff' }}
              >
                <option value="India">India</option>
                <option value="United States">United States</option>
              </select>
            </div>

            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                State or Union Territory
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: '#fff' }}
              >
                <option value="">Select your state...</option>
                {(country === 'India' ? indiaStates : usStates).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Age Group
              </label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: '#fff' }}
              >
                <option value="18-25">18 - 25</option>
                <option value="26-45">26 - 45</option>
                <option value="46-65">46 - 65</option>
                <option value="66+">66+</option>
              </select>
            </div>

            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: '#fff' }}
              >
                <option value="">Select gender...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div style={{ flex: '1 1 100%' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: '#fff' }}
              />
            </div>

            <div style={{ flex: '1 1 100%' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Short Bio / Description
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Describe your voter status or civic interests..."
                style={{ width: '100%', padding: '0.75rem', height: '80px', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: '#fff', fontFamily: 'inherit' }}
              />
            </div>

            <div style={{ flex: '1 1 100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={firstTimeVoter}
                  onChange={(e) => setFirstTimeVoter(e.target.checked)}
                />
                First-time voter
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={movedRecently}
                  onChange={(e) => setMovedRecently(e.target.checked)}
                />
                Moved recently to a new address
              </label>
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.85rem', marginTop: '0.5rem' }}>
          {activeTab === 'signin' ? <LogIn size={18} /> : <UserPlus size={18} />}
          {activeTab === 'signin' ? 'Sign In Securely' : 'Complete Registration'}
        </button>
      </form>

      <div style={{ margin: '1.75rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)' }}>or Quick Skip via Social Login</span>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
        <button onClick={() => handleSocialLogin('Google')} className="btn" style={{ padding: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 600, borderRadius: '6px', cursor: 'pointer' }}>
          <Globe size={18} /> Google
        </button>
        <button onClick={() => handleSocialLogin('GitHub')} className="btn" style={{ padding: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 600, borderRadius: '6px', cursor: 'pointer' }}>
          <Globe size={18} /> GitHub
        </button>
      </div>
    </div>
  );
}
