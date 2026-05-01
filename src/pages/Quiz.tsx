import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { HelpCircle, RefreshCw, CheckCircle, XCircle, Globe } from 'lucide-react';

interface Question {
  id: number;
  country: 'India' | 'United States';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    country: 'India',
    question: 'What is the minimum voting age for a citizen in India?',
    options: ['16 years', '18 years', '21 years', '25 years'],
    correctAnswer: '18 years',
    explanation: 'Since the 61st Constitutional Amendment in 1988, the voting age in India has been set to 18 years.'
  },
  {
    id: 2,
    country: 'India',
    question: 'What does VVPAT stand for?',
    options: [
      'Voter Verifiable Paper Audit Trail',
      'Voter Validated Polling Account Track',
      'Visual Verification Paper Audit Test',
      'Value Verified Paper Account Trail'
    ],
    correctAnswer: 'Voter Verifiable Paper Audit Trail',
    explanation: 'VVPAT prints a paper slip displaying the serial number, candidate name, and symbol when a vote is cast on an EVM.'
  },
  {
    id: 3,
    country: 'India',
    question: 'Which of the following forms is used to apply for a new voter ID?',
    options: ['Form 4', 'Form 6', 'Form 8', 'Form 11'],
    correctAnswer: 'Form 6',
    explanation: 'Form 6 is specifically used for the registration of a new elector on the electoral roll.'
  },
  {
    id: 4,
    country: 'United States',
    question: 'What is the constitutional body used to elect the US President?',
    options: ['Direct Popular Vote', 'The Electoral College', 'Congress Approval', 'Supreme Court Ruling'],
    correctAnswer: 'The Electoral College',
    explanation: 'The US President is elected via the Electoral College, composed of state electors chosen by voters.'
  },
  {
    id: 5,
    country: 'United States',
    question: 'In the US, what is the term for early voting by mail?',
    options: ['Absentee Voting', 'Provisional Voting', 'Advanced In-Person', 'Direct Ballot'],
    correctAnswer: 'Absentee Voting',
    explanation: 'Absentee voting allows a voter to receive and mail back their ballot rather than voting in person.'
  },
  {
    id: 6,
    country: 'United States',
    question: 'Which official portal can you use to directly check your US voter registration status?',
    options: ['vote.gov', 'usa.gov/confirm-voter-registration', 'fec.gov', 'elections.gov'],
    correctAnswer: 'usa.gov/confirm-voter-registration',
    explanation: 'The USA.gov website routes you directly to check your specific state board of elections records.'
  }
];

export function Quiz() {
  const { user } = useAuth();

  // Dynamic country select
  const [selectedCountry, setSelectedCountry] = useState<'India' | 'United States'>(
    (user?.country as 'India' | 'United States') || 'India'
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Filter questions by dynamic country selection
  const questions = QUIZ_QUESTIONS.filter(q => q.country === selectedCountry);

  const handleOptionClick = (option: string) => {
    if (selectedOption !== null) return; // Answer locked
    setSelectedOption(option);
    if (option === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
  };

  const handleCountryChange = (country: 'India' | 'United States') => {
    setSelectedCountry(country);
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setQuizFinished(false);
  };

  const q = questions[currentQuestion];

  return (
    <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <HelpCircle color="var(--color-primary)" /> Civic Knowledge Quiz
          </h2>
          <p style={{ margin: 0, color: 'var(--color-text-light)' }}>
            Quickly test your knowledge about democratic institutions in <strong>{selectedCountry}</strong>.
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

      {!quizFinished && q ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Score: {score}</span>
          </div>

          <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{q.question}</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {q.options.map((opt) => {
              const isSelected = selectedOption === opt;
              const isCorrect = opt === q.correctAnswer;
              let bg = 'var(--color-surface)';
              let border = '1px solid var(--color-border)';
              
              if (selectedOption !== null) {
                if (isCorrect) {
                  bg = '#f0fdf4';
                  border = '1px solid #10b981';
                } else if (isSelected) {
                  bg = '#fef2f2';
                  border = '1px solid #ef4444';
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleOptionClick(opt)}
                  disabled={selectedOption !== null}
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    border,
                    backgroundColor: bg,
                    textAlign: 'left',
                    fontSize: '0.95rem',
                    cursor: selectedOption !== null ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    outline: 'none'
                  }}
                >
                  {opt}
                  {selectedOption !== null && isCorrect && <CheckCircle color="#10b981" size={18} />}
                  {selectedOption !== null && isSelected && !isCorrect && <XCircle color="#ef4444" size={18} />}
                </button>
              );
            })}
          </div>

          {selectedOption !== null && (
            <div style={{ marginTop: '0.5rem', padding: '1rem', borderRadius: '8px', backgroundColor: 'rgba(26, 115, 232, 0.04)', borderLeft: '4px solid var(--color-primary)' }}>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.5 }}>
                <strong>Explanation:</strong> {q.explanation}
              </p>
              <button
                onClick={handleNext}
                className="btn btn-primary"
                style={{ marginTop: '1rem', width: '100%', padding: '0.75rem' }}
              >
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <h3>Congratulations! You've finished the quiz.</h3>
          <p style={{ fontSize: '1.1rem', margin: '0.5rem 0 1.5rem 0' }}>
            Your Score: <strong>{score}</strong> out of <strong>{questions.length}</strong>
          </p>
          <button onClick={handleRestart} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <RefreshCw size={16} /> Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
