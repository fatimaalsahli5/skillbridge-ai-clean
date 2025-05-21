import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, User, Bot } from 'lucide-react';
import Button from '../ui/Button';
import { ChatMessage } from '../../types';
import { mockChatResponses } from '../../utils/mockData';

const ChatInterface: React.FC = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response with some delay
    setTimeout(() => {
      const query = input.toLowerCase();
      let responseContent = 'I don\'t have an answer for that specific question. Could you try rephrasing or ask something about your resume analysis, skills, or career options?';
      
      // Check for matching responses in our mock data
      for (const [key, value] of Object.entries(mockChatResponses)) {
        if (query.includes(key)) {
          responseContent = value;
          break;
        }
      }
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleExampleClick = (example: string) => {
    setInput(example);
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user' 
                  ? 'bg-primary-100 text-primary-900' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.role === 'assistant' && <Bot className="h-4 w-4 mr-1 text-primary-600" />}
                {message.role === 'user' && <User className="h-4 w-4 mr-1 text-primary-600" />}
                <span className="text-xs text-gray-500">
                  {message.role === 'user' ? 'You' : 'AI Coach'}
                </span>
              </div>
              <p className="whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 text-gray-800">
              <div className="flex items-center">
                <Bot className="h-4 w-4 mr-1 text-primary-600" />
                <span className="text-xs text-gray-500">AI Coach</span>
              </div>
              <div className="flex space-x-1 mt-2">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {messages.length === 0 && (
        <div className="px-4 pb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">{t('coach.examples.title')}:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleExampleClick(t('coach.examples.jobsNow'))}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-md transition-colors"
            >
              {t('coach.examples.jobsNow')}
            </button>
            <button
              onClick={() => handleExampleClick(t('coach.examples.missingSkills'))}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-md transition-colors"
            >
              {t('coach.examples.missingSkills')}
            </button>
            <button
              onClick={() => handleExampleClick(t('coach.examples.transition'))}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded-md transition-colors"
            >
              {t('coach.examples.transition')}
            </button>
          </div>
        </div>
      )}
      
      <div className="border-t border-gray-200 p-3">
        <div className="flex">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('coach.placeholder')}
            className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 resize-none"
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="rounded-l-none"
            rightIcon={<Send className="h-4 w-4" />}
          >
            {t('coach.send')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;