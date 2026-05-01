import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer role="contentinfo" aria-label="Page Footer" className="footer">
      <p>
        CivicGuide is an educational tool. We do not provide legal advice or political recommendations.
      </p>
      <p style={{ marginTop: '0.5rem' }}>
        <Link to="/trust" aria-label="Trust Center">Trust Center</Link> | <Link to="/glossary" aria-label="Glossary">Glossary</Link> | <Link to="/quiz" aria-label="Quiz">Quiz</Link>
      </p>
    </footer>
  );
}
