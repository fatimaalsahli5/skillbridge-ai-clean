import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, FileText, X } from 'lucide-react';
import Button from '../ui/Button';
import { useResume } from '../../context/ResumeContext';
import { useNavigate } from 'react-router-dom';

const ResumeUploader: React.FC = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { resumeFile, uploadResume, analyzeResume, isAnalyzing } = useResume();
  const navigate = useNavigate();
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadResume(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('word'))) {
      uploadResume(file);
    }
  };

  const handleRemoveFile = () => {
    uploadResume(null as unknown as File);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    await analyzeResume();
    navigate('/analysis');
  };

  return (
    <div className="max-w-md w-full mx-auto">
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200
          ${dragOver ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}
          ${resumeFile ? 'bg-green-50 border-green-300' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
        
        {!resumeFile ? (
          <div className="space-y-3">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
              <Upload className="h-6 w-6 text-primary-600" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">
                {t('common.uploadResume')}
              </p>
              <p className="text-xs text-gray-500">
                PDF or Word (.doc, .docx)
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleButtonClick}
            >
              {t('common.uploadResume')}
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div className="relative max-w-xs mx-auto">
              <p className="font-medium text-gray-900 truncate" title={resumeFile.name}>
                {resumeFile.name}
              </p>
              <button
                onClick={handleRemoveFile}
                className="absolute -right-4 top-0 text-gray-400 hover:text-gray-600"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Button 
              variant="primary" 
              onClick={handleAnalyze}
              isLoading={isAnalyzing}
              fullWidth
            >
              {t('common.analyze')}
            </Button>
          </div>
        )}
      </div>
      
      <p className="mt-3 text-xs text-center text-gray-500">
        {t('common.privacy')}
      </p>
    </div>
  );
};

export default ResumeUploader;