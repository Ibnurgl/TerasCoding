import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Index from "./pages/Index";
import CourseDetail from "./pages/CourseDetail";
import Playground from "./pages/Playground";
import Placeholder from "./pages/Placeholder";
import LessonPage from "./pages/LessonPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

function RootApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/kursus/:id" element={<CourseDetail />} />
              <Route path="/kursus/:courseId/materi/:sectionIdx/:lessonIdx" element={ <ProtectedRoute><LessonPage /></ProtectedRoute>}/>
              <Route path="/playground" element={<Playground />} />
              <Route path="/tantangan" element={<Placeholder />} />
              <Route path="/komunitas" element={<Placeholder />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<RootApp />);