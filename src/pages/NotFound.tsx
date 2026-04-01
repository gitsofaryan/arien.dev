
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-6xl font-bold mb-4 text-vscode-accent">404</div>
      <h1 className="text-3xl font-bold mb-8">This page is missing</h1>
      <p className="text-vscode-text mb-8 max-w-md">
        The link may be outdated, or the page may have been moved during a recent update.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-vscode-accent hover:bg-opacity-90 text-vscode-bg rounded-md transition-colors"
      >
        Back to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
