import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import ChatInterface from '../components/coach/ChatInterface';

const CoachPage: React.FC = () => {
  const { t } = useTranslation();
  const { analysisResult, resumeFile } = useResume();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!resumeFile || !analysisResult) {
      navigate('/');
    }
  }, [resumeFile, analysisResult, navigate]);
  
  if (!analysisResult) {
    return null;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <MessageSquare className="h-10 w-10 text-primary-600 mx-auto mb-2" />
        <h1 className="text-2xl font-bold text-gray-900">
          {t('coach.title')}
        </h1>
        <p className="text-gray-600 mt-2 mb-8">
          {t('coach.subtitle')}
        </p>
      </div>
      
      <ChatInterface />
    </div>
  );
};

export default CoachPage;