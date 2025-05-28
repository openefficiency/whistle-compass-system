import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"

// Public Pages
import HomePage from "@/pages/public/HomePage"
import FollowUpPage from "@/pages/public/FollowUpPage"
import NotFound from "@/pages/NotFound"

// Auth Pages
import LoginPage from "@/pages/auth/LoginPage"
import SignupPage from "@/pages/auth/SignupPage"

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard"
import UserManagement from "@/pages/admin/UserManagement"
import CompanySettings from "@/pages/admin/CompanySettings"
import MarketingTools from "@/pages/admin/MarketingTools"

// Ethics Officer Pages
import EthicsOfficerDashboard from "@/pages/ethics-officer/EthicsOfficerDashboard"
import CaseDetails from "@/pages/ethics-officer/CaseDetails"
import RewardManagement from "@/pages/ethics-officer/RewardManagement"

// Investigator Pages
import InvestigatorDashboard from "@/pages/investigator/InvestigatorDashboard"
import InvestigationDetails from "@/pages/investigator/InvestigationDetails"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="aegis-theme">
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/follow-up" element={<FollowUpPage />} />

              {/* Auth Routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/settings" element={<CompanySettings />} />
              <Route path="/admin/marketing" element={<MarketingTools />} />

              {/* Ethics Officer Routes */}
              <Route path="/ethics-officer/dashboard" element={<EthicsOfficerDashboard />} />
              <Route path="/ethics-officer/case/:id" element={<CaseDetails />} />
              <Route path="/ethics-officer/rewards" element={<RewardManagement />} />

              {/* Investigator Routes */}
              <Route path="/investigator/dashboard" element={<InvestigatorDashboard />} />
              <Route path="/investigator/case/:id" element={<InvestigationDetails />} />

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
)

export default App
