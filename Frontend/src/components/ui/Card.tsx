import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  title, 
  icon, 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      {(title || icon) && (
        <div className="flex items-center px-4 py-3 border-b border-gray-200 bg-gray-50">
          {icon && <span className="text-primary-600 mr-2">{icon}</span>}
          {title && <h3 className="font-medium text-gray-900">{title}</h3>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default Card;