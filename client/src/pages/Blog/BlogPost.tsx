import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { Skeleton } from '../../components/ui/skeleton';
import type { Blog } from '@shared/schema';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();

  const { data: blog, isLoading, error } = useQuery<Blog>({
    queryKey: [`/api/blogs/${slug}`],
    enabled: !!slug
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
    content: language === 'ko' ? blog.contentKo : blog.contentEn
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-16 lg:py-24">
          <div className="container max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-48 mb-8" />
            <Skeleton className="w-full h-64 rounded-xl mb-8" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SEO title="블로그 포스트를 찾을 수 없습니다 | 뷰리드AI" />
        <Header />
        <main className="py-16 lg:py-24">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-red-200">
              <i className="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">포스트를 찾을 수 없습니다</h1>
              <p className="text-gray-600 mb-6">요청하신 블로그 포스트가 존재하지 않거나 삭제되었습니다.</p>
              <a href="/blog" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                블로그 목록으로 돌아가기
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const content = getBlogContent(blog);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${content.title} | 뷰리드AI`}
        description={blog.excerptKo || blog.excerptEn || content.title}
        keywords="마케팅블로그, 퍼포먼스마케팅, 디지털마케팅"
        ogImage={blog.coverUrl}
      />
      <Header />

      <main className="py-16 lg:py-24">
        <div className="container max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <a href="/" className="hover:text-primary-600 transition-colors" data-testid="link-breadcrumb-home">
              홈
            </a>
            <i className="fas fa-chevron-right text-xs"></i>
            <a href="/blog" className="hover:text-primary-600 transition-colors" data-testid="link-breadcrumb-blog">
              블로그
            </a>
            <i className="fas fa-chevron-right text-xs"></i>
            <span className="text-gray-900 font-medium" data-testid="text-breadcrumb-current">
              {content.title.length > 30 ? `${content.title.substring(0, 30)}...` : content.title}
            </span>
          </nav>

          <article className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Featured Image */}
            {blog.coverUrl && (
              <img 
                src={blog.coverUrl}
                alt={content.title}
                className="w-full h-64 lg:h-80 object-cover"
                data-testid="img-blog-cover"
              />
            )}

            <div className="p-8 lg:p-12">
              {/* Meta Info */}
              <div className="flex items-center mb-6">
                <time className="text-primary-600 font-medium" data-testid="text-blog-date">
                  {formatDate(blog.createdAt)}
                </time>
                {blog.updatedAt !== blog.createdAt && (
                  <>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 text-sm">
                      업데이트: {blog.updatedAt ? formatDate(blog.updatedAt) : ''}
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight" data-testid="text-blog-title">
                {content.title}
              </h1>

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: content.content }}
                data-testid="content-blog-body"
              />

              {/* Social Share */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">이 글을 공유하세요</h3>
                <div className="flex space-x-4">
                  <button 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      const text = encodeURIComponent(content.title);
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
                    }}
                    data-testid="button-share-facebook"
                  >
                    <i className="fab fa-facebook mr-2"></i>
                    Facebook
                  </button>
                  <button 
                    className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors flex items-center"
                    onClick={() => {
                      const url = encodeURIComponent(window.location.href);
                      const text = encodeURIComponent(content.title);
                      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
                    }}
                    data-testid="button-share-twitter"
                  >
                    <i className="fab fa-twitter mr-2"></i>
                    Twitter
                  </button>
                  <button 
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      // Could show a toast notification here
                    }}
                    data-testid="button-copy-link"
                  >
                    <i className="fas fa-link mr-2"></i>
                    링크 복사
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Related Posts CTA */}
          <div className="mt-12 text-center">
            <a 
              href="/blog"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-block"
              data-testid="link-back-to-blog"
            >
              다른 포스트 보기
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
