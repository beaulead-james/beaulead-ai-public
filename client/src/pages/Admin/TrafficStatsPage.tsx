import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

function useSummary(days:number) {
  return useQuery({
    queryKey: ['/api/analytics/summary', days],
    queryFn: async () => (await fetch(`/api/analytics/summary?days=${days}`)).json(),
  });
}
function useSeries(groupBy:'day'|'week'|'month', days:number) {
  return useQuery({
    queryKey: ['/api/analytics/timeseries', groupBy, days],
    queryFn: async () => (await fetch(`/api/analytics/timeseries?groupBy=${groupBy}&days=${days}`)).json(),
  });
}

export default function TrafficStatsPage() {
  const [tab, setTab] = useState<'month'|'week'|'day'>('week');
  const [days, setDays] = useState<number>(30);
  const { data: sum } = useSummary(days);
  const { data: series } = useSeries(tab, days);
  const totals = sum?.totals || { pageviews: 0, unique_visitors: 0 };
  const top = sum?.topPaths || [];
  const ts = series?.data || [];
  const titleMap = { month: '월간', week: '주간', day: '일간' } as const;

  return (
    <div className="p-6 space-y-6">
      {/* 헤더 컨트롤: 탭 + 기간 프리셋 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <Tabs value={tab} onValueChange={(v:any)=>setTab(v)}>
          <TabsList>
            <TabsTrigger value="month">월간</TabsTrigger>
            <TabsTrigger value="week">주간</TabsTrigger>
            <TabsTrigger value="day">일간</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-3">
          <Select value={String(days)} onValueChange={(v)=>setDays(parseInt(v,10))}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="기간"/></SelectTrigger>
            <SelectContent>
              <SelectItem value="7">최근 7일</SelectItem>
              <SelectItem value="30">최근 30일</SelectItem>
              <SelectItem value="90">최근 90일</SelectItem>
              <SelectItem value="180">최근 180일</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary" onClick={()=>window.location.reload()}>새로고침</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardHeader><CardTitle>Pageviews</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{totals.pageviews?.toLocaleString?.()||0}</CardContent></Card>
        <Card><CardHeader><CardTitle>Unique Visitors</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{totals.unique_visitors?.toLocaleString?.()||0}</CardContent></Card>
        <Card><CardHeader><CardTitle>기간</CardTitle></CardHeader><CardContent>{sum?.range ? `${new Date(sum.range.from).toLocaleDateString()} ~ ${new Date(sum.range.to).toLocaleDateString()}` : '-'}</CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>{titleMap[tab]} PV/UV</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bucket" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="pv" strokeWidth={2} />
                <Line type="monotone" dataKey="uv" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>인기 경로 Top 10</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="path" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pv" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {top.slice(0,10).map((r:any)=>(
              <Badge key={r.path} variant="secondary">{r.path} · {r.pv}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}