import { Link } from 'wouter';
import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export default function MetaAds() {
  const { t } = useLanguage();

  const serviceTypes = [
    {
      title: '페이스북 광고',
      description: '28억 명의 글로벌 사용자를 대상으로 정교한 타겟팅을 통해 브랜드 인지도를 높이고 전환을 유도합니다.',
      features: ['뉴스피드 광고', 'Stories 광고', '비디오 광고', 'Carousel 광고']
    },
    {
      title: '인스타그램 광고',
      description: '시각적으로 매력적인 콘텐츠로 젊은 타겟층에게 어필하고 높은 참여율을 달성합니다.',
      features: ['피드 광고', 'Stories 광고', 'Reels 광고', '쇼핑 광고']
    },
    {
      title: '리타겟팅 캠페인',
      description: '웹사이트 방문자를 다시 찾아가 구매 전환율을 높이는 효과적인 재방문 유도 전략입니다.',
      features: ['픽셀 설치', '맞춤 오디언스', '동적 제품 광고', '장바구니 리마케팅']
    },
    {
      title: 'Lookalike 타겟팅',
      description: '기존 고객과 유사한 특성을 가진 새로운 잠재 고객을 찾아 효율적인 신규 고객 획득을 지원합니다.',
      features: ['유사 오디언스', '관심사 타겟팅', '행동 기반 타겟팅', 'A/B 테스트']
    }
  ];

  const benefits = [
    {
      icon: 'fas fa-bullseye',
      title: '정밀한 타겟팅',
      description: '연령, 성별, 관심사, 행동패턴 등 세분화된 타겟팅으로 정확한 고객에게 도달합니다.'
    },
    {
      icon: 'fas fa-images',
      title: '다양한 광고 형식',
      description: '이미지, 비디오, 캐러셀, 스토리즈 등 다양한 형식으로 창의적인 광고를 제작합니다.'
    },
    {
      icon: 'fas fa-chart-line',
      title: '실시간 성과 측정',
      description: 'Facebook Pixel을 통해 실시간으로 광고 성과를 측정하고 최적화할 수 있습니다.'
    },
    {
      icon: 'fas fa-globe',
      title: '글로벌 리치',
      description: '전 세계 38억 명의 메타 플랫폼 사용자에게 광고를 노출할 수 있습니다.'
    }
  ];

  const caseStudy = {
    company: 'D2C 뷰티 브랜드 C사',
    challenge: '신제품 론칭과 브랜드 인지도 향상',
    solution: '인스타그램 + 페이스북 통합 캠페인 + 인플루언서 협업',
    results: [
      { metric: 'ROAS', value: '410%', change: '+160%' },
      { metric: '브랜드 인지도', value: '340%', change: '+240%' },
      { metric: '팔로워', value: '+15K', change: '+180%' },
      { metric: '매출', value: '₩850M', change: '+320%' }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="메타 광고 | 뷰리드AI"
        description="페이스북, 인스타그램 광고로 소셜미디어 마케팅의 새로운 차원을 경험하세요"
        keywords="메타광고, 페이스북광고, 인스타그램광고, 소셜미디어마케팅, 리타겟팅"
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
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span className="text-xl font-semibold text-white/90">Meta Ads</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight" data-testid="text-page-title">
                  메타 광고로 소셜미디어를 정복하세요
                </h1>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  페이스북과 인스타그램을 통해 38억 명의 글로벌 사용자에게 도달하세요. 
                  창의적인 콘텐츠와 정밀한 타겟팅으로 브랜드의 성장을 가속화합니다.
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
                    <h3 className="text-xl font-bold text-white">Meta Ads 대시보드</h3>
                    <div className="contact-icon">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="stats-card">
                      <div className="text-sm text-white/70 font-medium">도달수</div>
                      <div className="text-2xl font-bold text-white font-data">89,340</div>
                      <div className="text-xs text-green-400 font-data">+28% 증가</div>
                    </div>
                    <div className="stats-card">
                      <div className="text-sm text-white/70 font-medium">참여율</div>
                      <div className="text-2xl font-bold text-white font-data">5.8%</div>
                      <div className="text-xs text-green-400 font-data">+22% 증가</div>
                    </div>
                  </div>
                  <div className="text-center stats-card">
                    <div className="text-3xl font-bold text-white mb-1 font-data">410%</div>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">메타 광고 서비스</h2>
              <p className="text-xl text-white/80">페이스북과 인스타그램을 활용한 통합 소셜미디어 마케팅</p>
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
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-3"></div>
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
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">메타 광고의 장점</h2>
              <p className="text-xl text-white/80">소셜미디어 마케팅의 강력한 도구들을 활용하세요</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="service-card text-center">
                  <div className="contact-icon mb-6">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      {benefit.icon === 'fas fa-bullseye' && (
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                      )}
                      {benefit.icon === 'fas fa-images' && (
                        <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11.5-6.5l2.5 3.01L16.5 8.5 20 13H8l2.5-3.5zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/>
                      )}
                      {benefit.icon === 'fas fa-chart-line' && (
                        <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
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
              <p className="text-xl text-white/80">실제 고객사의 메타 광고 성과를 확인해보세요</p>
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
                  <h4 className="font-semibold text-white mb-6 text-center">4개월 후 결과:</h4>
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

        {/* Creative Showcase */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">크리에이티브 제작</h2>
              <p className="text-xl text-white/80">성과 최적화를 위한 전문 크리에이티브 서비스</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="service-card text-center">
                <div className="contact-icon mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11.5-6.5l2.5 3.01L16.5 8.5 20 13H8l2.5-3.5zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-4">이미지 광고</h3>
                <p className="text-white/70 text-sm">브랜드 아이덴티티를 반영한 고품질 이미지 소재 제작</p>
              </div>
              <div className="service-card text-center">
                <div className="contact-icon mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-4">비디오 광고</h3>
                <p className="text-white/70 text-sm">스토리텔링과 감성을 담은 전문 비디오 콘텐츠</p>
              </div>
              <div className="service-card text-center">
                <div className="contact-icon mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,16L16,12H13V8H11V12H8L12,16M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-4">캐러셀 광고</h3>
                <p className="text-white/70 text-sm">여러 제품을 효과적으로 보여주는 인터랙티브 광고</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="floating-card">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">메타 광고를 시작해보세요</h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                소셜미디어 마케팅 전문가와의 무료 상담을 통해 메타 광고 전략을 수립하세요
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
