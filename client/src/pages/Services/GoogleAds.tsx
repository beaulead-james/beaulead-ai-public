import { Link } from 'wouter';
import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export default function GoogleAds() {
  const { t } = useLanguage();

  const serviceTypes = [
    {
      title: '검색 광고 (Search Ads)',
      description: '구글 검색결과 상단에 노출되는 텍스트 광고로, 구매 의도가 높은 고객을 타겟팅합니다.',
      features: ['키워드 타겟팅', '광고 확장', '자동 입찰', '품질평가 최적화']
    },
    {
      title: '디스플레이 광고 (Display Ads)',
      description: '구글 파트너 사이트와 YouTube에 표시되는 이미지/동영상 광고입니다.',
      features: ['시각적 크리에이티브', '리타겟팅', '인구통계 타겟팅', '플레이스먼트 선택']
    },
    {
      title: '쇼핑 광고 (Shopping Ads)',
      description: '제품 이미지와 가격이 포함된 광고로 이커머스에 최적화되어 있습니다.',
      features: ['제품 피드 관리', '가격 비교', '시각적 어필', '직접 구매 유도']
    },
    {
      title: '유튜브 광고 (YouTube Ads)',
      description: '세계 2위 검색엔진인 YouTube에서 동영상 콘텐츠로 브랜드를 알립니다.',
      features: ['영상 콘텐츠', '스키퍼블/논스키퍼블', '인플루언서 협업', '브랜드 인지도']
    }
  ];

  const benefits = [
    {
      icon: 'fas fa-target',
      title: '정확한 타겟팅',
      description: '검색 키워드, 위치, 연령, 관심사 등 다양한 기준으로 정확한 고객을 타겟팅합니다.'
    },
    {
      icon: 'fas fa-chart-line',
      title: '실시간 성과 측정',
      description: '클릭, 노출, 전환율 등 모든 지표를 실시간으로 확인하고 최적화할 수 있습니다.'
    },
    {
      icon: 'fas fa-coins',
      title: '비용 효율성',
      description: '설정한 예산 내에서 최대 성과를 낼 수 있도록 자동 입찰 시스템이 최적화됩니다.'
    },
    {
      icon: 'fas fa-globe',
      title: '글로벌 도달',
      description: '전 세계 90억 명의 구글 사용자에게 광고를 노출할 수 있습니다.'
    }
  ];

  const caseStudy = {
    company: '패션 이커머스 A사',
    challenge: '신규 고객 획득과 매출 증대',
    solution: '검색광고 + 쇼핑광고 + 리마케팅 통합 전략',
    results: [
      { metric: 'ROAS', value: '650%', change: '+180%' },
      { metric: '전환율', value: '3.2%', change: '+120%' },
      { metric: 'CPA', value: '₩15,000', change: '-45%' },
      { metric: '매출', value: '₩2.1억', change: '+400%' }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="구글 광고 | 뷰리드AI"
        description="검색광고, 디스플레이광고, 쇼핑광고, 유튜브광고까지 구글 생태계 전문 마케팅 서비스"
        keywords="구글광고, 구글애즈, 검색광고, 디스플레이광고, 쇼핑광고, 유튜브광고"
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
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <span className="text-xl font-semibold text-white/90">{t.services.googleAds.brandName}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-testid="text-page-title">
                  {t.services.googleAds.heroTitle}
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  {t.services.googleAds.heroDescription}
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
                    <h3 className="text-xl font-bold text-white">Google Ads 대시보드</h3>
                    <div className="contact-icon">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="stats-card">
                      <div className="text-sm text-white/70 font-medium">클릭수</div>
                      <div className="text-2xl font-bold text-white font-data">12,840</div>
                      <div className="text-xs text-green-400 font-data">+24% 증가</div>
                    </div>
                    <div className="stats-card">
                      <div className="text-sm text-white/70 font-medium">전환수</div>
                      <div className="text-2xl font-bold text-white font-data">156</div>
                      <div className="text-xs text-green-400 font-data">+18% 증가</div>
                    </div>
                  </div>
                  <div className="text-center stats-card">
                    <div className="text-3xl font-bold text-white mb-1 font-data">520%</div>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">구글 광고 서비스</h2>
              <p className="text-xl text-white/80">다양한 형태의 구글 광고로 최적의 마케팅 효과를 달성합니다</p>
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
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mr-3"></div>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">구글 광고의 장점</h2>
              <p className="text-xl text-white/80">왜 전 세계 기업들이 구글 광고를 선택하는지 알아보세요</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="service-card text-center">
                  <div className="contact-icon mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      {benefit.icon === 'fas fa-target' && (
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                      )}
                      {benefit.icon === 'fas fa-chart-line' && (
                        <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
                      )}
                      {benefit.icon === 'fas fa-coins' && (
                        <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z"/>
                      )}
                      {benefit.icon === 'fas fa-globe' && (
                        <path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
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
              <p className="text-xl text-white/80">실제 고객사의 구글 광고 성과를 확인해보세요</p>
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
                  <h4 className="font-semibold text-white mb-6 text-center">3개월 후 결과:</h4>
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

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="floating-card">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">구글 광고를 시작해보세요</h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                전문가와의 무료 상담을 통해 맞춤형 구글 광고 전략을 수립하세요
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
