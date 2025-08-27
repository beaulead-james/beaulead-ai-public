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
        
        {/* About 서브메뉴 */}
        <div className="space-y-1">
          <div className="mobile-menu-item font-semibold text-white/90">
            {t.nav.about}
          </div>
          <Link href="/about/philosophy" className="mobile-menu-item ml-4 text-sm" onClick={handleLinkClick} data-testid="link-mobile-philosophy">
            {t.nav.philosophy}
          </Link>
          <Link href="/about/leadership" className="mobile-menu-item ml-4 text-sm" onClick={handleLinkClick} data-testid="link-mobile-leadership">
            {t.nav.leadership}
          </Link>
          <Link href="/about/profile" className="mobile-menu-item ml-4 text-sm" onClick={handleLinkClick} data-testid="link-mobile-profile">
            {t.nav.profile}
          </Link>
          <Link href="/about/location" className="mobile-menu-item ml-4 text-sm" onClick={handleLinkClick} data-testid="link-mobile-location">
            {t.nav.location}
          </Link>
          <Link href="/about/history" className="mobile-menu-item ml-4 text-sm" onClick={handleLinkClick} data-testid="link-mobile-history">
            {t.nav.history}
          </Link>
          <Link href="/about/brand" className="mobile-menu-item ml-4 text-sm" onClick={handleLinkClick} data-testid="link-mobile-brand">
            브랜드 CI
          </Link>
        </div>
        
        {/* Services 서브메뉴 */}
        <div className="space-y-1">
          <div className="mobile-menu-item font-semibold text-white/90">
            {t.nav.services}
          </div>
          <Link href="/services/google-ads" className="mobile-menu-item ml-4 text-sm" onClick={handleLinkClick} data-testid="link-mobile-google-ads">
            {t.nav.googleAds}
          </Link>
          <Link href="/services/naver-ads" className="mobile-menu-item ml-4 text-sm" onClick={handleLinkClick} data-testid="link-mobile-naver-ads">
            {t.nav.naverAds}
          </Link>
          <Link href="/services/meta-ads" className="mobile-menu-item ml-4 text-sm" onClick={handleLinkClick} data-testid="link-mobile-meta-ads">
            {t.nav.metaAds}
          </Link>
          <Link href="/services/kakao-ads" className="mobile-menu-item ml-4 text-sm" onClick={handleLinkClick} data-testid="link-mobile-kakao-ads">
            {t.nav.kakaoAds}
          </Link>
        </div>
        
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
