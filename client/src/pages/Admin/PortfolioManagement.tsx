import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/use-toast';
import { isUnauthorizedError } from '../../lib/authUtils';
import { apiRequest, queryClient } from '../../lib/queryClient';
import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import type { Portfolio } from '@shared/schema';

export default function PortfolioManagement() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();
  const { language } = useLanguage();

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'ADMIN')) {
      toast({
        title: "Unauthorized",
        description: "관리자 권한이 필요합니다.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);

  const { data: portfolios, isLoading: portfoliosLoading, error } = useQuery<Portfolio[]>({
    queryKey: ['/api/portfolios'],
    enabled: isAuthenticated && user?.role === 'ADMIN',
    retry: (failureCount, error: any) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "세션이 만료되었습니다. 다시 로그인해주세요.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
        return false;
      }
      return failureCount < 3;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (portfolioId: string) => {
      await apiRequest('DELETE', `/api/portfolios/${portfolioId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolios'] });
      toast({
        title: "성공",
        description: "포트폴리오가 삭제되었습니다.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "세션이 만료되었습니다. 다시 로그인해주세요.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
        return;
      }
      toast({
        title: "오류",
        description: "포트폴리오 삭제에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ portfolioId, published }: { portfolioId: string; published: boolean }) => {
      await apiRequest('PUT', `/api/portfolios/${portfolioId}`, { published });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolios'] });
      toast({
        title: "성공",
        description: "발행 상태가 변경되었습니다.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "세션이 만료되었습니다. 다시 로그인해주세요.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 500);
        return;
      }
      toast({
        title: "오류",
        description: "발행 상태 변경에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (portfolio: Portfolio) => {
    if (window.confirm(`"${portfolio.titleKo}" 포트폴리오를 정말 삭제하시겠습니까?`)) {
      deleteMutation.mutate(portfolio.id);
    }
  };

  const handleTogglePublish = (portfolio: Portfolio) => {
    togglePublishMutation.mutate({
      portfolioId: portfolio.id,
      published: !portfolio.published
    });
  };

  const formatDate = (dateValue: Date | null | string) => {
    if (!dateValue) return '';
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    return date.toLocaleDateString('ko-KR');
  };

  const getMetricsSummary = (metrics: any) => {
    if (!metrics) return '성과 데이터 없음';
    
    const entries = Object.entries(metrics);
    if (entries.length === 0) return '성과 데이터 없음';
    
    return entries.slice(0, 2).map(([key, value]) => `${key}: ${value}`).join(', ');
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="포트폴리오 관리 | 뷰리드AI" />
      <Header />

      <main className="py-8">
        <div className="container max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-page-title">
                포트폴리오 관리
              </h1>
              <p className="text-gray-600">성공 사례를 등록하고 관리하세요</p>
            </div>
            <Link href="/admin/portfolio/new">
              <Button className="bg-primary-600 hover:bg-primary-700" data-testid="button-new-portfolio">
                <i className="fas fa-plus mr-2"></i>
                새 포트폴리오 등록
              </Button>
            </Link>
          </div>

          {/* Portfolio List */}
          <Card>
            <CardHeader>
              <CardTitle>포트폴리오 목록</CardTitle>
            </CardHeader>
            <CardContent>
              {portfoliosLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="w-20 h-16 rounded" />
                        <div className="flex-1">
                          <Skeleton className="h-6 w-2/3 mb-2" />
                          <Skeleton className="h-4 w-1/3 mb-2" />
                          <Skeleton className="h-3 w-1/4" />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <i className="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                  <p className="text-gray-600">포트폴리오 목록을 불러오는데 실패했습니다.</p>
                </div>
              ) : !portfolios || portfolios.length === 0 ? (
                <div className="text-center py-8">
                  <i className="fas fa-briefcase text-gray-400 text-4xl mb-4"></i>
                  <p className="text-gray-600 mb-4">아직 등록된 포트폴리오가 없습니다.</p>
                  <Link href="/admin/portfolio/new">
                    <Button>첫 번째 포트폴리오 등록하기</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {portfolios.map((portfolio, index) => (
                    <div key={portfolio.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center space-x-4">
                        {/* Thumbnail */}
                        <div className="w-20 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          {portfolio.thumbUrl ? (
                            <img 
                              src={portfolio.thumbUrl} 
                              alt={portfolio.titleKo}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <i className="fas fa-image text-gray-400"></i>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 mr-3" data-testid={`text-portfolio-title-${index}`}>
                              {language === 'ko' ? portfolio.titleKo : portfolio.titleEn}
                            </h3>
                            <Badge variant={portfolio.published ? "default" : "secondary"}>
                              {portfolio.published ? '발행됨' : '초안'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2" data-testid={`text-portfolio-summary-${index}`}>
                            {(language === 'ko' 
                              ? portfolio.summaryKo.substring(0, 100) 
                              : portfolio.summaryEn.substring(0, 100)
                            )}...
                          </p>
                          <div className="text-xs text-gray-500">
                            <span>작성일: {formatDate(portfolio.createdAt)}</span>
                            <span className="ml-3">성과: {getMetricsSummary(portfolio.metrics)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        {portfolio.published && (
                          <Link href={`/portfolio/${portfolio.slug}`}>
                            <Button 
                              variant="outline" 
                              size="sm"
                              data-testid={`button-view-${index}`}
                            >
                              <i className="fas fa-eye mr-1"></i>
                              보기
                            </Button>
                          </Link>
                        )}
                        <Link href={`/admin/portfolio/${portfolio.id}`}>
                          <Button 
                            variant="outline" 
                            size="sm"
                            data-testid={`button-edit-${index}`}
                          >
                            <i className="fas fa-edit mr-1"></i>
                            편집
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTogglePublish(portfolio)}
                          disabled={togglePublishMutation.isPending}
                          data-testid={`button-publish-${index}`}
                        >
                          <i className={`fas ${portfolio.published ? 'fa-eye-slash' : 'fa-eye'} mr-1`}></i>
                          {portfolio.published ? '비공개' : '발행'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(portfolio)}
                          disabled={deleteMutation.isPending}
                          className="text-red-600 hover:bg-red-50 hover:border-red-300"
                          data-testid={`button-delete-${index}`}
                        >
                          <i className="fas fa-trash mr-1"></i>
                          삭제
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
