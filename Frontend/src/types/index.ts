export interface Skill {
  name: string;
  level: number; // 1-5
  category: 'technical' | 'soft' | 'language';
}

export interface JobRole {
  title: string;
  matchScore: number; // percentage 0-100
  description: string;
}

export interface SkillGap {
  skill: string;
  importance: number; // 1-5
  resources: {
    title: string;
    url: string;
    platform: string;
  }[];
}

export interface LearningItem {
  skill: string;
  estimatedTimeWeeks: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  resources: {
    title: string;
    url: string;
    platform: string;
  }[];
}

export interface Strength {
  title: string;
  description: string;
}

export interface AnalysisResult {
  skills: Skill[];
  strengths_opportunities: Strength[];
  job_suggestions: JobRole[];
  skill_gaps: SkillGap[];
  learning_plan: LearningItem[];
}

export interface ResumeData {
  file: File;
  text?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}