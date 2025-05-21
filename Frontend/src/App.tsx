import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AnalysisPage from './pages/AnalysisPage';
import RoadmapPage from './pages/RoadmapPage';
import CoachPage from './pages/CoachPage';
import LinkedInPage from './pages/LinkedInPage';
import { ResumeProvider } from './context/ResumeContext';

function App() {
  const { i18n } = useTranslation();
  
  React.useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    document.body.classList.toggle('font-arabic', i18n.language === 'ar');
    document.body.classList.toggle('font-sans', i18n.language === 'en');
  }, [i18n.language]);

  return (
    <ResumeProvider>
      <div className={`min-h-screen bg-gray-50 text-gray-900 transition-all duration-300 ${i18n.language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/coach" element={<CoachPage />} />
            <Route path="/linkedin" element={<LinkedInPage />} />
          </Routes>
        </Layout>
      </div>
    </ResumeProvider>
  );
}

export default App;