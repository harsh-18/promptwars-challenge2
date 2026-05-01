import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer">
      <p>
        CivicGuide is an educational tool. We do not provide legal advice or political recommendations.
      </p>
      <p style={{ marginTop: '0.5rem' }}>
        <Link to="/trust">Trust Center</Link> | <Link to="/glossary">Glossary</Link> | <Link to="/quiz">Quiz</Link>
      </p>
    </footer>
  );
}
