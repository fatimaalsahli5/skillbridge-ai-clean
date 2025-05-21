import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Map } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import RoadmapItem from '../components/roadmap/RoadmapItem';

const RoadmapPage: React.FC = () => {
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
  console.log('learningPath:', analysisResult.learning_plan);

  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <Map className="h-10 w-10 text-primary-600 mx-auto mb-2" />
        <h1 className="text-2xl font-bold text-gray-900">
          {t('roadmap.title')}
        </h1>
        <p className="text-gray-600 mt-2">
          {t('roadmap.subtitle')}
        </p>
      </div>
      
      <div className="mt-10 relative">
      {analysisResult.learning_plan && analysisResult.learning_plan.map((item, index) => (
          <RoadmapItem key={item.skill} item={item} index={index} />
        ))}
        
      </div>

    </div>
  );
};

export default RoadmapPage;