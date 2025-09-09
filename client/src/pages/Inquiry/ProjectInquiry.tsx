import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import SEO from "../../components/UI/SEO";

const GOALS = [
  "판매", "리드", "브랜딩", "특정 페이지 방문", 
  "Google SEO 실적 상승", "웹사이트 트래픽", "앱 다운로드"
];

const CAMPAIGNS = [
  "검색", "YouTube", "디스플레이", "실적최대화", 
  "디멘드젠", "리마케팅", "앱", "Google SEO 대행"
];

const METRICS = [
  "노출수/클릭수", "전환/CPA/ROAS", 
  "유튜브 조회수", "앱 다운로드"
];

const BUDGETS = [
  "500만원 이하", "500 ~ 1,000만원", "1,000 ~ 3,000만원", 
  "3,000 ~ 5,000만원", "5,000만원 초과"
];

export default function ProjectInquiry() {
  const { toast } = useToast();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [form, setForm] = useState<any>({
    goals: [], campaigns: [], metrics: [],
    budget: "", budgetCustom: "",
    period: "", domain: "", keywords: "", solution: "",
    email: "", name: "", phone: "", company: "",
    etc: ""
  });

  const toggleArr = (key: string, value: string) => {
    setForm((prev: any) => ({
      ...prev,
      [key]: (prev[key] || []).includes(value) 
        ? prev[key].filter((x: string) => x !== value)
        : [...(prev[key] || []), value]
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (loading) return;
    
    try {
      if (!agree) {
        toast({
          title: "동의 필요",
          description: "개인정보 수집·이용에 동의해주세요.",
          variant: "destructive"
        });
        return;
      }

      setLoading(true);
      const payload = { ...form, agree };
      
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "제출 실패");
      }

      setSent(true);
      toast({
        title: "문의 제출 완료",
        description: "담당자가 확인 후 연락드리겠습니다.",
      });
    } catch (err: any) {
      toast({
        title: "제출 실패",
        description: err?.message || "다시 시도해주세요.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen">
        <SEO 
          title="문의 접수 완료 | 뷰리드AI"
          description="프로젝트 문의가 성공적으로 접수되었습니다"
        />
        <Header />
        
        {/* Background Effects */}
        <div className="bg-orb">
          <div className="orb orb-a"></div>
          <div className="orb orb-b"></div>
        </div>

        <main className="relative z-10 pt-32 pb-20">
          <div className="container max-w-3xl mx-auto">
            <Card className="service-card">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">
                  문의가 접수되었습니다
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-center">
                <div className="contact-icon mb-6">
                  <svg className="w-16 h-16 text-green-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white/80 text-lg leading-relaxed">
                  담당자가 확인 후 24시간 내에 연락드리겠습니다.<br/>
                  감사합니다.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={() => window.location.href = "/"}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    홈으로
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.href = "/contact"}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    다른 문의
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title="프로젝트 문의 | 뷰리드AI"
        description="광고 캠페인 제안 요청 - 뷰리드AI와 함께 성공적인 퍼포먼스 마케팅을 시작하세요"
        keywords="프로젝트문의, 광고제안, 퍼포먼스마케팅, 광고대행"
      />
      <Header />
      
      {/* Background Effects */}
      <div className="bg-orb">
        <div className="orb orb-a"></div>
        <div className="orb orb-b"></div>
      </div>

      <main className="relative z-10 pt-32 pb-20">
        <div className="container max-w-4xl mx-auto">
          <Card className="service-card">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">
                프로젝트 문의 (광고 캠페인 제안 요청)
              </CardTitle>
              <p className="text-white/70 text-center mt-2">
                성공적인 퍼포먼스 마케팅을 위한 맞춤형 제안을 받아보세요
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-8" onSubmit={onSubmit}>
                {/* 1. 마케팅 목표 */}
                <section className="space-y-3">
                  <Label className="text-white text-lg">마케팅 목표</Label>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {GOALS.map(goal => (
                      <label key={goal} className="flex items-center gap-2 p-3 rounded-lg border border-white/20 hover:bg-white/5 transition-colors cursor-pointer">
                        <Checkbox 
                          checked={(form.goals || []).includes(goal)} 
                          onCheckedChange={() => toggleArr("goals", goal)}
                        />
                        <span className="text-white/90">{goal}</span>
                      </label>
                    ))}
                  </div>
                </section>

                {/* 2. 광고 캠페인 */}
                <section className="space-y-3">
                  <Label className="text-white text-lg">계획 중인 광고 캠페인</Label>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {CAMPAIGNS.map(campaign => (
                      <label key={campaign} className="flex items-center gap-2 p-3 rounded-lg border border-white/20 hover:bg-white/5 transition-colors cursor-pointer">
                        <Checkbox 
                          checked={(form.campaigns || []).includes(campaign)} 
                          onCheckedChange={() => toggleArr("campaigns", campaign)}
                        />
                        <span className="text-white/90">{campaign}</span>
                      </label>
                    ))}
                  </div>
                </section>

                {/* 3. 성과 지표 */}
                <section className="space-y-3">
                  <Label className="text-white text-lg">광고 성과 주요 고려사항</Label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {METRICS.map(metric => (
                      <label key={metric} className="flex items-center gap-2 p-3 rounded-lg border border-white/20 hover:bg-white/5 transition-colors cursor-pointer">
                        <Checkbox 
                          checked={(form.metrics || []).includes(metric)} 
                          onCheckedChange={() => toggleArr("metrics", metric)}
                        />
                        <span className="text-white/90">{metric}</span>
                      </label>
                    ))}
                  </div>
                </section>

                {/* 4. 예산 */}
                <section className="space-y-3">
                  <Label className="text-white text-lg">월 광고 예산</Label>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {BUDGETS.map(budget => (
                      <button 
                        type="button" 
                        key={budget}
                        className={`px-4 py-3 rounded-lg border transition-all ${
                          form.budget === budget
                            ? 'bg-white/20 border-white/40 text-white' 
                            : 'border-white/20 text-white/80 hover:bg-white/5'
                        }`}
                        onClick={() => setForm((p: any) => ({ ...p, budget }))}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                  <Input
                    placeholder="기타 예산 (예: 800만원 정확히)"
                    value={form.budgetCustom || ''}
                    onChange={e => setForm((p: any) => ({ ...p, budgetCustom: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  />
                </section>

                {/* 5. 기간, 도메인, 키워드 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <section className="space-y-3">
                    <Label className="text-white">광고 예정 기간</Label>
                    <Input
                      placeholder="예: 3개월, 6개월"
                      value={form.period || ''}
                      onChange={e => setForm((p: any) => ({ ...p, period: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    />
                  </section>
                  <section className="space-y-3">
                    <Label className="text-white">웹사이트 도메인</Label>
                    <Input
                      placeholder="https://example.com"
                      value={form.domain || ''}
                      onChange={e => setForm((p: any) => ({ ...p, domain: e.target.value }))}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    />
                  </section>
                </div>

                {/* 6. 키워드 */}
                <section className="space-y-3">
                  <Label className="text-white">주요 키워드 (선택)</Label>
                  <Textarea
                    placeholder="광고에 활용하고 싶은 키워드들을 입력해주세요"
                    value={form.keywords || ''}
                    onChange={e => setForm((p: any) => ({ ...p, keywords: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    rows={3}
                  />
                </section>

                {/* 7. 연락처 정보 */}
                <section className="space-y-4">
                  <Label className="text-white text-lg">연락처 정보</Label>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white/90">이름 *</Label>
                      <Input
                        required
                        value={form.name || ''}
                        onChange={e => setForm((p: any) => ({ ...p, name: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/90">회사명 *</Label>
                      <Input
                        required
                        value={form.company || ''}
                        onChange={e => setForm((p: any) => ({ ...p, company: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/90">이메일 *</Label>
                      <Input
                        type="email"
                        required
                        value={form.email || ''}
                        onChange={e => setForm((p: any) => ({ ...p, email: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/90">연락처 *</Label>
                      <Input
                        required
                        value={form.phone || ''}
                        onChange={e => setForm((p: any) => ({ ...p, phone: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white"
                      />
                    </div>
                  </div>
                </section>

                {/* 8. 기타 요청사항 */}
                <section className="space-y-3">
                  <Label className="text-white">기타 요청사항</Label>
                  <Textarea
                    placeholder="추가로 전달하고 싶은 내용이나 특별한 요구사항이 있다면 입력해주세요"
                    value={form.etc || ''}
                    onChange={e => setForm((p: any) => ({ ...p, etc: e.target.value }))}
                    className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    rows={4}
                  />
                </section>

                {/* 9. 개인정보 동의 */}
                <section className="space-y-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-white/20 bg-white/5">
                    <Checkbox 
                      checked={agree} 
                      onCheckedChange={(checked) => setAgree(checked === true)}
                      required
                    />
                    <div className="space-y-1">
                      <Label className="text-white cursor-pointer">
                        개인정보 수집·이용 동의 (필수)
                      </Label>
                      <p className="text-white/70 text-sm leading-relaxed">
                        입력하신 개인정보는 문의 처리 및 서비스 제안을 위해서만 사용되며, 
                        관련 법령에 따라 안전하게 관리됩니다.
                      </p>
                    </div>
                  </div>
                </section>

                {/* 제출 버튼 */}
                <div className="text-center pt-4">
                  <Button 
                    type="submit" 
                    disabled={loading || !agree}
                    className="w-full max-w-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all"
                  >
                    {loading ? "제출 중..." : "프로젝트 제안 요청하기"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}