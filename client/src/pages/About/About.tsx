import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { Link } from 'wouter';
import '../../styles/hero.css';

export default function About() {
  const { t } = useLanguage();

  const companyInfo = [
    { label: '회사명', value: '㈜뷰리드AI' },
    { label: '업태/종목', value: '서비스 / 디지털마케팅 대행, AI 마케팅 솔루션' },
    { label: '주요사업', value: '퍼포먼스 마케팅, AI 자동화, 데이터 분석, 컨설팅' },
    { label: '설립일', value: '2019년 3월 15일' },
    { label: '누적 광고비', value: '850억원 (2024년 기준)' },
    { label: '임직원현황', value: '25명 (2024년 말 기준)' },
    { label: '주소', value: '서울특별시 강남구 테헤란로 123, 뷰리드타워 15층' }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SEO 
        title={`${t.nav.about} | 뷰리드AI`}
        description="데이터 기반 퍼포먼스 마케팅 전문 에이전시 뷰리드AI의 회사 소개"
        keywords="뷰리드AI, 회사소개, 퍼포먼스마케팅, 마케팅에이전시"
      />
      
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <Header />

      <main className="relative z-10 py-20 lg:py-32">
        {/* Hero Section */}
        <section className="container max-w-7xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h1 className="hero-title text-4xl lg:text-6xl font-black mb-6" data-testid="text-page-title">
              회사소개
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              데이터와 AI의 힘으로 고객의 성공을 만들어가는 글로벌 퍼포먼스 마케팅 전문기업
            </p>
          </div>
        </section>

        {/* Overview Section */}
        <section className="container max-w-7xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Overview</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyInfo.map((info, index) => (
              <div key={index} className="stats-card animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                <div className="text-white/90 font-semibold text-sm mb-2">{info.label}</div>
                <div className="text-white font-bold text-lg">{info.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Vision Section */}
        <section className="container max-w-7xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">Vision</h2>
            <div className="max-w-5xl mx-auto">
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8">
                뷰리드AI는 퍼포먼스 마케팅 분야에서 축적된 전문지식과 성공사례를 기반으로
              </p>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-12">
                고객의 매출성장 및 서비스 향상을 최우선 과제로 설정해 동반성장하며
              </p>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-12">
                미래지향적 관계를 구축하는 데 목표를 두고 있습니다.
              </p>
              
              <div className="hero-title text-3xl lg:text-5xl font-black mb-8">
                Global No.1 AI Marketing Professional Group
              </div>
              
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed mb-8">
                급변하는 디지털 환경 속에서 AI와 데이터 분석에 대한 요구는 해답을 찾기 어려운 미로와 같습니다.
              </p>
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed mb-8">
                뷰리드AI는 주요 광고매체사의 공식파트너로서 다양한 분야의 전문가를 보유하고 있으며,
              </p>
              <p className="text-lg lg:text-xl text-white/80 leading-relaxed">
                데이터 기반의 최적화된 마케팅 솔루션을 제시하는 비즈니스 파트너가 되겠습니다.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="container max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/about/philosophy">
              <div className="contact-card group cursor-pointer animate-fade-in-up">
                <div className="contact-icon mb-6">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">기업철학</h3>
                <p className="text-white/70">데이터와 창의성의 조화로 고객의 성공을 만들어갑니다</p>
              </div>
            </Link>

            <Link href="/about/leadership">
              <div className="contact-card group cursor-pointer animate-fade-in-up animate-delay-100">
                <div className="contact-icon mb-6">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 7h-5c-.83 0-1.54.5-1.85 1.22L9.11 16H11.5v6h8.5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">리더십</h3>
                <p className="text-white/70">경험과 전문성을 바탕으로 혁신을 이끄는 리더들</p>
              </div>
            </Link>

            <Link href="/about/profile">
              <div className="contact-card group cursor-pointer animate-fade-in-up animate-delay-200">
                <div className="contact-icon mb-6">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">회사프로필</h3>
                <p className="text-white/70">사업영역과 전문 서비스 소개</p>
              </div>
            </Link>

            <Link href="/about/history">
              <div className="contact-card group cursor-pointer animate-fade-in-up animate-delay-300">
                <div className="contact-icon mb-6">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">연혁</h3>
                <p className="text-white/70">2019년부터 현재까지의 성장과 혁신의 발자취</p>
              </div>
            </Link>
          </div>
          
          {/* Additional Links Row */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Link href="/about/brand">
              <div className="contact-card group cursor-pointer animate-fade-in-up">
                <div className="contact-icon mb-6">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">브랜드 CI</h3>
                <p className="text-white/70">뷰리드AI의 브랜드 아이덴티티와 디자인 시스템</p>
              </div>
            </Link>

            <Link href="/about/location">
              <div className="contact-card group cursor-pointer animate-fade-in-up animate-delay-100">
                <div className="contact-icon mb-6">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">오시는 길</h3>
                <p className="text-white/70">뷰리드AI 본사 위치와 찾아오시는 방법</p>
              </div>
            </Link>

            <div className="contact-card group cursor-pointer animate-fade-in-up animate-delay-200">
              <div className="contact-icon mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">회사 브로셔</h3>
              <p className="text-white/70">뷰리드AI 회사 소개서 다운로드</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
