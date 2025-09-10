import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { Skeleton } from '../../components/ui/skeleton';
import type { Blog } from '@shared/schema';

export default function BlogList() {
  const { t, language } = useLanguage();

  const { data: blogs, isLoading, error } = useQuery<Blog[]>({
    queryKey: ['/api/blogs?published=true'],
  });

  const formatDate = (dateValue: Date | null | string) => {
    if (!dateValue) return '';
    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    return date.toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getBlogContent = (blog: Blog) => ({
    title: language === 'ko' ? blog.titleKo : blog.titleEn,
    excerpt: language === 'ko' ? blog.excerptKo || '' : blog.excerptEn || ''
  });

  return (
    <div className="min-h-screen">
      <SEO 
        title={`${t.nav.blog} | 뷰리드AI`}
        description="최신 마케팅 트렌드와 실무 노하우를 공유하는 뷰리드AI 블로그"
        keywords="마케팅블로그, 퍼포먼스마케팅, 디지털마케팅, SEO, 광고운영팁"
      />
      <Header />

      {/* Background Effects */}
      <div className="bg-orb">
        <div className="orb orb-a"></div>
        <div className="orb orb-b"></div>
      </div>

      <main className="relative z-10 pt-32 pb-20 lg:pb-32">
        <div className="container max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6" data-testid="text-page-title">
              {t.blog.title}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto" data-testid="text-page-subtitle">
              {t.blog.subtitle}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="service-card overflow-hidden">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-6 w-full mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <div className="floating-card">
                <div className="contact-icon mb-6">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">블로그 로딩 오류</h3>
                <p className="text-white/70">블로그 포스트를 불러오는 중 오류가 발생했습니다.</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {blogs && blogs.length === 0 && (
            <div className="text-center py-16">
              <div className="floating-card">
                <div className="contact-icon mb-6">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">아직 블로그 포스트가 없습니다</h3>
                <p className="text-white/70">곧 유익한 마케팅 인사이트를 공유해드릴 예정입니다.</p>
              </div>
            </div>
          )}

          {/* Blog Posts Grid */}
          {blogs && blogs.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => {
                const content = getBlogContent(blog);
                return (
                  <article key={blog.id} className="service-card overflow-hidden hover:bg-white/10 transition-all duration-300">
                    {blog.coverUrl && (
                      <img 
                        src={blog.coverUrl}
                        alt={content.title}
                        className="w-full h-48 object-cover"
                        data-testid={`img-blog-cover-${index}`}
                      />
                    )}
                    {!blog.coverUrl && (
                      <div className="w-full h-48 bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                        <div className="contact-icon">
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <time className="text-sm text-white/80 font-medium" data-testid={`text-blog-date-${index}`}>
                          {formatDate(blog.createdAt)}
                        </time>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3 hover:text-white/80 transition-colors" data-testid={`text-blog-title-${index}`}>
                        <Link href={`/blog/${blog.slug}`}>
                          {content.title}
                        </Link>
                      </h3>
                      {content.excerpt && (
                        <p className="text-white/70 mb-4 leading-relaxed" data-testid={`text-blog-excerpt-${index}`}>
                          {content.excerpt.length > 120 
                            ? `${content.excerpt.substring(0, 120)}...` 
                            : content.excerpt
                          }
                        </p>
                      )}
                      <Link 
                        href={`/blog/${blog.slug}`}
                        className="btn-brand inline-flex items-center"
                        data-testid={`link-blog-read-${index}`}
                      >
                        {t.blog.readMore} 
                        <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Newsletter Signup */}
          {blogs && blogs.length > 0 && (
            <section className="mt-20">
              <div className="floating-card text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  마케팅 인사이트를 놓치지 마세요
                </h2>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                  새로운 블로그 포스트와 마케팅 트렌드를 이메일로 받아보세요
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="이메일 주소" 
                    className="px-4 py-3 rounded-lg border-0 flex-1 bg-white/10 text-white placeholder-white/60 focus:ring-2 focus:ring-white/30 focus:outline-none"
                    data-testid="input-newsletter-email"
                  />
                  <button 
                    className="btn-brand whitespace-nowrap"
                    data-testid="button-newsletter-subscribe"
                  >
                    구독하기
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
