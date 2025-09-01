import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import '../../styles/hero.css';

export default function Brand() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SEO 
        title={`브랜드 아이덴티티 | 뷰리드AI`}
        description="뷰리드AI의 브랜드 아이덴티티와 CI 시스템을 소개합니다"
        keywords="뷰리드AI, 브랜드, CI, 로고, 아이덴티티"
      />
      
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900"></div>
        <div className="bg-orb"></div>
      </div>
      
      <Header />

      <main className="relative z-10 py-20 lg:py-32">
        {/* Header Section */}
        <section className="container max-w-7xl mx-auto mb-20">
          <div className="text-center mb-16">
            <h1 className="hero-title text-4xl lg:text-6xl font-black mb-6" data-testid="text-page-title">
              CI
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              뷰리드AI의 브랜드 아이덴티티와 디자인 시스템을 소개합니다
            </p>
          </div>
        </section>

        {/* Logo Section */}
        <section className="container max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">로고</h2>
          </div>
          
          <div className="stats-card mb-12 text-center">
            <div className="mb-8">
              <div className="hero-title text-6xl lg:text-8xl font-black mb-4">
                뷰리드AI
              </div>
              <div className="text-xl lg:text-2xl text-white/80">
                BeauLead AI
              </div>
            </div>
            <p className="text-white/90 leading-relaxed max-w-3xl mx-auto">
              뷰리드AI의 CI는 AI와 데이터 기반 마케팅 분야에 정통한 인재들이 모여 
              혁신적인 솔루션을 통해 고객과 동반성장한다는 기업 비전을 시각화하고 있습니다.
            </p>
          </div>
        </section>

        {/* Color System Section */}
        <section className="container max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">색상</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Primary Blue */}
            <div className="stats-card">
              <div className="w-full h-32 bg-blue-600 rounded-lg mb-6"></div>
              <h3 className="text-xl font-bold text-white mb-4">Primary Blue</h3>
              <p className="text-white/80 text-sm mb-4">
                신뢰와 전문성을 상징하는 프라이머리 블루. 
                데이터의 정확성과 AI의 신뢰성을 표현합니다.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/90">
                  <span>RGB</span>
                  <span>37, 99, 235</span>
                </div>
                <div className="flex justify-between text-white/90">
                  <span>HEX</span>
                  <span>#2563EB</span>
                </div>
              </div>
            </div>

            {/* Secondary Purple */}
            <div className="stats-card">
              <div className="w-full h-32 bg-purple-600 rounded-lg mb-6"></div>
              <h3 className="text-xl font-bold text-white mb-4">Secondary Purple</h3>
              <p className="text-white/80 text-sm mb-4">
                창의성과 혁신을 상징하는 세컨더리 퍼플. 
                AI의 창조적 가능성과 미래 지향적 비전을 담고 있습니다.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/90">
                  <span>RGB</span>
                  <span>147, 51, 234</span>
                </div>
                <div className="flex justify-between text-white/90">
                  <span>HEX</span>
                  <span>#9333EA</span>
                </div>
              </div>
            </div>

            {/* Accent Green */}
            <div className="stats-card">
              <div className="w-full h-32 bg-green-500 rounded-lg mb-6"></div>
              <h3 className="text-xl font-bold text-white mb-4">Accent Green</h3>
              <p className="text-white/80 text-sm mb-4">
                성장과 성과를 상징하는 액센트 그린. 
                고객의 성공과 비즈니스 성장을 의미합니다.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/90">
                  <span>RGB</span>
                  <span>34, 197, 94</span>
                </div>
                <div className="flex justify-between text-white/90">
                  <span>HEX</span>
                  <span>#22C55E</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Values Section */}
        <section className="container max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">브랜드 가치</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="stats-card">
              <div className="text-2xl font-bold text-white mb-4">Data-Driven</div>
              <p className="text-white/80">
                모든 의사결정은 데이터를 기반으로 합니다. 
                정확한 분석과 인사이트를 통해 최적의 결과를 도출합니다.
              </p>
            </div>
            
            <div className="stats-card">
              <div className="text-2xl font-bold text-white mb-4">AI-Powered</div>
              <p className="text-white/80">
                인공지능 기술을 활용해 마케팅의 효율성을 극대화하고 
                새로운 가능성을 창조합니다.
              </p>
            </div>
            
            <div className="stats-card">
              <div className="text-2xl font-bold text-white mb-4">Customer Success</div>
              <p className="text-white/80">
                고객의 성공이 곧 우리의 성공입니다. 
                진정한 파트너십을 바탕으로 함께 성장합니다.
              </p>
            </div>
            
            <div className="stats-card">
              <div className="text-2xl font-bold text-white mb-4">Innovation</div>
              <p className="text-white/80">
                끊임없는 혁신을 통해 업계의 변화를 선도하고 
                새로운 표준을 제시합니다.
              </p>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-8">타이포그래피</h2>
          </div>
          
          <div className="stats-card">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">한글 폰트</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-4xl font-black text-white mb-2">뷰리드AI</div>
                    <div className="text-white/70 text-sm">Black - 제목, 로고</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-2">데이터 기반 마케팅</div>
                    <div className="text-white/70 text-sm">Bold - 소제목</div>
                  </div>
                  <div>
                    <div className="text-lg font-medium text-white mb-2">전문적인 마케팅 솔루션</div>
                    <div className="text-white/70 text-sm">Medium - 본문</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">영문 폰트</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-4xl font-black text-white mb-2">BeauLead AI</div>
                    <div className="text-white/70 text-sm">Black - Headings, Logo</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white mb-2">Performance Marketing</div>
                    <div className="text-white/70 text-sm">Bold - Subheadings</div>
                  </div>
                  <div>
                    <div className="text-lg font-medium text-white mb-2">Data-driven solutions</div>
                    <div className="text-white/70 text-sm">Medium - Body text</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}