import { Link } from 'wouter';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/UI/SEO';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ContactForm from '../components/Forms/ContactForm';

export default function Landing() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Background orbs */}
      <div className="bg-orb">
        <div className="orb orb-a"></div>
        <div className="orb orb-b"></div>
      </div>
      
      <SEO />
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-card px-4 py-2 rounded-full border border-border mb-6">
                <span className="text-sm font-medium text-primary">✨ 프리미엄</span>
              </div>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6" data-testid="text-hero-title">
                {t.hero.title.split('\n').map((line, index) => (
                  <span key={index}>
                    {index === 1 ? <span className="premium-gradient bg-clip-text text-transparent">{line}</span> : line}
                    {index < t.hero.title.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-hero-subtitle">
                {t.hero.subtitle.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < t.hero.subtitle.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact" 
                  className="premium-gradient text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-center glow-effect"
                  data-testid="button-cta-contact"
                >
                  {t.hero.cta1}
                </Link>
                <Link 
                  href="/portfolio" 
                  className="premium-card text-foreground px-8 py-4 rounded-xl font-semibold hover:border-primary/50 transition-all duration-300 text-center"
                  data-testid="button-cta-portfolio"
                >
                  {t.hero.cta2}
                </Link>
              </div>
            </div>
            <div className="relative">
              {/* Hero dashboard mockup */}
              <div className="premium-card rounded-2xl shadow-2xl p-6 glow-effect">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-foreground" data-testid="text-dashboard-title">
                    퍼포먼스 대시보드
                  </h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                    <div className="text-sm text-primary font-medium" data-testid="text-metric-revenue-label">
                      총 매출
                    </div>
                    <div className="text-2xl font-bold text-primary" data-testid="text-metric-revenue-value">
                      ₩12.5M
                    </div>
                    <div className="text-xs text-primary/70" data-testid="text-metric-revenue-change">
                      +24% 증가
                    </div>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                    <div className="text-sm text-accent font-medium" data-testid="text-metric-roas-label">
                      ROAS
                    </div>
                    <div className="text-2xl font-bold text-accent" data-testid="text-metric-roas-value">
                      487%
                    </div>
                    <div className="text-xs text-accent/70" data-testid="text-metric-roas-change">
                      +12% 개선
                    </div>
                  </div>
                </div>
                <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-end justify-around p-4">
                  <div className="w-8 bg-primary rounded-t" style={{ height: '60%' }}></div>
                  <div className="w-8 bg-primary rounded-t" style={{ height: '80%' }}></div>
                  <div className="w-8 bg-accent rounded-t" style={{ height: '90%' }}></div>
                  <div className="w-8 bg-accent rounded-t" style={{ height: '75%' }}></div>
                  <div className="w-8 bg-primary rounded-t" style={{ height: '95%' }}></div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 premium-card rounded-lg shadow-lg p-3">
                <i className="fas fa-chart-line text-primary text-xl"></i>
              </div>
              <div className="absolute -bottom-4 -left-4 premium-card rounded-lg shadow-lg p-3">
                <i className="fas fa-bullseye text-accent text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-services-title">
              {t.services.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-services-subtitle">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group premium-card rounded-xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <i className="fab fa-google text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-service-google-title">
                {t.services.googleAds.title}
              </h3>
              <p className="text-muted-foreground mb-4" data-testid="text-service-google-description">
                {t.services.googleAds.description}
              </p>
              <Link 
                href="/services/google-ads" 
                className="text-primary font-medium hover:text-primary/80 transition-colors"
                data-testid="link-service-google"
              >
                {t.services.learnMore} <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>

            <div className="group premium-card rounded-xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                <span className="text-2xl font-bold text-accent">N</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-service-naver-title">
                {t.services.naverAds.title}
              </h3>
              <p className="text-muted-foreground mb-4" data-testid="text-service-naver-description">
                {t.services.naverAds.description}
              </p>
              <Link 
                href="/services/naver-ads" 
                className="text-primary font-medium hover:text-primary/80 transition-colors"
                data-testid="link-service-naver"
              >
                {t.services.learnMore} <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>

            <div className="group premium-card rounded-xl p-6 hover:shadow-xl hover:border-primary/30 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <i className="fab fa-facebook text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2" data-testid="text-service-meta-title">
                {t.services.metaAds.title}
              </h3>
              <p className="text-gray-600 mb-4" data-testid="text-service-meta-description">
                {t.services.metaAds.description}
              </p>
              <Link 
                href="/services/meta-ads" 
                className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
                data-testid="link-service-meta"
              >
                {t.services.learnMore} <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>

            <div className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary-200 transition-all duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors">
                <span className="text-2xl font-bold text-yellow-600">K</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2" data-testid="text-service-kakao-title">
                {t.services.kakaoAds.title}
              </h3>
              <p className="text-gray-600 mb-4" data-testid="text-service-kakao-description">
                {t.services.kakaoAds.description}
              </p>
              <Link 
                href="/services/kakao-ads" 
                className="text-primary-600 font-medium hover:text-primary-700 transition-colors"
                data-testid="link-service-kakao"
              >
                {t.services.learnMore} <i className="fas fa-arrow-right ml-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-primary-600">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" data-testid="text-stats-title">
              {t.stats.title}
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto" data-testid="text-stats-subtitle">
              {t.stats.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2" data-testid="text-stat-projects-value">
                200+
              </div>
              <div className="text-primary-100 font-medium" data-testid="text-stat-projects-label">
                {t.stats.projects}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2" data-testid="text-stat-roas-value">
                487%
              </div>
              <div className="text-primary-100 font-medium" data-testid="text-stat-roas-label">
                {t.stats.roas}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2" data-testid="text-stat-revenue-value">
                ₩12.5B
              </div>
              <div className="text-primary-100 font-medium" data-testid="text-stat-revenue-label">
                {t.stats.revenue}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2" data-testid="text-stat-satisfaction-value">
                98%
              </div>
              <div className="text-primary-100 font-medium" data-testid="text-stat-satisfaction-label">
                {t.stats.satisfaction}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="text-contact-title">
                {t.contact.title}
              </h2>
              <p className="text-xl text-gray-600" data-testid="text-contact-subtitle">
                {t.contact.subtitle}
              </p>
            </div>

            <ContactForm />

            {/* Contact info */}
            <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-phone text-primary-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2" data-testid="text-contact-phone-title">
                  {t.contact.phone.title}
                </h4>
                <p className="text-gray-600" data-testid="text-contact-phone-value">
                  {t.contact.phone.value}
                </p>
                <p className="text-sm text-gray-500 mt-1" data-testid="text-contact-phone-hours">
                  {t.contact.phone.hours}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-envelope text-primary-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2" data-testid="text-contact-email-title">
                  {t.contact.email.title}
                </h4>
                <p className="text-gray-600" data-testid="text-contact-email-value">
                  {t.contact.email.value}
                </p>
                <p className="text-sm text-gray-500 mt-1" data-testid="text-contact-email-response">
                  {t.contact.email.response}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-map-marker-alt text-primary-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2" data-testid="text-contact-location-title">
                  {t.contact.location.title}
                </h4>
                <p className="text-gray-600" data-testid="text-contact-location-value">
                  {t.contact.location.value.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < t.contact.location.value.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <Link 
                  href="/about/location" 
                  className="text-sm text-primary-600 hover:text-primary-700 mt-1"
                  data-testid="link-contact-location"
                >
                  {t.contact.location.link}
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
