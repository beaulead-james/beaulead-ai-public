import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import '../../styles/hero.css';

export default function History() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SEO 
        title={`${t.nav.history} | 뷰리드AI`}
        description="뷰리드AI의 성장과 혁신의 발자취를 소개합니다"
        keywords="뷰리드AI, 연혁, 회사연혁, 성장과정"
      />
      
      {/* Background orbs */}
      <div className="bg-orb">
        <div className="orb orb-a"></div>
        <div className="orb orb-b"></div>
      </div>
      
      <Header />

      <main className="relative z-10 py-20 lg:py-32">
        {/* Header Section */}
        <section className="container max-w-7xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h1 className="hero-title text-4xl lg:text-6xl font-black mb-6" data-testid="text-page-title">
              History
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              2019년 설립부터 현재까지, 뷰리드AI의 성장과 혁신의 발자취를 소개합니다
            </p>
          </div>
        </section>

        {/* Timeline Sections */}
        <section className="container max-w-6xl mx-auto">
          <div className="space-y-16">
            {/* Global No.1 도전 섹션 */}
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">Global No.1 도전</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              <div className="stats-card animate-fade-in-up">
                <div className="text-lg font-bold text-white mb-4">2024 AI 자동화 시스템 2.0 런칭</div>
                <div className="text-white/80 text-sm mb-4">머신러닝 기반 자동 입찰 최적화 시스템 도입으로 평균 ROAS 25% 개선</div>
              </div>
              
              <div className="stats-card animate-fade-in-up animate-delay-100">
                <div className="text-lg font-bold text-white mb-4">2024 글로벌 진출</div>
                <div className="text-white/80 text-sm mb-4">동남아시아 시장 진출을 위한 싱가포르 현지법인 설립</div>
              </div>
              
              <div className="stats-card animate-fade-in-up animate-delay-200">
                <div className="text-lg font-bold text-white mb-4">2023 시리즈 A 투자 유치</div>
                <div className="text-white/80 text-sm mb-4">성장 가속화를 위한 50억원 규모 시리즈 A 투자 유치 성공</div>
              </div>
              
              <div className="stats-card animate-fade-in-up animate-delay-300">
                <div className="text-lg font-bold text-white mb-4">2023 메타 마케팅 파트너 인증</div>
                <div className="text-white/80 text-sm mb-4">메타(Facebook) 공식 마케팅 파트너로 선정되어 광고 크레딧 혜택 확보</div>
              </div>
            </div>

            {/* 디지털마케팅전문기업으로 성장 섹션 */}
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">디지털마케팅전문기업으로 성장</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              <div className="stats-card animate-fade-in-up">
                <div className="text-lg font-bold text-white mb-4">2022 구글 프리미어 파트너 선정</div>
                <div className="text-white/80 text-sm mb-4">구글 애즈 운용 실력을 인정받아 프리미어 파트너로 선정</div>
              </div>
              
              <div className="stats-card animate-fade-in-up animate-delay-100">
                <div className="text-lg font-bold text-white mb-4">2022 자체 애널리틱스 플랫폼 개발</div>
                <div className="text-white/80 text-sm mb-4">고객 맞춤형 성과 분석을 위한 통합 애널리틱스 플랫폼 'BeauDash' 출시</div>
              </div>
              
              <div className="stats-card animate-fade-in-up animate-delay-200">
                <div className="text-lg font-bold text-white mb-4">2021 네이버 공식 파트너 등록</div>
                <div className="text-white/80 text-sm mb-4">네이버 검색광고 공식 파트너사로 등록되어 전문성 인증</div>
              </div>
              
              <div className="stats-card animate-fade-in-up animate-delay-300">
                <div className="text-lg font-bold text-white mb-4">2021 마케팅 우수상 수상</div>
                <div className="text-white/80 text-sm mb-4">한국디지털마케팅협회 주최 '올해의 마케팅 에이전시상' 수상</div>
              </div>
            </div>

            {/* 비즈니스 시작 섹션 */}
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">비즈니스 시작</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="stats-card animate-fade-in-up">
                <div className="text-lg font-bold text-white mb-4">2020 누적 고객사 100개 달성</div>
                <div className="text-white/80 text-sm mb-4">설립 1년 만에 누적 고객사 100개를 달성하며 빠른 성장세 입증</div>
              </div>
              
              <div className="stats-card animate-fade-in-up animate-delay-100">
                <div className="text-lg font-bold text-white mb-4">2019 뷰리드AI 설립</div>
                <div className="text-white/80 text-sm mb-4">김영수 대표를 중심으로 5명의 창립 멤버가 모여 뷰리드AI 공식 설립</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}