import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandidateLanding from "./pages/CandidateLanding";
import CVUpload from "./pages/CVUpload";
import AIInterview from "./pages/AIInterview";
import InterviewComplete from "./pages/InterviewComplete";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CandidateLanding />} />
          <Route path="/cv-upload" element={<CVUpload />} />
          <Route path="/interview" element={<AIInterview />} />
          <Route path="/interview-complete" element={<InterviewComplete />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
