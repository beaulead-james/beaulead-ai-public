import { Link } from 'wouter';
import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import '../../styles/hero.css';

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      id: 'google-ads',
      icon: 'fab fa-google',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      hoverBg: 'group-hover:bg-blue-200',
      title: t.services.googleAds.title,
      description: t.services.googleAds.description,
      features: [
        '검색 광고 (Search Ads)',
        '디스플레이 광고 (Display Ads)', 
        '쇼핑 광고 (Shopping Ads)',
        '유튜브 광고 (YouTube Ads)',
        'Google Analytics 연동',
        '전환 추적 및 최적화'
      ],
      metrics: {
        avgRoas: '520%',
        clients: '120+',
        experience: '5년+'
      }
    },
    {
      id: 'naver-ads',
      icon: 'fas fa-search',
      iconColor: 'text-green-600',
      bgColor: 'bg-green-100',
      hoverBg: 'group-hover:bg-green-200',
      title: t.services.naverAds.title,
      description: t.services.naverAds.description,
      features: [
        '검색광고 (파워링크)',
        '브랜드검색 광고',
        '쇼핑검색 광고',
        '네이버 디스플레이',
        '네이버 블로그 마케팅',
        'SA360 통합 관리'
      ],
      metrics: {
        avgRoas: '480%',
        clients: '80+',
        experience: '4년+'
      }
    },
    {
      id: 'meta-ads',
      icon: 'fab fa-facebook',
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      hoverBg: 'group-hover:bg-blue-200',
      title: t.services.metaAds.title,
      description: t.services.metaAds.description,
      features: [
        '페이스북 광고',
        '인스타그램 광고',
        '리타겟팅 캠페인',
        'Lookalike 오디언스',
        '크리에이티브 제작',
        'Meta Pixel 설정'
      ],
      metrics: {
        avgRoas: '410%',
        clients: '90+',
        experience: '4년+'
      }
    },
    {
      id: 'kakao-ads',
      icon: 'fas fa-comment',
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      hoverBg: 'group-hover:bg-yellow-200',
      title: t.services.kakaoAds.title,
      description: t.services.kakaoAds.description,
      features: [
        '카카오톡 비즈메시지',
        '카카오 모먼트',
        '카카오 디스플레이',
        '비즈보드 광고',
        '카카오페이 광고',
        '친구톡/알림톡'
      ],
      metrics: {
        avgRoas: '390%',
        clients: '60+',
        experience: '3년+'
      }
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background orbs */}
      <div className="bg-orb">
        <div className="orb orb-a"></div>
        <div className="orb orb-b"></div>
      </div>
      
      <SEO 
        title={`${t.nav.services} | 뷰리드AI`}
        description="구글, 네이버, 메타, 카카오 광고 전문 서비스를 제공합니다"
        keywords="구글광고, 네이버광고, 메타광고, 카카오광고, 퍼포먼스마케팅"
      />
      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="hero-container py-20 lg:py-32">
          <div className="container max-w-7xl mx-auto text-center">
            <h1 className="hero-title text-4xl lg:text-6xl font-black mb-6" data-testid="text-page-title">
              {t.services.title}
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-12" data-testid="text-page-subtitle">
              {t.services.subtitle}
            </p>

            {/* Key Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <div className="stats-card animate-fade-in-up">
                <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">4+</div>
                <div className="text-white/90 font-semibold text-lg">주요 플랫폼</div>
              </div>
              <div className="stats-card animate-fade-in-up animate-delay-100">
                <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-green-400 bg-clip-text text-transparent mb-4">200+</div>
                <div className="text-white/90 font-semibold text-lg">성공 프로젝트</div>
              </div>
              <div className="stats-card animate-fade-in-up animate-delay-200">
                <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">487%</div>
                <div className="text-white/90 font-semibold text-lg">평균 ROAS</div>
              </div>
              <div className="stats-card animate-fade-in-up animate-delay-300">
                <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">₩12.5B</div>
                <div className="text-white/90 font-semibold text-lg">누적 매출 기여</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 lg:py-32 bg-gradient-to-b from-transparent to-black/20">
          <div className="container max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={service.id} className="service-card group animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                  {/* Header */}
                  <div className="flex items-center mb-6">
                    <div className="modern-icon mr-4">
                      <i className={`${service.icon} text-2xl text-white`}></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1" data-testid={`text-service-title-${index}`}>
                        {service.title}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-white/70">
                        <span>ROAS {service.metrics.avgRoas}</span>
                        <span>•</span>
                        <span>{service.metrics.clients} 고객사</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/70 mb-6 leading-relaxed" data-testid={`text-service-description-${index}`}>
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-white mb-3">주요 서비스</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-white/70">
                          <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-2"></div>
                          <span data-testid={`text-service-feature-${index}-${featureIndex}`}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link 
                    href={`/services/${service.id}`}
                    className="inline-flex items-center text-white font-semibold hover:text-white/80 transition-colors group/link"
                    data-testid={`link-service-detail-${index}`}
                  >
                    {t.services.learnMore}
                    <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
          <div className="container max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="hero-title text-4xl lg:text-6xl font-black mb-6">서비스 프로세스</h2>
              <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">체계적이고 투명한 프로세스로 최고의 결과를 보장합니다</p>
            </div>

            <div className="grid md:grid-cols-5 gap-8">
              <div className="contact-card text-center animate-fade-in-up">
                <div className="contact-icon mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="font-bold text-white text-xl mb-3">상담 및 분석</h3>
                <p className="text-white/70">비즈니스 목표와 현재 상황을 정확히 파악합니다</p>
              </div>
              <div className="contact-card text-center animate-fade-in-up animate-delay-100">
                <div className="contact-icon mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="font-bold text-white text-xl mb-3">전략 수립</h3>
                <p className="text-white/70">데이터 기반의 맞춤형 마케팅 전략을 수립합니다</p>
              </div>
              <div className="contact-card text-center animate-fade-in-up animate-delay-200">
                <div className="contact-icon mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="font-bold text-white text-xl mb-3">캠페인 실행</h3>
                <p className="text-white/70">전문가팀이 각 플랫폼에 최적화된 캠페인을 실행합니다</p>
              </div>
              <div className="contact-card text-center animate-fade-in-up animate-delay-300">
                <div className="contact-icon mb-6">
                  <span className="text-2xl font-bold text-white">4</span>
                </div>
                <h3 className="font-bold text-white text-xl mb-3">모니터링</h3>
                <p className="text-white/70">실시간으로 성과를 모니터링하고 최적화합니다</p>
              </div>
              <div className="contact-card text-center animate-fade-in-up animate-delay-400">
                <div className="contact-icon mb-6">
                  <span className="text-2xl font-bold text-white">5</span>
                </div>
                <h3 className="font-bold text-white text-xl mb-3">리포팅</h3>
                <p className="text-white/70">투명한 성과 리포트와 개선안을 제공합니다</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
            <div className="absolute top-10 right-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"></div>
          </div>
          <div className="container max-w-4xl mx-auto text-center relative z-10">
            <h2 className="hero-title text-4xl lg:text-6xl font-black mb-6">지금 시작하세요</h2>
            <p className="text-xl lg:text-2xl text-white/80 mb-12 leading-relaxed">
              무료 상담을 통해 맞춤형 마케팅 전략을 제안해드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/inquiry" 
                className="modern-btn"
                data-testid="button-contact-cta"
              >
                <span>무료 상담 신청</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/portfolio" 
                className="modern-btn-outline"
                data-testid="button-portfolio-cta"
              >
                <span>성공 사례 보기</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
