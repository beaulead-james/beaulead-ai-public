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
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="구글 광고 | 뷰리드AI"
        description="검색광고, 디스플레이광고, 쇼핑광고, 유튜브광고까지 구글 생태계 전문 마케팅 서비스"
        keywords="구글광고, 구글애즈, 검색광고, 디스플레이광고, 쇼핑광고, 유튜브광고"
      />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-gray-50 py-16 lg:py-24">
          <div className="container max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="fab fa-google text-blue-600 text-xl"></i>
                  </div>
                  <span className="text-blue-600 font-semibold">Google Ads</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" data-testid="text-page-title">
                  구글 광고로 더 많은 고객을 만나보세요
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  전 세계 90억 명이 사용하는 구글에서 정확한 타겟 고객에게 도달하세요. 
                  검색, 디스플레이, 쇼핑, YouTube까지 모든 구글 광고 솔루션을 제공합니다.
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
                    <h3 className="font-semibold text-gray-800">Google Ads 대시보드</h3>
                    <i className="fab fa-google text-blue-600 text-xl"></i>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-blue-600 font-medium">클릭수</div>
                      <div className="text-2xl font-bold text-blue-700">12,840</div>
                      <div className="text-xs text-blue-500">+24% 증가</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-green-600 font-medium">전환수</div>
                      <div className="text-2xl font-bold text-green-700">156</div>
                      <div className="text-xs text-green-500">+18% 증가</div>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-primary-600 mb-1">520%</div>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">구글 광고 서비스</h2>
              <p className="text-xl text-gray-600">다양한 형태의 구글 광고로 최적의 마케팅 효과를 달성합니다</p>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-4">구글 광고의 장점</h2>
              <p className="text-xl text-gray-600">왜 전 세계 기업들이 구글 광고를 선택하는지 알아보세요</p>
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
              <p className="text-xl text-gray-600">실제 고객사의 구글 광고 성과를 확인해보세요</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12">
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
                  <h4 className="font-semibold text-gray-900 mb-6">3개월 후 결과:</h4>
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

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-primary-600">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">구글 광고를 시작해보세요</h2>
            <p className="text-xl text-primary-100 mb-8">
              전문가와의 무료 상담을 통해 맞춤형 구글 광고 전략을 수립하세요
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
