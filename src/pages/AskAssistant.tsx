import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Send, Bot, User, ShieldAlert } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

export function AskAssistant() {
  const { user } = useAuth();
  const location = useLocation();

  const [selectedCountry, setSelectedCountry] = useState<'India' | 'United States'>(
    (user?.country as 'India' | 'United States') || 'India'
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am your CivicGuide Assistant. I provide nonpartisan, official election information grounded in direct official source data for ${selectedCountry || 'India'}. Ask me anything about voter registration, the polling process, or required documentation.`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const userProfile = location.state?.profile || user || null;

  const handleCountryChange = (country: 'India' | 'United States') => {
    setSelectedCountry(country);
    setMessages([
      {
        id: 'welcome_' + Date.now(),
        sender: 'assistant',
        text: `Hello! I am your CivicGuide Assistant. I provide nonpartisan, official election information grounded in direct official source data for ${country}. Ask me anything about voter registration, the polling process, or required documentation.`
      }
    ]);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Dynamic country override injected directly to the profile object
    const finalProfile = userProfile ? { ...userProfile, country: selectedCountry } : { country: selectedCountry };

    try {
      let response;
      try {
        response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMsg.text, profile: finalProfile })
        });
      } catch (localErr) {
        console.warn('Vite proxy fetch failed, falling back to direct server URI', localErr);
        response = await fetch('http://127.0.0.1:8080/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMsg.text, profile: finalProfile })
        });
      }

      const data = await response.json();
      if (response.ok && data.response) {
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: data.response
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const errorMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: `Error: ${data.error || 'Failed to get answer. Please ensure GEMINI_API_KEY is configured correctly.'}`
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Network error: Unable to contact the CivicGuide backend server.'
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 180px)', maxHeight: '700px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bot color="var(--color-primary)" /> AI Civic Assistant
          </h2>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
            Empowering voters in <strong>{selectedCountry}</strong>.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)' }}>Country:</span>
          <select
            value={selectedCountry}
            onChange={(e) => handleCountryChange(e.target.value as any)}
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

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', backgroundColor: '#fdf6e2', border: '1px solid #f9ebc4', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.85rem', marginBottom: '1rem' }}>
        <ShieldAlert size={16} color="#b7791f" style={{ flexShrink: 0 }} />
        <span>We strictly adhere to official, nonpartisan guidance. The assistant does not endorse any candidate or political party.</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: '#fafafa', borderRadius: '8px', border: '1px solid var(--color-border)', marginBottom: '1rem' }}>
        {messages.map((m) => (
          <div key={m.id} style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'flex-start',
            alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: m.sender === 'user' ? 'var(--color-primary)' : 'var(--color-surface)',
              border: m.sender === 'assistant' ? '1px solid var(--color-border)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: m.sender === 'user' ? 'white' : 'var(--color-primary)',
              flexShrink: 0
            }}>
              {m.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
            </div>
            <div style={{
              padding: '0.85rem 1.25rem',
              borderRadius: '12px',
              backgroundColor: m.sender === 'user' ? 'var(--color-primary)' : 'var(--color-surface)',
              color: m.sender === 'user' ? 'white' : 'var(--color-text)',
              boxShadow: 'var(--shadow-sm)',
              whiteSpace: 'pre-wrap',
              fontSize: '0.95rem',
              lineHeight: 1.5,
              border: m.sender === 'assistant' ? '1px solid var(--color-border)' : 'none'
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: '1rem', alignSelf: 'flex-start' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <Bot size={18} />
            </div>
            <div style={{ padding: '0.85rem 1.25rem', borderRadius: '12px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="pulse" style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-primary)', borderRadius: '50%' }}></div>
              <div className="pulse" style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', animationDelay: '0.2s' }}></div>
              <div className="pulse" style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about voter IDs, registration deadlines, or ballot details..."
          style={{ flex: 1, padding: '0.85rem', borderRadius: '8px', border: '1px solid var(--color-border)', outline: 'none' }}
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }} disabled={loading || !input.trim()}>
          <Send size={18} /> Send
        </button>
      </form>
    </div>
  );
}
