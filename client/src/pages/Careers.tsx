import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/UI/SEO';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { Button } from '../components/ui/button';

export default function Careers() {
  const { t } = useLanguage();

  const openPositions = [
    {
      title: '퍼포먼스 마케터 (시니어)',
      department: '마케팅팀',
      type: '정규직',
      location: '서울 강남',
      requirements: [
        '구글 애즈, 네이버 광고 운용 경력 3년 이상',
        'GA4, GTM 활용 경험',
        '데이터 분석 및 리포팅 능력',
        '마케팅 전략 수립 및 실행 경험'
      ],
      preferred: [
        '페이스북, 카카오 광고 운용 경험',
        '이커머스 업계 경험',
        '관련 자격증 보유자 우대'
      ]
    },
    {
      title: '데이터 분석가',
      department: '데이터팀',
      type: '정규직',
      location: '서울 강남',
      requirements: [
        'SQL, Python/R 활용 능력',
        '마케팅 데이터 분석 경력 2년 이상',
        '통계 분석 및 머신러닝 기초 지식',
        '대시보드 구축 경험'
      ],
      preferred: [
        'Tableau, Power BI 사용 경험',
        '광고 플랫폼 API 연동 경험',
        '컴퓨터공학, 통계학 전공자 우대'
      ]
    },
    {
      title: '프론트엔드 개발자',
      department: '개발팀',
      type: '정규직',
      location: '서울 강남',
      requirements: [
        'React, TypeScript 개발 경력 2년 이상',
        'Next.js, Tailwind CSS 경험',
        'RESTful API 연동 경험',
        '반응형 웹 개발 능력'
      ],
      preferred: [
        '마케팅 플랫폼 개발 경험',
        'UI/UX 디자인 이해',
        'AWS 클라우드 서비스 경험'
      ]
    }
  ];

  const benefits = [
    {
      icon: 'fas fa-won-sign',
      title: '경쟁력 있는 연봉',
      description: '업계 최고 수준의 연봉과 성과급 지급'
    },
    {
      icon: 'fas fa-clock',
      title: '유연근무제',
      description: '자유로운 출퇴근과 재택근무 가능'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: '교육비 지원',
      description: '직무 관련 교육, 세미나, 자격증 비용 전액 지원'
    },
    {
      icon: 'fas fa-plane',
      title: '휴가 지원',
      description: '연차 사용 장려금 및 리프레시 휴가'
    },
    {
      icon: 'fas fa-laptop',
      title: '최신 장비',
      description: '개인별 맞춤 업무 장비 제공'
    },
    {
      icon: 'fas fa-users',
      title: '수평적 문화',
      description: '자유로운 의견 제시와 소통 문화'
    }
  ];

  const applicationProcess = [
    { step: 1, title: '서류 전형', description: '이력서 및 포트폴리오 검토' },
    { step: 2, title: '1차 면접', description: '직무 역량 및 문화 적합성 평가' },
    { step: 3, title: '실무 과제', description: '직무 관련 과제 수행 (선택적)' },
    { step: 4, title: '최종 면접', description: '임원 면접 및 최종 평가' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${t.nav.careers} | 뷰리드AI`}
        description="뷰리드AI와 함께 마케팅의 미래를 만들어갈 인재를 찾습니다"
        keywords="뷰리드AI, 채용, 구인, 마케터채용, 개발자채용, 데이터분석가"
      />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 via-white to-gray-50 py-16 lg:py-24">
          <div className="container max-w-4xl mx-auto text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" data-testid="text-page-title">
              함께 성장할 동료를 찾습니다
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              데이터 기반 마케팅으로 미래를 만들어가는 뷰리드AI에서<br />
              여러분의 역량을 마음껏 발휘해보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary-600 hover:bg-primary-700"
                onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-view-positions"
              >
                채용공고 보기
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('company-culture')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-company-culture"
              >
                회사문화 알아보기
              </Button>
            </div>
          </div>
        </section>

        {/* Company Culture */}
        <section id="company-culture" className="py-16 lg:py-24 bg-white">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">뷰리드AI에서 일한다는 것</h2>
              <p className="text-xl text-gray-600">혁신적이고 자유로운 환경에서 함께 성장해요</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${benefit.icon} text-primary-600 text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" data-testid={`text-benefit-title-${index}`}>
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600" data-testid={`text-benefit-description-${index}`}>
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions" className="py-16 lg:py-24 bg-gray-50">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">채용 중인 포지션</h2>
              <p className="text-xl text-gray-600">지금 지원 가능한 포지션들을 확인해보세요</p>
            </div>

            <div className="space-y-8">
              {openPositions.map((position, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="mb-4 lg:mb-0">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2" data-testid={`text-position-title-${index}`}>
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-medium">
                          {position.department}
                        </span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                          {position.type}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                          {position.location}
                        </span>
                      </div>
                    </div>
                    <Button 
                      className="bg-primary-600 hover:bg-primary-700 whitespace-nowrap"
                      data-testid={`button-apply-${index}`}
                    >
                      지원하기
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">필수 요구사항</h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start text-gray-700">
                            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span className="text-sm" data-testid={`text-requirement-${index}-${reqIndex}`}>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">우대사항</h4>
                      <ul className="space-y-2">
                        {position.preferred.map((pref, prefIndex) => (
                          <li key={prefIndex} className="flex items-start text-gray-700">
                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            <span className="text-sm" data-testid={`text-preferred-${index}-${prefIndex}`}>{pref}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">채용 프로세스</h2>
              <p className="text-xl text-gray-600">투명하고 공정한 채용 과정을 진행합니다</p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {applicationProcess.map((process, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" data-testid={`text-process-title-${index}`}>
                    {process.title}
                  </h3>
                  <p className="text-gray-600 text-sm" data-testid={`text-process-description-${index}`}>
                    {process.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">전체 프로세스는 약 2-3주 소요됩니다</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24 bg-primary-600">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">궁금한 것이 있으신가요?</h2>
            <p className="text-xl text-primary-100 mb-8">
              채용과 관련된 문의사항이 있으시면 언제든 연락주세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:hr@beauleadai.co.kr"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                data-testid="button-email-contact"
              >
                <i className="fas fa-envelope mr-2"></i>
                이메일 문의
              </a>
              <a 
                href="tel:02-1234-5678"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                data-testid="button-phone-contact"
              >
                <i className="fas fa-phone mr-2"></i>
                전화 문의
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
