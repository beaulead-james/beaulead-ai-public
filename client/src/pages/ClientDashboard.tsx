import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/use-toast';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/UI/SEO';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function ClientDashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const { t } = useLanguage();

  // Redirect if not authenticated or not client/admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || (user?.role !== 'CLIENT' && user?.role !== 'ADMIN'))) {
      toast({
        title: "Unauthorized",
        description: "클라이언트 권한이 필요합니다.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  if (isLoading || !isAuthenticated || (user?.role !== 'CLIENT' && user?.role !== 'ADMIN')) {
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

  // Sample client performance data
  const performanceData = {
    currentMonth: {
      spend: 2850000,
      revenue: 12480000,
      roas: 437,
      clicks: 15680,
      impressions: 245000,
      ctr: 6.4,
      conversionRate: 3.2,
      conversions: 502
    },
    previousMonth: {
      spend: 2650000,
      revenue: 10200000,
      roas: 385,
      clicks: 14200,
      impressions: 220000,
      ctr: 6.1,
      conversionRate: 2.8
    }
  };

  const campaigns = [
    {
      name: '브랜드 검색 캠페인',
      platform: '구글 애즈',
      status: '활성',
      spend: 850000,
      revenue: 4200000,
      roas: 494,
      clicks: 4520
    },
    {
      name: '쇼핑 광고 캠페인',
      platform: '네이버',
      status: '활성',
      spend: 920000,
      revenue: 3800000,
      roas: 413,
      clicks: 3890
    },
    {
      name: '소셜 마케팅',
      platform: '메타',
      status: '활성',
      spend: 680000,
      revenue: 2650000,
      roas: 390,
      clicks: 2840
    },
    {
      name: '모바일 타겟팅',
      platform: '카카오',
      status: '활성',
      spend: 400000,
      revenue: 1830000,
      roas: 458,
      clicks: 1630
    }
  ];

  const calculateGrowth = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return growth.toFixed(1);
  };

  const formatCurrency = (amount: number) => {
    return `₩${(amount / 10000).toFixed(0)}만`;
  };

  const getStatusBadgeColor = (status: string) => {
    return status === '활성' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="클라이언트 대시보드 | 뷰리드AI" />
      <Header />

      <main className="py-8">
        <div className="container max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-dashboard-title">
              클라이언트 대시보드
            </h1>
            <p className="text-gray-600">
              안녕하세요, {user?.firstName || user?.email}님. 마케팅 성과를 확인해보세요.
            </p>
          </div>

          {/* Performance Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">광고비</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="text-total-spend">
                      {formatCurrency(performanceData.currentMonth.spend)}
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      +{calculateGrowth(performanceData.currentMonth.spend, performanceData.previousMonth.spend)}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-credit-card text-red-600"></i>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">매출</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="text-total-revenue">
                      {formatCurrency(performanceData.currentMonth.revenue)}
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      +{calculateGrowth(performanceData.currentMonth.revenue, performanceData.previousMonth.revenue)}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-chart-line text-green-600"></i>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">ROAS</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="text-roas">
                      {performanceData.currentMonth.roas}%
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      +{calculateGrowth(performanceData.currentMonth.roas, performanceData.previousMonth.roas)}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-percentage text-blue-600"></i>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">전환수</p>
                    <p className="text-2xl font-bold text-gray-900" data-testid="text-conversions">
                      {performanceData.currentMonth.conversions.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      전환율 {performanceData.currentMonth.conversionRate}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-bullseye text-purple-600"></i>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Campaign Performance */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <i className="fas fa-chart-bar mr-2 text-gray-600"></i>
                    캠페인 성과
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns.map((campaign, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="font-semibold text-gray-900 mr-3" data-testid={`text-campaign-name-${index}`}>
                              {campaign.name}
                            </h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeColor(campaign.status)}`}>
                              {campaign.status}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600 space-x-4">
                            <span>{campaign.platform}</span>
                            <span>•</span>
                            <span>클릭수: {campaign.clicks.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600 mb-1" data-testid={`text-campaign-roas-${index}`}>
                            {campaign.roas}%
                          </div>
                          <div className="text-sm text-gray-600">
                            {formatCurrency(campaign.revenue)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">이번 달 하이라이트</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">총 클릭수</span>
                      <span className="font-semibold" data-testid="text-total-clicks">
                        {performanceData.currentMonth.clicks.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">노출수</span>
                      <span className="font-semibold" data-testid="text-total-impressions">
                        {performanceData.currentMonth.impressions.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">클릭률</span>
                      <span className="font-semibold text-blue-600" data-testid="text-ctr">
                        {performanceData.currentMonth.ctr}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">전환율</span>
                      <span className="font-semibold text-green-600" data-testid="text-conversion-rate">
                        {performanceData.currentMonth.conversionRate}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">빠른 연결</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={() => window.open('https://ads.google.com', '_blank')}
                      data-testid="button-google-ads"
                    >
                      <i className="fab fa-google mr-2"></i>
                      Google Ads
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.open('https://searchad.naver.com', '_blank')}
                      data-testid="button-naver-ads"
                    >
                      <span className="mr-2 font-bold text-green-600">N</span>
                      네이버 광고
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.open('https://business.facebook.com', '_blank')}
                      data-testid="button-meta-ads"
                    >
                      <i className="fab fa-facebook mr-2"></i>
                      Meta 광고
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <i className="fas fa-headset mr-2 text-gray-600"></i>
                전담 매니저 연락처
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-primary-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">김매니저</h4>
                    <p className="text-sm text-gray-600">퍼포먼스 마케팅 매니저</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <a href="tel:02-1234-5678" className="text-primary-600 hover:underline text-sm">
                        <i className="fas fa-phone mr-1"></i>
                        02-1234-5678
                      </a>
                      <a href="mailto:manager@beauleadai.co.kr" className="text-primary-600 hover:underline text-sm">
                        <i className="fas fa-envelope mr-1"></i>
                        이메일
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-comments text-green-600"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">카카오톡 상담</h4>
                    <p className="text-sm text-gray-600">빠른 상담 및 문의</p>
                    <div className="mt-2">
                      <span className="text-primary-600 text-sm">
                        <i className="fas fa-comment mr-1"></i>
                        @뷰리드AI
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
