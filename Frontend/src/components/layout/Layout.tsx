import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { analysisResult } = useResume();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  // Only show sidebar on pages other than home and when analysis is available
  const shouldShowSidebar = location.pathname !== '/' && analysisResult !== null;

  return (
    <div className="flex min-h-screen">
      {shouldShowSidebar && (
        <>
          {/* Mobile sidebar */}
          <div 
            className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-20 transition-opacity duration-300 md:hidden ${
              sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setSidebarOpen(false)}
          />
          
          <div 
            className={`fixed inset-y-0 start-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 md:translate-x-0 md:static md:z-auto ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <Sidebar />
          </div>
        </>
      )}

      <div className={`flex flex-col flex-1 min-w-0 ${shouldShowSidebar ? 'md:ms-64' : ''}`}>
        <Header 
          onMenuClick={() => setSidebarOpen(prev => !prev)} 
          showMenuButton={shouldShowSidebar} 
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;