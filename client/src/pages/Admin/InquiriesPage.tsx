import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { ProjectInquiry } from "@shared/schema";
import { Eye, Calendar, Building, Phone, Mail, ExternalLink } from "lucide-react";

const STATUS_LABELS = {
  NEW: { label: "신규", variant: "destructive" as const },
  IN_PROGRESS: { label: "진행중", variant: "default" as const },
  DONE: { label: "완료", variant: "secondary" as const }
};

export default function InquiriesPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedInquiry, setSelectedInquiry] = useState<ProjectInquiry | null>(null);

  const { data: inquiries = [], isLoading } = useQuery({
    queryKey: ['/api/inquiries'],
    queryFn: async () => {
      const response = await fetch('/api/inquiries');
      if (!response.ok) throw new Error('Failed to fetch inquiries');
      const data = await response.json();
      return data.items || [];
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await fetch(`/api/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Status update failed');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inquiries'] });
      toast({
        title: "상태 변경 완료",
        description: "문의 상태가 성공적으로 변경되었습니다."
      });
    },
    onError: () => {
      toast({
        title: "상태 변경 실패",
        description: "다시 시도해주세요.",
        variant: "destructive"
      });
    }
  });

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatArray = (arr: any) => {
    if (!arr || !Array.isArray(arr)) return '-';
    return arr.join(', ');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">프로젝트 문의 관리</h1>
          <p className="text-muted-foreground mt-1">
            총 {inquiries.length}건의 문의가 있습니다
          </p>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">아직 접수된 문의가 없습니다.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry: ProjectInquiry) => (
            <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Badge {...STATUS_LABELS[inquiry.status as keyof typeof STATUS_LABELS]}>
                        {STATUS_LABELS[inquiry.status as keyof typeof STATUS_LABELS]?.label}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(inquiry.createdAt?.toString() || null)}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{inquiry.name}</p>
                          <p className="text-sm text-muted-foreground">{inquiry.company}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm">{inquiry.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm">{inquiry.phone}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium">예산</p>
                        <p className="text-sm text-muted-foreground">
                          {inquiry.budget || inquiry.budgetCustom || '-'}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">목표:</span>
                        <span className="ml-2 text-muted-foreground">
                          {formatArray(inquiry.goals)}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">캠페인:</span>
                        <span className="ml-2 text-muted-foreground">
                          {formatArray(inquiry.campaigns)}
                        </span>
                      </div>
                    </div>

                    {inquiry.domain && (
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        <a 
                          href={inquiry.domain} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-brand-600 hover:underline"
                        >
                          {inquiry.domain}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Select
                      value={inquiry.status || "NEW"}
                      onValueChange={(status) => 
                        updateStatusMutation.mutate({ id: inquiry.id, status })
                      }
                      disabled={updateStatusMutation.isPending}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NEW">신규</SelectItem>
                        <SelectItem value="IN_PROGRESS">진행중</SelectItem>
                        <SelectItem value="DONE">완료</SelectItem>
                      </SelectContent>
                    </Select>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedInquiry(inquiry)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          상세보기
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>문의 상세정보</DialogTitle>
                        </DialogHeader>
                        {selectedInquiry && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-medium mb-2">연락처 정보</h3>
                                <div className="space-y-1 text-sm">
                                  <p><span className="font-medium">이름:</span> {selectedInquiry.name}</p>
                                  <p><span className="font-medium">회사:</span> {selectedInquiry.company}</p>
                                  <p><span className="font-medium">이메일:</span> {selectedInquiry.email}</p>
                                  <p><span className="font-medium">연락처:</span> {selectedInquiry.phone}</p>
                                </div>
                              </div>
                              <div>
                                <h3 className="font-medium mb-2">프로젝트 정보</h3>
                                <div className="space-y-1 text-sm">
                                  <p><span className="font-medium">예산:</span> {selectedInquiry.budget || selectedInquiry.budgetCustom || '-'}</p>
                                  <p><span className="font-medium">기간:</span> {selectedInquiry.period || '-'}</p>
                                  <p><span className="font-medium">도메인:</span> {selectedInquiry.domain || '-'}</p>
                                  <p><span className="font-medium">제안방식:</span> {selectedInquiry.solution || '-'}</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h3 className="font-medium mb-2">마케팅 목표</h3>
                              <p className="text-sm text-muted-foreground">
                                {formatArray(selectedInquiry.goals)}
                              </p>
                            </div>

                            <div>
                              <h3 className="font-medium mb-2">계획 중인 광고 캠페인</h3>
                              <p className="text-sm text-muted-foreground">
                                {formatArray(selectedInquiry.campaigns)}
                              </p>
                            </div>

                            <div>
                              <h3 className="font-medium mb-2">성과 지표</h3>
                              <p className="text-sm text-muted-foreground">
                                {formatArray(selectedInquiry.metrics)}
                              </p>
                            </div>

                            {selectedInquiry.keywords && (
                              <div>
                                <h3 className="font-medium mb-2">주요 키워드</h3>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                  {selectedInquiry.keywords}
                                </p>
                              </div>
                            )}

                            {selectedInquiry.etc && (
                              <div>
                                <h3 className="font-medium mb-2">기타 요청사항</h3>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                  {selectedInquiry.etc}
                                </p>
                              </div>
                            )}

                            <div className="pt-4 border-t text-xs text-muted-foreground">
                              <p>접수일시: {formatDate(selectedInquiry.createdAt?.toString() || null)}</p>
                              {selectedInquiry.updatedAt && selectedInquiry.updatedAt !== selectedInquiry.createdAt && (
                                <p>수정일시: {formatDate(selectedInquiry.updatedAt?.toString())}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}