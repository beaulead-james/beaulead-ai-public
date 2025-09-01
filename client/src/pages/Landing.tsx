import { Link } from 'wouter';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/UI/SEO';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ContactForm from '../components/Forms/ContactForm';
import { useQuery } from '@tanstack/react-query';
import type { Blog } from '../../../shared/schema';
import '../styles/hero.css';

function BlogPosts() {
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['/api/blogs'],
    queryFn: async () => {
      const response = await fetch('/api/blogs?published=true');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      return await response.json() as Blog[];
    }
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="service-card animate-pulse">
            <div className="h-48 bg-white/10 rounded-lg mb-6"></div>
            <div className="h-6 bg-white/10 rounded mb-4"></div>
            <div className="h-4 bg-white/10 rounded mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  const displayBlogs = blogs.slice(0, 6);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayBlogs.map((blog, index) => (
        <Link 
          key={blog.id} 
          href={`/blog/${blog.slug}`}
          className="service-card group hover:bg-white/10 transition-all duration-300 cursor-pointer"
          data-testid={`blog-card-${index}`}
        >
          {blog.coverUrl && (
            <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-6 overflow-hidden">
              <img 
                src={blog.coverUrl} 
                alt={blog.titleKo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          {!blog.coverUrl && (
            <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-6 flex items-center justify-center">
              <svg className="w-16 h-16 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          )}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors" data-testid={`blog-title-${index}`}>
            {blog.titleKo}
          </h3>
          <p className="text-white/70 mb-4 line-clamp-3" data-testid={`blog-excerpt-${index}`}>
            {blog.excerptKo || blog.contentKo.substring(0, 120) + '...'}
          </p>
          <div className="text-sm text-white/50">
            {new Date(blog.createdAt).toLocaleDateString('ko-KR')}
          </div>
        </Link>
      ))}
    </div>
  );
}

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
      <section className="hero-container relative py-24 lg:py-40 overflow-hidden">
        <div className="container max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
                <span className="text-sm font-semibold text-white">✨ AI 기반 퍼포먼스 마케팅</span>
              </div>
              <h1 className="hero-title" data-testid="text-hero-title">
                {t.hero.title.split('\n').map((line, index) => (
                  <span key={index}>
                    {index === 1 ? <span className="marker">{line}</span> : line}
                    {index < t.hero.title.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </h1>
              <p className="hero-subtitle text-white/80" data-testid="text-hero-subtitle">
                {t.hero.subtitle.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < t.hero.subtitle.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  href="/contact" 
                  className="modern-btn"
                  data-testid="button-cta-contact"
                >
                  <span>{t.hero.cta1}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/portfolio" 
                  className="modern-btn-outline"
                  data-testid="button-cta-portfolio"
                >
                  <span>{t.hero.cta2}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="relative">
              {/* 현대적인 대시보드 모형 */}
              <div className="floating-card relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white" data-testid="text-dashboard-title">
                    AI 퍼포먼스 대시보드
                  </h3>
                  <div className="flex space-x-3">
                    <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-500 rounded-full shadow-lg"></div>
                    <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg"></div>
                    <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-lg"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 p-5 rounded-2xl border border-blue-400/30">
                    <div className="text-sm text-blue-300 font-semibold mb-2" data-testid="text-metric-revenue-label">
                      월 매출액
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-data" data-testid="text-metric-revenue-value">
                      ₩15.2M
                    </div>
                    <div className="text-sm text-green-400 font-medium font-data" data-testid="text-metric-revenue-change">
                      ↗ +32% 성장
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 p-5 rounded-2xl border border-purple-400/30">
                    <div className="text-sm text-purple-300 font-semibold mb-2" data-testid="text-metric-roas-label">
                      {t.stats.roas}
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-data" data-testid="text-metric-roas-value">
                      524%
                    </div>
                    <div className="text-sm text-green-400 font-medium font-data" data-testid="text-metric-roas-change">
                      ↗ +18% 향상
                    </div>
                  </div>
                </div>
                <div className="h-40 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl flex items-end justify-around p-6 border border-white/10">
                  <div className="w-10 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg shadow-lg" style={{ height: '55%' }}></div>
                  <div className="w-10 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-lg shadow-lg" style={{ height: '75%' }}></div>
                  <div className="w-10 bg-gradient-to-t from-pink-500 to-pink-400 rounded-t-lg shadow-lg" style={{ height: '90%' }}></div>
                  <div className="w-10 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg shadow-lg" style={{ height: '68%' }}></div>
                  <div className="w-10 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg shadow-lg" style={{ height: '95%' }}></div>
                </div>
              </div>
              {/* 플로팅 요소들 */}
              <div className="absolute -top-6 -right-6 modern-icon">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="absolute -bottom-6 -left-6 modern-icon">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio/Clients Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8">
              <span className="text-sm font-semibold text-white">🏆 {t.portfolio.clients.title.includes('무슨') ? '성공 사례' : 'Success Stories'}</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-headline font-bold text-white mb-6 leading-tight" data-testid="text-portfolio-title">
              {t.portfolio.clients.title}<br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{t.portfolio.clients.subtitle}</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed" data-testid="text-portfolio-subtitle">
              {t.portfolio.clients.description}
            </p>
          </div>

          {/* Client Logos Slider */}
          <div className="logos-slider mb-16">
            <div className="logos-track">
              {/* First set of logos */}
              <div className="logo-item">
                <div className="logo-text">Samsung</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">LG</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">SK</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">Hyundai</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">Lotte</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">CJ</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">Naver</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">Kakao</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">Coupang</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">Toss</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">Baemin</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">Yogiyo</div>
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="logo-item">
                <div className="logo-text">Samsung</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">LG</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">SK</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">Hyundai</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">Lotte</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">CJ</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">Naver</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">Kakao</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">Coupang</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">Toss</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">Baemin</div>
              </div>
              <div className="logo-item">
                <div className="logo-text">Yogiyo</div>
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="service-card text-center">
              <div className="text-4xl font-bold text-white mb-2 font-data" data-testid="text-client-count">
                120+
              </div>
              <p className="text-white/70 text-lg">{t.portfolio.clients.successfulClients}</p>
            </div>
            <div className="service-card text-center">
              <div className="text-4xl font-bold text-white mb-2 font-data" data-testid="text-campaign-count">
                500+
              </div>
              <p className="text-white/70 text-lg">{t.portfolio.clients.successfulCampaigns}</p>
            </div>
            <div className="service-card text-center">
              <div className="text-4xl font-bold text-white mb-2 font-data" data-testid="text-avg-growth">
                287%
              </div>
              <p className="text-white/70 text-lg">{t.portfolio.clients.averageGrowth}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link 
              href="/portfolio" 
              className="modern-btn text-center inline-flex items-center"
              data-testid="button-portfolio-cta"
            >
              <span>{t.portfolio.clients.viewMore}</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-transparent to-black/20">
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6" data-testid="text-services-title">
              {t.services.title}
            </h2>
            <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed" data-testid="text-services-subtitle">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="service-card group animate-fade-in-up">
              <div className="modern-icon bg-gradient-to-r from-red-500 to-orange-500">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3" data-testid="text-service-google-title">
                {t.services.googleAds.title}
              </h3>
              <p className="text-white/70 mb-6" data-testid="text-service-google-description">
                {t.services.googleAds.description}
              </p>
              <Link 
                href="/services/google-ads" 
                className="inline-flex items-center text-white font-semibold hover:text-white/80 transition-colors"
                data-testid="link-service-google"
              >
                <span>{t.services.learnMore}</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="service-card group animate-fade-in-up animate-delay-100">
              <div className="modern-icon bg-gradient-to-r from-green-500 to-emerald-500">
                <span className="text-2xl font-bold text-white">N</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3" data-testid="text-service-naver-title">
                {t.services.naverAds.title}
              </h3>
              <p className="text-white/70 mb-6" data-testid="text-service-naver-description">
                {t.services.naverAds.description}
              </p>
              <Link 
                href="/services/naver-ads" 
                className="inline-flex items-center text-white font-semibold hover:text-white/80 transition-colors"
                data-testid="link-service-naver"
              >
                <span>{t.services.learnMore}</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="service-card group animate-fade-in-up animate-delay-200">
              <div className="modern-icon bg-gradient-to-r from-blue-500 to-blue-600">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3" data-testid="text-service-meta-title">
                {t.services.metaAds.title}
              </h3>
              <p className="text-white/70 mb-6" data-testid="text-service-meta-description">
                {t.services.metaAds.description}
              </p>
              <Link 
                href="/services/meta-ads" 
                className="inline-flex items-center text-white font-semibold hover:text-white/80 transition-colors"
                data-testid="link-service-meta"
              >
                <span>{t.services.learnMore}</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="service-card group animate-fade-in-up animate-delay-300">
              <div className="modern-icon bg-gradient-to-r from-yellow-500 to-yellow-600">
                <span className="text-2xl font-bold text-white">K</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3" data-testid="text-service-kakao-title">
                {t.services.kakaoAds.title}
              </h3>
              <p className="text-white/70 mb-6" data-testid="text-service-kakao-description">
                {t.services.kakaoAds.description}
              </p>
              <Link 
                href="/services/kakao-ads" 
                className="inline-flex items-center text-white font-semibold hover:text-white/80 transition-colors"
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
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8">
              <span className="text-sm font-semibold text-white">📊 {t.stats.title.includes('뛰어난') ? '뛰어난 성과' : 'Outstanding Performance'}</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-headline font-bold text-white mb-6 leading-tight" data-testid="text-stats-title">
              {t.stats.title.split('입증된 전문성')[0]}<br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">입증된 전문성</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed" data-testid="text-stats-subtitle">
              {t.stats.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="service-card text-center group">
              <div className="modern-icon bg-gradient-to-r from-blue-500 to-blue-600 mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-white mb-3 font-data" data-testid="text-stat-projects-value">
                200+
              </div>
              <div className="text-white/70 text-lg font-medium" data-testid="text-stat-projects-label">
                {t.stats.projects}
              </div>
            </div>
            
            <div className="service-card text-center group">
              <div className="modern-icon bg-gradient-to-r from-green-500 to-emerald-600 mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-white mb-3 font-data" data-testid="text-stat-roas-value">
                487%
              </div>
              <div className="text-white/70 text-lg font-medium" data-testid="text-stat-roas-label">
                {t.stats.roas}
              </div>
            </div>
            
            <div className="service-card text-center group">
              <div className="modern-icon bg-gradient-to-r from-yellow-500 to-orange-600 mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-white mb-3 font-data" data-testid="text-stat-revenue-value">
                ₩12.5B
              </div>
              <div className="text-white/70 text-lg font-medium" data-testid="text-stat-revenue-label">
                {t.stats.revenue}
              </div>
            </div>
            
            <div className="service-card text-center group">
              <div className="modern-icon bg-gradient-to-r from-pink-500 to-purple-600 mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-white mb-3 font-data" data-testid="text-stat-satisfaction-value">
                98%
              </div>
              <div className="text-white/70 text-lg font-medium" data-testid="text-stat-satisfaction-label">
                {t.stats.satisfaction}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8">
              <span className="text-sm font-semibold text-white">📖 {t.blog.title.includes('마케팅') ? '마케팅 인사이트' : 'Marketing Insights'}</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-headline font-bold text-white mb-6 leading-tight" data-testid="text-blog-title">
              {t.blog.insights?.title || t.blog.title}<br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">{t.blog.insights?.subtitle || t.blog.subtitle}</span>
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed" data-testid="text-blog-subtitle">
              {t.blog.insights?.description || t.blog.subtitle}
            </p>
          </div>

          {/* Blog Posts Grid */}
          <BlogPosts />

          {/* CTA */}
          <div className="text-center mt-16">
            <Link 
              href="/blog" 
              className="modern-btn text-center inline-flex items-center"
              data-testid="button-blog-cta"
            >
              <span>{t.blog.insights?.viewMore || t.blog.viewAll}</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
          <div className="absolute top-10 right-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container max-w-7xl mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="hero-title text-4xl lg:text-6xl font-black mb-6" data-testid="text-contact-title">
                {t.contact.title}
              </h2>
              <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed" data-testid="text-contact-subtitle">
                {t.contact.subtitle}
              </p>
            </div>

            <div className="max-w-4xl mx-auto mb-20">
              <ContactForm />
            </div>

            {/* Contact info */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="contact-card animate-fade-in-up">
                <div className="contact-icon">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-white text-xl mb-3" data-testid="text-contact-phone-title">
                  {t.contact.phone.title}
                </h4>
                <p className="text-white/90 text-lg mb-2" data-testid="text-contact-phone-value">
                  {t.contact.phone.value}
                </p>
                <p className="text-white/70" data-testid="text-contact-phone-hours">
                  {t.contact.phone.hours}
                </p>
              </div>
              
              <div className="contact-card animate-fade-in-up animate-delay-100">
                <div className="contact-icon">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-white text-xl mb-3" data-testid="text-contact-email-title">
                  {t.contact.email.title}
                </h4>
                <p className="text-white/90 text-lg mb-2" data-testid="text-contact-email-value">
                  {t.contact.email.value}
                </p>
                <p className="text-white/70" data-testid="text-contact-email-response">
                  {t.contact.email.response}
                </p>
              </div>
              
              <div className="contact-card animate-fade-in-up animate-delay-200">
                <div className="contact-icon">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-white text-xl mb-3" data-testid="text-contact-location-title">
                  {t.contact.location.title}
                </h4>
                <p className="text-white/90 text-lg mb-3" data-testid="text-contact-location-value">
                  {t.contact.location.value.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < t.contact.location.value.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <Link 
                  href="/about/location" 
                  className="inline-flex items-center text-white font-semibold hover:text-white/80 transition-colors"
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
