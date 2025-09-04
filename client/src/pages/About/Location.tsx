import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import '../../styles/hero.css';

interface TransportInfo {
  title: string;
  icon: JSX.Element;
  details: string[];
}

interface LandmarkInfo {
  name: string;
  distance: string;
  icon: JSX.Element;
}

export default function Location() {
  const { t } = useLanguage();

  const transportInfo: TransportInfo[] = [
    {
      title: '지하철',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.8,20C17.4,21.2 16.3,22 15,22H5C3.3,22 2,20.7 2,19V18C2,17.4 2.4,17 3,17S4,17.4 4,18V19C4,19.6 4.4,20 5,20H15C15.6,20 16,19.6 16,19V5C16,4.4 15.6,4 15,4H5C4.4,4 4,4.4 4,5V6C4,6.6 3.6,7 3,7S2,6.6 2,6V5C2,3.3 3.3,2 5,2H15C16.3,2 17.4,2.8 17.8,4H19C20.1,4 21,4.9 21,6V18C21,19.1 20.1,20 19,20H17.8M19,18V6H18V18H19Z"/>
        </svg>
      ),
      details: [
        '2호선 강남역 12번 출구 도보 3분',
        '신분당선 강남역 6번 출구 도보 5분',
        '9호선 신논현역 5번 출구 도보 8분'
      ]
    },
    {
      title: '버스',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18,11H22L20,8H18V6.5C18,5.1 16.9,4 15.5,4H8.5C7.1,4 6,5.1 6,6.5V8H4L2,11H6V12.5C6,13.9 7.1,15 8.5,15H15.5C16.9,15 18,13.9 18,12.5V11M8,7.5H16V8.5H8V7.5Z"/>
        </svg>
      ),
      details: [
        '강남역 정류장: 146, 360, 740, N13',
        '강남역사거리 정류장: 472, 11-2',
        '논현역 정류장: 143, 241, 463'
      ]
    },
    {
      title: '자가용',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.92,6.01C18.72,5.42 18.16,5 17.5,5H15V4A2,2 0 0,0 13,2H11A2,2 0 0,0 9,4V5H6.5C5.84,5 5.29,5.42 5.08,6.01L3,12V20A1,1 0 0,0 4,21H5A1,1 0 0,0 6,20V19H18V20A1,1 0 0,0 19,21H20A1,1 0 0,0 21,20V12L18.92,6.01M13.5,16.5C12.67,16.5 12,15.83 12,15C12,14.17 12.67,13.5 13.5,13.5C14.33,13.5 15,14.17 15,15C15,15.83 14.33,16.5 13.5,16.5M10.5,16.5C9.67,16.5 9,15.83 9,15C9,14.17 9.67,13.5 10.5,13.5C11.33,13.5 12,14.17 12,15C12,15.83 11.33,16.5 10.5,16.5M11,4H13V5H11V4Z"/>
        </svg>
      ),
      details: [
        '강남대로 → 테헤란로 방면',
        '건물 지하 1-3층 주차장 이용',
        '방문 시 주차 2시간 무료'
      ]
    }
  ];

  const landmarks: LandmarkInfo[] = [
    {
      name: '강남역',
      distance: '도보 3분',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15,7V5A2,2 0 0,0 13,3H11A2,2 0 0,0 9,5V7H8A2,2 0 0,0 6,9V19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V9A2,2 0 0,0 16,7H15M12,17A2,2 0 0,1 10,15A2,2 0 0,1 12,13A2,2 0 0,1 14,15A2,2 0 0,1 12,17M13,7H11V5H13V7Z"/>
        </svg>
      )
    },
    {
      name: '강남센터',
      distance: '도보 5분',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19,7H15V6A2,2 0 0,0 13,4H11A2,2 0 0,0 9,6V7H5A1,1 0 0,0 4,8V19A1,1 0 0,0 5,20H19A1,1 0 0,0 20,19V8A1,1 0 0,0 19,7M11,6H13V7H11V6Z"/>
        </svg>
      )
    },
    {
      name: '카페거리',
      distance: '도보 2분',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2,21V19H20V21H2M20,8V5L18,5V8H20M18,10A2,2 0 0,0 16,12A2,2 0 0,0 18,14A2,2 0 0,0 20,12A2,2 0 0,0 18,10M8,5V3H10V5H8M6,5V10H4V5H6M2,5V8L4,8V5H2M8,10A2,2 0 0,0 6,12A2,2 0 0,0 8,14A2,2 0 0,0 10,12A2,2 0 0,0 8,10Z"/>
        </svg>
      )
    },
    {
      name: '맛집거리',
      distance: '도보 5분',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M14.88,11.53C16.87,12.19 18.77,13.74 20,15.61C21.26,17.5 21.6,19.16 21,19.77C20.4,20.38 18.74,20.04 16.85,18.78C15,17.56 13.5,15.63 12.83,13.64L14.88,11.53M20.71,3.29C21.1,3.68 21.1,4.32 20.71,4.71L18.37,7.05L16.95,5.63L19.29,3.29C19.68,2.9 20.32,2.9 20.71,3.29Z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background orbs */}
      <div className="bg-orb">
        <div className="orb orb-a"></div>
        <div className="orb orb-b"></div>
      </div>
      
      <SEO 
        title={`오시는길 | 뷰리드AI`}
        description="뷰리드AI 본사 위치와 찾아오시는 방법을 안내합니다"
        keywords="뷰리드AI, 위치, 오시는길, 강남역, 테헤란로"
      />
      <Header />

      <main className="py-20 lg:py-32 relative z-10">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-20">
            <h1 className="hero-title text-4xl lg:text-6xl font-black mb-6" data-testid="text-page-title">
              오시는 길
            </h1>
            <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              강남역 인근의 편리한 위치에서 여러분을 기다리고 있습니다
            </p>
          </div>

          {/* Main Location Info */}
          <section className="service-card mb-20 animate-fade-in-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">본사 위치</h2>
              <p className="text-lg text-white/80">강남역에서 가장 가까운 디지털 마케팅 전문 회사</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Contact Information */}
              <div className="space-y-8">
                {/* Address */}
                <div className="contact-card p-8">
                  <div className="flex items-center mb-6">
                    <div className="contact-icon mr-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">주소</h3>
                  </div>
                  <div className="text-white/80 text-lg leading-relaxed" data-testid="text-address">
                    <p className="mb-2">서울특별시 강남구 테헤란로 123</p>
                    <p className="mb-2">뷰리드타워 15층</p>
                    <p className="text-white/60">우편번호: 06142</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="contact-card p-8">
                  <div className="flex items-center mb-6">
                    <div className="contact-icon mr-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">연락처</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="text-white/80 text-lg" data-testid="text-phone">
                      <span className="font-medium">전화:</span> 02-1234-5678
                    </div>
                    <div className="text-white/80 text-lg" data-testid="text-fax">
                      <span className="font-medium">팩스:</span> 02-1234-5679
                    </div>
                    <div className="text-white/80 text-lg" data-testid="text-email">
                      <span className="font-medium">이메일:</span> contact@beauleadai.co.kr
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="contact-card p-8">
                  <div className="flex items-center mb-6">
                    <div className="contact-icon mr-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white">운영시간</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="text-white/80 text-lg" data-testid="text-weekday-hours">
                      <span className="font-medium">평일:</span> 오전 9시 ~ 오후 6시
                    </div>
                    <div className="text-white/80 text-lg" data-testid="text-weekend-hours">
                      <span className="font-medium">주말:</span> 토요일, 일요일, 공휴일 휴무
                    </div>
                    <div className="text-white/60 text-sm mt-4 border-l-2 border-white/30 pl-4">
                      방문 상담은 사전 예약을 권장드립니다
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Interactive Map */}
              <div className="floating-card p-8">
                <div className="h-full flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">위치 안내</h3>
                  
                  {/* Map Container */}
                  <div className="flex-1 rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur border border-white/20 p-6 min-h-[400px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="contact-icon mx-auto mb-6">
                        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M15,19L9,16.89V5L15,7.11M20.5,3C20.44,3 20.39,3 20.33,3L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21C3.55,21 3.61,21 3.67,20.97L9,18.9L15,21L20.64,19.1C20.85,19 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3Z"/>
                        </svg>
                      </div>
                      <p className="text-white text-xl mb-2">인터랙티브 지도</p>
                      <p className="text-white/60 text-base">강남역 12번 출구에서 도보 3분 거리</p>
                      
                      {/* Quick Navigation Buttons */}
                      <div className="mt-8 space-y-3">
                        <button 
                          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 rounded-lg text-white/80 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-500/30"
                          data-testid="button-google-maps"
                        >
                          Google Maps에서 보기
                        </button>
                        <button 
                          className="w-full px-4 py-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-white/20 rounded-lg text-white/80 hover:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500/30 hover:to-blue-500/30"
                          data-testid="button-naver-maps"
                        >
                          네이버 지도에서 보기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Transportation Guide */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <h2 className="hero-title text-3xl lg:text-5xl font-black mb-6">교통편 안내</h2>
              <p className="text-xl text-white/80">다양한 교통수단으로 편리하게 방문하세요</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {transportInfo.map((transport, index) => (
                <div key={index} className="service-card animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-6">
                      <div className="contact-icon">
                        {transport.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6" data-testid={`text-transport-title-${index}`}>
                      {transport.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {transport.details.map((detail, detailIndex) => (
                      <div 
                        key={detailIndex} 
                        className="flex items-start text-white/80 text-lg leading-relaxed"
                        data-testid={`text-transport-detail-${index}-${detailIndex}`}
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-4 mt-3 flex-shrink-0"></div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Nearby Landmarks */}
          <section className="service-card animate-fade-in-up animate-delay-300">
            <div className="text-center mb-12">
              <h2 className="hero-title text-3xl lg:text-5xl font-black mb-6">주변 주요 시설</h2>
              <p className="text-xl text-white/80">편리한 주변 환경과 다양한 편의시설</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {landmarks.map((landmark, index) => (
                <div key={index} className="contact-card p-6 text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="contact-icon mb-6 mx-auto">
                    {landmark.icon}
                  </div>
                  <h4 className="font-bold text-white text-xl mb-3" data-testid={`text-landmark-name-${index}`}>
                    {landmark.name}
                  </h4>
                  <p className="text-white/70 text-lg" data-testid={`text-landmark-distance-${index}`}>
                    {landmark.distance}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Information */}
          <section className="text-center">
            <div className="floating-card p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-6">방문 안내</h3>
              <div className="space-y-4 text-white/80 text-lg leading-relaxed">
                <p>• 처음 방문하시는 분은 사전 예약을 권장합니다</p>
                <p>• 주차는 건물 지하 1-3층을 이용해주세요</p>
                <p>• 방문 시 주차 2시간 무료 제공</p>
                <p>• 엘리베이터 이용 시 15층 버튼을 눌러주세요</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}