import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export default function Profile() {
  const { t } = useLanguage();

  const businessAreas = [
    {
      icon: 'fas fa-search',
      title: '검색 마케팅',
      description: '구글과 네이버 검색 엔진에서의 유료 광고(SEM)와 자연 검색 최적화(SEO)를 통해 타겟 고객에게 정확히 도달합니다.',
      services: ['구글 애즈', '네이버 검색광고', 'SEO 최적화', '키워드 전략']
    },
    {
      icon: 'fas fa-users',
      title: '소셜미디어 마케팅',
      description: '페이스북, 인스타그램, 카카오톡 등 소셜 플랫폼을 활용해 브랜드 인지도를 높이고 고객과의 소통을 강화합니다.',
      services: ['메타 광고', '카카오 광고', '인플루언서 마케팅', '콘텐츠 마케팅']
    },
    {
      icon: 'fas fa-chart-line',
      title: '데이터 분석 및 최적화',
      description: 'Google Analytics, 광고 플랫폼 데이터를 종합 분석하여 마케팅 성과를 지속적으로 개선합니다.',
      services: ['성과 분석', 'A/B 테스팅', '전환율 최적화', '대시보드 구축']
    },
    {
      icon: 'fas fa-cog',
      title: '마케팅 자동화',
      description: 'AI와 머신러닝 기술을 활용해 마케팅 프로세스를 자동화하고 효율성을 극대화합니다.',
      services: ['자동 입찰 시스템', '개인화 추천', '리타겟팅', '고객 세그멘테이션']
    }
  ];

  const companyStats = [
    { label: '설립연도', value: '2019' },
    { label: '누적 고객사', value: '200+' },
    { label: '직원 수', value: '25명' },
    { label: '평균 경력', value: '8년' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${t.nav.profile} | 뷰리드AI`}
        description="뷰리드AI의 사업영역과 전문 서비스를 소개합니다"
        keywords="뷰리드AI, 사업영역, 퍼포먼스마케팅, 검색마케팅, 소셜미디어마케팅"
      />
      <Header />

      <main className="py-16 lg:py-24">
        <div className="container max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" data-testid="text-page-title">
              회사 프로필
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              데이터 기반의 퍼포먼스 마케팅 전문 에이전시로서 고객의 비즈니스 성장을 위한 
              통합 마케팅 솔루션을 제공합니다.
            </p>
          </div>

          {/* Company Overview */}
          <section className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">회사 개요</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  뷰리드AI는 2019년 설립된 퍼포먼스 마케팅 전문 에이전시로, 
                  데이터 분석과 AI 기술을 바탕으로 고객의 마케팅 성과를 극대화합니다.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  우리는 단순한 광고 대행사가 아닌, 고객의 비즈니스 파트너로서 
                  지속가능한 성장을 함께 만들어가고 있습니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {companyStats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600 mb-1" data-testid={`text-stat-value-${index}`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600" data-testid={`text-stat-label-${index}`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="BeauLeadAI office and team"
                  className="rounded-xl shadow-lg w-full"
                  data-testid="img-company-overview"
                />
              </div>
            </div>
          </section>

          {/* Business Areas */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">주요 사업영역</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {businessAreas.map((area, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                      <i className={`${area.icon} text-primary-600 text-xl`}></i>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900" data-testid={`text-area-title-${index}`}>
                      {area.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed" data-testid={`text-area-description-${index}`}>
                    {area.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 mb-3">주요 서비스:</h4>
                    <div className="flex flex-wrap gap-2">
                      {area.services.map((service, serviceIndex) => (
                        <span 
                          key={serviceIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          data-testid={`text-service-${index}-${serviceIndex}`}
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications & Awards */}
          <section className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">인증 및 수상</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fab fa-google text-blue-600 text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Google Partners</h4>
                <p className="text-sm text-gray-600">구글 인증 파트너</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl font-bold">N</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Naver Certified</h4>
                <p className="text-sm text-gray-600">네이버 인증 에이전시</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fab fa-facebook text-blue-600 text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Meta Partner</h4>
                <p className="text-sm text-gray-600">메타 비즈니스 파트너</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-trophy text-yellow-600 text-2xl"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Excellence Award</h4>
                <p className="text-sm text-gray-600">마케팅 우수상 수상</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
