import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';
import { Code, Heart, Languages } from 'lucide-react';
import { Skill } from '../../types';

interface SkillsSectionProps {
  skills?: Skill[];  // اجعلها اختيارية
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills = [] }) => {  // قيمتها الافتراضية مصفوفة فارغة
  const { t } = useTranslation();
  
  const skillsByCategory = {
    technical: skills.filter(skill => skill.category === 'technical'),
    soft: skills.filter(skill => skill.category === 'soft'),
    language: skills.filter(skill => skill.category === 'language'),
  };

  const SkillItem = ({ skill }: { skill: Skill }) => (
    <div className="flex items-center justify-between py-2">
      <span className="text-gray-800">{skill.name}</span>
      <div className="flex">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={`w-2 h-6 mx-0.5 rounded-sm ${
              level <= skill.level ? 'bg-primary-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );

  // لو ما فيه مهارات في كل تصنيف، يمكن تعرض رسالة بسيطة بدل القسم الفارغ (اختياري)
  const renderSkills = (categorySkills: Skill[]) => {
    if (!categorySkills.length) {
      return <p className="text-sm text-gray-500">{t('analysis.no_skills')}</p>;
    }
    return categorySkills.map(skill => <SkillItem key={skill.name} skill={skill} />);
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card 
        title={t('analysis.technical')} 
        icon={<Code className="h-5 w-5" />}
        className="md:col-span-1"
      >
        <div className="space-y-1 divide-y divide-gray-100">
          {renderSkills(skillsByCategory.technical)}
        </div>
      </Card>
      
      <Card 
        title={t('analysis.soft')} 
        icon={<Heart className="h-5 w-5" />}
        className="md:col-span-1"
      >
        <div className="space-y-1 divide-y divide-gray-100">
          {renderSkills(skillsByCategory.soft)}
        </div>
      </Card>
      
      <Card 
        title={t('analysis.languages')} 
        icon={<Languages className="h-5 w-5" />}
        className="md:col-span-1"
      >
        <div className="space-y-1 divide-y divide-gray-100">
          {renderSkills(skillsByCategory.language)}
        </div>
      </Card>
    </div>
  );
};

export default SkillsSection;
