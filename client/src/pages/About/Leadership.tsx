import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import '../../styles/hero.css';

export default function Leadership() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background orbs */}
      <div className="bg-orb">
        <div className="orb orb-a"></div>
        <div className="orb orb-b"></div>
      </div>
      <SEO 
        title={`${t.nav.leadership} | 뷰리드AI`}
        description="뷰리드AI의 경영진과 리더십 팀을 소개합니다"
        keywords="뷰리드AI, 대표인사, 경영진, 리더십, 박현구, 김수진"
      />
      <Header />
      <main className="py-20 lg:py-32 relative z-10">
        {/* Hero Section */}
        <section className="container max-w-7xl mx-auto mb-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center modern-icon mb-8">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h1 className="hero-title text-4xl lg:text-6xl font-black mb-6" data-testid="text-page-title">회사인사말</h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              데이터와 혁신으로 고객의 성공을 만들어가는 뷰리드AI의 리더십
            </p>
          </div>
        </section>

        {/* Inspirational Quote */}
        <section className="container max-w-5xl mx-auto mb-20">
          <div className="floating-card text-center">
            <div className="contact-icon mx-auto mb-8">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z"/>
              </svg>
            </div>
            <blockquote className="text-2xl lg:text-3xl font-semibold text-white leading-relaxed mb-6">
              "데이터는 진실을 말하고, 실행력은 성과를 만듭니다."
            </blockquote>
            <p className="text-lg text-white/80">
              뷰리드AI는 고객의 성공을 위해 끊임없이 도전하고 혁신합니다.
            </p>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="container max-w-7xl mx-auto">
          <div className="space-y-12">
            
            {/* CEO Card */}
            <div className="group">
              <div className="service-card animate-fade-in-up">
                <div className="grid lg:grid-cols-5 gap-0">
                  <div className="lg:col-span-2 p-8 lg:p-12">
                    <div className="text-center h-full flex flex-col justify-center">
                      <div className="relative inline-block mb-6">
                        <img
                          src="/attached_assets/james_1756284144938.png"
                          alt="박현구 대표이사"
                          className="rounded-lg w-64 h-64 object-contain mx-auto"
                          data-testid="img-ceo-profile"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80";
                          }}
                        />
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full flex items-center justify-center shadow-xl">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-3 p-8 lg:p-12 lg:pl-0 flex flex-col justify-center">
                    <div className="mb-8">
                      <h3 className="text-4xl lg:text-5xl font-bold text-white mb-3" data-testid="text-ceo-name">
                        박현구
                      </h3>
                      <p className="text-xl lg:text-2xl text-brand-400 font-semibold mb-6" data-testid="text-ceo-title">
                        대표이사 · CEO
                      </p>
                      <div className="w-20 h-1.5 bg-gradient-to-r from-brand-500 to-purple-500 rounded-full"></div>
                    </div>
                    
                    <div className="space-y-5 text-white/80 leading-relaxed">
                      <p className="text-lg lg:text-xl font-medium text-white">
                        안녕하세요. 뷰리드AI 대표이사 박현구입니다.
                      </p>
                      <p className="text-base lg:text-lg">
                        15년간 디지털 마케팅 업계에서 쌓은 경험을 바탕으로, 데이터 기반의 정확한 인사이트와 창의적인 마케팅 솔루션을 통해 고객의 비즈니스 성장을 가속화하고 있습니다.
                      </p>
                      <p className="text-base lg:text-lg">
                        뷰리드AI는 단순히 광고를 대행하는 에이전시가 아닙니다. 우리는 고객의 성공을 우리의 성공으로 여기며, AI와 빅데이터 기술을 활용한 혁신적인 마케팅 솔루션으로 함께 성장해 나가는 진정한 비즈니스 파트너입니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* VP Card */}
            <div className="group">
              <div className="service-card animate-fade-in-up animate-delay-100">
                <div className="grid lg:grid-cols-5 gap-0">
                  <div className="lg:col-span-3 p-8 lg:p-12 lg:pr-0 flex flex-col justify-center">
                    <div className="mb-8">
                      <h3 className="text-4xl lg:text-5xl font-bold text-white mb-3" data-testid="text-vp-name">
                        김수진
                      </h3>
                      <p className="text-xl lg:text-2xl text-purple-400 font-semibold mb-6" data-testid="text-vp-title">
                        부사장 · VP of Operations
                      </p>
                      <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    </div>
                    
                    <div className="space-y-5 text-white/80 leading-relaxed">
                      <p className="text-lg lg:text-xl font-medium text-white">
                        뷰리드AI의 운영 전반을 책임지고 있는 김수진 부사장입니다.
                      </p>
                      <p className="text-base lg:text-lg">
                        AI와 머신러닝 분야에서 10년 이상의 전문성을 보유하며, 마케팅 자동화 시스템 개발과 운영 최적화를 이끌고 있습니다. 삼성전자, 카카오에서의 AI 개발 경험을 바탕으로 뷰리드AI의 기술 혁신을 주도하고 있습니다.
                      </p>
                      <p className="text-base lg:text-lg">
                        효율적인 프로세스 구축과 팀 간 원활한 협업을 통해 고객에게 최고 품질의 서비스를 제공하는 것이 저의 목표입니다.
                      </p>
                    </div>
                  </div>
                  <div className="lg:col-span-2 p-8 lg:p-12">
                    <div className="text-center h-full flex flex-col justify-center">
                      <div className="relative inline-block mb-6">
                        <img
                          src="/attached_assets/chals_1756284209106.png"
                          alt="김수진 부사장"
                          className="rounded-lg w-64 h-64 object-contain mx-auto"
                          data-testid="img-vp-profile"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80";
                          }}
                        />
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTO Card */}
            <div className="group">
              <div className="service-card animate-fade-in-up animate-delay-200">
                <div className="grid lg:grid-cols-5 gap-0">
                  <div className="lg:col-span-2 p-8 lg:p-12">
                    <div className="text-center h-full flex flex-col justify-center">
                      <div className="relative inline-block mb-6">
                        <img
                          src="/attached_assets/robert2_1756284716423.png"
                          alt="권현수 CTO"
                          className="rounded-lg w-64 h-64 object-contain mx-auto"
                          data-testid="img-cto-profile"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80";
                          }}
                        />
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-xl">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-3 p-8 lg:p-12 lg:pl-0 flex flex-col justify-center">
                    <div className="mb-8">
                      <h3 className="text-4xl lg:text-5xl font-bold text-white mb-3" data-testid="text-cto-name">
                        권현수
                      </h3>
                      <p className="text-xl lg:text-2xl text-green-400 font-semibold mb-6" data-testid="text-cto-title">
                        CTO · Chief Technology Officer
                      </p>
                      <div className="w-20 h-1.5 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"></div>
                    </div>
                    
                    <div className="space-y-5 text-white/80 leading-relaxed">
                      <p className="text-lg lg:text-xl font-medium text-white">
                        뷰리드AI의 기술 혁신을 이끄는 권현수 CTO입니다.
                      </p>
                      <p className="text-base lg:text-lg">
                        실리콘밸리에서 12년간 AI/ML 분야의 선도적인 기술 개발을 담당했으며, Google, Meta에서 대규모 머신러닝 시스템 설계와 운영 경험을 보유하고 있습니다. 특히 광고 최적화 알고리즘과 실시간 데이터 처리 시스템 분야의 전문가입니다.
                      </p>
                      <p className="text-base lg:text-lg">
                        뷰리드AI에서는 최첨단 AI 기술을 마케팅 솔루션에 접목하여 고객에게 차별화된 가치를 제공하는 혁신적인 플랫폼을 구축하고 있습니다. 기술의 힘으로 마케팅의 미래를 만들어가겠습니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="container max-w-7xl mx-auto px-6 mt-24 mb-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              리더십 핵심 가치
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              뷰리드AI 리더십이 추구하는 핵심 가치와 경영 철학
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="contact-card">
              <div className="w-16 h-16 bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">데이터 중심</h3>
              <p className="text-white/70 leading-relaxed">
                모든 의사결정을 데이터에 기반하여 객관적이고 정확한 판단을 합니다
              </p>
            </div>
            
            <div className="contact-card">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">고객 성공</h3>
              <p className="text-white/70 leading-relaxed">
                고객의 성공을 우리의 성공으로 여기며 진정한 파트너십을 구축합니다
              </p>
            </div>
            
            <div className="contact-card">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11H7v9h2v-9zm4-4H11v13h2V7zm4-4H15v17h2V3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">지속적 혁신</h3>
              <p className="text-white/70 leading-relaxed">
                끊임없는 학습과 혁신을 통해 업계를 선도하는 솔루션을 개발합니다
              </p>
            </div>
            
            <div className="contact-card">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">투명성</h3>
              <p className="text-white/70 leading-relaxed">
                투명한 소통과 명확한 성과 공유로 신뢰할 수 있는 관계를 만듭니다
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container max-w-5xl mx-auto mt-20">
          <div className="floating-card text-center">
            <h2 className="hero-title text-3xl lg:text-4xl font-black mb-6">
              함께 성장할 준비가 되셨나요?
            </h2>
            <p className="text-lg lg:text-xl text-white/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              뷰리드AI와 함께 데이터 기반의 혁신적인 마케팅 여정을 시작하세요
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/inquiry" 
                className="modern-btn"
                data-testid="button-contact-cta"
              >
                <span>무료 상담 받기</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a 
                href="/portfolio" 
                className="modern-btn-outline"
                data-testid="button-portfolio-cta"
              >
                <span>포트폴리오 보기</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}