import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, BookOpen, Globe } from 'lucide-react';

interface GlossaryTerm {
  id: string;
  term: string;
  country: 'India' | 'United States' | 'Both';
  category: string;
  definition: string;
}

const ALL_TERMS: GlossaryTerm[] = [
  {
    id: 'epic',
    term: 'EPIC',
    country: 'India',
    category: 'Identification',
    definition: 'Electors Photo Identity Card. Also commonly referred to as the voter ID card, it is issued by the ECI to verify voter identity.'
  },
  {
    id: 'vvpat',
    term: 'VVPAT',
    country: 'India',
    category: 'Voting Process',
    definition: 'Voter Verifiable Paper Audit Trail. An independent verification system attached to EVMs that allows voters to verify that their votes are cast as intended.'
  },
  {
    id: 'evm',
    term: 'EVM',
    country: 'India',
    category: 'Voting Process',
    definition: 'Electronic Voting Machine. A secure, standalone device used to record and count votes electronically.'
  },
  {
    id: 'mcc',
    term: 'MCC',
    country: 'India',
    category: 'Regulation',
    definition: 'Model Code of Conduct. A set of guidelines issued by the ECI to regulate political parties and candidates before elections to ensure free and fair polls.'
  },
  {
    id: 'nota',
    term: 'NOTA',
    country: 'Both',
    category: 'Voting Options',
    definition: 'None of the Above. A ballot option that allows voters to officially register a vote of disapproval against all contesting candidates.'
  },
  {
    id: 'electoral_roll',
    term: 'Electoral Roll',
    country: 'Both',
    category: 'Registration',
    definition: 'The official list of citizens who are registered to vote in a specific constituency.'
  },
  {
    id: 'absentee',
    term: 'Absentee Ballot',
    country: 'United States',
    category: 'Voting Process',
    definition: 'A ballot that allows a voter to cast their vote by mail rather than in person at a polling station.'
  },
  {
    id: 'gerrymandering',
    term: 'Gerrymandering',
    country: 'United States',
    category: 'Redistricting',
    definition: 'Manipulating the boundaries of an electoral constituency so as to favor one party or class.'
  },
  {
    id: 'electoral_college',
    term: 'Electoral College',
    country: 'United States',
    category: 'Presidential Election',
    definition: 'A body of electors established by the US Constitution that forms every four years for the sole purpose of electing the president and vice president.'
  },
  {
    id: 'provisional_ballot',
    term: 'Provisional Ballot',
    country: 'United States',
    category: 'Voting Options',
    definition: 'A ballot cast by a voter whose eligibility cannot immediately be verified, set aside for verification prior to official counting.'
  }
];

export function Glossary() {
  const { user } = useAuth();
  const userCountry = user?.country || 'India';

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter terms by logged-in user country or terms that apply to both
  const countryTerms = ALL_TERMS.filter(
    t => t.country === 'Both' || t.country === userCountry
  );

  const categories = ['All', ...Array.from(new Set(countryTerms.map(t => t.category)))];

  const filteredTerms = countryTerms.filter(t => {
    const matchesSearch = t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="card" style={{ maxWidth: '950px', margin: '2rem auto', padding: '2.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen color="var(--color-primary)" /> Civic Glossary
          </h2>
          <p style={{ margin: 0, color: 'var(--color-text-light)', fontSize: '0.95rem' }}>
            Detailed civic terms and acronyms for <strong>{userCountry}</strong>.
          </p>
        </div>
        <div style={{ padding: '0.45rem 1rem', borderRadius: '20px', backgroundColor: '#eef2ff', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, fontSize: '0.85rem' }}>
          <Globe size={16} /> {userCountry} Edition
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-light)' }} />
          <input
            type="text"
            placeholder={`Search terms or definitions for ${userCountry}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 0.75rem 0.75rem 2.5rem',
              borderRadius: '6px',
              border: '1px solid var(--color-border)',
              outline: 'none'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                border: activeCategory === cat ? '1px solid var(--color-primary)' : '1px solid var(--color-border)',
                backgroundColor: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-surface)',
                color: activeCategory === cat ? 'white' : 'var(--color-text)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {filteredTerms.map(t => (
          <div key={t.id} style={{
            padding: '1.25rem',
            borderRadius: '8px',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, color: 'var(--color-text)' }}>{t.term}</h3>
              <span style={{
                fontSize: '0.75rem',
                padding: '0.2rem 0.5rem',
                backgroundColor: 'rgba(26, 115, 232, 0.08)',
                color: 'var(--color-primary)',
                borderRadius: '4px',
                fontWeight: 500
              }}>
                {t.category}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-light)', lineHeight: 1.5 }}>{t.definition}</p>
          </div>
        ))}
        {filteredTerms.length === 0 && (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--color-text-light)', padding: '2rem 0' }}>
            No terms found matching your filter.
          </p>
        )}
      </div>
    </div>
  );
}
