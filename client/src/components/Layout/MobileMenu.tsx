import { Link } from 'wouter';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import '../../styles/hero.css';

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
    <div className="lg:hidden mobile-menu" data-testid="mobile-menu">
      <div className="container max-w-7xl mx-auto py-6 space-y-1">
        <Link href="/" className="mobile-menu-item" onClick={handleLinkClick} data-testid="link-mobile-home">
          {t.nav.home}
        </Link>
        <Link href="/about" className="mobile-menu-item" onClick={handleLinkClick} data-testid="link-mobile-about">
          {t.nav.about}
        </Link>
        <Link href="/services" className="mobile-menu-item" onClick={handleLinkClick} data-testid="link-mobile-services">
          {t.nav.services}
        </Link>
        <Link href="/blog" className="mobile-menu-item" onClick={handleLinkClick} data-testid="link-mobile-blog">
          {t.nav.blog}
        </Link>
        <Link href="/portfolio" className="mobile-menu-item" onClick={handleLinkClick} data-testid="link-mobile-portfolio">
          {t.nav.portfolio}
        </Link>
        <Link href="/contact" className="mobile-menu-item" onClick={handleLinkClick} data-testid="link-mobile-contact">
          {t.nav.contact}
        </Link>
        
        <div className="pt-4 mt-4 border-t border-white/20">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="modern-cta-btn block text-center mb-3" onClick={handleLinkClick} data-testid="link-mobile-dashboard">
                {t.nav.dashboard}
              </Link>
              <a href="/api/logout" className="mobile-menu-item" data-testid="link-mobile-logout">
                Logout
              </a>
            </>
          ) : (
            <a href="/api/login" className="modern-cta-btn block text-center" data-testid="link-mobile-signin">
              {t.nav.signIn}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
