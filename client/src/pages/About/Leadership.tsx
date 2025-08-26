import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export default function Leadership() {
  const { t } = useLanguage();

  const leaders = [
    {
      name: '김영수',
      title: '대표이사 CEO',
      description: '15년간 디지털 마케팅 업계에서 쌓은 풍부한 경험을 바탕으로 뷰리드AI를 설립했습니다. 구글 코리아, 네이버 등에서 마케팅 전략 수립과 실행을 담당했으며, 데이터 기반 마케팅의 선구자로 활동하고 있습니다.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300'
    },
    {
      name: '박지연',
      title: '기술이사 CTO',
      description: 'AI와 머신러닝 분야에서 10년 이상의 전문성을 보유하고 있으며, 마케팅 자동화 시스템 개발을 이끌고 있습니다. 삼성전자, 카카오에서 AI 개발 경험을 쌓았으며, 현재 뷰리드AI의 기술 혁신을 주도하고 있습니다.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b191?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300'
    },
    {
      name: '이민호',
      title: '마케팅이사 CMO',
      description: '퍼포먼스 마케팅 분야에서 12년의 경력을 보유하며, 수백 개 브랜드의 성공적인 마케팅 캠페인을 기획하고 실행했습니다. 특히 이커머스와 모바일 앱 마케팅에서 탁월한 성과를 보여주고 있습니다.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${t.nav.leadership} | 뷰리드AI`}
        description="뷰리드AI의 경영진과 리더십 팀을 소개합니다"
        keywords="뷰리드AI, 대표인사, 경영진, 리더십"
      />
      <Header />

      <main className="py-16 lg:py-24">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" data-testid="text-page-title">
              {t.nav.leadership}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              풍부한 경험과 전문성을 갖춘 리더십 팀이 뷰리드AI의 성장과 혁신을 이끌어갑니다
            </p>
          </div>

          {/* CEO Message */}
          <section className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">대표 인사말</h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                안녕하세요. 뷰리드AI 대표 김영수입니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                디지털 마케팅 환경은 하루가 다르게 변화하고 있습니다. 새로운 플랫폼이 등장하고, 
                알고리즘이 업데이트되며, 소비자의 행동 패턴도 끊임없이 진화하고 있죠. 
                이러한 급변하는 환경에서 성공하기 위해서는 데이터에 기반한 정확한 인사이트와 
                빠른 실행력이 무엇보다 중요합니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                뷰리드AI는 이러한 도전에 맞서 데이터 분석과 AI 기술을 활용한 혁신적인 마케팅 솔루션을 
                제공하고 있습니다. 우리의 목표는 단순히 광고를 대행하는 것이 아니라, 
                고객의 비즈니스 성장을 위한 진정한 파트너가 되는 것입니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                앞으로도 끊임없는 혁신과 도전을 통해 고객의 성공을 함께 만들어가겠습니다. 
                감사합니다.
              </p>
            </div>
          </section>

          {/* Leadership Team */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">경영진</h2>
            <div className="space-y-12">
              {leaders.map((leader, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                  <div className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <img 
                        src={leader.image}
                        alt={`${leader.name} ${leader.title}`}
                        className="w-64 h-64 rounded-2xl object-cover mx-auto shadow-lg"
                        data-testid={`img-leader-${index}`}
                      />
                    </div>
                    <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2" data-testid={`text-leader-name-${index}`}>
                        {leader.name}
                      </h3>
                      <p className="text-lg text-primary-600 font-semibold mb-4" data-testid={`text-leader-title-${index}`}>
                        {leader.title}
                      </p>
                      <p className="text-gray-700 leading-relaxed" data-testid={`text-leader-description-${index}`}>
                        {leader.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
