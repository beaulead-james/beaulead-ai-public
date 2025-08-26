import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

export default function Location() {
  const { t } = useLanguage();

  const transportInfo = [
    {
      icon: 'fas fa-subway',
      title: '지하철',
      details: [
        '2호선 강남역 12번 출구 도보 3분',
        '신분당선 강남역 6번 출구 도보 5분',
        '9호선 신논현역 5번 출구 도보 8분'
      ]
    },
    {
      icon: 'fas fa-bus',
      title: '버스',
      details: [
        '강남역 정류장: 146, 360, 740, N13',
        '강남역사거리 정류장: 472, 11-2',
        '논현역 정류장: 143, 241, 463'
      ]
    },
    {
      icon: 'fas fa-car',
      title: '자가용',
      details: [
        '강남대로 → 테헤란로 방면',
        '건물 지하 1-3층 주차장 이용',
        '방문 시 주차 2시간 무료'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${t.nav.location} | 뷰리드AI`}
        description="뷰리드AI 본사 위치와 찾아오시는 방법을 안내합니다"
        keywords="뷰리드AI, 위치, 오시는길, 강남역, 테헤란로"
      />
      <Header />

      <main className="py-16 lg:py-24">
        <div className="container max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" data-testid="text-page-title">
              {t.nav.location}
            </h1>
            <p className="text-xl text-gray-600">
              강남역 인근의 편리한 위치에서 여러분을 기다리고 있습니다
            </p>
          </div>

          {/* Main Location Info */}
          <section className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm mb-16">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">오시는 길</h2>
                
                {/* Address */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-map-marker-alt text-primary-600"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">주소</h3>
                  </div>
                  <p className="text-gray-700 ml-11" data-testid="text-address">
                    서울특별시 강남구 테헤란로 123<br />
                    뷰리드타워 15층<br />
                    우편번호: 06142
                  </p>
                </div>

                {/* Contact Info */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-phone text-primary-600"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">연락처</h3>
                  </div>
                  <div className="ml-11 space-y-2">
                    <p className="text-gray-700" data-testid="text-phone">
                      전화: 02-1234-5678
                    </p>
                    <p className="text-gray-700" data-testid="text-fax">
                      팩스: 02-1234-5679
                    </p>
                    <p className="text-gray-700" data-testid="text-email">
                      이메일: contact@beauleadai.co.kr
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div>
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-clock text-primary-600"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">운영시간</h3>
                  </div>
                  <div className="ml-11 space-y-1">
                    <p className="text-gray-700" data-testid="text-weekday-hours">
                      평일: 오전 9시 ~ 오후 6시
                    </p>
                    <p className="text-gray-700" data-testid="text-weekend-hours">
                      토요일, 일요일, 공휴일 휴무
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      * 방문 상담은 사전 예약을 권장드립니다
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-map text-4xl text-gray-400 mb-4"></i>
                  <p className="text-gray-500">지도가 여기에 표시됩니다</p>
                  <p className="text-sm text-gray-400">Google Maps 또는 네이버 지도 연동</p>
                </div>
              </div>
            </div>
          </section>

          {/* Transportation */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">교통편 안내</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {transportInfo.map((transport, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className={`${transport.icon} text-primary-600 text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900" data-testid={`text-transport-title-${index}`}>
                      {transport.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {transport.details.map((detail, detailIndex) => (
                      <li 
                        key={detailIndex} 
                        className="text-gray-600 text-sm leading-relaxed"
                        data-testid={`text-transport-detail-${index}-${detailIndex}`}
                      >
                        • {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Nearby Landmarks */}
          <section className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">주변 주요 시설</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-building text-blue-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">강남역</h4>
                <p className="text-sm text-gray-600">도보 3분</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-shopping-bag text-green-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">강남센터</h4>
                <p className="text-sm text-gray-600">도보 5분</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-coffee text-purple-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">카페거리</h4>
                <p className="text-sm text-gray-600">도보 2분</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-utensils text-orange-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">맛집거리</h4>
                <p className="text-sm text-gray-600">도보 5분</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
