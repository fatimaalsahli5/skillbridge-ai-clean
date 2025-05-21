import { AnalysisResult } from '../types';

export const mockAnalyzeResume = (): AnalysisResult => {
  return {
    skills: [
      { name: 'JavaScript', level: 4, category: 'technical' },
      { name: 'React', level: 4, category: 'technical' },
      { name: 'TypeScript', level: 3, category: 'technical' },
      { name: 'Node.js', level: 3, category: 'technical' },
      { name: 'HTML/CSS', level: 4, category: 'technical' },
      { name: 'Git', level: 3, category: 'technical' },
      { name: 'Problem Solving', level: 4, category: 'soft' },
      { name: 'Communication', level: 3, category: 'soft' },
      { name: 'Teamwork', level: 4, category: 'soft' },
      { name: 'Time Management', level: 3, category: 'soft' },
      { name: 'English', level: 4, category: 'language' },
      { name: 'Arabic', level: 5, category: 'language' },
    ],
    strengths: [
      {
        title: 'Front-end Development',
        description: 'Strong skills in React and modern JavaScript. Good foundation for advanced front-end roles.',
      },
      {
        title: 'Collaborative Work',
        description: 'History of successful team projects and positive teamwork experiences.',
      },
      {
        title: 'Multilingual',
        description: 'Fluency in both English and Arabic is a valuable asset for international teams.',
      },
    ],
    jobRoles: [
      {
        title: 'Front-end Developer',
        matchScore: 85,
        description: 'Your React and JavaScript skills are well-aligned with this role.',
      },
      {
        title: 'Full Stack Developer',
        matchScore: 68,
        description: 'Good foundation, but would benefit from deeper back-end expertise.',
      },
      {
        title: 'UI Developer',
        matchScore: 75,
        description: 'Strong front-end skills match this role, but consider adding UI/UX design knowledge.',
      },
    ],
    skillGaps: [
      {
        skill: 'GraphQL',
        importance: 4,
        resources: [
          {
            title: 'GraphQL Fundamentals',
            url: 'https://www.example.com/graphql',
            platform: 'Udemy',
          },
        ],
      },
      {
        skill: 'UI/UX Design Principles',
        importance: 3,
        resources: [
          {
            title: 'UI/UX Design for Developers',
            url: 'https://www.example.com/uiux',
            platform: 'Coursera',
          },
        ],
      },
      {
        skill: 'Testing (Jest, React Testing Library)',
        importance: 4,
        resources: [
          {
            title: 'Testing React Applications',
            url: 'https://www.example.com/testing',
            platform: 'Frontend Masters',
          },
        ],
      },
    ],
    learningPath: [
      {
        skill: 'GraphQL',
        estimatedTimeWeeks: 3,
        difficulty: 'intermediate',
        resources: [
          {
            title: 'GraphQL Fundamentals',
            url: 'https://www.example.com/graphql',
            platform: 'Udemy',
          },
          {
            title: 'Apollo Client with React',
            url: 'https://www.example.com/apollo',
            platform: 'Apollo Docs',
          },
        ],
      },
      {
        skill: 'Testing with Jest & RTL',
        estimatedTimeWeeks: 2,
        difficulty: 'intermediate',
        resources: [
          {
            title: 'Testing React Applications',
            url: 'https://www.example.com/testing',
            platform: 'Frontend Masters',
          },
        ],
      },
      {
        skill: 'UI/UX Design Principles',
        estimatedTimeWeeks: 4,
        difficulty: 'beginner',
        resources: [
          {
            title: 'UI/UX Design for Developers',
            url: 'https://www.example.com/uiux',
            platform: 'Coursera',
          },
        ],
      },
    ],
  };
};

export const mockChatResponses: Record<string, string> = {
  'what jobs can i apply to now': 'Based on your resume analysis, you are most qualified for Front-end Developer roles with an 85% match. Your strong React and JavaScript skills make you a good candidate for these positions. You could also consider UI Developer roles (75% match) or Full Stack Developer positions (68% match), though the latter would benefit from strengthening your back-end skills.',
  'what skills am i missing': 'Your analysis shows three main skill gaps to focus on:\n\n1. GraphQL - Important for modern API integration\n2. Testing with Jest and React Testing Library - Critical for code quality\n3. UI/UX Design Principles - Would enhance your front-end development value\n\nAddressing these would significantly increase your marketability, especially for Full Stack and UI Developer roles.',
  'how do i transition to ux design': 'To transition to UX Design from your current development background:\n\n1. Start with UI/UX courses for developers (like the one in your learning path)\n2. Create a portfolio by redesigning existing interfaces\n3. Learn user research and usability testing methods\n4. Practice with design tools like Figma or Adobe XD\n5. Consider a hybrid role first (UI Developer) to leverage your current skills while building UX experience\n\nYour technical background will actually be an advantage in UX, especially for developer-focused products.',
};

export const generateLinkedInSummary = (): string => {
  return `Results-driven Front-End Developer with proven expertise in React, JavaScript, and TypeScript. Passionate about creating responsive, user-friendly web applications with clean, maintainable code. Strong collaborative skills and multilingual fluency (English/Arabic) enabling effective communication across diverse teams.

My technical toolkit includes:
• React/TypeScript ecosystem
• Modern JavaScript (ES6+)
• Responsive web development
• Version control with Git

Continuously expanding my skills in GraphQL, automated testing, and UI/UX design principles to deliver more comprehensive solutions. Looking to bring my technical expertise and problem-solving abilities to a dynamic development team focused on creating exceptional user experiences.`;
};