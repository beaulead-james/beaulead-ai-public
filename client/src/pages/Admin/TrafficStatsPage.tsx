import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

function useSummary() {
  return useQuery({
    queryKey: ['/api/analytics/summary'],
    queryFn: async () => (await fetch('/api/analytics/summary')).json(),
  });
}
function useSeries() {
  return useQuery({
    queryKey: ['/api/analytics/timeseries'],
    queryFn: async () => (await fetch('/api/analytics/timeseries')).json(),
  });
}

export default function TrafficStatsPage() {
  const { data: sum } = useSummary();
  const { data: series } = useSeries();
  const totals = sum?.totals || { pageviews: 0, unique_visitors: 0 };
  const top = sum?.topPaths || [];
  const ts = series?.data || [];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card><CardHeader><CardTitle>Pageviews</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{totals.pageviews?.toLocaleString?.()||0}</CardContent></Card>
        <Card><CardHeader><CardTitle>Unique Visitors</CardTitle></CardHeader><CardContent className="text-3xl font-semibold">{totals.unique_visitors?.toLocaleString?.()||0}</CardContent></Card>
        <Card><CardHeader><CardTitle>기간</CardTitle></CardHeader><CardContent>{sum?.range ? `${new Date(sum.range.from).toLocaleDateString()} ~ ${new Date(sum.range.to).toLocaleDateString()}` : '-'}</CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>일자별 PV/UV</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="d" />
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