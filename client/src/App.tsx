import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useAuth } from "./hooks/useAuth";

// Import pages
import NotFound from "@/pages/not-found";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

// About pages
import About from "./pages/About/About";
import Philosophy from "./pages/About/Philosophy";
import Leadership from "./pages/About/Leadership";
import Profile from "./pages/About/Profile";
import Location from "./pages/About/Location";
import History from "./pages/About/History";
import Brand from "./pages/About/Brand";

// Services pages
import Services from "./pages/Services/Services";
import GoogleAds from "./pages/Services/GoogleAds";
import NaverAds from "./pages/Services/NaverAds";
import MetaAds from "./pages/Services/MetaAds";
import KakaoAds from "./pages/Services/KakaoAds";

// Blog pages
import BlogList from "./pages/Blog/BlogList";
import BlogPost from "./pages/Blog/BlogPost";

// Portfolio pages
import PortfolioList from "./pages/Portfolio/PortfolioList";
import PortfolioItem from "./pages/Portfolio/PortfolioItem";

// Careers
import Careers from "./pages/Careers";

// Admin pages
import AdminDashboard from "./pages/Admin/Dashboard";
import BlogManagement from "./pages/Admin/BlogManagement";
import PortfolioManagement from "./pages/Admin/PortfolioManagement";
import Analytics from "./pages/Admin/Analytics";
import Users from "./pages/Admin/Users";

// Client Dashboard
import ClientDashboard from "./pages/ClientDashboard";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={isAuthenticated ? Home : Landing} />
      
      {/* About Routes */}
      <Route path="/about" component={About} />
      <Route path="/about/philosophy" component={Philosophy} />
      <Route path="/about/leadership" component={Leadership} />
      <Route path="/about/profile" component={Profile} />
      <Route path="/about/location" component={Location} />
      <Route path="/about/history" component={History} />
      <Route path="/about/brand" component={Brand} />
      
      {/* Services Routes */}
      <Route path="/services" component={Services} />
      <Route path="/services/google-ads" component={GoogleAds} />
      <Route path="/services/naver-ads" component={NaverAds} />
      <Route path="/services/meta-ads" component={MetaAds} />
      <Route path="/services/kakao-ads" component={KakaoAds} />
      
      {/* Blog Routes */}
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:slug" component={BlogPost} />
      
      {/* Portfolio Routes */}
      <Route path="/portfolio" component={PortfolioList} />
      <Route path="/portfolio/:slug" component={PortfolioItem} />
      
      {/* Contact & Careers */}
      <Route path="/contact" component={Contact} />
      <Route path="/careers" component={Careers} />
      
      {/* Protected Routes - Admin */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/blog" component={BlogManagement} />
      <Route path="/admin/portfolio" component={PortfolioManagement} />
      <Route path="/admin/analytics" component={Analytics} />
      <Route path="/admin/users" component={Users} />
      
      {/* Protected Routes - Client Dashboard */}
      <Route path="/dashboard" component={ClientDashboard} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Router />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
