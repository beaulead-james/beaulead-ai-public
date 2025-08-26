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
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="메타 광고 | 뷰리드AI"
        description="페이스북, 인스타그램 광고로 소셜미디어 마케팅의 새로운 차원을 경험하세요"
        keywords="메타광고, 페이스북광고, 인스타그램광고, 소셜미디어마케팅, 리타겟팅"
      />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16 lg:py-24">
          <div className="container max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fab fa-facebook text-blue-600 text-xl"></i>
                  </div>
                  <span className="text-blue-600 font-semibold">Meta Ads</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" data-testid="text-page-title">
                  메타 광고로 소셜미디어를 정복하세요
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  페이스북과 인스타그램을 통해 38억 명의 글로벌 사용자에게 도달하세요. 
                  창의적인 콘텐츠와 정밀한 타겟팅으로 브랜드의 성장을 가속화합니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact" 
                    className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
                    data-testid="button-contact-cta"
                  >
                    무료 상담 신청
                  </Link>
                  <Link 
                    href="/portfolio" 
                    className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-primary-600 hover:text-primary-600 transition-colors text-center"
                    data-testid="button-portfolio-cta"
                  >
                    성공 사례 보기
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-6 border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">Meta Ads 대시보드</h3>
                    <i className="fab fa-facebook text-blue-600 text-xl"></i>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-blue-600 font-medium">도달수</div>
                      <div className="text-2xl font-bold text-blue-700">89,340</div>
                      <div className="text-xs text-blue-500">+28% 증가</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-sm text-purple-600 font-medium">참여율</div>
                      <div className="text-2xl font-bold text-purple-700">5.8%</div>
                      <div className="text-xs text-purple-500">+22% 증가</div>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-primary-600 mb-1">410%</div>
                    <div className="text-sm text-gray-600">평균 ROAS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Types */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">메타 광고 서비스</h2>
              <p className="text-xl text-gray-600">페이스북과 인스타그램을 활용한 통합 소셜미디어 마케팅</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {serviceTypes.map((service, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg hover:border-blue-200 transition-all">
                  <h3 className="text-xl font-bold text-gray-900 mb-4" data-testid={`text-service-type-title-${index}`}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed" data-testid={`text-service-type-description-${index}`}>
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
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
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">메타 광고의 장점</h2>
              <p className="text-xl text-gray-600">소셜미디어 마케팅의 강력한 도구들을 활용하세요</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${benefit.icon} text-blue-600 text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3" data-testid={`text-benefit-title-${index}`}>
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed" data-testid={`text-benefit-description-${index}`}>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">성공 사례</h2>
              <p className="text-xl text-gray-600">실제 고객사의 메타 광고 성과를 확인해보세요</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2" data-testid="text-case-company">
                      {caseStudy.company}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">도전 과제:</h4>
                        <p className="text-gray-700" data-testid="text-case-challenge">{caseStudy.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">해결책:</h4>
                        <p className="text-gray-700" data-testid="text-case-solution">{caseStudy.solution}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-6">4개월 후 결과:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {caseStudy.results.map((result, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm">
                        <div className="text-sm text-gray-600 mb-1" data-testid={`text-case-metric-${index}`}>
                          {result.metric}
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1" data-testid={`text-case-value-${index}`}>
                          {result.value}
                        </div>
                        <div className="text-xs text-green-600 font-medium" data-testid={`text-case-change-${index}`}>
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
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">크리에이티브 제작</h2>
              <p className="text-xl text-gray-600">성과 최적화를 위한 전문 크리에이티브 서비스</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-image text-red-600 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">이미지 광고</h3>
                <p className="text-gray-600 text-sm">브랜드 아이덴티티를 반영한 고품질 이미지 소재 제작</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-video text-purple-600 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">비디오 광고</h3>
                <p className="text-gray-600 text-sm">스토리텔링과 감성을 담은 전문 비디오 콘텐츠</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-layers text-blue-600 text-xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">캐러셀 광고</h3>
                <p className="text-gray-600 text-sm">여러 제품을 효과적으로 보여주는 인터랙티브 광고</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-primary-600">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">메타 광고를 시작해보세요</h2>
            <p className="text-xl text-primary-100 mb-8">
              소셜미디어 마케팅 전문가와의 무료 상담을 통해 메타 광고 전략을 수립하세요
            </p>
            <Link 
              href="/contact" 
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-block"
              data-testid="button-final-cta"
            >
              무료 상담 신청하기
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
