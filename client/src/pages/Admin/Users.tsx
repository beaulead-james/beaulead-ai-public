import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import type { User } from '@shared/schema';

export default function Users() {
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

  // Mock users data since we don't have a real users API endpoint
  const mockUsers: User[] = [
    {
      id: '1',
      email: 'admin@beauleadai.co.kr',
      firstName: 'Admin',
      lastName: 'User',
      profileImageUrl: null,
      role: 'ADMIN',
      createdAt: new Date('2024-01-01').toISOString(),
      updatedAt: new Date('2024-01-01').toISOString()
    },
    {
      id: '2',
      email: 'client@example.com',
      firstName: '김',
      lastName: '고객',
      profileImageUrl: null,
      role: 'CLIENT',
      createdAt: new Date('2024-02-15').toISOString(),
      updatedAt: new Date('2024-02-15').toISOString()
    },
    {
      id: '3',
      email: 'user@example.com',
      firstName: '일반',
      lastName: '사용자',
      profileImageUrl: null,
      role: 'USER',
      createdAt: new Date('2024-03-01').toISOString(),
      updatedAt: new Date('2024-03-01').toISOString()
    }
  ];

  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'destructive';
      case 'CLIENT':
        return 'default';
      case 'USER':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return '관리자';
      case 'CLIENT':
        return '클라이언트';
      case 'USER':
        return '일반사용자';
      default:
        return role;
    }
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(prev => prev.map(u => 
      u.id === userId 
        ? { ...u, role: newRole as 'USER' | 'ADMIN' | 'CLIENT', updatedAt: new Date().toISOString() }
        : u
    ));

    toast({
      title: "성공",
      description: "사용자 권한이 변경되었습니다.",
    });
  };

  const handleDeleteUser = (userId: string, userEmail: string) => {
    if (userId === user?.id) {
      toast({
        title: "오류",
        description: "본인 계정은 삭제할 수 없습니다.",
        variant: "destructive",
      });
      return;
    }

    if (window.confirm(`${userEmail} 사용자를 정말 삭제하시겠습니까?`)) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      toast({
        title: "성공",
        description: "사용자가 삭제되었습니다.",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
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
      <SEO title="사용자 관리 | 뷰리드AI" />
      <Header />

      <main className="py-8">
        <div className="container max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="text-page-title">
              사용자 관리
            </h1>
            <p className="text-gray-600">사용자 계정 및 권한을 관리하세요</p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-1" data-testid="text-total-users">
                    {users.length}
                  </div>
                  <div className="text-sm text-gray-600">총 사용자</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1" data-testid="text-admin-users">
                    {users.filter(u => u.role === 'ADMIN').length}
                  </div>
                  <div className="text-sm text-gray-600">관리자</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1" data-testid="text-client-users">
                    {users.filter(u => u.role === 'CLIENT').length}
                  </div>
                  <div className="text-sm text-gray-600">클라이언트</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600 mb-1" data-testid="text-regular-users">
                    {users.filter(u => u.role === 'USER').length}
                  </div>
                  <div className="text-sm text-gray-600">일반사용자</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle>사용자 목록</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingUsers ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-5 w-32 mb-2" />
                          <Skeleton className="h-4 w-48" />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-8">
                  <i className="fas fa-users text-gray-400 text-4xl mb-4"></i>
                  <p className="text-gray-600">등록된 사용자가 없습니다.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {users.map((userItem, index) => (
                    <div key={userItem.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-center space-x-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          {userItem.profileImageUrl ? (
                            <img 
                              src={userItem.profileImageUrl} 
                              alt={userItem.email}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <i className="fas fa-user text-gray-500"></i>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <h3 className="text-lg font-semibold text-gray-900 mr-3" data-testid={`text-user-name-${index}`}>
                              {userItem.firstName && userItem.lastName 
                                ? `${userItem.firstName} ${userItem.lastName}`
                                : userItem.email
                              }
                            </h3>
                            <Badge variant={getRoleBadgeVariant(userItem.role)}>
                              {getRoleDisplayName(userItem.role)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600" data-testid={`text-user-email-${index}`}>
                            {userItem.email}
                          </p>
                          <div className="text-xs text-gray-500 mt-1">
                            가입일: {formatDate(userItem.createdAt)}
                            {userItem.updatedAt !== userItem.createdAt && (
                              <span className="ml-3">수정일: {formatDate(userItem.updatedAt)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 ml-4">
                        {/* Role Selector */}
                        <div className="w-32">
                          <Select
                            value={userItem.role}
                            onValueChange={(newRole) => handleRoleChange(userItem.id, newRole)}
                            disabled={userItem.id === user?.id}
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USER">일반사용자</SelectItem>
                              <SelectItem value="CLIENT">클라이언트</SelectItem>
                              <SelectItem value="ADMIN">관리자</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Delete Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(userItem.id, userItem.email)}
                          disabled={userItem.id === user?.id}
                          className="text-red-600 hover:bg-red-50 hover:border-red-300"
                          data-testid={`button-delete-user-${index}`}
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

          {/* Info Notice */}
          <div className="mt-8">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <i className="fas fa-info-circle text-blue-600 text-xl mr-3 mt-0.5"></i>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">사용자 권한 안내</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li><strong>관리자:</strong> 모든 관리 기능에 접근 가능 (블로그, 포트폴리오, 사용자 관리)</li>
                      <li><strong>클라이언트:</strong> 전용 대시보드 접근 가능 (분석 데이터, 캠페인 성과)</li>
                      <li><strong>일반사용자:</strong> 공개 페이지만 접근 가능</li>
                    </ul>
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
