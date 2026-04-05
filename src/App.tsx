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
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";

const queryClient = new QueryClient();

const AppContent = () => {
  useFacebookPixel();
  const location = useLocation();
  const { isProjectLoading } = useLoading();
  const [isNavigatingToProject, setIsNavigatingToProject] = useState(false);

  useEffect(() => {
    const isProjectPage = location.pathname.startsWith('/project/');
    setIsNavigatingToProject(isProjectPage);
  }, [location.pathname]);
  
  const isLoading = isNavigatingToProject && isProjectLoading;
  
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
        <LoadingProvider>
          <AppContent />
        </LoadingProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
