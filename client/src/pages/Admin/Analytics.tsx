import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/use-toast';
import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export default function Analytics() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const { t } = useLanguage();

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'ADMIN')) {
      toast({
        title: "Unauthorized",
        description: "관리자 권한이 필요합니다.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  if (isLoading || !isAuthenticated || user?.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-16">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="animate-spin w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>로딩중...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Sample analytics data for demonstration
  const websiteStats = {
    totalVisitors: 15240,
    monthlyVisitors: 3890,
    pageViews: 45680,
    avgSessionDuration: '3:42',
    bounceRate: '34.2%',
    conversionRate: '2.8%'
  };

  const topPages = [
    { page: '홈페이지', views: 12480, percentage: 27.3 },
    { page: '서비스/구글광고', views: 8920, percentage: 19.5 },
    { page: '포트폴리오', views: 6750, percentage: 14.8 },
    { page: '블로그', views: 5640, percentage: 12.4 },
    { page: '프로젝트문의', views: 4230, percentage: 9.3 }
  ];

  const trafficSources = [
    { source: '검색엔진 (SEO)', visitors: 8940, percentage: 58.7 },
    { source: '직접 유입', visitors: 3210, percentage: 21.1 },
    { source: '소셜미디어', visitors: 1890, percentage: 12.4 },
    { source: '추천 사이트', visitors: 1200, percentage: 7.8 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="분석 리포트 | 뷰리드AI" />
      <Header />

      <main className="py-8">
        <div className="container max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-page-title">
              분석 리포트
            </h1>
            <p className="text-gray-600">웹사이트 방문자 및 성과 분석 데이터</p>
          </div>

          {/* Overview Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-1" data-testid="text-total-visitors">
                    {websiteStats.totalVisitors.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">총 방문자</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1" data-testid="text-monthly-visitors">
                    {websiteStats.monthlyVisitors.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">월간 방문자</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1" data-testid="text-page-views">
                    {websiteStats.pageViews.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">페이지뷰</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1" data-testid="text-session-duration">
                    {websiteStats.avgSessionDuration}
                  </div>
                  <div className="text-sm text-gray-600">평균 세션</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1" data-testid="text-bounce-rate">
                    {websiteStats.bounceRate}
                  </div>
                  <div className="text-sm text-gray-600">이탈률</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1" data-testid="text-conversion-rate">
                    {websiteStats.conversionRate}
                  </div>
                  <div className="text-sm text-gray-600">전환율</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-file-alt mr-2 text-gray-600"></i>
                  인기 페이지
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900" data-testid={`text-top-page-${index}`}>
                          {page.page}
                        </div>
                        <div className="text-sm text-gray-500">
                          {page.views.toLocaleString()} 조회수
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-primary-600">
                          {page.percentage}%
                        </div>
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-primary-600 rounded-full" 
                            style={{ width: `${page.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-chart-pie mr-2 text-gray-600"></i>
                  트래픽 소스
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trafficSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900" data-testid={`text-traffic-source-${index}`}>
                          {source.source}
                        </div>
                        <div className="text-sm text-gray-500">
                          {source.visitors.toLocaleString()} 방문자
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">
                          {source.percentage}%
                        </div>
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-600 rounded-full" 
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Integration */}
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-chart-line mr-2 text-gray-600"></i>
                  Google Analytics 연동
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fab fa-google text-blue-600 text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Google Analytics 4</h3>
                  <p className="text-gray-600 mb-6">더 상세한 분석을 위해 GA4 대시보드를 확인하세요</p>
                  <a 
                    href="https://analytics.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
                    data-testid="button-ga4-dashboard"
                  >
                    GA4 대시보드 열기
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-search mr-2 text-gray-600"></i>
                  Search Console 연동
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-search text-green-600 text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Google Search Console</h3>
                  <p className="text-gray-600 mb-6">검색 성과와 SEO 데이터를 확인하세요</p>
                  <a 
                    href="https://search.google.com/search-console" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
                    data-testid="button-gsc-dashboard"
                  >
                    Search Console 열기
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
