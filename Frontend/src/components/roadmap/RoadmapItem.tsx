import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, BarChart3, BookOpen, ExternalLink } from 'lucide-react';
import { LearningItem } from '../../types';

interface RoadmapItemProps {
  item: LearningItem;
  index: number;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ item, index }) => {
    const { t } = useTranslation();
    
  
  const difficultyColor = {
    beginner: 'text-success-500',
    intermediate: 'text-warning-500',
    advanced: 'text-error-500',
  };
  
  return (
    <div className="flex relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
      {/* Timeline connector */}
      <div className="flex flex-col items-center mr-4">
        <div className="rounded-full h-10 w-10 flex items-center justify-center bg-primary-100 text-primary-600 border-2 border-primary-200 z-10">
          {index + 1}
        </div>
        <div className="h-full w-0.5 bg-gray-200 -mt-2 z-0"></div>
      </div>
      
      {/* Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex-1">
        <h3 className="font-medium text-lg text-gray-900">{item.skill}</h3>
        
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">{t('roadmap.estimatedTime')}</p>
              <p className="text-sm font-medium">
                {item.estimatedTimeWeeks} {item.estimatedTimeWeeks === 1 ? 'week' : 'weeks'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <BarChart3 className="h-4 w-4 text-gray-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">{t('roadmap.difficulty')}</p>
              <p className={`text-sm font-medium ${difficultyColor[item.difficulty]}`}>
                {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 text-gray-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">{t('roadmap.learningSource')}</p>
              <p className="text-sm font-medium">
                {item.resources[0].platform}
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Resources:</h4>
          <ul className="space-y-1">
            {item.resources.map((resource) => (
              <li key={resource.title}>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-sm text-primary-600 hover:text-primary-800"
                >
                  {resource.title}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoadmapItem;