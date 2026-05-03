import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { Dashboard } from './pages/Dashboard';
import { GuidedIntake } from './pages/GuidedIntake';
import { Timeline } from './pages/Timeline';
import { Glossary } from './pages/Glossary';
import { Trust } from './pages/Trust';
import { Quiz } from './pages/Quiz';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';

const AskAssistant = React.lazy(() => import('./pages/AskAssistant').then(module => ({ default: module.AskAssistant })));
const Journey = React.lazy(() => import('./pages/Journey').then(module => ({ default: module.Journey })));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            
            {/* Direct protected pages requiring login first to secure voter info */}
            <Route path="/intake" element={<ProtectedRoute><GuidedIntake /></ProtectedRoute>} />
            <Route path="/assistant" element={<ProtectedRoute><React.Suspense fallback={<div>Loading...</div>}><AskAssistant /></React.Suspense></ProtectedRoute>} />
            <Route path="/journey" element={<ProtectedRoute><React.Suspense fallback={<div>Loading...</div>}><Journey /></React.Suspense></ProtectedRoute>} />
            <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            <Route path="/trust" element={<Trust />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
