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
    queryKey: ['/api/blogs', { published: true }],
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
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${t.nav.blog} | 뷰리드AI`}
        description="최신 마케팅 트렌드와 실무 노하우를 공유하는 뷰리드AI 블로그"
        keywords="마케팅블로그, 퍼포먼스마케팅, 디지털마케팅, SEO, 광고운영팁"
      />
      <Header />

      <main className="py-16 lg:py-24">
        <div className="container max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" data-testid="text-page-title">
              {t.blog.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-page-subtitle">
              {t.blog.subtitle}
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
              <div className="bg-white rounded-xl p-8 shadow-sm border border-red-200">
                <i className="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">블로그 로딩 오류</h3>
                <p className="text-gray-600">블로그 포스트를 불러오는 중 오류가 발생했습니다.</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {blogs && blogs.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <i className="fas fa-blog text-gray-400 text-6xl mb-6"></i>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">아직 블로그 포스트가 없습니다</h3>
                <p className="text-gray-600">곧 유익한 마케팅 인사이트를 공유해드릴 예정입니다.</p>
              </div>
            </div>
          )}

          {/* Blog Posts Grid */}
          {blogs && blogs.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => {
                const content = getBlogContent(blog);
                return (
                  <article key={blog.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {blog.coverUrl && (
                      <img 
                        src={blog.coverUrl}
                        alt={content.title}
                        className="w-full h-48 object-cover"
                        data-testid={`img-blog-cover-${index}`}
                      />
                    )}
                    {!blog.coverUrl && (
                      <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-blue-100 flex items-center justify-center">
                        <i className="fas fa-blog text-primary-600 text-3xl"></i>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <time className="text-sm text-primary-600 font-medium" data-testid={`text-blog-date-${index}`}>
                          {formatDate(blog.createdAt)}
                        </time>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary-600 transition-colors" data-testid={`text-blog-title-${index}`}>
                        <Link href={`/blog/${blog.slug}`}>
                          {content.title}
                        </Link>
                      </h3>
                      {content.excerpt && (
                        <p className="text-gray-600 mb-4 leading-relaxed" data-testid={`text-blog-excerpt-${index}`}>
                          {content.excerpt.length > 120 
                            ? `${content.excerpt.substring(0, 120)}...` 
                            : content.excerpt
                          }
                        </p>
                      )}
                      <Link 
                        href={`/blog/${blog.slug}`}
                        className="text-primary-600 font-medium hover:text-primary-700 transition-colors inline-flex items-center"
                        data-testid={`link-blog-read-${index}`}
                      >
                        {t.blog.readMore} <i className="fas fa-arrow-right ml-1 text-sm"></i>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Newsletter Signup */}
          {blogs && blogs.length > 0 && (
            <section className="mt-20 bg-primary-600 rounded-2xl p-8 lg:p-12 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                마케팅 인사이트를 놓치지 마세요
              </h2>
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                새로운 블로그 포스트와 마케팅 트렌드를 이메일로 받아보세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="이메일 주소" 
                  className="px-4 py-3 rounded-lg border-0 flex-1 focus:ring-2 focus:ring-primary-200 focus:outline-none"
                  data-testid="input-newsletter-email"
                />
                <button 
                  className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors whitespace-nowrap"
                  data-testid="button-newsletter-subscribe"
                >
                  구독하기
                </button>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
