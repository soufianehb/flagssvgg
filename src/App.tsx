
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TranslationProvider } from "./contexts/TranslationContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import SecurityPage from "./pages/SecurityPage";
import PreferencesPage from "./pages/PreferencesPage";
import ListingsPage from "./pages/ListingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TranslationProvider>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/security" element={<SecurityPage />} />
              <Route path="/profile/preferences" element={<PreferencesPage />} />
              <Route path="/profile/listings" element={<ListingsPage />} />
            </Routes>
          </AuthProvider>
        </TooltipProvider>
      </TranslationProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
