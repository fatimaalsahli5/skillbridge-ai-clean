import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';
import { LightbulbIcon } from 'lucide-react';
import { Strength } from '../../types';

interface StrengthsSectionProps {
  strengths_opportunities?: Strength[];
}



const StrengthsSection: React.FC<StrengthsSectionProps> = ({ strengths_opportunities }) => {
  const { t } = useTranslation();

  console.log("strengths_opportunities inside component:", strengths_opportunities);

  if (!Array.isArray(strengths_opportunities) || strengths_opportunities.length === 0) {
    return <p>No strengths or opportunities found.</p>;
  }
    return (
    <Card 
      title={t('analysis.strengths')} 
      icon={<LightbulbIcon className="h-5 w-5" />}
    >
      
      <div className="grid gap-4 md:grid-cols-3">
        {strengths_opportunities.map((item, index) => (
          <div 
            key={index} 
            className="bg-gradient-to-br from-secondary-50 to-primary-50 border border-secondary-100 rounded-lg p-4">
            <h4 className="font-medium text-secondary-900">{item.title}</h4>
            <p className="mt-2 text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StrengthsSection;