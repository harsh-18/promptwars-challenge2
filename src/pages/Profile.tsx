import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, User, MapPin, Phone, MessageSquare, AlertCircle } from 'lucide-react';

export function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(user?.displayName || '');
  const [country, setCountry] = useState(user?.country || 'India');
  const [state, setState] = useState(user?.state || '');
  const [ageGroup, setAgeGroup] = useState(user?.ageGroup || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [bio, setBio] = useState(user?.bio || '');

  if (!user) {
    return (
      <div className="card" style={{ maxWidth: '600px', margin: '3rem auto', textAlign: 'center', padding: '3rem' }}>
        <AlertCircle size={48} color="var(--color-primary)" style={{ margin: '0 auto 1rem auto' }} />
        <h2>Not Authenticated</h2>
        <p style={{ color: 'var(--color-text-light)' }}>Please log in to view and edit your profile details.</p>
      </div>
    );
  }

  // Calculate profile completeness
  let completeness = 0;
  if (user.displayName) completeness += 15;
  if (user.email) completeness += 15;
  if (user.country) completeness += 15;
  if (user.state) completeness += 15;
  if (user.ageGroup) completeness += 15;
  if (user.gender) completeness += 10;
  if (user.phoneNumber) completeness += 15;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      displayName: name,
      country,
      state,
      ageGroup,
      gender,
      phoneNumber,
      bio
    });
    setIsEditing(false);
  };

  const indiaStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

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
    <div className="card" style={{ maxWidth: '750px', margin: '2rem auto', padding: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src={user.photoURL} alt="Profile initials" style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid var(--color-primary)' }} />
          <div>
            <h2 style={{ margin: 0 }}>{user.displayName}</h2>
            <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.9rem' }}>{user.email}</p>
          </div>
        </div>

        <div style={{ flexBasis: '220px' }}>
          <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', margin: '0.5rem 0' }}>
            <div style={{ width: `${completeness}%`, height: '100%', backgroundColor: 'var(--color-primary)', transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span>Profile Completeness</span>
            <span style={{ fontWeight: 700 }}>{completeness}%</span>
          </div>
        </div>
      </div>

      {!isEditing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <ShieldCheck color="var(--color-primary)" size={20} />
              <div>
                <small style={{ display: 'block', color: 'var(--color-text-light)' }}>Country</small>
                <strong>{user.country || 'Not provided'}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <MapPin color="var(--color-primary)" size={20} />
              <div>
                <small style={{ display: 'block', color: 'var(--color-text-light)' }}>State or Union Territory</small>
                <strong>{user.state || 'Not provided'}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <User color="var(--color-primary)" size={20} />
              <div>
                <small style={{ display: 'block', color: 'var(--color-text-light)' }}>Age Group</small>
                <strong>{user.ageGroup || 'Not provided'}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <User color="var(--color-primary)" size={20} />
              <div>
                <small style={{ display: 'block', color: 'var(--color-text-light)' }}>Gender</small>
                <strong>{user.gender || 'Not provided'}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Phone color="var(--color-primary)" size={20} />
              <div>
                <small style={{ display: 'block', color: 'var(--color-text-light)' }}>Phone</small>
                <strong>{user.phoneNumber || 'Not provided'}</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', backgroundColor: '#fafafa', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
            <MessageSquare color="var(--color-primary)" size={20} style={{ flexShrink: 0, marginTop: '0.2rem' }} />
            <div>
              <small style={{ display: 'block', color: 'var(--color-text-light)', marginBottom: '0.25rem' }}>Voter Bio / Description</small>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>{user.bio || 'Add a short description about yourself...'}</p>
            </div>
          </div>

          <button onClick={() => setIsEditing(true)} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.75rem 1.5rem', marginTop: '0.5rem' }}>
            Edit Profile Details
          </button>
        </div>
      ) : (
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Residency Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: '#fff' }}
              >
                <option value="India">India</option>
                <option value="United States">United States</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>State or UT</label>
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

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Age Group</label>
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

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Gender</label>
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

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Short Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us a little more about yourself..."
              style={{ width: '100%', padding: '0.75rem', height: '80px', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: '#fff', fontFamily: 'inherit' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem' }}>Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
}
