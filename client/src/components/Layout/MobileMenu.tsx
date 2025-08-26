import { Link } from 'wouter';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="md:hidden bg-white border-b border-gray-200" data-testid="mobile-menu">
      <div className="container max-w-7xl mx-auto py-4 space-y-3">
        <Link href="/" className="block text-gray-700 hover:text-primary-600 font-medium" onClick={handleLinkClick} data-testid="link-mobile-home">
          {t.nav.home}
        </Link>
        <Link href="/about" className="block text-gray-700 hover:text-primary-600 font-medium" onClick={handleLinkClick} data-testid="link-mobile-about">
          {t.nav.about}
        </Link>
        <Link href="/services" className="block text-gray-700 hover:text-primary-600 font-medium" onClick={handleLinkClick} data-testid="link-mobile-services">
          {t.nav.services}
        </Link>
        <Link href="/blog" className="block text-gray-700 hover:text-primary-600 font-medium" onClick={handleLinkClick} data-testid="link-mobile-blog">
          {t.nav.blog}
        </Link>
        <Link href="/portfolio" className="block text-gray-700 hover:text-primary-600 font-medium" onClick={handleLinkClick} data-testid="link-mobile-portfolio">
          {t.nav.portfolio}
        </Link>
        <Link href="/contact" className="block text-gray-700 hover:text-primary-600 font-medium" onClick={handleLinkClick} data-testid="link-mobile-contact">
          {t.nav.contact}
        </Link>
        
        <div className="pt-3 border-t border-gray-200">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="block bg-primary-600 text-white px-4 py-2 rounded-lg text-center font-medium mb-2" onClick={handleLinkClick} data-testid="link-mobile-dashboard">
                {t.nav.dashboard}
              </Link>
              <a href="/api/logout" className="block text-gray-700 hover:text-primary-600 font-medium" data-testid="link-mobile-logout">
                Logout
              </a>
            </>
          ) : (
            <a href="/api/login" className="block text-gray-700 hover:text-primary-600 font-medium" data-testid="link-mobile-signin">
              {t.nav.signIn}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
