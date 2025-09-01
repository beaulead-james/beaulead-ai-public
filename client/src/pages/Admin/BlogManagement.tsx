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
import type { Blog } from '@shared/schema';

export default function BlogManagement() {
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

  const { data: blogs, isLoading: blogsLoading, error } = useQuery<Blog[]>({
    queryKey: ['/api/blogs'],
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
    mutationFn: async (blogId: string) => {
      await apiRequest('DELETE', `/api/blogs/${blogId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blogs'] });
      toast({
        title: "성공",
        description: "블로그 포스트가 삭제되었습니다.",
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
        description: "블로그 포스트 삭제에 실패했습니다.",
        variant: "destructive",
      });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ blogId, published }: { blogId: string; published: boolean }) => {
      await apiRequest('PUT', `/api/blogs/${blogId}`, { published });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blogs'] });
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

  const handleDelete = (blog: Blog) => {
    if (window.confirm(`"${blog.titleKo}" 포스트를 정말 삭제하시겠습니까?`)) {
      deleteMutation.mutate(blog.id);
    }
  };

  const handleTogglePublish = (blog: Blog) => {
    togglePublishMutation.mutate({
      blogId: blog.id,
      published: !blog.published
    });
  };

  const formatDate = (dateValue: Date | null | string) => {
    if (!dateValue) return '';
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    return date.toLocaleDateString('ko-KR');
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
      <SEO title="블로그 관리 | 뷰리드AI" />
      <Header />

      <main className="py-8">
        <div className="container max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-page-title">
                블로그 관리
              </h1>
              <p className="text-gray-600">블로그 포스트를 작성하고 관리하세요</p>
            </div>
            <Link href="/admin/blog/new">
              <Button className="bg-primary-600 hover:bg-primary-700" data-testid="button-new-blog">
                <i className="fas fa-plus mr-2"></i>
                새 포스트 작성
              </Button>
            </Link>
          </div>

          {/* Blog List */}
          <Card>
            <CardHeader>
              <CardTitle>블로그 포스트 목록</CardTitle>
            </CardHeader>
            <CardContent>
              {blogsLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <Skeleton className="h-6 w-2/3 mb-2" />
                        <Skeleton className="h-4 w-1/3 mb-2" />
                        <Skeleton className="h-3 w-1/4" />
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
                  <p className="text-gray-600">블로그 목록을 불러오는데 실패했습니다.</p>
                </div>
              ) : !blogs || blogs.length === 0 ? (
                <div className="text-center py-8">
                  <i className="fas fa-blog text-gray-400 text-4xl mb-4"></i>
                  <p className="text-gray-600 mb-4">아직 작성된 블로그 포스트가 없습니다.</p>
                  <Link href="/admin/blog/new">
                    <Button>첫 번째 포스트 작성하기</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {blogs.map((blog, index) => (
                    <div key={blog.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 mr-3" data-testid={`text-blog-title-${index}`}>
                            {language === 'ko' ? blog.titleKo : blog.titleEn}
                          </h3>
                          <Badge variant={blog.published ? "default" : "secondary"}>
                            {blog.published ? '발행됨' : '초안'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2" data-testid={`text-blog-excerpt-${index}`}>
                          {language === 'ko' 
                            ? blog.excerptKo?.substring(0, 100) || '요약 없음'
                            : blog.excerptEn?.substring(0, 100) || 'No excerpt'
                          }...
                        </p>
                        <div className="text-xs text-gray-500">
                          <span>작성일: {formatDate(blog.createdAt)}</span>
                          {blog.updatedAt !== blog.createdAt && (
                            <span className="ml-3">수정일: {formatDate(blog.updatedAt)}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        {blog.published && (
                          <Link href={`/blog/${blog.slug}`}>
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
                        <Link href={`/admin/blog/${blog.id}`}>
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
                          onClick={() => handleTogglePublish(blog)}
                          disabled={togglePublishMutation.isPending}
                          data-testid={`button-publish-${index}`}
                        >
                          <i className={`fas ${blog.published ? 'fa-eye-slash' : 'fa-eye'} mr-1`}></i>
                          {blog.published ? '비공개' : '발행'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(blog)}
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
