import { Link } from 'wouter';
import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export default function KakaoAds() {
  const { t } = useLanguage();

  const serviceTypes = [
    {
      title: '카카오톡 비즈메시지',
      description: '4,700만 카카오톡 사용자에게 직접 도달하는 개인화된 메시지 광고로 높은 전환율을 달성합니다.',
      features: ['친구톡', '알림톡', '템플릿 메시지', '개인화 메시지']
    },
    {
      title: '카카오 모먼트',
      description: '카카오톡 상단 광고 영역에 노출되는 프리미엄 디스플레이 광고입니다.',
      features: ['타임라인 광고', '프로필 광고', '톡보드 광고', '브랜드 캠페인']
    },
    {
      title: '카카오 디스플레이',
      description: '카카오 계열 서비스 전반에 노출되는 통합 디스플레이 광고 네트워크입니다.',
      features: ['다음 메인', '카카오스토리', '카카오맵', '카카오페이지']
    },
    {
      title: '비즈보드 광고',
      description: '카카오톡 채팅방 하단에 노출되는 네이티브 광고로 자연스러운 노출이 가능합니다.',
      features: ['채팅방 광고', '네이티브 형태', '상황별 타겟팅', 'CPC/CPM 과금']
    }
  ];

  const benefits = [
    {
      icon: 'fas fa-comments',
      title: '높은 사용자 참여도',
      description: '일상 깊숙이 자리잡은 카카오톡을 통해 자연스럽고 친밀한 광고 노출이 가능합니다.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: '모바일 최적화',
      description: '모바일 퍼스트 환경에 완벽 최적화된 광고 솔루션을 제공합니다.'
    },
    {
      icon: 'fas fa-user-friends',
      title: '개인화 메시지',
      description: '사용자 행동 패턴과 관심사를 기반으로 한 개인화된 메시지 전달이 가능합니다.'
    },
    {
      icon: 'fas fa-chart-pie',
      title: '통합 분석',
      description: '카카오 비즈니스 플랫폼을 통해 통합된 성과 분석과 리포팅을 제공합니다.'
    }
  ];

  const caseStudy = {
    company: '온라인 쇼핑몰 D사',
    challenge: '젊은 층 타겟팅과 모바일 전환율 개선',
    solution: '카카오톡 친구톡 + 비즈보드 + 카카오페이 연동',
    results: [
      { metric: 'ROAS', value: '390%', change: '+140%' },
      { metric: '모바일 전환', value: '6.8%', change: '+220%' },
      { metric: '친구 추가', value: '+8,500', change: '+300%' },
      { metric: '재방문율', value: '45%', change: '+180%' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="카카오 광고 | 뷰리드AI"
        description="카카오톡, 카카오 모먼트, 비즈메시지까지 카카오 플랫폼 전문 광고 서비스"
        keywords="카카오광고, 카카오톡광고, 비즈메시지, 카카오모먼트, 모바일마케팅"
      />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-yellow-50 via-white to-gray-50 py-16 lg:py-24">
          <div className="container max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-yellow-600 font-bold text-xl">K</span>
                  </div>
                  <span className="text-yellow-600 font-semibold">Kakao Ads</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" data-testid="text-page-title">
                  카카오 광고로 일상 속에서 고객을 만나세요
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  4,700만 명이 매일 사용하는 카카오톡을 통해 고객과 더욱 친밀하게 소통하세요. 
                  개인화된 메시지와 자연스러운 광고 노출로 높은 참여도를 달성합니다.
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
                    <h3 className="font-semibold text-gray-800">카카오 광고 대시보드</h3>
                    <span className="text-yellow-600 font-bold text-xl">K</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="text-sm text-yellow-600 font-medium">메시지 전송</div>
                      <div className="text-2xl font-bold text-yellow-700">23,560</div>
                      <div className="text-xs text-yellow-500">+42% 증가</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-green-600 font-medium">친구 추가</div>
                      <div className="text-2xl font-bold text-green-700">1,240</div>
                      <div className="text-xs text-green-500">+35% 증가</div>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-primary-600 mb-1">390%</div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">카카오 광고 서비스</h2>
              <p className="text-xl text-gray-600">카카오 생태계를 활용한 통합 모바일 마케팅</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {serviceTypes.map((service, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg hover:border-yellow-200 transition-all">
                  <h3 className="text-xl font-bold text-gray-900 mb-4" data-testid={`text-service-type-title-${index}`}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed" data-testid={`text-service-type-description-${index}`}>
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-3"></div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">카카오 광고의 장점</h2>
              <p className="text-xl text-gray-600">한국인의 일상에 가장 밀접한 플랫폼의 힘</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${benefit.icon} text-yellow-600 text-xl`}></i>
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
              <p className="text-xl text-gray-600">실제 고객사의 카카오 광고 성과를 확인해보세요</p>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 lg:p-12">
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
                  <h4 className="font-semibold text-gray-900 mb-6">5개월 후 결과:</h4>
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

        {/* Kakao Statistics */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">카카오의 영향력</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-yellow-600 mb-2">4,700만</div>
                <div className="text-gray-900 font-semibold mb-1">카카오톡 사용자</div>
                <div className="text-sm text-gray-600">국내 인구의 91%</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-yellow-600 mb-2">57분</div>
                <div className="text-gray-900 font-semibold mb-1">일평균 이용시간</div>
                <div className="text-sm text-gray-600">압도적 사용시간</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-yellow-600 mb-2">95%</div>
                <div className="text-gray-900 font-semibold mb-1">메시지 읽음률</div>
                <div className="text-sm text-gray-600">즉시 확인하는 메시지</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-primary-600">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">카카오 광고를 시작해보세요</h2>
            <p className="text-xl text-primary-100 mb-8">
              카카오 플랫폼 전문가와의 무료 상담을 통해 모바일 마케팅 전략을 수립하세요
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
