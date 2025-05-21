import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

interface HeaderProps {
  onMenuClick: () => void;
  showMenuButton: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, showMenuButton }) => {
  const { t, i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {showMenuButton && (
              <button
                onClick={onMenuClick}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" />
              </button>
            )}
            <Link to="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
              <span className="ml-2 text-xl font-semibold text-primary-700">SkillBridge AI</span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle language"
            >
              <Languages className="h-5 w-5" />
              <span className="ml-1 text-sm font-medium">
                {i18n.language === 'en' ? 'عربي' : 'English'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;