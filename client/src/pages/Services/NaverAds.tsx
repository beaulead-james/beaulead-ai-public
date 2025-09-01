import { Link } from 'wouter';
import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export default function NaverAds() {
  const { t } = useLanguage();

  const serviceTypes = [
    {
      title: '검색광고 (파워링크)',
      description: '네이버 검색결과 상단과 우측에 노출되는 키워드 광고로 높은 전환율을 보장합니다.',
      features: ['키워드 광고', 'PC/모바일 최적화', '지역 타겟팅', '시간대별 노출 조절']
    },
    {
      title: '브랜드검색 광고',
      description: '브랜드명 검색 시 상단에 노출되는 프리미엄 광고 영역입니다.',
      features: ['브랜드 보호', '이미지/동영상 소재', '높은 CTR', '브랜드 인지도 향상']
    },
    {
      title: '쇼핑검색 광고',
      description: '네이버 쇼핑에서 상품 검색 시 상단에 노출되는 이커머스 전용 광고입니다.',
      features: ['상품 등록', '가격 비교', '쇼핑몰 연동', '구매 전환 최적화']
    },
    {
      title: '디스플레이 광고',
      description: '네이버 메인과 각종 서비스에 노출되는 배너 광고로 브랜드 인지도를 높입니다.',
      features: ['배너 광고', '네이티브 광고', '동영상 광고', '타겟 오디언스']
    }
  ];

  const benefits = [
    {
      icon: 'fas fa-search',
      title: '국내 검색 1위',
      description: '한국인이 가장 많이 사용하는 검색엔진에서 높은 노출과 클릭률을 보장합니다.'
    },
    {
      icon: 'fas fa-users',
      title: '정확한 한국인 타겟팅',
      description: '한국 사용자의 검색 패턴과 소비 행동을 정확히 분석한 타겟팅이 가능합니다.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: '모바일 최적화',
      description: '모바일 사용자가 많은 네이버 환경에 최적화된 광고 전략을 제공합니다.'
    },
    {
      icon: 'fas fa-chart-bar',
      title: '상세한 리포팅',
      description: '네이버 애널리틱스와 연동하여 상세한 성과 분석과 리포팅을 제공합니다.'
    }
  ];

  const caseStudy = {
    company: '로컬 교육업체 B사',
    challenge: '지역 고객 유치와 온라인 수강생 증대',
    solution: '지역 키워드 + 브랜드검색 + 네이버 블로그 마케팅 통합',
    results: [
      { metric: 'ROAS', value: '480%', change: '+150%' },
      { metric: '지역 노출', value: '85%', change: '+200%' },
      { metric: '수강 신청', value: '320건', change: '+250%' },
      { metric: 'CPA', value: '₩25,000', change: '-40%' }
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
                  <span className="text-xl font-semibold text-white/90">Naver Ads</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-testid="text-page-title">
                  네이버 광고로 국내 고객을 정확히 공략하세요
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  국내 검색 점유율 1위 네이버에서 한국 고객에게 최적화된 마케팅을 진행하세요. 
                  파워링크, 브랜드검색, 쇼핑검색까지 모든 네이버 광고 솔루션을 제공합니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact" 
                    className="modern-btn text-center"
                    data-testid="button-contact-cta"
                  >
                    무료 상담 신청
                  </Link>
                  <Link 
                    href="/portfolio" 
                    className="modern-btn-outline text-center"
                    data-testid="button-portfolio-cta"
                  >
                    성공 사례 보기
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="floating-card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">네이버 광고 대시보드</h3>
                    <div className="contact-icon">
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
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">네이버 광고 서비스</h2>
              <p className="text-xl text-white/80">네이버 생태계 전반에서 최적의 광고 성과를 창출합니다</p>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">네이버 광고의 장점</h2>
              <p className="text-xl text-white/80">한국 시장에서 네이버 광고가 필수인 이유</p>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">성공 사례</h2>
              <p className="text-xl text-white/80">실제 고객사의 네이버 광고 성과를 확인해보세요</p>
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
                        <h4 className="font-semibold text-white mb-2">도전 과제:</h4>
                        <p className="text-white/80 leading-relaxed" data-testid="text-case-challenge">{caseStudy.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-2">해결책:</h4>
                        <p className="text-white/80 leading-relaxed" data-testid="text-case-solution">{caseStudy.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-6 text-center">6개월 후 결과:</h4>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12">왜 네이버 광고인가?</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="stats-card">
                <div className="text-3xl font-bold text-white mb-2">75%</div>
                <div className="text-white font-semibold mb-1">국내 검색 점유율</div>
                <div className="text-sm text-white/70">한국인이 가장 많이 사용</div>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-white mb-2">4,700만</div>
                <div className="text-white font-semibold mb-1">월간 활성 사용자</div>
                <div className="text-sm text-white/70">압도적인 사용자 수</div>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-white mb-2">85%</div>
                <div className="text-white font-semibold mb-1">모바일 이용률</div>
                <div className="text-sm text-white/70">모바일 최적화 필수</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="floating-card">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">네이버 광고를 시작해보세요</h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                한국 시장 전문가와의 무료 상담을 통해 네이버 광고 전략을 수립하세요
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
