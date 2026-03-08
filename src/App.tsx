import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Schemes from './pages/Schemes';
import Eligibility from './pages/Eligibility';
import AiAssistantPage from './pages/AiAssistantPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    // Set default language to Tamil if not set
    if (!localStorage.getItem('appLang')) {
      localStorage.setItem('appLang', 'ta');
      window.dispatchEvent(new Event('languageChange'));
    }

    const applyTheme = (t: string) => {
      if (t === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
    };

    applyTheme(theme);

    const handleStorageChange = () => {
      const newTheme = localStorage.getItem('theme') || 'dark';
      setTheme(newTheme);
      applyTheme(newTheme);
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-window theme changes if needed
    window.addEventListener('themeChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('themeChange', handleStorageChange);
    };
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 dark:bg-slate-950 light:bg-slate-50 text-slate-200 dark:text-slate-200 light:text-slate-800 selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors">
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schemes" element={<Schemes />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/assistant" element={<AiAssistantPage />} />
          </Routes>
        </main>
        <Footer />
        <CommandPalette />
      </div>
    </Router>
  );
}
