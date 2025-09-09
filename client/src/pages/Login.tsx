import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-indigo-500 shadow-md" />
      <div className="text-xl font-semibold tracking-tight">BeauLead AI</div>
    </div>
  );
}

export default function LoginPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [busy, setBusy] = useState(false);

  // redirect 파라미터 지원 (ex. /login?next=/admin/portfolio)
  const next = useMemo(() => new URLSearchParams(location.search).get('next') || '/admin', []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setBusy(true);
      await apiRequest('POST', '/api/auth/login', { email, password });
      window.location.href = next;
    } catch (err: any) {
      toast({
        title: '로그인 실패',
        description: err?.message || '아이디 혹은 비밀번호를 확인해 주세요.',
        variant: 'destructive'
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 배경 연출 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1330] via-[#101628] to-[#0b1020]" />
      <div className="pointer-events-none absolute -top-40 -left-40 h-[380px] w-[380px] rounded-full blur-3xl bg-fuchsia-600/25" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full blur-3xl bg-indigo-600/25" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
        <Card className="w-full max-w-md border-slate-800/60 bg-slate-900/70 backdrop-blur-xl shadow-xl">
          <CardHeader className="space-y-2">
            <BrandMark />
            <CardTitle className="text-2xl mt-2">관리자 로그인</CardTitle>
            <p className="text-sm text-slate-400">계정으로 로그인하여 관리자 대시보드에 접속합니다.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"/>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@beaulead.co.kr"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    className="pl-9"
                    autoFocus
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"/>
                  <Input
                    id="password"
                    type={showPw ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    className="pl-9 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={()=>setShowPw(v=>!v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-200"
                    aria-label="비밀번호 표시 전환"
                  >
                    {showPw ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full mt-2" disabled={busy}>
                {busy ? '로그인 중…' : '로그인'}
              </Button>

              <div className="text-xs text-slate-400 text-center">
                보안 안내: 공용 PC에서는 로그아웃을 반드시 실행하세요.
              </div>

              <Separator className="my-4" />
              <div className="flex items-center justify-between text-xs text-slate-400">
                <a href="/forgot" className="hover:text-slate-200">비밀번호 찾기</a>
                <a href="/" className="hover:text-slate-200">홈으로</a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}