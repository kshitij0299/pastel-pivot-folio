import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import { ProjectDetail } from "./pages/ProjectDetail";
import { LogosCaseStudies } from "./pages/LogosCaseStudies";
import NotFound from "./pages/NotFound";
import { useFacebookPixel } from "./hooks/useFacebookPixel";
import { LiquidLoader } from "./components/LiquidLoader";

const queryClient = new QueryClient();

const AppContent = () => {
  useFacebookPixel();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [prevPathname, setPrevPathname] = useState(location.pathname);

  useEffect(() => {
    // Show loader only when navigating to project pages (work pages)
    const isNavigatingToProject = location.pathname.startsWith('/project/');
    const wasOnProject = prevPathname.startsWith('/project/');
    
    if (isNavigatingToProject && !wasOnProject) {
      // Navigating TO a project page from a non-project page
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500); // Show loader for 1.5 seconds when navigating to project pages
      setPrevPathname(location.pathname);
      return () => clearTimeout(timer);
    } else {
      // Not navigating to a project page, no loader needed
      setPrevPathname(location.pathname);
    }
  }, [location.pathname, prevPathname]);
  
  return (
    <>
      <LiquidLoader isLoading={isLoading} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/logos-case-studies" element={<LogosCaseStudies />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
