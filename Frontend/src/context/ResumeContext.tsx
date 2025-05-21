import React, { createContext, useContext, useState } from 'react';
import type { ResumeData, AnalysisResult } from '../types/index';

interface ResumeContextType {
  resumeFile: File | null;
  analysisResult: AnalysisResult | null;
  isAnalyzing: boolean;
  uploadResume: (file: File) => void;
  analyzeResume: () => Promise<void>;
  clearResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const uploadResume = (file: File) => {
    setResumeFile(file);
    setAnalysisResult(null);
  };

  const analyzeResume = async () => {
    if (!resumeFile) return;
    
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('file', resumeFile);

      const response = await fetch('http://localhost:8000/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze resume');
      }

      const data: AnalysisResult = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error('Error analyzing resume:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearResume = () => {
    setResumeFile(null);
    setAnalysisResult(null);
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeFile,
        analysisResult,
        isAnalyzing,
        uploadResume,
        analyzeResume,
        clearResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
