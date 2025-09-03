import React, { useState, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useLocation } from 'wouter'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
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
import { ArrowLeft, Save, ImageIcon } from 'lucide-react'

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

interface WixStyleBlogEditorProps {
  mode: 'new' | 'edit'
  blogId?: string
  initialData?: any
}

export function WixStyleBlogEditor({ mode, blogId, initialData }: WixStyleBlogEditorProps) {
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

  // 이미지 업로드 핸들러
  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('image', file)
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })
      
      if (!response.ok) {
        throw new Error('Upload failed')
      }
      
      const result = await response.json()
      return result.imageUrl
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: "이미지 업로드 실패",
        description: "이미지 업로드 중 오류가 발생했습니다.",
        variant: "destructive"
      })
      throw error
    }
  }, [toast])

  // React Quill 설정
  const quillModules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: () => {
          const input = document.createElement('input')
          input.setAttribute('type', 'file')
          input.setAttribute('accept', 'image/*')
          input.click()

          input.onchange = async () => {
            const file = input.files?.[0]
            if (file) {
              try {
                const imageUrl = await handleImageUpload(file)
                // 현재 활성화된 에디터를 찾아서 이미지 삽입
                const quill = (window as any).activeQuill
                if (quill) {
                  const range = quill.getSelection()
                  quill.insertEmbed(range?.index || 0, 'image', imageUrl)
                }
              } catch (error) {
                // 에러는 handleImageUpload에서 처리됨
              }
            }
          }
        }
      }
    },
  }

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'color', 'background',
    'align',
    'code-block'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setLocation('/admin/blog')}
              data-testid="button-back-blog"
              className="text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              블로그 관리로 돌아가기
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-slate-800">
            {mode === 'new' ? '새 블로그 포스트 작성' : '블로그 포스트 수정'}
          </h1>
          <div className="w-32" /> {/* Spacer for center alignment */}
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* 제목 섹션 */}
            <Card className="shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                <CardTitle className="flex items-center gap-2">
                  ✍️ 기본 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="titleKo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-medium">제목 (한국어)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="한국어 제목을 입력하세요" 
                            {...field} 
                            data-testid="input-title-ko"
                            className="text-lg p-4 border-2 focus:border-blue-400 transition-colors"
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
                        <FormLabel className="text-lg font-medium">제목 (영어)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter English title" 
                            {...field} 
                            data-testid="input-title-en"
                            className="text-lg p-4 border-2 focus:border-blue-400 transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <FormField
                    control={form.control}
                    name="excerptKo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-medium">요약 (한국어)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="한국어 요약을 입력하세요" 
                            {...field} 
                            data-testid="textarea-excerpt-ko"
                            className="resize-none border-2 focus:border-blue-400 transition-colors"
                            rows={3}
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
                        <FormLabel className="text-lg font-medium">요약 (영어)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter English excerpt" 
                            {...field} 
                            data-testid="textarea-excerpt-en"
                            className="resize-none border-2 focus:border-blue-400 transition-colors"
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* 본문 내용 - Wix 스타일 에디터 */}
            <Card className="shadow-md">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
                <CardTitle className="flex items-center gap-2">
                  📝 본문 내용 (리치 에디터)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="contentKo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-medium">본문 (한국어)</FormLabel>
                        <FormControl>
                          <div className="border-2 rounded-lg focus-within:border-blue-400 transition-colors">
                            <Controller
                              control={form.control}
                              name="contentKo"
                              render={({ field: { onChange, value } }) => (
                                <ReactQuill
                                  theme="snow"
                                  value={value}
                                  onChange={(content) => {
                                    onChange(content)
                                    // 활성 에디터 설정 (이미지 업로드용)
                                    ;(window as any).activeQuill = (window as any).Quill?.find?.('.ql-editor')
                                  }}
                                  modules={quillModules}
                                  formats={quillFormats}
                                  placeholder="한국어 본문을 입력하세요. 이미지 아이콘을 클릭해서 이미지를 추가할 수 있습니다."
                                  style={{ minHeight: '300px' }}
                                  data-testid="editor-content-ko"
                                />
                              )}
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
                        <FormLabel className="text-lg font-medium">본문 (영어)</FormLabel>
                        <FormControl>
                          <div className="border-2 rounded-lg focus-within:border-blue-400 transition-colors">
                            <Controller
                              control={form.control}
                              name="contentEn"
                              render={({ field: { onChange, value } }) => (
                                <ReactQuill
                                  theme="snow"
                                  value={value}
                                  onChange={(content) => {
                                    onChange(content)
                                    // 활성 에디터 설정 (이미지 업로드용)
                                    ;(window as any).activeQuill = (window as any).Quill?.find?.('.ql-editor')
                                  }}
                                  modules={quillModules}
                                  formats={quillFormats}
                                  placeholder="Enter English content. Click the image icon to add images."
                                  style={{ minHeight: '300px' }}
                                  data-testid="editor-content-en"
                                />
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* SEO 설정 */}
            <Card className="shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="flex items-center gap-2">
                  🚀 SEO 설정
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">메타 제목</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="SEO를 위한 메타 제목" 
                          {...field} 
                          data-testid="input-meta-title"
                          className="border-2 focus:border-purple-400 transition-colors"
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
                      <FormLabel className="text-lg font-medium">메타 설명</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="SEO를 위한 메타 설명" 
                          {...field} 
                          data-testid="textarea-meta-description"
                          className="resize-none border-2 focus:border-purple-400 transition-colors"
                          rows={3}
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
                      <FormLabel className="text-lg font-medium">메타 키워드</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="키워드1, 키워드2, 키워드3" 
                          {...field} 
                          data-testid="input-meta-keywords"
                          className="border-2 focus:border-purple-400 transition-colors"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* 발행 설정 */}
            <Card className="shadow-md">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="flex items-center gap-2">
                  🎯 발행 설정
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-medium">상태</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-status" className="border-2 focus:border-orange-400 transition-colors">
                            <SelectValue placeholder="발행 상태를 선택하세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DRAFT">📝 초안</SelectItem>
                          <SelectItem value="PUBLISHED">🚀 발행</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* 액션 버튼들 */}
            <div className="flex gap-4 justify-end bg-white p-6 rounded-lg shadow-sm">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setLocation('/admin/blog')}
                data-testid="button-cancel"
                className="px-8 py-3 border-2"
              >
                취소
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                data-testid="button-save-blog"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? '저장 중...' : (mode === 'new' ? '포스트 작성' : '변경사항 저장')}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}