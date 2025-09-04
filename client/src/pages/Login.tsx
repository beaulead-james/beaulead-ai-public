import { useState } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '../hooks/use-toast';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import SEO from '../components/UI/SEO';

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Attempting login with:', formData.email);
      
      // 실제 JWT 인증 API 호출
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '로그인에 실패했습니다');
      }

      const result = await response.json();
      
      // JWT 토큰을 localStorage에 저장
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));

      toast({
        title: '로그인 성공',
        description: `${result.user.role === 'ADMIN' ? '관리자' : '사용자'}로 로그인되었습니다.`,
      });

      // 관리자면 관리자 페이지로, 일반 사용자면 대시보드로 이동
      if (result.user.role === 'ADMIN') {
        setLocation('/admin');
      } else {
        setLocation('/dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: '로그인 실패',
        description: error.message || '로그인 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <>
      <SEO title="로그인 | 뷰리드AI" />
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl relative z-10">
          <CardHeader className="text-center space-y-2 pb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">관리자 로그인</h1>
            <p className="text-white/70 text-sm">Admin Only Access</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90" htmlFor="email">
                  이메일
                </label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="이메일을 입력하세요"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/40"
                  required
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/90" htmlFor="password">
                  비밀번호
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/40"
                  required
                  data-testid="input-password"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, rememberMe: !!checked }))
                  }
                  className="border-white/30 text-white data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  data-testid="checkbox-remember"
                />
                <label htmlFor="rememberMe" className="text-sm text-white/80 cursor-pointer">
                  로그인 상태 유지
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                data-testid="button-submit"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>로그인 중...</span>
                  </div>
                ) : (
                  '로그인'
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-xs text-white/60">
                관리자 권한이 필요한 페이지입니다
              </p>
            </div>

            {/* Demo credentials hint */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-white/70 text-center mb-2">관리자 계정:</p>
              <p className="text-xs text-white/60 text-center">이메일: admin@beaulead.co.kr</p>
              <p className="text-xs text-white/60 text-center">비밀번호: admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}