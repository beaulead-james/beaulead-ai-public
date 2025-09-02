// client/src/pages/Admin/AdminApp.tsx
// Admin 레이아웃 + 대시보드 + 요청하신 사이드바 메뉴(사용자관리, 접속통계, 블로그관리, 포트폴리오관리, 프로젝트문의)
// wouter 라우팅 기반. shadcn/ui + lucide-react + recharts 사용.

import React from 'react'
import { Route, Switch, Link, useLocation } from 'wouter'
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
import {
  BarChart3, LayoutDashboard, Users, Settings,
  Menu, Globe, Sun, Moon, FileText, Briefcase, MailSearch
} from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'

// ---------------------- 데이터 샘플 ----------------------
const kpiSeries = [
  { d: '08-01', revenue: 120, cvr: 2.1 },
  { d: '08-08', revenue: 180, cvr: 2.3 },
  { d: '08-15', revenue: 160, cvr: 2.0 },
  { d: '08-22', revenue: 220, cvr: 2.8 },
  { d: '08-29', revenue: 260, cvr: 3.1 },
]

const users = [
  { id: 'U-001', name: '관리자', role: 'admin', email: 'admin@beaulead.ai', status: 'active' },
  { id: 'U-002', name: '마케터A', role: 'editor', email: 'marketer@beaulead.ai', status: 'active' },
  { id: 'U-003', name: '게스트', role: 'viewer', email: 'guest@beaulead.ai', status: 'disabled' },
]

const posts = [
  { id: 'B-101', title: '월간 성과 리포트 템플릿', author: '관리자', status: 'draft' },
  { id: 'B-102', title: '구글 애즈 체크리스트', author: '마케터A', status: 'published' },
]

const portfolios = [
  { id: 'P-001', title: '위담한방병원 퍼포먼스', tag: '의료/헬스', status: 'published' },
  { id: 'P-002', title: 'U2 Sports D2C', tag: '이커머스', status: 'draft' },
]

const leads = [
  { id: 'L-001', company: '본느', contact: '010-9130-9710', memo: 'SNS 배너/광고 소재 월고정 문의', status: 'new' },
  { id: 'L-002', company: 'Optimum Zone', contact: 'contact@ozpc.co.kr', memo: '네이버 플레이스/키워드', status: 'in-review' },
]

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
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden"><Menu className="h-5 w-5" /></Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0"><Sidebar /></SheetContent>
            </Sheet>
            <Link href="/admin"><a className="font-semibold">Beaulead AI • Admin</a></Link>
            <Badge variant="secondary" className="ml-2">internal</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Toggle aria-label="toggle-dark" pressed={isDark} onPressedChange={setIsDark}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Toggle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2"><Globe className="h-4 w-4" /> KR</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>한국어</DropdownMenuItem>
                <DropdownMenuItem>English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-2">
                  <Avatar className="h-7 w-7"><AvatarFallback>BL</AvatarFallback></Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings"><a className="flex items-center gap-2"><Settings className="h-4 w-4"/>설정</a></Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block"><Sidebar /></aside>
        <main>{children}</main>
      </div>
    </div>
  )
}

function Sidebar() {
  return (
    <nav className="sticky top-20 flex flex-col gap-1 p-2">
      <NavGroup title="Overview">
        <NavItem href="/admin" icon={LayoutDashboard} label="대시보드" />
      </NavGroup>
      <NavGroup title="운영">
        <NavItem href="/admin/users" icon={Users} label="사용자관리" />
        <NavItem href="/admin/analytics" icon={BarChart3} label="접속통계" />
        <NavItem href="/admin/blog" icon={FileText} label="블로그관리" />
        <NavItem href="/admin/portfolio" icon={Briefcase} label="포트폴리오관리" />
        <NavItem href="/admin/leads" icon={MailSearch} label="프로젝트문의" />
      </NavGroup>
      <NavGroup title="설정"><NavItem href="/admin/settings" icon={Settings} label="설정" /></NavGroup>
    </nav>
  )
}

function NavGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="px-3 text-xs font-medium text-muted-foreground">{title}</div>
      <div className="mt-2 flex flex-col gap-1">{children}</div>
    </div>
  )
}

function NavItem({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
  const [location] = useLocation()
  const active = location === href
  return (
    <Link href={href}>
      <a className={clsx('flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition', active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted')}>
        <Icon className="h-4 w-4" /> {label}
      </a>
    </Link>
  )
}

// ---------------------- 페이지 ----------------------
function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">대시보드</h1>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="gap-2"><BarChart3 className="h-4 w-4"/>내보내기</Button>
          <Button size="sm">새 보고서</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="월 매출" value="₩ 52,400,000" subtitle="+12.3% vs. 전월" />
        <StatCard title="신규 리드" value="184" subtitle="+8.1%" />
        <StatCard title="평균 CPA" value="₩ 18,700" subtitle="-5.2%" />
      </div>
      <Card>
        <CardHeader><CardTitle>퍼포먼스 추이 (최근 5주)</CardTitle></CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={kpiSeries} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopOpacity={0.25} />
                  <stop offset="100%" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="d" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" strokeWidth={2} fillOpacity={1} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
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

function BlogPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">블로그관리</h2>
        <div className="flex gap-2">
          <Input placeholder="제목/저자 검색" className="w-56" />
          <Button size="sm">새 글</Button>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>제목</TableHead>
                <TableHead>작성자</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map(p => (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell>{p.author}</TableCell>
                  <TableCell>
                    <Badge variant={p.status === 'published' ? 'default' : 'outline'}>{p.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">편집</Button>
                      <Button size="sm" variant="destructive">삭제</Button>
                    </div>
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

function PortfolioPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">포트폴리오관리</h2>
        <div className="flex gap-2">
          <Input placeholder="제목/태그 검색" className="w-56" />
          <Button size="sm">새 포트폴리오</Button>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>제목</TableHead>
                <TableHead>태그</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolios.map(p => (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell><Badge variant="secondary">{p.tag}</Badge></TableCell>
                  <TableCell>
                    <Badge variant={p.status === 'published' ? 'default' : 'outline'}>{p.status}</Badge>
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

function LeadsPage() {
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
                <TableHead>회사</TableHead>
                <TableHead>연락처</TableHead>
                <TableHead>메모</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map(l => (
                <TableRow key={l.id}>
                  <TableCell>{l.id}</TableCell>
                  <TableCell className="font-medium">{l.company}</TableCell>
                  <TableCell>{l.contact}</TableCell>
                  <TableCell className="max-w-[380px] truncate">{l.memo}</TableCell>
                  <TableCell><Badge variant={l.status === 'new' ? 'default' : 'secondary'}>{l.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
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

// ---------------------- 루트 컴포넌트 ----------------------
export default function AdminApp() {
  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin" component={DashboardPage} />
        <Route path="/admin/users" component={UsersPage} />
        <Route path="/admin/analytics" component={AnalyticsPage} />
        <Route path="/admin/blog" component={BlogPage} />
        <Route path="/admin/portfolio" component={PortfolioPage} />
        <Route path="/admin/leads" component={LeadsPage} />
        <Route path="/admin/settings" component={SettingsPage} />
      </Switch>
    </AdminLayout>
  )
}