import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import ResumeUploader from '../components/home/ResumeUploader';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto pt-8 md:pt-16 px-4">
      <div className="text-center mb-12">
        <div className="inline-block p-3 bg-primary-100 rounded-full mb-4">
          <Sparkles className="h-8 w-8 text-primary-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {t('home.title')}
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('home.subtitle')}
        </p>
      </div>
      
      <div className="mt-8">
        <ResumeUploader />
      </div>
      
      <div className="mt-16 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-200">
          <div className="bg-secondary-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
            <span className="text-secondary-600 text-xl font-bold">1</span>
          </div>
          <h3 className="font-medium text-lg mb-2">Upload Resume</h3>
          <p className="text-gray-600 text-sm">
            Upload your resume and let our AI analyze it
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-200">
          <div className="bg-secondary-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
            <span className="text-secondary-600 text-xl font-bold">2</span>
          </div>
          <h3 className="font-medium text-lg mb-2">Get Analysis</h3>
          <p className="text-gray-600 text-sm">
            Review your skills, strengths, and opportunities
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 text-center border border-gray-200">
          <div className="bg-secondary-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
            <span className="text-secondary-600 text-xl font-bold">3</span>
          </div>
          <h3 className="font-medium text-lg mb-2">Follow Roadmap</h3>
          <p className="text-gray-600 text-sm">
            Get personalized learning path and career guidance
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;