import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';
import { PuzzleIcon, ExternalLink } from 'lucide-react';
import { SkillGap } from '../../types';

interface SkillGapsSectionProps {
  skill_gaps?: SkillGap[]; // جعلها اختيارية
}

const SkillGapsSection: React.FC<SkillGapsSectionProps> = ({ skill_gaps }) => {
    const { t } = useTranslation();
  
    if (!Array.isArray(skill_gaps) || skill_gaps.length === 0) {
      return <p>No skill gaps found.</p>;
    }


  if (skill_gaps.length === 0) {
    return (
      <Card 
        title={t('analysis.skillGaps')} 
        icon={<PuzzleIcon className="h-5 w-5" />}
      >
        <p className="text-gray-500">{t('analysis.no_skill_gaps')}</p>
      </Card>
    );
  }

  return (
    <Card 
      title={t('analysis.skillGaps')} 
      icon={<PuzzleIcon className="h-5 w-5" />}
    >
      <div className="space-y-4">
        {skill_gaps.map((gap) => (
          <div 
            key={gap.skill} 
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">{gap.skill}</h4>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-2 h-6 mx-0.5 rounded-sm ${
                      level <= gap.importance ? 'bg-accent-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-3">
              <h5 className="text-sm font-medium text-gray-700 mb-2">
                {t('analysis.learningResources')}:
              </h5>
              <ul className="space-y-2">
                {gap.resources.map((resource) => (
                  <li key={resource.title}>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary-600 hover:text-primary-800"
                    >
                      {resource.title} ({resource.platform})
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SkillGapsSection;
