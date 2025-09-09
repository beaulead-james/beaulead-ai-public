import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import ThumbnailUploader from '@/components/ThumbnailUploader';

export type PortfolioPayload = {
  titleKo: string; 
  titleEn: string;
  summaryKo: string; 
  summaryEn: string;
  slug?: string;
  thumbUrl?: string;
  images?: string[];
  published?: boolean;
}

function slugify(s: string) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

export default function PortfolioForm({ id }: { id?: string }) {
  const { toast } = useToast();
  const [payload, setPayload] = useState<PortfolioPayload>({
    titleKo: '', titleEn: '',
    summaryKo: '', summaryEn: '',
    slug: '', thumbUrl: '', images: [],
    published: false,
  });

  // 편집 모드: 기존 데이터 불러오기
  const { data: detail, isFetching } = useQuery({
    queryKey: ['/api/portfolios', id],
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`/api/portfolios/${id}`);
      if (!res.ok) throw new Error('Failed to fetch portfolio');
      return res.json();
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (detail?.id) {
      setPayload({
        titleKo: detail.titleKo ?? '',
        titleEn: detail.titleEn ?? '',
        summaryKo: detail.summaryKo ?? '',
        summaryEn: detail.summaryEn ?? '',
        slug: detail.slug ?? '',
        thumbUrl: detail.thumbUrl ?? '',
        images: detail.images ?? [],
        published: !!detail.published,
      });
    }
  }, [detail]);

  const saveMutation = useMutation({
    mutationFn: async (body: PortfolioPayload) => {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `/api/portfolios/${id}` : '/api/portfolios';
      const res = await apiRequest(method as any, url, body);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolios'] });
      toast({ title: '저장 완료', description: id ? '수정되었습니다.' : '작성되었습니다.' });
      if (!id) window.location.href = '/admin/portfolio';
    },
    onError: (e: any) => {
      toast({ title: '오류', description: e?.message ?? '저장 실패', variant: 'destructive' });
    }
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = { ...payload };
    if (!body.slug) body.slug = slugify(body.titleKo || body.titleEn);
    if (!body.titleKo || !body.titleEn) {
      return toast({ title: '필수값 누락', description: '국문/영문 제목을 입력하세요.', variant: 'destructive' });
    }
    saveMutation.mutate(body);
  }

  if (id && isFetching) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>제목(국문) *</Label>
          <Input 
            value={payload.titleKo} 
            onChange={e=>setPayload(p=>({...p,titleKo:e.target.value}))}
            placeholder="포트폴리오 제목을 입력하세요"
            required
          />
        </div>
        <div>
          <Label>제목(영문) *</Label>
          <Input 
            value={payload.titleEn} 
            onChange={e=>setPayload(p=>({...p,titleEn:e.target.value}))}
            placeholder="Enter portfolio title"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>요약(국문)</Label>
          <Textarea 
            rows={4} 
            value={payload.summaryKo} 
            onChange={e=>setPayload(p=>({...p,summaryKo:e.target.value}))}
            placeholder="포트폴리오 요약을 입력하세요"
          />
        </div>
        <div>
          <Label>요약(영문)</Label>
          <Textarea 
            rows={4} 
            value={payload.summaryEn} 
            onChange={e=>setPayload(p=>({...p,summaryEn:e.target.value}))}
            placeholder="Enter portfolio summary"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Label>슬러그</Label>
          <Input 
            placeholder="자동생성 (제목에서)" 
            value={payload.slug} 
            onChange={e=>setPayload(p=>({...p,slug:e.target.value}))}
          />
          <p className="text-sm text-muted-foreground mt-1">
            비워두면 제목에서 자동 생성됩니다
          </p>
        </div>
        <div className="flex items-end gap-3">
          <Switch 
            checked={!!payload.published} 
            onCheckedChange={(v:boolean)=>setPayload(p=>({...p,published:v}))}
          />
          <Label>공개</Label>
        </div>
      </div>
      
      <div>
        <Label>썸네일 이미지</Label>
        <div className="mt-2">
          <ThumbnailUploader 
            value={payload.thumbUrl} 
            onChange={(url)=>setPayload(p=>({...p, thumbUrl:url}))}
          />
        </div>
      </div>
      
      <div className="pt-4 border-t">
        <Button 
          type="submit" 
          disabled={saveMutation.isPending}
          className="w-full md:w-auto"
        >
          {saveMutation.isPending ? '저장 중...' : (id ? '수정 저장' : '작성 저장')}
        </Button>
      </div>
    </form>
  )
}