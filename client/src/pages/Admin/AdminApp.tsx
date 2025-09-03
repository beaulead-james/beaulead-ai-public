// client/src/pages/Admin/AdminApp.tsx
// Admin 레이아웃 + 대시보드 + 요청하신 사이드바 메뉴(사용자관리, 접속통계, 블로그관리, 포트폴리오관리, 프로젝트문의)
// wouter 라우팅 기반. shadcn/ui + lucide-react + recharts 사용.

import React from 'react'
import { Route, Switch, Link, useLocation, Router } from 'wouter'
import { useQuery } from '@tanstack/react-query'
import {
  Card, CardHeader, CardTitle, CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Toggle } from '@/components/ui/toggle'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { apiRequest, queryClient } from '@/lib/queryClient'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import {
  BarChart3, LayoutDashboard, Users, Settings,
  Menu, Globe, Sun, Moon, FileText, Briefcase, MailSearch,
  TrendingUp, TrendingDown, Eye, MousePointer, Clock,
  DollarSign, Target, Zap, Calendar, Save, ArrowLeft
} from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, LineChart, Line, BarChart, Bar } from 'recharts'

// ---------------------- 데이터 샘플 ----------------------
const kpiSeries = [
  { d: '08-01', revenue: 120, cvr: 2.1, sessions: 1450, clicks: 890 },
  { d: '08-08', revenue: 180, cvr: 2.3, sessions: 1680, clicks: 1020 },
  { d: '08-15', revenue: 160, cvr: 2.0, sessions: 1520, clicks: 930 },
  { d: '08-22', revenue: 220, cvr: 2.8, sessions: 1890, clicks: 1180 },
  { d: '08-29', revenue: 260, cvr: 3.1, sessions: 2100, clicks: 1340 },
]

const recentActivity = [
  { type: 'lead', message: '새로운 프로젝트 문의', time: '2분 전' },
  { type: 'blog', message: '블로그 글 발행됨', time: '15분 전' },
  { type: 'user', message: '새 사용자 등록', time: '1시간 전' },
  { type: 'portfolio', message: '포트폴리오 업데이트', time: '3시간 전' },
]

// 블로그 폼 스키마
const blogFormSchema = z.object({
  titleKo: z.string().min(1, '한국어 제목을 입력해주세요'),
  titleEn: z.string().min(1, '영어 제목을 입력해주세요'),
  excerptKo: z.string().min(1, '한국어 요약을 입력해주세요'),
  excerptEn: z.string().min(1, '영어 요약을 입력해주세요'),
  contentKo: z.string().min(1, '한국어 내용을 입력해주세요'),
  contentEn: z.string().min(1, '영어 내용을 입력해주세요'),
  slug: z.string().min(1, 'URL 슬러그를 입력해주세요'),
  published: z.boolean().default(false)
})

// 포트폴리오 폼 스키마
const portfolioFormSchema = z.object({
  titleKo: z.string().min(1, '한국어 제목을 입력해주세요'),
  titleEn: z.string().min(1, '영어 제목을 입력해주세요'),
  excerptKo: z.string().min(1, '한국어 요약을 입력해주세요'),
  excerptEn: z.string().min(1, '영어 요약을 입력해주세요'),
  contentKo: z.string().min(1, '한국어 내용을 입력해주세요'),
  contentEn: z.string().min(1, '영어 내용을 입력해주세요'),
  slug: z.string().min(1, 'URL 슬러그를 입력해주세요'),
  client: z.string().min(1, '클라이언트명을 입력해주세요'),
  category: z.string().min(1, '카테고리를 입력해주세요'),
  published: z.boolean().default(false)
})

type BlogFormData = z.infer<typeof blogFormSchema>
type PortfolioFormData = z.infer<typeof portfolioFormSchema>

const users = [
  { id: 'U-001', name: '관리자', role: 'admin', email: 'admin@beaulead.ai', status: 'active' },
  { id: 'U-002', name: '마케터A', role: 'editor', email: 'marketer@beaulead.ai', status: 'active' },
  { id: 'U-003', name: '게스트', role: 'viewer', email: 'guest@beaulead.ai', status: 'disabled' },
]

// 실제 API 데이터 사용 - 목업 데이터 제거

// 리드 데이터도 실제 API에서 가져옴

// ---------------------- 유틸 ----------------------
function clsx(...xs: Array<string | boolean | undefined>) { return xs.filter(Boolean).join(' ') }
function useDarkMode() {
  const [isDark, setIsDark] = React.useState<boolean>(
    typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false
  )
  React.useEffect(() => {
    const root = document.documentElement
    if (isDark) root.classList.add('dark'); else root.classList.remove('dark')
  }, [isDark])
  return { isDark, setIsDark }
}

// ---------------------- 레이아웃 ----------------------
function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation()
  const { isDark, setIsDark } = useDarkMode()
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-md shadow-sm">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden"><Menu className="h-5 w-5" /></Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0"><Sidebar /></SheetContent>
            </Sheet>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BL</span>
              </div>
              <div>
                <Link to="/admin" className="font-bold text-lg">BeauLead AI</Link>
                <Badge variant="secondary" className="ml-2 text-xs">관리자</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Toggle aria-label="toggle-dark" pressed={isDark} onPressedChange={setIsDark} className="h-9 w-9">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Toggle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 h-9">
                  <Globe className="h-4 w-4" /> 한국어
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>한국어</DropdownMenuItem>
                <DropdownMenuItem>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 w-9 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white font-semibold">관리</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/admin/settings" className="flex items-center gap-2"><Settings className="h-4 w-4"/>계정 설정</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center gap-2"><Globe className="h-4 w-4"/>사이트 보기</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        <aside className="hidden lg:block w-72 border-r bg-muted/20">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

function Sidebar() {
  return (
    <div className="flex h-full flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-foreground">관리 패널</h2>
        <p className="text-sm text-muted-foreground mt-1">BeauLead AI 관리 시스템</p>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavGroup title="대시보드">
          <NavItem to="/admin" icon={LayoutDashboard} label="홈 대시보드" />
          <NavItem to="/admin/analytics" icon={BarChart3} label="통계 분석" />
        </NavGroup>
        
        <NavGroup title="콘텐츠 관리">
          <NavItem to="/admin/blog" icon={FileText} label="블로그" />
          <NavItem to="/admin/portfolio" icon={Briefcase} label="포트폴리오" />
        </NavGroup>
        
        <NavGroup title="고객 관리">
          <NavItem to="/admin/leads" icon={MailSearch} label="프로젝트 문의" />
          <NavItem to="/admin/users" icon={Users} label="사용자" />
        </NavGroup>
        
        <NavGroup title="시스템">
          <NavItem to="/admin/settings" icon={Settings} label="설정" />
        </NavGroup>
      </nav>
      
      {/* Sidebar Footer */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
          <div className="h-8 w-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">BL</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">관리자</p>
            <p className="text-xs text-muted-foreground truncate">admin@beaulead.ai</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function NavGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</div>
      <div className="mt-2 space-y-1">{children}</div>
    </div>
  )
}

function NavItem({ to, icon: Icon, label }: { to: string; icon: any; label: string }) {
  const [location] = useLocation()
  const active = location === to
  return (
    <Link 
      to={to}
      className={clsx(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
        active 
          ? 'bg-gradient-to-r from-purple-600/10 to-blue-600/10 text-primary border-l-4 border-primary shadow-sm' 
          : 'text-muted-foreground hover:bg-muted hover:text-foreground hover:translate-x-1'
      )}
    >
      <Icon className={clsx('h-4 w-4', active ? 'text-primary' : '')} /> 
      {label}
    </Link>
  )
}

// ---------------------- 페이지 ----------------------
function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
          <p className="text-muted-foreground">오늘 {new Date().toLocaleDateString('ko-KR')} • 전체 비즈니스 현황을 한눈에</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4"/>지난 30일
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <BarChart3 className="h-4 w-4"/>리포트 생성
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ModernStatCard 
          title="월 매출" 
          value="₩ 52,400,000" 
          change="+12.3%" 
          trend="up"
          icon={DollarSign}
          description="전월 대비 12.3% 증가"
        />
        <ModernStatCard 
          title="신규 리드" 
          value="184" 
          change="+8.1%" 
          trend="up"
          icon={Target}
          description="이월 대비 15건 증가"
        />
        <ModernStatCard 
          title="평균 CPA" 
          value="₩ 18,700" 
          change="-5.2%" 
          trend="down"
          icon={Zap}
          description="전월 대비 개선"
        />
        <ModernStatCard 
          title="웹사이트 방문" 
          value="12,847" 
          change="+18.2%" 
          trend="up"
          icon={Eye}
          description="주간 세션 수"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              매출 추이
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={kpiSeries}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="d" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    fill="url(#revenueGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* CVR Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MousePointer className="h-5 w-5 text-blue-500" />
              전환율 추이
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={kpiSeries}>
                  <XAxis dataKey="d" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cvr" 
                    stroke="#0ea5e9" 
                    strokeWidth={3}
                    dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              최근 활동
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className={clsx(
                    'h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-semibold',
                    activity.type === 'lead' && 'bg-green-500',
                    activity.type === 'blog' && 'bg-blue-500',
                    activity.type === 'user' && 'bg-purple-500',
                    activity.type === 'portfolio' && 'bg-orange-500'
                  )}>
                    {activity.type === 'lead' && <MailSearch className="h-4 w-4" />}
                    {activity.type === 'blog' && <FileText className="h-4 w-4" />}
                    {activity.type === 'user' && <Users className="h-4 w-4" />}
                    {activity.type === 'portfolio' && <Briefcase className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>빠른 작업</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start gap-2" variant="outline">
              <FileText className="h-4 w-4" />새 블로그 작성
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <Briefcase className="h-4 w-4" />포트폴리오 추가
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <Users className="h-4 w-4" />사용자 초대
            </Button>
            <Button className="w-full justify-start gap-2" variant="outline">
              <BarChart3 className="h-4 w-4" />리포트 생성
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function UsersPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">사용자관리</h2>
        <div className="flex gap-2">
          <Input placeholder="이름/이메일 검색" className="w-56" />
          <Button size="sm">사용자 추가</Button>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>이름</TableHead>
                <TableHead>권한</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(u => (
                <TableRow key={u.id}>
                  <TableCell>{u.id}</TableCell>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell><Badge variant="secondary">{u.role}</Badge></TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Badge variant={u.status === 'active' ? 'default' : 'outline'}>{u.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">접속통계</h2>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="source">유입경로</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader><CardTitle>주간 트래픽</CardTitle></CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={kpiSeries}>
                  <XAxis dataKey="d" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="source">
          <Card>
            <CardHeader><CardTitle>소스/미디엄 (샘플)</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <StatCard title="Google / CPC" value="4,120" subtitle="세션" />
                <StatCard title="Naver / CPC" value="3,480" subtitle="세션" />
                <StatCard title="Meta / Paid" value="1,260" subtitle="세션" />
                <StatCard title="Direct" value="980" subtitle="세션" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ---------------------- 새로운 블로그 시스템 컴포넌트 ----------------------

// 블로그 작성 페이지
function NewBlogPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [, setLocation] = useLocation()
  
  const form = useForm<any>({
    resolver: zodResolver(z.object({
      titleKo: z.string().min(1, "한국어 제목을 입력해주세요"),
      titleEn: z.string().min(1, "영어 제목을 입력해주세요"),
      excerptKo: z.string().optional(),
      excerptEn: z.string().optional(),
      contentKo: z.string().min(10, "한국어 본문을 최소 10자 이상 입력해주세요"),
      contentEn: z.string().min(10, "영어 본문을 최소 10자 이상 입력해주세요"),
      categoryId: z.string().optional(),
      tags: z.array(z.string()).default([]),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      metaKeywords: z.string().optional(),
      status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
    })),
    defaultValues: {
      titleKo: "",
      titleEn: "",
      excerptKo: "",
      excerptEn: "",
      contentKo: "",
      contentEn: "",
      categoryId: "",
      tags: [],
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      status: "DRAFT",
    }
  })
  
  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      await apiRequest('POST', '/api/blogs', {
        ...data,
        slug: data.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      })
      
      toast({
        title: "성공",
        description: "블로그가 성공적으로 작성되었습니다.",
      })
      
      setLocation('/admin/blog')
    } catch (error: any) {
      toast({
        title: "오류",
        description: error.message || "블로그 작성에 실패했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 data-testid="heading-new-blog" className="text-3xl font-bold tracking-tight">새 블로그 글 작성</h1>
        <p className="text-muted-foreground">새로운 블로그 글을 작성하고 공유하세요.</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="titleKo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>제목 (한국어)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="한국어 제목을 입력하세요" 
                          {...field} 
                          data-testid="input-title-ko"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="titleEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>제목 (영어)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter English title" 
                          {...field} 
                          data-testid="input-title-en"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="excerptKo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>요약 (한국어)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="한국어 요약을 입력하세요" 
                          {...field} 
                          data-testid="textarea-excerpt-ko"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerptEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>요약 (영어)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter English excerpt" 
                          {...field} 
                          data-testid="textarea-excerpt-en"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>본문 내용</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="contentKo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>본문 (한국어)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="한국어 본문을 입력하세요" 
                        className="min-h-[200px]"
                        {...field} 
                        data-testid="textarea-content-ko"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>본문 (영어)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter English content" 
                        className="min-h-[200px]"
                        {...field} 
                        data-testid="textarea-content-en"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>SEO 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>메타 제목</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="SEO를 위한 메타 제목" 
                        {...field} 
                        data-testid="input-meta-title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>메타 설명</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="검색 결과에 표시될 설명" 
                        {...field} 
                        data-testid="textarea-meta-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metaKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>메타 키워드</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="쉼표로 구분된 키워드" 
                        {...field} 
                        data-testid="input-meta-keywords"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>발행 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>상태</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-status">
                          <SelectValue placeholder="상태를 선택하세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DRAFT">초안</SelectItem>
                        <SelectItem value="PUBLISHED">발행</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setLocation('/admin/blog')}
              data-testid="button-cancel"
            >
              취소
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              data-testid="button-submit"
            >
              {isSubmitting ? "저장 중..." : "저장"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

// 블로그 수정 페이지
function EditBlogPage({ blogId }: { blogId: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [, setLocation] = useLocation()
  
  // 기존 블로그 데이터 로드
  const { data: blog, isLoading } = useQuery({
    queryKey: ['/api/blogs', blogId],
    queryFn: async () => {
      const response = await fetch(`/api/blogs/${blogId}`)
      if (!response.ok) throw new Error('Failed to fetch blog')
      return await response.json()
    },
    enabled: !!blogId,
  })
  
  const form = useForm<any>({
    resolver: zodResolver(z.object({
      titleKo: z.string().min(1, "한국어 제목을 입력해주세요"),
      titleEn: z.string().min(1, "영어 제목을 입력해주세요"),
      excerptKo: z.string().optional(),
      excerptEn: z.string().optional(),
      contentKo: z.string().min(10, "한국어 본문을 최소 10자 이상 입력해주세요"),
      contentEn: z.string().min(10, "영어 본문을 최소 10자 이상 입력해주세요"),
      categoryId: z.string().optional(),
      tags: z.array(z.string()).default([]),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
      metaKeywords: z.string().optional(),
      status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
    })),
    defaultValues: {
      titleKo: "",
      titleEn: "",
      excerptKo: "",
      excerptEn: "",
      contentKo: "",
      contentEn: "",
      categoryId: "",
      tags: [],
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      status: "DRAFT",
    }
  })
  
  // 데이터가 로드되면 폼에 설정
  React.useEffect(() => {
    if (blog) {
      form.reset({
        titleKo: blog.titleKo || "",
        titleEn: blog.titleEn || "",
        excerptKo: blog.excerptKo || "",
        excerptEn: blog.excerptEn || "",
        contentKo: blog.contentKo || "",
        contentEn: blog.contentEn || "",
        categoryId: blog.categoryId || "",
        tags: blog.tags || [],
        metaTitle: blog.metaTitle || "",
        metaDescription: blog.metaDescription || "",
        metaKeywords: blog.metaKeywords || "",
        status: blog.status || "DRAFT",
      })
    }
  }, [blog, form])
  
  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      await apiRequest('PUT', `/api/blogs/${blogId}`, {
        ...data,
        slug: data.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      })
      
      toast({
        title: "성공",
        description: "블로그가 성공적으로 수정되었습니다.",
      })
      
      setLocation('/admin/blog')
    } catch (error: any) {
      toast({
        title: "오류",
        description: error.message || "블로그 수정에 실패했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }
  
  if (!blog) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">블로그 글을 찾을 수 없습니다.</p>
        <Button onClick={() => setLocation('/admin/blog')} className="mt-4">
          목록으로 돌아가기
        </Button>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 data-testid="heading-edit-blog" className="text-3xl font-bold tracking-tight">블로그 글 수정</h1>
          <p className="text-muted-foreground">기존 블로그 글을 수정하세요.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setLocation('/admin/blog')}
          data-testid="button-back"
        >
          목록으로 돌아가기
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="titleKo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>제목 (한국어)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="한국어 제목을 입력하세요" 
                          {...field} 
                          data-testid="input-title-ko"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="titleEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>제목 (영어)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter English title" 
                          {...field} 
                          data-testid="input-title-en"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="excerptKo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>요약 (한국어)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="한국어 요약을 입력하세요" 
                          {...field} 
                          data-testid="textarea-excerpt-ko"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerptEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>요약 (영어)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter English excerpt" 
                          {...field} 
                          data-testid="textarea-excerpt-en"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>본문 내용</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="contentKo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>본문 (한국어)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="한국어 본문을 입력하세요" 
                        className="min-h-[200px]"
                        {...field} 
                        data-testid="textarea-content-ko"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>본문 (영어)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter English content" 
                        className="min-h-[200px]"
                        {...field} 
                        data-testid="textarea-content-en"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>SEO 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>메타 제목</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="SEO를 위한 메타 제목" 
                        {...field} 
                        data-testid="input-meta-title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>메타 설명</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="검색 결과에 표시될 설명" 
                        {...field} 
                        data-testid="textarea-meta-description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metaKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>메타 키워드</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="쉼표로 구분된 키워드" 
                        {...field} 
                        data-testid="input-meta-keywords"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>발행 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>상태</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-status">
                          <SelectValue placeholder="상태를 선택하세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DRAFT">초안</SelectItem>
                        <SelectItem value="PUBLISHED">발행</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setLocation('/admin/blog')}
              data-testid="button-cancel"
            >
              취소
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              data-testid="button-update"
            >
              {isSubmitting ? "수정 중..." : "수정"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

// 포트폴리오 작성 페이지
function NewPortfolioPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">새 포트폴리오 작성</h1>
      <p>포트폴리오 작성 페이지입니다.</p>
    </div>
  )
}

// 새로운 블로그 목록 페이지
function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const { toast } = useToast()
  const [, setLocation] = useLocation()
  
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['/api/blogs'],
    queryFn: async () => {
      const response = await fetch('/api/blogs');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      return await response.json();
    }
  });
  
  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm('정말로 이 블로그 글을 삭제하시겠습니까?')) {
      return
    }
    
    try {
      await apiRequest('DELETE', `/api/blogs/${blogId}`)
      queryClient.invalidateQueries({ queryKey: ['/api/blogs'] })
      toast({
        title: "성공",
        description: "블로그 글이 삭제되었습니다.",
      })
    } catch (error: any) {
      toast({
        title: "오류",
        description: error.message || "블로그 삭제에 실패했습니다.",
        variant: "destructive",
      })
    }
  }
  
  // 필터링된 블로그 목록
  const filteredBlogs = blogs.filter((blog: any) => {
    const matchesSearch = searchQuery === "" || 
      blog.titleKo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.titleEn?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "published" && blog.published) ||
      (statusFilter === "draft" && !blog.published)
    
    return matchesSearch && matchesStatus
  })
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 data-testid="heading-blog-list" className="text-3xl font-bold tracking-tight">블로그 관리</h1>
          <p className="text-muted-foreground">블로그 글을 작성하고 관리하세요</p>
        </div>
        <Button 
          onClick={() => setLocation('/admin/blog/new')}
          data-testid="button-new-blog"
          className="gap-2"
        >
          <FileText className="h-4 w-4" />
          새 글 작성
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>블로그 글 목록</CardTitle>
            <div className="flex gap-2">
              <Input
                placeholder="제목 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
                data-testid="input-search"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32" data-testid="select-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="published">발행됨</SelectItem>
                  <SelectItem value="draft">초안</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>제목</TableHead>
                <TableHead>작성자</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>조회수</TableHead>
                <TableHead>작성일</TableHead>
                <TableHead className="text-right">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    {searchQuery || statusFilter !== "all" 
                      ? "검색 조건에 맞는 블로그 글이 없습니다."
                      : "아직 블로그 글이 없습니다. 첫 번째 글을 작성해보세요!"
                    }
                  </TableCell>
                </TableRow>
              ) : (
                filteredBlogs.map((blog: any) => (
                  <TableRow key={blog.id} data-testid={`row-blog-${blog.id}`}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{blog.titleKo}</div>
                        <div className="text-sm text-muted-foreground">{blog.titleEn}</div>
                      </div>
                    </TableCell>
                    <TableCell data-testid={`text-author-${blog.id}`}>
                      {blog.author?.firstName} {blog.author?.lastName}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={blog.published ? 'default' : 'secondary'}
                        data-testid={`badge-status-${blog.id}`}
                      >
                        {blog.status === 'PUBLISHED' ? '발행' : '초안'}
                      </Badge>
                    </TableCell>
                    <TableCell data-testid={`text-views-${blog.id}`}>
                      {blog.viewCount || '0'}
                    </TableCell>
                    <TableCell data-testid={`text-date-${blog.id}`}>
                      {new Date(blog.createdAt).toLocaleDateString('ko-KR')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setLocation(`/admin/blog/edit/${blog.id}`)}
                          data-testid={`button-edit-${blog.id}`}
                        >
                          수정
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDeleteBlog(blog.id)}
                          data-testid={`button-delete-${blog.id}`}
                        >
                          삭제
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function PortfolioPage() {
  const { data: portfolios = [], isLoading } = useQuery({
    queryKey: ['/api/portfolios'],
    queryFn: async () => {
      const response = await fetch('/api/portfolios');
      if (!response.ok) throw new Error('Failed to fetch portfolios');
      return await response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">포트폴리오관리</h2>
          <div className="flex gap-2">
            <Input placeholder="제목/태그 검색" className="w-56" />
            <Button 
              size="sm" 
              className="gap-2"
              onClick={() => window.location.href = '/admin/portfolio/new'}
            >
              <Briefcase className="h-4 w-4" />새 포트폴리오 작성
            </Button>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">포트폴리오관리</h2>
        <div className="flex gap-2">
          <Input placeholder="제목/태그 검색" className="w-56" />
          <Button 
            size="sm" 
            className="gap-2"
            onClick={() => window.location.href = '/admin/portfolio/new'}
          >
            <Briefcase className="h-4 w-4" />새 포트폴리오 작성
          </Button>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>제목</TableHead>
                <TableHead>카테고리</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>날짜</TableHead>
                <TableHead>액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolios.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    아직 포트폴리오가 없습니다. 첫 번째 프로젝트를 추가해보세요!
                  </TableCell>
                </TableRow>
              ) : (
                portfolios.map((portfolio: any) => (
                  <TableRow key={portfolio.id}>
                    <TableCell>{portfolio.id}</TableCell>
                    <TableCell className="font-medium">{portfolio.titleKo || portfolio.titleEn}</TableCell>
                    <TableCell>
                      {portfolio.category && <Badge variant="secondary">{portfolio.category}</Badge>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={portfolio.published ? 'default' : 'outline'}>
                        {portfolio.published ? '발행' : '임시저장'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(portfolio.createdAt).toLocaleDateString('ko-KR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link to={`/admin/portfolio/edit/${portfolio.id}`}>
                          <Button size="sm" variant="outline">편집</Button>
                        </Link>
                        <Button size="sm" variant="destructive">삭제</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function LeadsPage() {
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ['/api/contacts'],
    queryFn: async () => {
      const response = await fetch('/api/contacts');
      if (!response.ok) throw new Error('Failed to fetch contacts');
      return await response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">프로젝트문의</h2>
          <div className="flex gap-2">
            <Input placeholder="회사/연락처/메모 검색" className="w-64" />
            <Button size="sm">CSV 내보내기</Button>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">프로젝트문의</h2>
        <div className="flex gap-2">
          <Input placeholder="회사/연락처/메모 검색" className="w-64" />
          <Button size="sm">CSV 내보내기</Button>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>회사/이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>전화번호</TableHead>
                <TableHead>메시지</TableHead>
                <TableHead>날짜</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    아직 연락 문의가 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead: any) => (
                  <TableRow key={lead.id}>
                    <TableCell>{lead.id}</TableCell>
                    <TableCell className="font-medium">{lead.company || lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.phone}</TableCell>
                    <TableCell className="max-w-[300px] truncate">{lead.message}</TableCell>
                    <TableCell>
                      {new Date(lead.createdAt).toLocaleDateString('ko-KR')}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">신규</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function BlogEditorPage({ blogId }: { blogId?: string }) {
  const isEdit = !!blogId
  
  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      titleKo: '',
      titleEn: '',
      excerptKo: '',
      excerptEn: '',
      contentKo: '',
      contentEn: '',
      slug: '',
      published: false
    }
  })

  const onSubmit = async (data: BlogFormData) => {
    try {
      const method = isEdit ? 'PUT' : 'POST'
      const url = isEdit ? `/api/blogs/${blogId}` : '/api/blogs'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        window.location.href = '/admin/blog'
      } else {
        console.error('Failed to save blog post')
      }
    } catch (error) {
      console.error('Error saving blog post:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/blog">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />뒤로가기
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-semibold">
              {isEdit ? '블로그 편집' : '새 블로그 작성'}
            </h2>
            <p className="text-sm text-muted-foreground">
              한국어와 영어로 블로그 포스트를 작성하세요
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => form.setValue('published', false)}
          >
            임시저장
          </Button>
          <Button 
            type="submit" 
            form="blog-form"
            className="gap-2"
            onClick={() => form.setValue('published', true)}
          >
            <Save className="h-4 w-4" />발행하기
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form id="blog-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 한국어 섹션 */}
            <Card>
              <CardHeader>
                <CardTitle>한국어 콘텐츠</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="titleKo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>제목</FormLabel>
                      <FormControl>
                        <Input placeholder="블로그 제목을 입력하세요" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerptKo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>요약</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="블로그 요약을 입력하세요" 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contentKo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>내용</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="블로그 내용을 입력하세요" 
                          className="min-h-[300px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* 영어 섹션 */}
            <Card>
              <CardHeader>
                <CardTitle>English Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="titleEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter blog title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerptEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter blog excerpt" 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contentEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter blog content" 
                          className="min-h-[300px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* 설정 섹션 */}
          <Card>
            <CardHeader>
              <CardTitle>블로그 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL 슬러그</FormLabel>
                    <FormControl>
                      <Input placeholder="blog-post-url-slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}

function PortfolioEditorPage({ portfolioId }: { portfolioId?: string }) {
  const isEdit = !!portfolioId
  
  const form = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      titleKo: '',
      titleEn: '',
      excerptKo: '',
      excerptEn: '',
      contentKo: '',
      contentEn: '',
      slug: '',
      client: '',
      category: '',
      published: false
    }
  })

  const onSubmit = async (data: PortfolioFormData) => {
    try {
      const method = isEdit ? 'PUT' : 'POST'
      const url = isEdit ? `/api/portfolios/${portfolioId}` : '/api/portfolios'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        window.location.href = '/admin/portfolio'
      } else {
        console.error('Failed to save portfolio')
      }
    } catch (error) {
      console.error('Error saving portfolio:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/portfolio">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />뒤로가기
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-semibold">
              {isEdit ? '포트폴리오 편집' : '새 포트폴리오 작성'}
            </h2>
            <p className="text-sm text-muted-foreground">
              한국어와 영어로 포트폴리오를 작성하세요
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => form.setValue('published', false)}
          >
            임시저장
          </Button>
          <Button 
            type="submit" 
            form="portfolio-form"
            className="gap-2"
            onClick={() => form.setValue('published', true)}
          >
            <Save className="h-4 w-4" />발행하기
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form id="portfolio-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 한국어 섹션 */}
            <Card>
              <CardHeader>
                <CardTitle>한국어 콘텐츠</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="titleKo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>제목</FormLabel>
                      <FormControl>
                        <Input placeholder="포트폴리오 제목을 입력하세요" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerptKo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>요약</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="포트폴리오 요약을 입력하세요" 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contentKo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>내용</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="포트폴리오 내용을 입력하세요" 
                          className="min-h-[300px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* 영어 섹션 */}
            <Card>
              <CardHeader>
                <CardTitle>English Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="titleEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter portfolio title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerptEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter portfolio excerpt" 
                          className="min-h-[80px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contentEn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter portfolio content" 
                          className="min-h-[300px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* 설정 섹션 */}
          <Card>
            <CardHeader>
              <CardTitle>포트폴리오 설정</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL 슬러그</FormLabel>
                    <FormControl>
                      <Input placeholder="portfolio-url-slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>클라이언트</FormLabel>
                    <FormControl>
                      <Input placeholder="클라이언트명" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>카테고리</FormLabel>
                    <FormControl>
                      <Input placeholder="예: 이커머스, 의료/헬스, 교육" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}

function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">설정</h2>
      <Card>
        <CardHeader><CardTitle>일반</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="brand">브랜드명</Label>
              <Input id="brand" placeholder="Beaulead AI" />
            </div>
            <div>
              <Label htmlFor="domain">도메인</Label>
              <Input id="domain" placeholder="beaulead.ai" />
            </div>
          </div>
          <Separator />
          <Button>저장</Button>
        </CardContent>
      </Card>
    </div>
  )
}

// ---------------------- 공용 컴포넌트 ----------------------
function StatCard({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        {subtitle && <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>}
      </CardContent>
    </Card>
  )
}

function ModernStatCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon, 
  description 
}: { 
  title: string; 
  value: string; 
  change: string; 
  trend: 'up' | 'down'; 
  icon: any; 
  description: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{value}</span>
              <span className={clsx(
                'text-sm font-medium flex items-center gap-1',
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              )}>
                {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {change}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          <div className={clsx(
            'h-12 w-12 rounded-lg flex items-center justify-center',
            trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          )}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div className="mt-4">
          <Progress 
            value={trend === 'up' ? 75 : 45} 
            className={clsx(
              'h-2',
              trend === 'up' ? '[&>div]:bg-green-500' : '[&>div]:bg-red-500'
            )}
          />
        </div>
      </CardContent>
    </Card>
  )
}

// ---------------------- 루트 컴포넌트 ----------------------
export default function AdminApp() {
  const [location] = useLocation()
  
  // 관리자 페이지 라우팅 처리 - 실제 브라우저 경로 사용  
  const actualPath = window.location.pathname
  
  const renderContent = () => {
    
    if (actualPath === '/admin') return <DashboardPage />
    if (actualPath === '/admin/users') return <UsersPage />
    if (actualPath === '/admin/analytics') return <AnalyticsPage />
    if (actualPath === '/admin/blog') return <BlogPage />
    if (actualPath === '/admin/blog/new') return <NewBlogPage />
    if (actualPath === '/admin/portfolio') return <PortfolioPage />
    if (actualPath === '/admin/portfolio/new') return <NewPortfolioPage />
    if (actualPath === '/admin/leads') return <LeadsPage />
    if (actualPath === '/admin/settings') return <SettingsPage />
    
    // 편집 페이지 처리
    if (actualPath.startsWith('/admin/blog/edit/')) {
      const blogId = actualPath.split('/admin/blog/edit/')[1]
      return <EditBlogPage blogId={blogId} />
    }
    if (actualPath.startsWith('/admin/portfolio/edit/')) {
      const portfolioId = actualPath.split('/admin/portfolio/edit/')[1]
      return <PortfolioEditorPage portfolioId={portfolioId} />
    }
    
    return <DashboardPage />
  }
  
  return (
    <AdminLayout>
      {renderContent()}
    </AdminLayout>
  )
}