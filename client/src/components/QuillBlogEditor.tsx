import React, { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useLocation } from 'wouter'
import { useQuery } from '@tanstack/react-query'
import AdminRichTextEditor from './AdminRichTextEditor'
import {
  Card, CardHeader, CardTitle, CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { apiRequest, queryClient } from '@/lib/queryClient'
// ObjectStorageService import 제거 - 클라이언트에서 직접 사용하지 않음
import { ArrowLeft, Save } from 'lucide-react'

const blogFormSchema = z.object({
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
})

interface QuillBlogEditorProps {
  mode: 'new' | 'edit'
  blogId?: string
  initialData?: any
}

export function QuillBlogEditor({ mode, blogId, initialData }: QuillBlogEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [, setLocation] = useLocation()
  
  // 기존 블로그 데이터 로드 (편집 모드일 때)
  const { data: existingBlog, isLoading: isBlogLoading } = useQuery({
    queryKey: ['/api/blogs/id', blogId],
    queryFn: async () => {
      if (!blogId) return null;
      const response = await apiRequest('GET', `/api/blogs/id/${blogId}`);
      return await response.json();
    },
    enabled: mode === 'edit' && !!blogId,
  });

  const form = useForm<any>({
    resolver: zodResolver(blogFormSchema),
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

  // 기존 블로그 데이터가 로드되면 폼에 설정
  useEffect(() => {
    if (existingBlog && mode === 'edit') {
      form.reset({
        titleKo: existingBlog.titleKo || "",
        titleEn: existingBlog.titleEn || "",
        excerptKo: existingBlog.excerptKo || "",
        excerptEn: existingBlog.excerptEn || "",
        contentKo: existingBlog.contentKo || "",
        contentEn: existingBlog.contentEn || "",
        categoryId: existingBlog.categoryId || "",
        tags: existingBlog.tags || [],
        metaTitle: existingBlog.metaTitle || "",
        metaDescription: existingBlog.metaDescription || "",
        metaKeywords: existingBlog.metaKeywords || "",
        status: existingBlog.status || "DRAFT",
      });
    }
  }, [existingBlog, mode, form]);


  
  const handleSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      if (mode === 'new') {
        await apiRequest('POST', '/api/blogs', {
          ...data,
          slug: data.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          categoryId: null, // 카테고리 없이 저장
        })
        toast({
          title: "블로그 포스트 작성 완료",
          description: "새로운 블로그 포스트가 성공적으로 작성되었습니다.",
        })
      } else {
        await apiRequest('PUT', `/api/blogs/${blogId}`, {
          ...data,
          slug: data.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        })
        toast({
          title: "블로그 포스트 수정 완료",
          description: "블로그 포스트가 성공적으로 수정되었습니다.",
        })
      }
      
      // 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['/api/blogs'] })
      setLocation('/admin/blog')
    } catch (error) {
      console.error('Error saving blog:', error)
      toast({
        title: "오류 발생",
        description: "블로그 포스트 저장 중 오류가 발생했습니다.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // 편집 모드에서 데이터 로딩 중이면 로딩 표시
  if (mode === 'edit' && isBlogLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">블로그 데이터를 불러오는 중...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/admin/blog')}
            data-testid="button-back-blog"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            블로그 관리로 돌아가기
          </Button>
        </div>
        <h1 className="text-2xl font-bold">
          {mode === 'new' ? '새 블로그 포스트 작성' : '블로그 포스트 수정'}
        </h1>
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
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="contentKo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>본문 (한국어)</FormLabel>
                    <FormControl>
                      <div className="rounded-xl bg-white text-slate-900 p-2 dark:bg-slate-900 dark:text-slate-100">
                        <AdminRichTextEditor 
                          value={field.value} 
                          onChange={field.onChange}
                          placeholder="한국어 본문을 입력하세요..."
                        />
                      </div>
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
                      <div className="rounded-xl bg-white text-slate-900 p-2 dark:bg-slate-900 dark:text-slate-100">
                        <AdminRichTextEditor 
                          value={field.value} 
                          onChange={field.onChange}
                          placeholder="Enter English content..."
                        />
                      </div>
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
                        placeholder="SEO를 위한 메타 설명" 
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
                        placeholder="키워드1, 키워드2, 키워드3" 
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
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>상태</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-status">
                          <SelectValue placeholder="발행 상태를 선택하세요" />
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

          <div className="flex gap-2 justify-end">
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
              data-testid="button-save-blog"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? '저장 중...' : (mode === 'new' ? '포스트 작성' : '변경사항 저장')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}