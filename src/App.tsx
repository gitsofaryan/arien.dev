
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Index";
import Blog from "./pages/Blog";
import Notes from "./pages/Notes";
import Projects from "./pages/Projects";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Write from "./pages/Write";
import Auth from "./pages/Auth";
import GitHubCallback from "./pages/GitHubCallback";

// Table of Contents component for the blog post right sidebar
const TableOfContents = () => {
  return (
    <div>
      <h3 className="font-medium mb-2 text-white">Table of Contents</h3>
      <div className="text-sm">
        {/* TOC content is dynamically generated in the BlogPost component */}
      </div>
    </div>
  );
};

// Create a new component for the app content to ensure proper React context
const AppContent = () => {
  // Create a new QueryClient instance within the component
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      }
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/github-callback" element={<GitHubCallback />} />
            <Route path="/" element={<Layout children={<Home />} />} />
            <Route path="/blog" element={<Layout children={<Blog />} rightSidebar={<TableOfContents />} />} />
            <Route path="/notes" element={<Layout children={<Notes />} />} />
            <Route path="/projects" element={<Layout children={<Projects />} />} />
            <Route path="/about" element={<Layout children={<About />} />} />
            <Route path="/write" element={<Layout children={<Write />} />} />
            <Route path="*" element={<Layout children={<NotFound />} />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Render the App with proper React component structure
const App = () => {
  return <AppContent />;
};

export default App;
