import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${t.nav.about} | 뷰리드AI`}
        description="데이터 기반 퍼포먼스 마케팅 전문 에이전시 뷰리드AI의 회사 소개"
        keywords="뷰리드AI, 회사소개, 퍼포먼스마케팅, 마케팅에이전시"
      />
      <Header />

      <main className="py-16 lg:py-24">
        <div className="container max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" data-testid="text-page-title">
                {t.about.title.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < t.about.title.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed" data-testid="text-about-description">
                {t.about.description}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="fas fa-chart-line text-primary-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1" data-testid="text-feature1-title">
                      {t.about.feature1.title}
                    </h4>
                    <p className="text-gray-600" data-testid="text-feature1-description">
                      {t.about.feature1.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="fas fa-cog text-primary-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1" data-testid="text-feature2-title">
                      {t.about.feature2.title}
                    </h4>
                    <p className="text-gray-600" data-testid="text-feature2-description">
                      {t.about.feature2.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="fas fa-users text-primary-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1" data-testid="text-feature3-title">
                      {t.about.feature3.title}
                    </h4>
                    <p className="text-gray-600" data-testid="text-feature3-description">
                      {t.about.feature3.description}
                    </p>
                  </div>
                </div>
              </div>

              <a 
                href="/about/philosophy" 
                className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
                data-testid="link-learn-more"
              >
                {t.about.learnMore} <i className="fas fa-arrow-right ml-2"></i>
              </a>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Marketing team collaboration and strategy planning" 
                className="rounded-2xl shadow-xl w-full" 
                data-testid="img-team"
              />
              
              {/* Floating testimonial card */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-lg p-6 border border-gray-200 max-w-sm">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-user text-gray-500"></i>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900" data-testid="text-testimonial-name">
                      김○○ 대표
                    </div>
                    <div className="text-sm text-gray-600" data-testid="text-testimonial-company">
                      ○○○ 쇼핑몰
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic" data-testid="text-testimonial-quote">
                  "3개월 만에 매출이 400% 증가했습니다. 정말 놀라운 결과예요!"
                </p>
                <div className="flex text-yellow-400 mt-2">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
