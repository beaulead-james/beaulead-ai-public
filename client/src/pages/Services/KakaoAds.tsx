import { Link } from 'wouter';
import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export default function KakaoAds() {
  const { t, language } = useLanguage();

  const serviceTypes = [
    {
      title: t.services.kakaoAds.serviceTypes.talk.title,
      description: t.services.kakaoAds.serviceTypes.talk.description,
      features: t.services.kakaoAds.serviceTypes.talk.features
    },
    {
      title: t.services.kakaoAds.serviceTypes.bizboard.title,
      description: t.services.kakaoAds.serviceTypes.bizboard.description,
      features: t.services.kakaoAds.serviceTypes.bizboard.features
    },
    {
      title: t.services.kakaoAds.serviceTypes.display.title,
      description: t.services.kakaoAds.serviceTypes.display.description,
      features: t.services.kakaoAds.serviceTypes.display.features
    },
    {
      title: t.services.kakaoAds.serviceTypes.shopping.title,
      description: t.services.kakaoAds.serviceTypes.shopping.description,
      features: t.services.kakaoAds.serviceTypes.shopping.features
    }
  ];

  const benefits = [
    {
      icon: 'fas fa-comments',
      title: t.services.kakaoAds.benefits.daily.title,
      description: t.services.kakaoAds.benefits.daily.description
    },
    {
      icon: 'fas fa-mobile-alt',
      title: t.services.kakaoAds.benefits.mobile.title,
      description: t.services.kakaoAds.benefits.mobile.description
    },
    {
      icon: 'fas fa-user-friends',
      title: t.services.kakaoAds.benefits.messaging.title,
      description: t.services.kakaoAds.benefits.messaging.description
    },
    {
      icon: 'fas fa-chart-pie',
      title: t.services.kakaoAds.benefits.local.title,
      description: t.services.kakaoAds.benefits.local.description
    }
  ];

  const caseStudy = {
    company: t.services.kakaoAds.caseStudy.company,
    challenge: t.services.kakaoAds.caseStudy.challenge,
    solution: t.services.kakaoAds.caseStudy.solution,
    results: [
      { metric: 'ROAS', value: '390%', change: '+140%' },
      { metric: language === 'ko' ? '모바일 전환' : 'Mobile Conversion', value: '6.8%', change: '+220%' },
      { metric: language === 'ko' ? '친구 추가' : 'Friend Adds', value: '+8,500', change: '+300%' },
      { metric: language === 'ko' ? '재방문율' : 'Return Rate', value: '45%', change: '+180%' }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title={`${t.services.kakaoAds.title} | ${language === 'ko' ? '뷰리드AI' : 'BeauLeadAI'}`}
        description={t.services.kakaoAds.heroDescription}
        keywords={language === 'ko' ? '카카오광고, 카카오톡광고, 비즈메시지, 카카오모먼트, 모바일마케팅' : 'Kakao Ads, KakaoTalk Ads, Biz Message, Mobile Marketing'}
      />
      <Header />

      {/* Background Effects */}
      <div className="bg-orb">
        <div className="orb orb-a"></div>
        <div className="orb orb-b"></div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 lg:pb-32">
          <div className="container max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-xl">K</span>
                  </div>
                  <span className="text-xl font-semibold text-white/90">{t.services.kakaoAds.brandName}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-testid="text-page-title">
                  {t.services.kakaoAds.heroTitle}
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  {t.services.kakaoAds.heroDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact" 
                    className="modern-btn text-center"
                    data-testid="button-contact-cta"
                  >
                    {t.services.contactCta}
                  </Link>
                  <Link 
                    href="/portfolio" 
                    className="modern-btn-outline text-center"
                    data-testid="button-portfolio-cta"
                  >
                    {t.services.portfolioCta}
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="floating-card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">{t.services.kakaoAds.dashboard}</h3>
                    <div className="contact-icon">
                      <span className="text-white font-bold text-xl">K</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="stats-card">
                      <div className="text-sm text-white/70 font-medium">{language === 'ko' ? '메시지 전송' : 'Messages Sent'}</div>
                      <div className="text-2xl font-bold text-white font-data">23,560</div>
                      <div className="text-xs text-green-400 font-data">{language === 'ko' ? '+42% 증가' : '+42% increase'}</div>
                    </div>
                    <div className="stats-card">
                      <div className="text-sm text-white/70 font-medium">{language === 'ko' ? '친구 추가' : 'Friend Adds'}</div>
                      <div className="text-2xl font-bold text-white font-data">1,240</div>
                      <div className="text-xs text-green-400 font-data">{language === 'ko' ? '+35% 증가' : '+35% increase'}</div>
                    </div>
                  </div>
                  <div className="text-center stats-card">
                    <div className="text-3xl font-bold text-white mb-1 font-data">390%</div>
                    <div className="text-sm text-white/70">{language === 'ko' ? '평균 ROAS' : 'Average ROAS'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Types */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{t.services.kakaoAds.serviceTypes.title}</h2>
              <p className="text-xl text-white/80">{t.services.kakaoAds.serviceTypes.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {serviceTypes.map((service, index) => (
                <div key={index} className="service-card">
                  <h3 className="text-xl font-bold text-white mb-4" data-testid={`text-service-type-title-${index}`}>
                    {service.title}
                  </h3>
                  <p className="text-white/70 mb-6 leading-relaxed" data-testid={`text-service-type-description-${index}`}>
                    {service.description}
                  </p>
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-white/80">
                        <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-3"></div>
                        <span data-testid={`text-service-feature-${index}-${featureIndex}`}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{t.services.kakaoAds.benefits.title}</h2>
              <p className="text-xl text-white/80">{language === 'ko' ? '한국인의 일상에 가장 밀접한 플랫폼의 힘' : 'The power of the platform closest to Korean daily life'}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="service-card text-center">
                  <div className="contact-icon mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      {benefit.icon === 'fas fa-comments' && (
                        <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z"/>
                      )}
                      {benefit.icon === 'fas fa-mobile-alt' && (
                        <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                      )}
                      {benefit.icon === 'fas fa-user-friends' && (
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.92 1.92 0 0 0 18.14 7c-.8 0-1.54.5-1.85 1.26l-.92 2.74h-2.74l-.92-2.74C11.4 7.5 10.66 7 9.86 7s-1.54.5-1.85 1.26L5.5 16H8v6h12zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5z"/>
                      )}
                      {benefit.icon === 'fas fa-chart-pie' && (
                        <path d="M11,2V22C5.9,21.5 2,17.2 2,12C2,6.8 5.9,2.5 11,2M13,2V11H22C22,6.8 18.1,2.5 13,2M13,13V22C18.1,21.5 22,17.2 22,12H13Z"/>
                      )}
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4" data-testid={`text-benefit-title-${index}`}>
                    {benefit.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed" data-testid={`text-benefit-description-${index}`}>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{t.services.kakaoAds.caseStudy.title}</h2>
              <p className="text-xl text-white/80">{language === 'ko' ? '실제 고객사의 카카오 광고 성과를 확인해보세요' : 'Check out the actual results of Kakao advertising from our clients'}</p>
            </div>

            <div className="floating-card">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white mb-4" data-testid="text-case-company">
                      {caseStudy.company}
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-white mb-2">{language === 'ko' ? '도전 과제:' : 'Challenge:'}</h4>
                        <p className="text-white/80 leading-relaxed" data-testid="text-case-challenge">{caseStudy.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">{language === 'ko' ? '해결책:' : 'Solution:'}</h4>
                        <p className="text-white/80 leading-relaxed" data-testid="text-case-solution">{caseStudy.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-6 text-center">{t.services.kakaoAds.caseStudy.resultsTitle}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {caseStudy.results.map((result, index) => (
                      <div key={index} className="stats-card">
                        <div className="text-sm text-white/70 mb-2" data-testid={`text-case-metric-${index}`}>
                          {result.metric}
                        </div>
                        <div className="text-2xl font-bold text-white mb-1" data-testid={`text-case-value-${index}`}>
                          {result.value}
                        </div>
                        <div className="text-xs text-green-400 font-medium" data-testid={`text-case-change-${index}`}>
                          {result.change}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kakao Statistics */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12">카카오의 영향력</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="stats-card">
                <div className="text-3xl font-bold text-white mb-2">4,700만</div>
                <div className="text-white font-semibold mb-1">카카오톡 사용자</div>
                <div className="text-sm text-white/70">국내 인구의 91%</div>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-white mb-2">57분</div>
                <div className="text-white font-semibold mb-1">일평균 이용시간</div>
                <div className="text-sm text-white/70">압도적 사용시간</div>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-white mb-2">95%</div>
                <div className="text-white font-semibold mb-1">메시지 읽음률</div>
                <div className="text-sm text-white/70">즉시 확인하는 메시지</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="floating-card">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">카카오 광고를 시작해보세요</h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                카카오 플랫폼 전문가와의 무료 상담을 통해 모바일 마케팅 전략을 수립하세요
              </p>
              <Link 
                href="/contact" 
                className="modern-btn"
                data-testid="button-final-cta"
              >
                무료 상담 신청하기
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
