import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import SkillsSection from '../components/analysis/SkillsSection';
import JobRolesSection from '../components/analysis/JobRolesSection';
import StrengthsSection from '../components/analysis/StrengthsSection';
import SkillGapsSection from '../components/analysis/SkillGapsSection';

const AnalysisPage: React.FC = () => {
  const { t } = useTranslation();
  const { analysisResult, resumeFile } = useResume();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Analysis Result:', analysisResult);

  }, [analysisResult]);
  

  useEffect(() => {
    if (!resumeFile || !analysisResult) {
      navigate('/');
    }
  }, [resumeFile, analysisResult, navigate]);
  
  if (!analysisResult) {
    return null;
  }

  
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center">
        <FileText className="h-6 w-6 text-primary-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">
          {t('analysis.extractedSkills')}
        </h1>
      </div>
      
      
      <div className="space-y-8">
      <SkillsSection skills={analysisResult.skills} />
      <StrengthsSection strengths_opportunities={analysisResult.strengths_opportunities} />
        <JobRolesSection job_suggestions={analysisResult.job_suggestions} />
        <SkillGapsSection skill_gaps={analysisResult.skill_gaps} />
      </div>
    </div>
  );
};

export default AnalysisPage;