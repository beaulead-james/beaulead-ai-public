import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../UI/LanguageSwitcher';
import ThemeSwitcher from '../UI/ThemeSwitcher';
import MobileMenu from './MobileMenu';
import '../../styles/hero.css';

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 포커 플레이어 스타일 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`modern-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container max-w-7xl mx-auto">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-10">
              <Link href="/" className="modern-logo" data-testid="link-home">
                뷰리드AI
              </Link>
              
              <div className="hidden lg:flex items-center space-x-2">
                <Link href="/" className="modern-nav-link" data-testid="link-nav-home">
                  {t.nav.home}
                </Link>
                
                <div className="relative group">
                  <button className="modern-nav-link flex items-center" data-testid="button-nav-about">
                    {t.nav.about} 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-2 dropdown-menu opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link href="/about/philosophy" className="dropdown-item" data-testid="link-nav-philosophy">
                      {t.nav.philosophy}
                    </Link>
                    <Link href="/about/leadership" className="dropdown-item" data-testid="link-nav-leadership">
                      {t.nav.leadership}
                    </Link>
                    <Link href="/about/profile" className="dropdown-item" data-testid="link-nav-profile">
                      {t.nav.profile}
                    </Link>
                    <Link href="/about/location" className="dropdown-item" data-testid="link-nav-location">
                      {t.nav.location}
                    </Link>
                    <Link href="/about/history" className="dropdown-item" data-testid="link-nav-history">
                      {t.nav.history}
                    </Link>
                    <Link href="/about/brand" className="dropdown-item" data-testid="link-nav-brand">
                      브랜드 CI
                    </Link>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="modern-nav-link flex items-center" data-testid="button-nav-services">
                    {t.nav.services} 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute top-full left-0 mt-2 dropdown-menu opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <Link href="/services/google-ads" className="dropdown-item" data-testid="link-nav-google-ads">
                      {t.nav.googleAds}
                    </Link>
                    <Link href="/services/naver-ads" className="dropdown-item" data-testid="link-nav-naver-ads">
                      {t.nav.naverAds}
                    </Link>
                    <Link href="/services/meta-ads" className="dropdown-item" data-testid="link-nav-meta-ads">
                      {t.nav.metaAds}
                    </Link>
                    <Link href="/services/kakao-ads" className="dropdown-item" data-testid="link-nav-kakao-ads">
                      {t.nav.kakaoAds}
                    </Link>
                  </div>
                </div>
                
                <Link href="/blog" className="modern-nav-link" data-testid="link-nav-blog">
                  {t.nav.blog}
                </Link>
                <Link href="/portfolio" className="modern-nav-link" data-testid="link-nav-portfolio">
                  {t.nav.portfolio}
                </Link>
                <Link href="/contact" className="modern-nav-link" data-testid="link-nav-contact">
                  {t.nav.contact}
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="language-switcher">
                <LanguageSwitcher />
              </div>
              <ThemeSwitcher />

              <div className="hidden sm:flex items-center space-x-3">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard" className="modern-cta-btn" data-testid="link-dashboard">
                      {t.nav.dashboard}
                    </Link>
                    <a href="/api/logout" className="modern-nav-link" data-testid="link-logout">
                      Logout
                    </a>
                  </>
                ) : (
                  <a href="/api/login" className="modern-cta-btn" data-testid="link-signin">
                    {t.nav.signIn}
                  </a>
                )}
              </div>

              <button 
                className="lg:hidden text-white hover:text-white/80 transition-colors p-2" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
