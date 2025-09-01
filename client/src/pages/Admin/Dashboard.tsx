import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/use-toast';
import { isUnauthorizedError } from '../../lib/authUtils';
import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Skeleton } from '../../components/ui/skeleton';

interface AdminStats {
  blogs: number;
  portfolios: number;
  users: number;
  inquiries: number;
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const { t } = useLanguage();

  // Redirect if not authenticated or not admin
  useEffect(() => {
    // 임시로 인증 체크 건너뛰기 (개발 중)
    const skipAuth = true;
    if (!skipAuth && !isLoading && (!isAuthenticated || user?.role !== 'ADMIN')) {
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

  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ['/api/admin/stats'],
    retry: false,
    enabled: false // 임시로 비활성화 (개발 중)
  });

  // 임시로 인증 체크 건너뛰기 (개발 중)
  const skipAuth = true;
  if (!skipAuth && (isLoading || !isAuthenticated || user?.role !== 'ADMIN')) {
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

  const quickActions = [
    {
      title: '블로그 관리',
      description: '블로그 포스트 작성 및 관리',
      icon: 'fas fa-blog',
      href: '/admin/blog',
      color: 'bg-blue-500'
    },
    {
      title: '포트폴리오 관리',
      description: '포트폴리오 등록 및 수정',
      icon: 'fas fa-briefcase',
      href: '/admin/portfolio',
      color: 'bg-green-500'
    },
    {
      title: '사용자 관리',
      description: '사용자 계정 및 권한 관리',
      icon: 'fas fa-users',
      href: '/admin/users',
      color: 'bg-purple-500'
    },
    {
      title: '분석 리포트',
      description: '방문자 및 성과 분석',
      icon: 'fas fa-chart-bar',
      href: '/admin/analytics',
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="관리자 대시보드 | 뷰리드AI" />
      <Header />

      <main className="py-8">
        <div className="container max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-dashboard-title">
              관리자 대시보드
            </h1>
            <p className="text-gray-600">
              안녕하세요, {user?.firstName || user?.email}님. 오늘도 좋은 하루 되세요!
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsLoading ? (
              [...Array(4)].map((_, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">총 블로그 포스트</p>
                        <p className="text-2xl font-bold text-gray-900" data-testid="text-stats-blogs">
                          {stats?.blogs || 0}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-blog text-blue-600"></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">총 포트폴리오</p>
                        <p className="text-2xl font-bold text-gray-900" data-testid="text-stats-portfolios">
                          {stats?.portfolios || 0}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-briefcase text-green-600"></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">총 사용자</p>
                        <p className="text-2xl font-bold text-gray-900" data-testid="text-stats-users">
                          {stats?.users || 0}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-users text-purple-600"></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">이번 달 문의</p>
                        <p className="text-2xl font-bold text-gray-900" data-testid="text-stats-inquiries">
                          {stats?.inquiries || 0}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <i className="fas fa-envelope text-orange-600"></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mr-4`}>
                        <i className={`${action.icon} text-white text-xl`}></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900" data-testid={`text-action-title-${index}`}>
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-600" data-testid={`text-action-description-${index}`}>
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-clock mr-2 text-gray-600"></i>
                  최근 활동
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-plus text-blue-600 text-xs"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">새 블로그 포스트 작성</p>
                      <p className="text-xs text-gray-500">2시간 전</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-edit text-green-600 text-xs"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">포트폴리오 업데이트</p>
                      <p className="text-xs text-gray-500">1일 전</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-user-plus text-purple-600 text-xs"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">새 사용자 등록</p>
                      <p className="text-xs text-gray-500">3일 전</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-exclamation-circle mr-2 text-gray-600"></i>
                  알림 및 할일
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-bell text-yellow-600 text-xs"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">미승인 포트폴리오 검토 필요</p>
                      <p className="text-xs text-gray-500">2개의 포트폴리오가 승인 대기중입니다</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-chart-line text-blue-600 text-xs"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">월간 리포트 작성</p>
                      <p className="text-xs text-gray-500">이번 달 성과 분석 리포트를 준비해주세요</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-check text-green-600 text-xs"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">시스템 백업 완료</p>
                      <p className="text-xs text-gray-500">어제 밤 자동 백업이 성공적으로 완료되었습니다</p>
                    </div>
                  </div>
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
