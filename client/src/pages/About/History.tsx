import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export default function History() {
  const { t } = useLanguage();

  const milestones = [
    {
      year: '2024',
      events: [
        {
          month: '01',
          title: 'AI 자동화 시스템 2.0 런칭',
          description: '머신러닝 기반 자동 입찰 최적화 시스템 도입으로 평균 ROAS 25% 개선'
        },
        {
          month: '06',
          title: '글로벌 진출',
          description: '동남아시아 시장 진출을 위한 싱가포르 현지법인 설립'
        }
      ]
    },
    {
      year: '2023',
      events: [
        {
          month: '03',
          title: '시리즈 A 투자 유치',
          description: '성장 가속화를 위한 50억원 규모 시리즈 A 투자 유치 성공'
        },
        {
          month: '08',
          title: '메타 마케팅 파트너 인증',
          description: '메타(Facebook) 공식 마케팅 파트너로 선정되어 광고 크레딧 혜택 확보'
        },
        {
          month: '12',
          title: '누적 고객사 200개 돌파',
          description: '스타트업부터 대기업까지 다양한 규모의 고객사 200개 돌파'
        }
      ]
    },
    {
      year: '2022',
      events: [
        {
          month: '02',
          title: '강남 본사 이전',
          description: '업무 효율성 증대를 위해 강남역 인근 대형 오피스로 본사 이전'
        },
        {
          month: '05',
          title: '구글 프리미어 파트너 선정',
          description: '구글 애즈 운용 실력을 인정받아 프리미어 파트너로 선정'
        },
        {
          month: '09',
          title: '자체 애널리틱스 플랫폼 개발',
          description: '고객 맞춤형 성과 분석을 위한 통합 애널리틱스 플랫폼 \'BeauDash\' 출시'
        }
      ]
    },
    {
      year: '2021',
      events: [
        {
          month: '01',
          title: '직원 수 20명 돌파',
          description: '각 분야 전문가들로 구성된 팀 규모 20명 달성'
        },
        {
          month: '07',
          title: '네이버 공식 파트너 등록',
          description: '네이버 검색광고 공식 파트너사로 등록되어 전문성 인증'
        },
        {
          month: '11',
          title: '마케팅 우수상 수상',
          description: '한국디지털마케팅협회 주최 \'올해의 마케팅 에이전시상\' 수상'
        }
      ]
    },
    {
      year: '2020',
      events: [
        {
          month: '04',
          title: 'COVID-19 대응 원격근무 시스템 구축',
          description: '팬데믹 상황에서도 안정적인 서비스 제공을 위한 완전 원격근무 체계 구축'
        },
        {
          month: '10',
          title: '누적 고객사 100개 달성',
          description: '설립 1년 만에 누적 고객사 100개를 달성하며 빠른 성장세 입증'
        }
      ]
    },
    {
      year: '2019',
      events: [
        {
          month: '03',
          title: '뷰리드AI 설립',
          description: '김영수 대표를 중심으로 5명의 창립 멤버가 모여 뷰리드AI 공식 설립'
        },
        {
          month: '06',
          title: '첫 번째 고객사 계약',
          description: '이커머스 스타트업과의 첫 번째 계약으로 사업 시작'
        },
        {
          month: '12',
          title: '시드 투자 유치',
          description: '성공적인 초기 성과를 바탕으로 10억원 규모 시드 투자 유치'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${t.nav.history} | 뷰리드AI`}
        description="뷰리드AI의 성장과 발전 과정을 시간순으로 소개합니다"
        keywords="뷰리드AI, 연혁, 회사역사, 성장과정"
      />
      <Header />

      <main className="py-16 lg:py-24">
        <div className="container max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" data-testid="text-page-title">
              {t.nav.history}
            </h1>
            <p className="text-xl text-gray-600">
              2019년 설립부터 현재까지, 뷰리드AI의 성장과 혁신의 발자취를 소개합니다
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, yearIndex) => (
                <div key={milestone.year} className="relative">
                  {/* Year marker */}
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10">
                      {milestone.year}
                    </div>
                    <div className="ml-6">
                      <h2 className="text-2xl font-bold text-gray-900" data-testid={`text-year-${yearIndex}`}>
                        {milestone.year}년
                      </h2>
                    </div>
                  </div>
                  
                  {/* Events */}
                  <div className="ml-24 space-y-6">
                    {milestone.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-primary-200 hover:border-primary-400 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900" data-testid={`text-event-title-${yearIndex}-${eventIndex}`}>
                            {event.title}
                          </h3>
                          <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full" data-testid={`text-event-month-${yearIndex}-${eventIndex}`}>
                            {event.month}월
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed" data-testid={`text-event-description-${yearIndex}-${eventIndex}`}>
                          {event.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Future Vision */}
          <section className="mt-20 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">미래를 향한 도전</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                뷰리드AI는 지금까지의 성장을 바탕으로 더 큰 미래를 준비하고 있습니다. 
                글로벌 시장 진출, AI 기술 고도화, 그리고 고객의 성공을 위한 혁신적인 솔루션 개발을 통해 
                디지털 마케팅 업계의 리더로 자리매김하겠습니다.
              </p>
              <div className="flex items-center justify-center space-x-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-1">2025</div>
                  <div className="text-sm text-gray-600">글로벌 진출 가속화</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-1">2026</div>
                  <div className="text-sm text-gray-600">AI 플랫폼 고도화</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div>
                  <div className="text-3xl font-bold text-primary-600 mb-1">2027</div>
                  <div className="text-sm text-gray-600">IPO 준비</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
