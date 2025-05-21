import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  BarChart, 
  Map, 
  MessageSquare, 
  Linkedin 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  
  const navItems = [
    { 
      path: '/analysis', 
      label: t('analysis.extractedSkills'), 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      path: '/roadmap', 
      label: t('roadmap.title'), 
      icon: <Map className="h-5 w-5" /> 
    },
    { 
      path: '/coach', 
      label: t('coach.title'), 
      icon: <MessageSquare className="h-5 w-5" /> 
    },
    { 
      path: '/linkedin', 
      label: t('linkedin.title'), 
      icon: <Linkedin className="h-5 w-5" /> 
    },
  ];

  return (
    <div className="h-full flex flex-col bg-primary-50 border-r border-gray-200">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `${
                  isActive 
                    ? 'bg-primary-500 text-white' 
                    : 'text-gray-600 hover:bg-primary-100 hover:text-primary-900'
                } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200`
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;