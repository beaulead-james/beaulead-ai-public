import { Link } from 'wouter';
import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export default function NaverAds() {
  const { t, language } = useLanguage();

  const serviceTypes = [
    {
      title: t.services.naverAds.serviceTypes.powerlink.title,
      description: t.services.naverAds.serviceTypes.powerlink.description,
      features: t.services.naverAds.serviceTypes.powerlink.features
    },
    {
      title: t.services.naverAds.serviceTypes.brand.title,
      description: t.services.naverAds.serviceTypes.brand.description,
      features: t.services.naverAds.serviceTypes.brand.features
    },
    {
      title: t.services.naverAds.serviceTypes.shopping.title,
      description: t.services.naverAds.serviceTypes.shopping.description,
      features: t.services.naverAds.serviceTypes.shopping.features
    },
    {
      title: t.services.naverAds.serviceTypes.display.title,
      description: t.services.naverAds.serviceTypes.display.description,
      features: t.services.naverAds.serviceTypes.display.features
    }
  ];

  const benefits = [
    {
      icon: 'fas fa-search',
      title: t.services.naverAds.benefits.domestic.title,
      description: t.services.naverAds.benefits.domestic.description
    },
    {
      icon: 'fas fa-users',
      title: t.services.naverAds.benefits.korean.title,
      description: t.services.naverAds.benefits.korean.description
    },
    {
      icon: 'fas fa-mobile-alt',
      title: t.services.naverAds.benefits.platform.title,
      description: t.services.naverAds.benefits.platform.description
    },
    {
      icon: 'fas fa-chart-bar',
      title: t.services.naverAds.benefits.content.title,
      description: t.services.naverAds.benefits.content.description
    }
  ];

  const caseStudy = {
    company: t.services.naverAds.caseStudy.company,
    challenge: t.services.naverAds.caseStudy.challenge,
    solution: t.services.naverAds.caseStudy.solution,
    results: [
      { metric: 'ROAS', value: '480%', change: '+150%' },
      { metric: language === 'ko' ? '지역 노출' : 'Regional Exposure', value: '85%', change: '+200%' },
      { metric: language === 'ko' ? '수강 신청' : 'Course Applications', value: language === 'ko' ? '320건' : '320', change: '+250%' },
      { metric: 'CPA', value: language === 'ko' ? '₩25,000' : '$20', change: '-40%' }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="네이버 광고 | 뷰리드AI"
        description="파워링크, 브랜드검색, 쇼핑검색까지 네이버 검색광고 전문 서비스"
        keywords="네이버광고, 파워링크, 브랜드검색, 쇼핑검색, 네이버마케팅"
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
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold text-xl">N</span>
                  </div>
                  <span className="text-xl font-semibold text-white/90">{t.services.naverAds.brandName}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-testid="text-page-title">
                  {t.services.naverAds.heroTitle}
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  {t.services.naverAds.heroDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/inquiry" 
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
                  <div className="flex items-center mb-6">
                    <h3 className="text-xl font-bold text-white flex-1">{t.services.naverAds.dashboard}</h3>
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">N</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="stats-card">
                      <div className="text-sm text-white/70 font-medium">노출수</div>
                      <div className="text-2xl font-bold text-white font-data">45,820</div>
                      <div className="text-xs text-green-400 font-data">+32% 증가</div>
                    </div>
                    <div className="stats-card">
                      <div className="text-sm text-white/70 font-medium">클릭률</div>
                      <div className="text-2xl font-bold text-white font-data">4.2%</div>
                      <div className="text-xs text-green-400 font-data">+15% 증가</div>
                    </div>
                  </div>
                  <div className="text-center stats-card">
                    <div className="text-3xl font-bold text-white mb-1 font-data">480%</div>
                    <div className="text-sm text-white/70">평균 ROAS</div>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{t.services.naverAds.serviceTypes.title}</h2>
              <p className="text-xl text-white/80">{t.services.naverAds.serviceTypes.subtitle}</p>
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
                        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full mr-3"></div>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{t.services.naverAds.benefits.title}</h2>
              <p className="text-xl text-white/80">{language === 'ko' ? '한국 시장에서 네이버 광고가 필수인 이유' : 'Why Naver Ads is essential in the Korean market'}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="service-card text-center">
                  <div className="contact-icon mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      {benefit.icon === 'fas fa-search' && (
                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                      )}
                      {benefit.icon === 'fas fa-users' && (
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.92 1.92 0 0 0 18.14 7c-.8 0-1.54.5-1.85 1.26l-.92 2.74h-2.74l-.92-2.74C11.4 7.5 10.66 7 9.86 7s-1.54.5-1.85 1.26L5.5 16H8v6h12zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5z"/>
                      )}
                      {benefit.icon === 'fas fa-mobile-alt' && (
                        <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/>
                      )}
                      {benefit.icon === 'fas fa-chart-bar' && (
                        <path d="M5,9V21H9V9H5M10,5V21H14V5H10M15,13V21H19V13H15Z"/>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{t.services.naverAds.caseStudy.title}</h2>
              <p className="text-xl text-white/80">{language === 'ko' ? '실제 고객사의 네이버 광고 성과를 확인해보세요' : 'Check out the actual results of Naver advertising from our clients'}</p>
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
                  <h4 className="font-semibold text-white mb-6 text-center">{t.services.naverAds.caseStudy.resultsTitle}</h4>
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

        {/* Why Naver Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12">{language === 'ko' ? '왜 네이버 광고인가?' : 'Why Naver Ads?'}</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="stats-card">
                <div className="text-3xl font-bold text-white mb-2">75%</div>
                <div className="text-white font-semibold mb-1">{language === 'ko' ? '국내 검색 점유율' : 'Domestic Search Share'}</div>
                <div className="text-sm text-white/70">{language === 'ko' ? '한국인이 가장 많이 사용' : 'Most used by Koreans'}</div>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-white mb-2">4,700만</div>
                <div className="text-white font-semibold mb-1">{language === 'ko' ? '월간 활성 사용자' : 'Monthly Active Users'}</div>
                <div className="text-sm text-white/70">{language === 'ko' ? '압도적인 사용자 수' : 'Overwhelming user base'}</div>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-white mb-2">85%</div>
                <div className="text-white font-semibold mb-1">{language === 'ko' ? '모바일 이용률' : 'Mobile Usage Rate'}</div>
                <div className="text-sm text-white/70">{language === 'ko' ? '모바일 최적화 필수' : 'Mobile optimization essential'}</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="floating-card">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">{language === 'ko' ? '네이버 광고를 시작해보세요' : 'Start with Naver Ads'}</h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                {language === 'ko' ? '한국 시장 전문가와의 무료 상담을 통해 네이버 광고 전략을 수립하세요' : 'Develop your Naver advertising strategy through free consultation with Korean market experts'}
              </p>
              <Link 
                href="/inquiry" 
                className="modern-btn"
                data-testid="button-final-cta"
              >
{t.services.contactCta}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
