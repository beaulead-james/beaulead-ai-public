import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { Skeleton } from '../../components/ui/skeleton';
import type { Portfolio } from '@shared/schema';

export default function PortfolioItem() {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();

  const { data: portfolio, isLoading, error } = useQuery<Portfolio>({
    queryKey: [`/api/portfolios/${slug}`],
    enabled: !!slug
  });

  const getPortfolioContent = (portfolio: Portfolio) => ({
    title: language === 'ko' ? portfolio.titleKo : portfolio.titleEn,
    summary: language === 'ko' ? portfolio.summaryKo : portfolio.summaryEn
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-16 lg:py-24">
          <div className="container max-w-6xl mx-auto">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-48 mb-8" />
            <Skeleton className="w-full h-96 rounded-xl mb-8" />
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
              <div className="space-y-4">
                <Skeleton className="h-32 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SEO title="포트폴리오를 찾을 수 없습니다 | 뷰리드AI" />
        <Header />
        <main className="py-16 lg:py-24">
          <div className="container max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-red-200">
              <i className="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">포트폴리오를 찾을 수 없습니다</h1>
              <p className="text-gray-600 mb-6">요청하신 포트폴리오가 존재하지 않거나 삭제되었습니다.</p>
              <Link 
                href="/portfolio"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                포트폴리오 목록으로 돌아가기
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const content = getPortfolioContent(portfolio);
  const images = portfolio.images as string[] || [];
  const metrics = portfolio.metrics as any || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${content.title} | 뷰리드AI`}
        description={content.summary}
        keywords="포트폴리오, 마케팅사례, 성공사례, ROAS"
        ogImage={portfolio.thumbUrl || undefined}
      />
      <Header />

      <main className="py-16 lg:py-24">
        <div className="container max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-primary-600 transition-colors" data-testid="link-breadcrumb-home">
              홈
            </Link>
            <i className="fas fa-chevron-right text-xs"></i>
            <Link href="/portfolio" className="hover:text-primary-600 transition-colors" data-testid="link-breadcrumb-portfolio">
              포트폴리오
            </Link>
            <i className="fas fa-chevron-right text-xs"></i>
            <span className="text-gray-900 font-medium" data-testid="text-breadcrumb-current">
              {content.title.length > 30 ? `${content.title.substring(0, 30)}...` : content.title}
            </span>
          </nav>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-8 lg:p-12 border-b border-gray-200">
              <div className="flex items-center mb-6">
                <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-4">
                  성공사례
                </span>
                <time className="text-gray-500" data-testid="text-portfolio-date">
                  {portfolio.createdAt ? new Date(portfolio.createdAt).getFullYear() : ''}
                </time>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight" data-testid="text-portfolio-title">
                {content.title}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed" data-testid="text-portfolio-summary">
                {content.summary}
              </p>
            </div>

            {/* Featured Image */}
            {portfolio.thumbUrl && (
              <div className="relative h-64 lg:h-96">
                <img 
                  src={portfolio.thumbUrl}
                  alt={content.title}
                  className="w-full h-full object-cover"
                  data-testid="img-portfolio-featured"
                />
              </div>
            )}

            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">프로젝트 상세</h2>
                    <div className="text-gray-700 leading-relaxed space-y-6">
                      <p>
                        이 프로젝트는 클라이언트의 구체적인 비즈니스 목표 달성을 위해 데이터 기반의 
                        전략적 접근을 통해 진행되었습니다. 철저한 시장 분석과 타겟 고객 분석을 바탕으로 
                        최적화된 마케팅 전략을 수립하고 실행했습니다.
                      </p>
                      <p>
                        다양한 플랫폼을 활용한 통합 마케팅 캠페인을 통해 브랜드 인지도 향상과 
                        동시에 실질적인 매출 증대를 달성했으며, 지속적인 최적화를 통해 
                        ROI를 극대화했습니다.
                      </p>
                    </div>

                    {/* Additional Images */}
                    {images.length > 0 && (
                      <div className="mt-12">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">프로젝트 스크린샷</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          {images.map((image, index) => (
                            <img 
                              key={index}
                              src={image}
                              alt={`${content.title} 스크린샷 ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg shadow-sm"
                              data-testid={`img-portfolio-gallery-${index}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar - Metrics */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-xl p-6 sticky top-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">주요 성과</h3>
                    
                    <div className="space-y-6">
                      {/* Key Metrics */}
                      {Object.entries(metrics).map(([key, value], index) => (
                        <div key={key} className="text-center">
                          <div className="text-3xl font-bold text-primary-600 mb-1" data-testid={`text-metric-value-${index}`}>
                            {value as string}
                          </div>
                          <div className="text-sm text-gray-600 uppercase tracking-wide" data-testid={`text-metric-label-${index}`}>
                            {key}
                          </div>
                        </div>
                      ))}

                      {/* Default metrics if none provided */}
                      {Object.keys(metrics).length === 0 && (
                        <>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-1">450%</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wide">ROAS</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-1">3.2%</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wide">전환율</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 mb-1">-35%</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wide">CPA 감소</div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-4">프로젝트 정보</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">기간:</span>
                          <span className="font-medium">3개월</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">플랫폼:</span>
                          <span className="font-medium">통합 캠페인</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">업종:</span>
                          <span className="font-medium">이커머스</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-primary-600 rounded-2xl p-8 lg:p-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                이런 성과를 원하시나요?
              </h2>
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                여러분의 비즈니스도 데이터 기반 마케팅으로 성장시켜보세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  data-testid="button-contact-cta"
                >
                  프로젝트 문의하기
                </Link>
                <Link 
                  href="/portfolio"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                  data-testid="button-portfolio-back"
                >
                  다른 사례 보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
