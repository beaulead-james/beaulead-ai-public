import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import '../../styles/hero.css';

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background orbs */}
      <div className="bg-orb">
        <div className="orb orb-a"></div>
        <div className="orb orb-b"></div>
      </div>
      
      <SEO 
        title={`${t.nav.profile} | 뷰리드AI`}
        description="뷰리드AI의 사업영역과 전문 서비스를 소개합니다"
        keywords="뷰리드AI, 사업영역, 퍼포먼스마케팅, 검색마케팅, 소셜미디어마케팅"
      />
      <Header />

      <main className="py-20 lg:py-32 relative z-10">
        <div className="container max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-20">
            <h1 className="hero-title text-4xl lg:text-6xl font-black mb-6" data-testid="text-page-title">
              회사 프로필
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              데이터 기반의 퍼포먼스 마케팅 전문 에이전시로서 고객의 비즈니스 성장을 위한 
              통합 마케팅 솔루션을 제공합니다.
            </p>
          </div>

          {/* Company Overview */}
          <section className="service-card mb-20 animate-fade-in-up">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">회사 개요</h2>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  뷰리드AI는 2019년 설립된 퍼포먼스 마케팅 전문 에이전시로, 
                  데이터 분석과 AI 기술을 바탕으로 고객의 마케팅 성과를 극대화합니다.
                </p>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  우리는 단순한 광고 대행사가 아닌, 고객의 비즈니스 파트너로서 
                  지속가능한 성장을 함께 만들어가고 있습니다.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {companyStats.map((stat, index) => (
                    <div key={index} className="stats-card">
                      <div className="text-3xl font-bold text-white mb-2" data-testid={`text-stat-value-${index}`}>
                        {stat.value}
                      </div>
                      <div className="text-white/70" data-testid={`text-stat-label-${index}`}>
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
          <section className="mb-20">
            <div className="text-center mb-16">
              <h2 className="hero-title text-3xl lg:text-5xl font-black mb-6">주요 사업영역</h2>
              <p className="text-xl text-white/80">데이터 기반의 전문적인 마케팅 서비스</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {businessAreas.map((area, index) => (
                <div key={index} className="service-card animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="flex items-center mb-6">
                    <div className="contact-icon mr-6">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        {index === 0 && <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>}
                        {index === 1 && <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 7h-5c-.83 0-1.54.5-1.85 1.22L9.11 16H11.5v6h8.5z"/>}
                        {index === 2 && <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>}
                        {index === 3 && <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>}
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white" data-testid={`text-area-title-${index}`}>
                      {area.title}
                    </h3>
                  </div>
                  <p className="text-white/80 text-lg mb-6 leading-relaxed" data-testid={`text-area-description-${index}`}>
                    {area.description}
                  </p>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-white text-lg">주요 서비스:</h4>
                    <div className="flex flex-wrap gap-3">
                      {area.services.map((service, serviceIndex) => (
                        <span 
                          key={serviceIndex}
                          className="px-4 py-2 bg-white/10 text-white border border-white/20 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors"
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
          <section className="service-card animate-fade-in-up animate-delay-300">
            <div className="text-center mb-12">
              <h2 className="hero-title text-3xl lg:text-5xl font-black mb-6">인증 및 수상</h2>
              <p className="text-xl text-white/80">신뢰할 수 있는 파트너십과 검증된 전문성</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="contact-card">
                <div className="contact-icon mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-white text-xl mb-3">Google Partners</h4>
                <p className="text-white/70">구글 인증 파트너</p>
              </div>
              <div className="contact-card">
                <div className="contact-icon mb-6">
                  <span className="text-white text-2xl font-bold">N</span>
                </div>
                <h4 className="font-bold text-white text-xl mb-3">Naver Certified</h4>
                <p className="text-white/70">네이버 인증 에이전시</p>
              </div>
              <div className="contact-card">
                <div className="contact-icon mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-white text-xl mb-3">Meta Partner</h4>
                <p className="text-white/70">메타 비즈니스 파트너</p>
              </div>
              <div className="contact-card">
                <div className="contact-icon mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-white text-xl mb-3">Excellence Award</h4>
                <p className="text-white/70">마케팅 우수상 수상</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
