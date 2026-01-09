
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Index";
import Blog from "./pages/Blog";
import Projects from "./pages/Projects";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

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
            <Route path="/" element={<Layout children={<Home />} />} />
            <Route path="/blog" element={<Layout children={<Blog />} />} />
            <Route path="/blog/:id" element={<Layout children={<Blog />} />} />
            <Route path="/projects" element={<Layout children={<Projects />} />} />
            <Route path="/about" element={<Layout children={<About />} />} />
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
