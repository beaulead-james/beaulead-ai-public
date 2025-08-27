import { Link } from 'wouter';
import { useLanguage } from '../contexts/LanguageContext';
import ContactForm from '../components/Forms/ContactForm';
import Footer from '../components/Layout/Footer';
import '../styles/hero.css';

export default function Landing() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="container max-w-7xl mx-auto px-4 h-screen flex items-center">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="hero-title mb-6" data-testid="text-hero-title">
                {t.hero.title.split(' ').map((word, index) => (
                  <span key={index}>
                    {word === '데이터' || word === '기반' ? (
                      <span className="highlight-text">{word}</span>
                    ) : (
                      word
                    )}
                    {index < t.hero.title.split(' ').length - 1 && ' '}
                  </span>
                ))}
              </h1>
              <p className="hero-subtitle mx-auto mb-8" data-testid="text-hero-subtitle">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="hero-cta" 
                  data-testid="button-hero-contact"
                >
                  <span>{t.hero.cta1}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/portfolio" 
                  className="hero-cta bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900" 
                  data-testid="button-hero-portfolio"
                >
                  <span>{t.hero.cta2}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section section-gray">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title" data-testid="text-services-title">
              {t.services.title}
            </h2>
            <p className="section-subtitle" data-testid="text-services-subtitle">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="service-card animate-fade-in-up">
              <div className="service-icon">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3" data-testid="text-service-google-title">
                {t.services.googleAds.title}
              </h3>
              <p className="text-gray-600 mb-4" data-testid="text-service-google-description">
                {t.services.googleAds.description}
              </p>
              <Link 
                href="/services/google-ads" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                data-testid="link-service-google"
              >
                <span>{t.services.learnMore}</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="service-card animate-fade-in-up animate-delay-100">
              <div className="service-icon">
                <span className="text-xl font-bold">N</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3" data-testid="text-service-naver-title">
                {t.services.naverAds.title}
              </h3>
              <p className="text-gray-600 mb-4" data-testid="text-service-naver-description">
                {t.services.naverAds.description}
              </p>
              <Link 
                href="/services/naver-ads" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                data-testid="link-service-naver"
              >
                <span>{t.services.learnMore}</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="service-card animate-fade-in-up animate-delay-200">
              <div className="service-icon">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3" data-testid="text-service-meta-title">
                {t.services.metaAds.title}
              </h3>
              <p className="text-gray-600 mb-4" data-testid="text-service-meta-description">
                {t.services.metaAds.description}
              </p>
              <Link 
                href="/services/meta-ads" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                data-testid="link-service-meta"
              >
                <span>{t.services.learnMore}</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="service-card animate-fade-in-up animate-delay-300">
              <div className="service-icon">
                <span className="text-xl font-bold">K</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3" data-testid="text-service-kakao-title">
                {t.services.kakaoAds.title}
              </h3>
              <p className="text-gray-600 mb-4" data-testid="text-service-kakao-description">
                {t.services.kakaoAds.description}
              </p>
              <Link 
                href="/services/kakao-ads" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                data-testid="link-service-kakao"
              >
                <span>{t.services.learnMore}</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title" data-testid="text-stats-title">
              {t.stats.title}
            </h2>
            <p className="section-subtitle" data-testid="text-stats-subtitle">
              {t.stats.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="stats-card animate-fade-in-up">
              <div className="stats-number" data-testid="text-stat-projects-value">
                200+
              </div>
              <div className="stats-label" data-testid="text-stat-projects-label">
                {t.stats.projects}
              </div>
            </div>
            <div className="stats-card animate-fade-in-up animate-delay-100">
              <div className="stats-number" data-testid="text-stat-roas-value">
                487%
              </div>
              <div className="stats-label" data-testid="text-stat-roas-label">
                {t.stats.roas}
              </div>
            </div>
            <div className="stats-card animate-fade-in-up animate-delay-200">
              <div className="stats-number" data-testid="text-stat-revenue-value">
                ₩12.5B
              </div>
              <div className="stats-label" data-testid="text-stat-revenue-label">
                {t.stats.revenue}
              </div>
            </div>
            <div className="stats-card animate-fade-in-up animate-delay-300">
              <div className="stats-number" data-testid="text-stat-satisfaction-value">
                98%
              </div>
              <div className="stats-label" data-testid="text-stat-satisfaction-label">
                {t.stats.satisfaction}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section section-gray">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-title" data-testid="text-contact-title">
                {t.contact.title}
              </h2>
              <p className="section-subtitle" data-testid="text-contact-subtitle">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="mb-16">
              <ContactForm />
            </div>

            {/* Contact info */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="contact-card animate-fade-in-up">
                <div className="contact-icon">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2" data-testid="text-contact-phone-title">
                  {t.contact.phone.title}
                </h4>
                <p className="text-gray-600 mb-1" data-testid="text-contact-phone-value">
                  {t.contact.phone.value}
                </p>
                <p className="text-sm text-gray-500" data-testid="text-contact-phone-hours">
                  {t.contact.phone.hours}
                </p>
              </div>
              
              <div className="contact-card animate-fade-in-up animate-delay-100">
                <div className="contact-icon">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2" data-testid="text-contact-email-title">
                  {t.contact.email.title}
                </h4>
                <p className="text-gray-600 mb-1" data-testid="text-contact-email-value">
                  {t.contact.email.value}
                </p>
                <p className="text-sm text-gray-500" data-testid="text-contact-email-response">
                  {t.contact.email.response}
                </p>
              </div>
              
              <div className="contact-card animate-fade-in-up animate-delay-200">
                <div className="contact-icon">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2" data-testid="text-contact-location-title">
                  {t.contact.location.title}
                </h4>
                <p className="text-gray-600 mb-2" data-testid="text-contact-location-value">
                  {t.contact.location.value.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < t.contact.location.value.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <Link 
                  href="/about/location" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  data-testid="link-contact-location"
                >
                  <span>{t.contact.location.link}</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}