import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export default function Philosophy() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${t.nav.philosophy} | 뷰리드AI`}
        description="뷰리드AI의 기업철학과 핵심 가치를 소개합니다"
        keywords="뷰리드AI, 기업철학, 핵심가치, 마케팅철학"
      />
      <Header />

      <main className="py-16 lg:py-24">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" data-testid="text-page-title">
              {t.nav.philosophy}
            </h1>
            <p className="text-xl text-gray-600">
              데이터와 창의성의 조화로 고객의 성공을 만들어갑니다
            </p>
          </div>

          <div className="space-y-16">
            {/* Mission */}
            <section className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-target text-primary-600 text-2xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">미션</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                데이터 기반의 정확한 인사이트와 창의적인 마케팅 솔루션을 통해 
                고객의 비즈니스 성장을 가속화하고, 디지털 마케팅 생태계의 발전에 기여합니다.
              </p>
            </section>

            {/* Vision */}
            <section className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-eye text-blue-600 text-2xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">비전</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                AI와 빅데이터 기술을 선도하는 글로벌 퍼포먼스 마케팅 에이전시로 성장하여, 
                모든 기업이 데이터의 힘으로 성공할 수 있는 세상을 만들어갑니다.
              </p>
            </section>

            {/* Core Values */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">핵심 가치</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-chart-bar text-green-600"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Data-Driven</h3>
                  <p className="text-gray-600">
                    모든 의사결정과 전략 수립을 데이터에 기반하여 객관적이고 정확한 결과를 추구합니다.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-lightbulb text-purple-600"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                  <p className="text-gray-600">
                    끊임없는 혁신과 창의적 사고로 새로운 마케팅 솔루션을 개발하고 적용합니다.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-handshake text-orange-600"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Partnership</h3>
                  <p className="text-gray-600">
                    고객과의 진정한 파트너십을 통해 함께 성장하고 상생하는 관계를 구축합니다.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-gem text-red-600"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
                  <p className="text-gray-600">
                    최고 수준의 서비스 품질을 유지하며 고객의 기대를 뛰어넘는 결과를 제공합니다.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-shield-alt text-teal-600"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparency</h3>
                  <p className="text-gray-600">
                    투명한 소통과 명확한 성과 보고를 통해 신뢰할 수 있는 관계를 유지합니다.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-rocket text-indigo-600"></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Growth</h3>
                  <p className="text-gray-600">
                    지속적인 학습과 개선을 통해 개인과 조직, 그리고 고객의 성장을 추진합니다.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
