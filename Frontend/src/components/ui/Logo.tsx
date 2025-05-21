import React from 'react';
import { Sparkles, Brain } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-6 w-6' }) => {
  return (
    <div className={`relative ${className}`}>
      <Brain className="text-primary-600 absolute w-full h-full" />
      <Sparkles className="text-accent-500 absolute w-1/2 h-1/2 right-0 top-0" />
    </div>
  );
};

export default Logo;