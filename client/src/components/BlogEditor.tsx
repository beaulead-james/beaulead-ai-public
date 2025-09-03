import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useLocation } from 'wouter'
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
import { ObjectUploader } from '@/components/ObjectUploader'
import { ImageIcon, ArrowLeft, Save } from 'lucide-react'

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

interface BlogEditorProps {
  mode: 'new' | 'edit'
  blogId?: string
  initialData?: any
}

export function BlogEditor({ mode, blogId, initialData }: BlogEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [, setLocation] = useLocation()
  
  const form = useForm<any>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: initialData || {
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
      if (mode === 'new') {
        await apiRequest('POST', '/api/blogs', {
          ...data,
          slug: data.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
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

  const handleImageUpload = (field: any, language: 'ko' | 'en') => {
    return {
      onGetUploadParameters: async () => {
        const response = await apiRequest('POST', '/api/objects/upload')
        return {
          method: 'PUT' as const,
          url: response.uploadURL
        }
      },
      onComplete: (result: any) => {
        if (result.successful && result.successful.length > 0) {
          const uploadedFile = result.successful[0]
          const imageUrl = uploadedFile.uploadURL?.split('?')[0] || ''
          const imageMarkdown = language === 'ko' 
            ? `\n![이미지](${imageUrl})\n`
            : `\n![Image](${imageUrl})\n`
          field.onChange(field.value + imageMarkdown)
          toast({
            title: language === 'ko' ? "이미지 업로드 성공" : "Image upload successful",
            description: language === 'ko' ? "이미지가 본문에 추가되었습니다." : "Image has been added to the content.",
          })
        }
      }
    }
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
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="contentKo"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>본문 (한국어)</FormLabel>
                      <ObjectUploader
                        maxNumberOfFiles={5}
                        onGetUploadParameters={handleImageUpload(field, 'ko').onGetUploadParameters}
                        onComplete={handleImageUpload(field, 'ko').onComplete}
                        buttonClassName="h-8 px-3 text-xs"
                      >
                        <ImageIcon className="h-4 w-4 mr-1" />
                        이미지 추가
                      </ObjectUploader>
                    </div>
                    <FormControl>
                      <Textarea 
                        placeholder="한국어 본문을 입력하세요. 이미지를 추가하려면 위의 '이미지 추가' 버튼을 사용하세요." 
                        className="min-h-[300px]"
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
                    <div className="flex items-center justify-between">
                      <FormLabel>본문 (영어)</FormLabel>
                      <ObjectUploader
                        maxNumberOfFiles={5}
                        onGetUploadParameters={handleImageUpload(field, 'en').onGetUploadParameters}
                        onComplete={handleImageUpload(field, 'en').onComplete}
                        buttonClassName="h-8 px-3 text-xs"
                      >
                        <ImageIcon className="h-4 w-4 mr-1" />
                        Add Image
                      </ObjectUploader>
                    </div>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter English content. Use the 'Add Image' button above to insert images." 
                        className="min-h-[300px]"
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