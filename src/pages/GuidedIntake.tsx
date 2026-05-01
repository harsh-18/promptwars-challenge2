import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, CheckSquare } from 'lucide-react';

export function GuidedIntake() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: 'India',
    state: '',
    ageGroup: '',
    firstTimeVoter: false,
    movedRecently: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/timeline', { state: { profile: formData } });
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
    <div className="card" style={{ maxWidth: '650px', margin: '2rem auto', padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <Compass color="var(--color-primary)" size={32} />
        <div>
          <h2 style={{ margin: 0 }}>Personalize Your Journey</h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
            We do not collect sensitive data like your name, ID number, or exact address.
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>Your Country of Residence</label>
          <select 
            value={formData.country}
            onChange={(e) => setFormData({...formData, country: e.target.value, state: ''})}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none' }}
            required
          >
            <option value="India">India</option>
            <option value="United States">United States</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>State or Union Territory</label>
          <select 
            value={formData.state}
            onChange={(e) => setFormData({...formData, state: e.target.value})}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none' }}
            required
          >
            <option value="">Select a state...</option>
            {(formData.country === 'India' ? indiaStates : usStates).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>Age Group</label>
          <select 
            value={formData.ageGroup}
            onChange={(e) => setFormData({...formData, ageGroup: e.target.value})}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--color-border)', outline: 'none' }}
            required
          >
            <option value="">Select age group...</option>
            <option value="under_18">Under 18</option>
            <option value="18_to_25">18 - 25</option>
            <option value="26_to_45">26 - 45</option>
            <option value="46_to_65">46 - 65</option>
            <option value="66_plus">66+</option>
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1rem', backgroundColor: '#fafafa', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={formData.firstTimeVoter}
              onChange={(e) => setFormData({...formData, firstTimeVoter: e.target.checked})}
            />
            I am a first-time voter
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={formData.movedRecently}
              onChange={(e) => setFormData({...formData, movedRecently: e.target.checked})}
            />
            I moved recently to a new address
          </label>
        </div>

        <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.85rem', fontWeight: 600, marginTop: '0.5rem' }}>
          <CheckSquare size={18} /> Generate My Checklist
        </button>
      </form>
    </div>
  );
}
