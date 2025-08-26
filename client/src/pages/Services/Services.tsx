import { Link } from 'wouter';
import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

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
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${t.nav.services} | 뷰리드AI`}
        description="구글, 네이버, 메타, 카카오 광고 전문 서비스를 제공합니다"
        keywords="구글광고, 네이버광고, 메타광고, 카카오광고, 퍼포먼스마케팅"
      />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 via-white to-gray-50 py-16 lg:py-24">
          <div className="container max-w-6xl mx-auto text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" data-testid="text-page-title">
              {t.services.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12" data-testid="text-page-subtitle">
              {t.services.subtitle}
            </p>

            {/* Key Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-primary-600 mb-2">4+</div>
                <div className="text-sm text-gray-600">주요 플랫폼</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-primary-600 mb-2">200+</div>
                <div className="text-sm text-gray-600">성공 프로젝트</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-primary-600 mb-2">487%</div>
                <div className="text-sm text-gray-600">평균 ROAS</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-primary-600 mb-2">₩12.5B</div>
                <div className="text-sm text-gray-600">누적 매출 기여</div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={service.id} className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-primary-200 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 ${service.bgColor} rounded-xl flex items-center justify-center ${service.hoverBg} transition-colors mr-4`}>
                      <i className={`${service.icon} text-2xl ${service.iconColor}`}></i>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1" data-testid={`text-service-title-${index}`}>
                        {service.title}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>ROAS {service.metrics.avgRoas}</span>
                        <span>•</span>
                        <span>{service.metrics.clients} 고객사</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed" data-testid={`text-service-description-${index}`}>
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">주요 서비스</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></div>
                          <span data-testid={`text-service-feature-${index}-${featureIndex}`}>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link 
                    href={`/services/${service.id}`}
                    className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group/link"
                    data-testid={`link-service-detail-${index}`}
                  >
                    {t.services.learnMore}
                    <i className="fas fa-arrow-right ml-2 transform group-hover/link:translate-x-1 transition-transform"></i>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">서비스 프로세스</h2>
              <p className="text-xl text-gray-600">체계적이고 투명한 프로세스로 최고의 결과를 보장합니다</p>
            </div>

            <div className="grid md:grid-cols-5 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">상담 및 분석</h3>
                <p className="text-sm text-gray-600">비즈니스 목표와 현재 상황을 정확히 파악합니다</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">전략 수립</h3>
                <p className="text-sm text-gray-600">데이터 기반의 맞춤형 마케팅 전략을 수립합니다</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">캠페인 실행</h3>
                <p className="text-sm text-gray-600">전문가팀이 각 플랫폼에 최적화된 캠페인을 실행합니다</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  4
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">모니터링</h3>
                <p className="text-sm text-gray-600">실시간으로 성과를 모니터링하고 최적화합니다</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  5
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">리포팅</h3>
                <p className="text-sm text-gray-600">투명한 성과 리포트와 개선안을 제공합니다</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-primary-600">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">지금 시작하세요</h2>
            <p className="text-xl text-primary-100 mb-8">
              무료 상담을 통해 맞춤형 마케팅 전략을 제안해드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                data-testid="button-contact-cta"
              >
                무료 상담 신청
              </Link>
              <Link 
                href="/portfolio" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                data-testid="button-portfolio-cta"
              >
                성공 사례 보기
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
