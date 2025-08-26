import { useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../UI/LanguageSwitcher';
import MobileMenu from './MobileMenu';

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-primary-600" data-testid="link-home">
                뷰리드AI
              </Link>
              
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium" data-testid="link-nav-home">
                  {t.nav.home}
                </Link>
                
                <div className="relative group">
                  <button className="text-gray-700 hover:text-primary-600 transition-colors font-medium flex items-center" data-testid="button-nav-about">
                    {t.nav.about} <i className="fas fa-chevron-down ml-1 text-xs"></i>
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/about/philosophy" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50" data-testid="link-nav-philosophy">
                      {t.nav.philosophy}
                    </Link>
                    <Link href="/about/leadership" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50" data-testid="link-nav-leadership">
                      {t.nav.leadership}
                    </Link>
                    <Link href="/about/profile" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50" data-testid="link-nav-profile">
                      {t.nav.profile}
                    </Link>
                    <Link href="/about/location" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50" data-testid="link-nav-location">
                      {t.nav.location}
                    </Link>
                    <Link href="/about/history" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50" data-testid="link-nav-history">
                      {t.nav.history}
                    </Link>
                  </div>
                </div>
                
                <div className="relative group">
                  <button className="text-gray-700 hover:text-primary-600 transition-colors font-medium flex items-center" data-testid="button-nav-services">
                    {t.nav.services} <i className="fas fa-chevron-down ml-1 text-xs"></i>
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link href="/services/google-ads" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50" data-testid="link-nav-google-ads">
                      {t.nav.googleAds}
                    </Link>
                    <Link href="/services/naver-ads" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50" data-testid="link-nav-naver-ads">
                      {t.nav.naverAds}
                    </Link>
                    <Link href="/services/meta-ads" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50" data-testid="link-nav-meta-ads">
                      {t.nav.metaAds}
                    </Link>
                    <Link href="/services/kakao-ads" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50" data-testid="link-nav-kakao-ads">
                      {t.nav.kakaoAds}
                    </Link>
                  </div>
                </div>
                
                <Link href="/blog" className="text-gray-700 hover:text-primary-600 transition-colors font-medium" data-testid="link-nav-blog">
                  {t.nav.blog}
                </Link>
                <Link href="/portfolio" className="text-gray-700 hover:text-primary-600 transition-colors font-medium" data-testid="link-nav-portfolio">
                  {t.nav.portfolio}
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors font-medium" data-testid="link-nav-contact">
                  {t.nav.contact}
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSwitcher />

              <div className="hidden sm:flex items-center space-x-3">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium" data-testid="link-dashboard">
                      {t.nav.dashboard}
                    </Link>
                    <a href="/api/logout" className="text-gray-700 hover:text-primary-600 font-medium transition-colors" data-testid="link-logout">
                      Logout
                    </a>
                  </>
                ) : (
                  <a href="/api/login" className="text-gray-700 hover:text-primary-600 font-medium transition-colors" data-testid="link-signin">
                    {t.nav.signIn}
                  </a>
                )}
              </div>

              <button 
                className="md:hidden text-gray-700" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
