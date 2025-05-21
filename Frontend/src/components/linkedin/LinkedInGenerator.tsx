import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Copy, CheckCircle, Sparkles } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { generateLinkedInSummary } from '../../utils/mockData';

const LinkedInGenerator: React.FC = () => {
  const { t } = useTranslation();
  const { analysisResult } = useResume();
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate generation with delay
    setTimeout(() => {
      setSummary(generateLinkedInSummary());
      setIsGenerating(false);
    }, 2000);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-primary-50 to-accent-50">
        <div className="text-center py-6">
          <Sparkles className="h-10 w-10 text-accent-500 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            {t('linkedin.title')}
          </h3>
          <p className="text-gray-600 max-w-lg mx-auto">
            {t('linkedin.subtitle')}
          </p>
          <Button
            variant="primary"
            className="mt-4"
            onClick={handleGenerate}
            isLoading={isGenerating}
            leftIcon={<Sparkles className="h-4 w-4" />}
          >
            {t('linkedin.generate')}
          </Button>
        </div>
      </Card>
      
      {summary && (
        <Card className="bg-white animate-fade-in">
          <div className="flex justify-between mb-4">
            <h3 className="font-medium">LinkedIn Summary</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              leftIcon={copied ? <CheckCircle className="h-4 w-4 text-success-500" /> : <Copy className="h-4 w-4" />}
            >
              {copied ? 'Copied!' : t('linkedin.copy')}
            </Button>
          </div>
          <div className="whitespace-pre-line p-4 bg-gray-50 rounded-md text-gray-800 border border-gray-200">
            {summary}
          </div>
        </Card>
      )}
    </div>
  );
};

export default LinkedInGenerator;