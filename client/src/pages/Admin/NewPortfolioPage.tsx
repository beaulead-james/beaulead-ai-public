import React from 'react';
import PortfolioForm from '@/components/PortfolioForm';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function NewPortfolioPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/portfolio">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            뒤로가기
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">새 포트폴리오 작성</h1>
          <p className="text-muted-foreground">새로운 포트폴리오를 작성하세요</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>포트폴리오 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <PortfolioForm />
        </CardContent>
      </Card>
    </div>
  )
}