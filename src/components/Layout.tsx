import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  rightSidebar?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, rightSidebar }) => {
  const location = useLocation();
  const showRightSidebar = rightSidebar && location.pathname.includes('/blog/');

  return (
    <div className="min-h-screen flex flex-col bg-[#181818] text-vscode-text">
      <Navbar />
      <div className="flex flex-1">
        <main className="flex-1 p-6 md:p-8 animate-fade-in">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>

        {showRightSidebar && (
          <aside className="hidden lg:block w-64 p-16 border-l border-vscode-border">
            {rightSidebar}
          </aside>
        )}
      </div>
    </div>
  );
};

export default Layout;
