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
      <div className="min-h-screen relative overflow-hidden" style={{backgroundColor: '#000000'}}>
        {/* Background orbs */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black"></div>
        <div className="orb orb-a"></div>
        <div className="orb orb-b"></div>
        
        <Header />
        <main className="py-16 lg:py-24 relative z-10">
          <div className="container max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <Skeleton className="h-8 w-32 mb-6 bg-white/10" />
              <Skeleton className="h-12 w-full mb-4 bg-white/10" />
              <Skeleton className="h-6 w-48 mb-8 bg-white/10" />
              <Skeleton className="w-full h-64 rounded-xl mb-8 bg-white/10" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full bg-white/10" />
                <Skeleton className="h-4 w-full bg-white/10" />
                <Skeleton className="h-4 w-3/4 bg-white/10" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen relative overflow-hidden" style={{backgroundColor: '#000000'}}>
        {/* Background orbs */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black"></div>
        <div className="orb orb-a"></div>
        <div className="orb orb-b"></div>
        
        <SEO title="블로그 포스트를 찾을 수 없습니다 | 뷰리드AI" />
        <Header />
        <main className="py-16 lg:py-24 relative z-10">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="service-card">
              <i className="fas fa-exclamation-triangle text-red-400 text-4xl mb-4"></i>
              <h1 className="text-2xl font-bold text-white mb-2">포스트를 찾을 수 없습니다</h1>
              <p className="text-white/70 mb-6">요청하신 블로그 포스트가 존재하지 않거나 삭제되었습니다.</p>
              <a href="/blog" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
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
    <div className="min-h-screen relative overflow-hidden" style={{backgroundColor: '#000000'}}>
      {/* Background orbs */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black"></div>
      <div className="orb orb-a"></div>
      <div className="orb orb-b"></div>
      
      <SEO 
        title={`${content.title} | 뷰리드AI`}
        description={blog.excerptKo || blog.excerptEn || content.title || ""}
        keywords="마케팅블로그, 퍼포먼스마케팅, 디지털마케팅"
        ogImage={blog.coverUrl || undefined}
      />
      <Header />

      <main className="py-16 lg:py-24 relative z-10">
        <div className="container max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-white/60 mb-8">
            <a href="/" className="hover:text-purple-400 transition-colors" data-testid="link-breadcrumb-home">
              홈
            </a>
            <i className="fas fa-chevron-right text-xs"></i>
            <a href="/blog" className="hover:text-purple-400 transition-colors" data-testid="link-breadcrumb-blog">
              블로그
            </a>
            <i className="fas fa-chevron-right text-xs"></i>
            <span className="text-white font-medium" data-testid="text-breadcrumb-current">
              {content.title.length > 30 ? `${content.title.substring(0, 30)}...` : content.title}
            </span>
          </nav>

          <article className="service-card overflow-hidden" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
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
                <time className="text-purple-400 font-medium" data-testid="text-blog-date">
                  {formatDate(blog.createdAt)}
                </time>
                {blog.updatedAt !== blog.createdAt && (
                  <>
                    <span className="mx-2 text-white/40">•</span>
                    <span className="text-white/60 text-sm">
                      업데이트: {blog.updatedAt ? formatDate(blog.updatedAt) : ''}
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight" data-testid="text-blog-title">
                {content.title}
              </h1>

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-white/80 prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-ul:text-white/80 prose-ol:text-white/80 prose-li:text-white/80 prose-blockquote:text-white/70 prose-blockquote:border-purple-400"
                dangerouslySetInnerHTML={{ __html: content.content }}
                data-testid="content-blog-body"
              />

              {/* Social Share */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <h3 className="text-lg font-semibold text-white mb-4">이 글을 공유하세요</h3>
                <div className="flex flex-wrap gap-3">
                  <button 
                    className="bg-blue-600/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-blue-700/80 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl"
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
                    className="bg-blue-400/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-blue-500/80 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl"
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
                    className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl border border-white/20"
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
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl inline-block"
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
