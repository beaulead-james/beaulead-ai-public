import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../hooks/useAuth';
import Landing from './Landing';

export default function Home() {
  const { isAuthenticated } = useAuth();
  
  // For now, show landing page for all users
  // In the future, we could show a different home page for authenticated users
  return <Landing />;
}
