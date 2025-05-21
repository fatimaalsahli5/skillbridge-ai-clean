import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../ui/Card';
import { Briefcase } from 'lucide-react';
import { JobRole } from '../../types';

interface JobRolesSectionProps {
  job_suggestions?: JobRole[];  // جعلها اختيارية
}

const JobRolesSection: React.FC<JobRolesSectionProps> = ({ job_suggestions }) => {
    const { t } = useTranslation();
  
    console.log("job sug:"+job_suggestions)
    if (!Array.isArray(job_suggestions) || job_suggestions.length === 0) {
      return <p>No job suggestions found.</p>;
    }
  
  
  if (job_suggestions.length === 0) {
    return (
      <Card 
        title={t('analysis.jobRoles')} 
        icon={<Briefcase className="h-5 w-5" />}
      >
        <p className="text-gray-500">{t('analysis.no_job_roles')}</p>
      </Card>
    );
  }

  return (
    <Card 
      title={t('analysis.jobRoles')} 
      icon={<Briefcase className="h-5 w-5" />}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {job_suggestions.map((role) => (
          <div 
            key={role.title} 
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">{role.title}</h4>
              <div className="bg-primary-100 text-primary-800 text-sm font-medium px-2 py-0.5 rounded">
                {role.matchScore}%
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">{role.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default JobRolesSection;
