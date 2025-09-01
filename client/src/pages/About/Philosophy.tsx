import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import '../../styles/hero.css';

export default function Philosophy() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SEO 
        title={`${t.nav.philosophy} | 뷰리드AI`}
        description="뷰리드AI의 기업철학과 핵심 가치를 소개합니다"
        keywords="뷰리드AI, 기업철학, 핵심가치, 마케팅철학"
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
              기업철학
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              데이터와 창의성의 조화로 고객의 성공을 만들어갑니다
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="container max-w-6xl mx-auto mb-20">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="stats-card text-center animate-fade-in-up">
              <div className="contact-icon mb-8">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">미션</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                데이터 기반의 정확한 인사이트와 창의적인 마케팅 솔루션을 통해 
                고객의 비즈니스 성장을 가속화하고, 디지털 마케팅 생태계의 발전에 기여합니다.
              </p>
            </div>

            {/* Vision */}
            <div className="stats-card text-center animate-fade-in-up animate-delay-100">
              <div className="contact-icon mb-8">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">비전</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                AI와 빅데이터 기술을 선도하는 글로벌 퍼포먼스 마케팅 에이전시로 성장하여, 
                모든 기업이 데이터의 힘으로 성공할 수 있는 세상을 만들어갑니다.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">핵심 가치</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              뷰리드AI의 모든 구성원이 공유하는 6가지 핵심 가치입니다
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="contact-card text-center animate-fade-in-up">
              <div className="contact-icon mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Data-Driven</h3>
              <p className="text-white/80">
                모든 의사결정과 전략 수립을 데이터에 기반하여 객관적이고 정확한 결과를 추구합니다.
              </p>
            </div>
            
            <div className="contact-card text-center animate-fade-in-up animate-delay-100">
              <div className="contact-icon mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11H7v9h2v-9zm4-4H11v13h2V7zm4-4H15v17h2V3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
              <p className="text-white/80">
                끊임없는 혁신과 창의적 사고로 새로운 마케팅 솔루션을 개발하고 적용합니다.
              </p>
            </div>
            
            <div className="contact-card text-center animate-fade-in-up animate-delay-200">
              <div className="contact-icon mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.5 7h-5c-.83 0-1.54.5-1.85 1.22L9.11 16H11.5v6h8.5z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Partnership</h3>
              <p className="text-white/80">
                고객과의 진정한 파트너십을 통해 함께 성장하고 상생하는 관계를 구축합니다.
              </p>
            </div>
            
            <div className="contact-card text-center animate-fade-in-up animate-delay-300">
              <div className="contact-icon mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Excellence</h3>
              <p className="text-white/80">
                최고 수준의 서비스 품질을 유지하며 고객의 기대를 뛰어넘는 결과를 제공합니다.
              </p>
            </div>
            
            <div className="contact-card text-center animate-fade-in-up animate-delay-400">
              <div className="contact-icon mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Transparency</h3>
              <p className="text-white/80">
                투명한 소통과 명확한 성과 보고를 통해 신뢰할 수 있는 관계를 유지합니다.
              </p>
            </div>
            
            <div className="contact-card text-center animate-fade-in-up animate-delay-500">
              <div className="contact-icon mb-6">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.5 11h-2V9h2v2zm0-4h-2V5h2v2zm0 8h-2v-2h2v2zm3 0h14v-2H7.5v2zm0-4h14V9H7.5v2zm0-4h14V5H7.5v2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Growth</h3>
              <p className="text-white/80">
                지속적인 학습과 개선을 통해 개인과 조직, 그리고 고객의 성장을 추진합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy Statement Section */}
        <section className="container max-w-4xl mx-auto mt-20">
          <div className="stats-card text-center">
            <h2 className="text-3xl font-bold text-white mb-8">뷰리드AI가 추구하는 가치</h2>
            <div className="space-y-6">
              <p className="text-lg text-white/90 leading-relaxed">
                "데이터는 진실을 말하고, 창의성은 가능성을 열어줍니다."
              </p>
              <p className="text-white/80 leading-relaxed">
                뷰리드AI는 단순히 광고를 집행하는 에이전시가 아닙니다. 
                우리는 고객의 비즈니스를 깊이 이해하고, 데이터를 통해 인사이트를 발견하며, 
                창의적인 아이디어로 새로운 성장 동력을 만들어내는 진정한 비즈니스 파트너입니다.
              </p>
              <p className="text-white/80 leading-relaxed">
                모든 프로젝트에서 고객의 성공을 우리의 성공으로 여기며, 
                투명하고 신뢰할 수 있는 관계를 바탕으로 함께 성장해 나갑니다.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}