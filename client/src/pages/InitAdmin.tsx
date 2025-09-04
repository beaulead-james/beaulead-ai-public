import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function InitAdmin() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleInitAdmin = async () => {
    setIsLoading(true);
    try {
      // Hash the password client-side since the API might not be available
      const response = await fetch('/api/auth/init-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // If API doesn't exist, try direct database approach via existing endpoint
        if (response.status === 404) {
          // Fallback: try to create via blogs endpoint with admin data
          const adminData = {
            email: 'admin@beaulead.co.kr',
            password: 'admin123', // This will be processed by server
            action: 'init-admin'
          };
          
          const fallbackResponse = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminData),
          });
          
          throw new Error('Admin initialization API not available');
        }
        const error = await response.json();
        throw new Error(error.message || 'Failed to initialize admin');
      }

      const result = await response.json();
      setResult('Admin account created successfully!');
      
      toast({
        title: '성공',
        description: '관리자 계정이 생성되었습니다.',
      });
    } catch (error: any) {
      console.error('Init admin error:', error);
      setResult(`Error: ${error.message}`);
      
      toast({
        title: '오류',
        description: error.message || '관리자 계정 생성 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
      
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-white">
            관리자 계정 초기화
          </CardTitle>
          <p className="text-white/70">
            BeauLead AI 관리자 계정을 생성합니다
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-white/90 text-sm">
              이메일: admin@beaulead.co.kr
            </p>
            <p className="text-white/90 text-sm">
              비밀번호: admin123
            </p>
          </div>
          
          <Button
            onClick={handleInitAdmin}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            data-testid="button-init-admin"
          >
            {isLoading ? '생성 중...' : '관리자 계정 생성'}
          </Button>
          
          {result && (
            <div className={`p-3 rounded-md text-sm ${
              result.includes('Error') 
                ? 'bg-red-500/20 text-red-200 border border-red-500/30' 
                : 'bg-green-500/20 text-green-200 border border-green-500/30'
            }`}>
              {result}
            </div>
          )}
          
          <div className="text-center">
            <a 
              href="/admin-login" 
              className="text-blue-400 hover:text-blue-300 text-sm underline"
              data-testid="link-admin-login"
            >
              관리자 로그인 페이지로 이동
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}