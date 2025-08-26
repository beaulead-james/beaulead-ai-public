import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '../../contexts/LanguageContext';
import SEO from '../../components/UI/SEO';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import { Skeleton } from '../../components/ui/skeleton';
import type { Portfolio } from '@shared/schema';

export default function PortfolioList() {
  const { t, language } = useLanguage();

  const { data: portfolios, isLoading, error } = useQuery<Portfolio[]>({
    queryKey: ['/api/portfolios', { published: true }],
  });

  const getPortfolioContent = (portfolio: Portfolio) => ({
    title: language === 'ko' ? portfolio.titleKo : portfolio.titleEn,
    summary: language === 'ko' ? portfolio.summaryKo : portfolio.summaryEn
  });

  const getMetricDisplay = (metrics: any) => {
    if (!metrics) return null;
    
    // Extract key metrics for display
    const roas = metrics.roas || metrics.ROAS;
    const conversion = metrics.conversion || metrics.전환율;
    const cpa = metrics.cpa || metrics.CPA;
    
    return { roas, conversion, cpa };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${t.nav.portfolio} | 뷰리드AI`}
        description="뷰리드AI의 성공적인 퍼포먼스 마케팅 캠페인 사례들을 확인하세요"
        keywords="포트폴리오, 마케팅사례, 성공사례, ROAS, 퍼포먼스마케팅"
      />
      <Header />

      <main className="py-16 lg:py-24">
        <div className="container max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6" data-testid="text-page-title">
              {t.portfolio.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="text-page-subtitle">
              {t.portfolio.subtitle}
            </p>
          </div>

          {/* Stats Overview */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-16">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">200+</div>
                <div className="text-sm text-gray-600">성공 프로젝트</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">487%</div>
                <div className="text-sm text-gray-600">평균 ROAS</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">₩12.5B</div>
                <div className="text-sm text-gray-600">누적 매출 기여</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">고객 만족도</div>
              </div>
            </div>
          </section>

          {/* Loading State */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <Skeleton className="w-full h-64" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-6 w-full mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-6" />
                    <div className="flex justify-between">
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
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
                <h3 className="text-xl font-semibold text-gray-900 mb-2">포트폴리오 로딩 오류</h3>
                <p className="text-gray-600">포트폴리오를 불러오는 중 오류가 발생했습니다.</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {portfolios && portfolios.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <i className="fas fa-briefcase text-gray-400 text-6xl mb-6"></i>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">아직 포트폴리오가 없습니다</h3>
                <p className="text-gray-600">곧 성공적인 마케팅 캠페인 사례들을 공유해드릴 예정입니다.</p>
              </div>
            </div>
          )}

          {/* Portfolio Grid */}
          {portfolios && portfolios.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolios.map((portfolio, index) => {
                const content = getPortfolioContent(portfolio);
                const metrics = getMetricDisplay(portfolio.metrics);
                
                return (
                  <article key={portfolio.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {/* Thumbnail */}
                    <div className="relative">
                      {portfolio.thumbUrl ? (
                        <img 
                          src={portfolio.thumbUrl}
                          alt={content.title}
                          className="w-full h-64 object-cover"
                          data-testid={`img-portfolio-thumb-${index}`}
                        />
                      ) : (
                        <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-blue-100 flex items-center justify-center">
                          <i className="fas fa-chart-line text-primary-600 text-4xl"></i>
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          성공사례
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary-600 transition-colors" data-testid={`text-portfolio-title-${index}`}>
                        <Link href={`/portfolio/${portfolio.slug}`}>
                          {content.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed" data-testid={`text-portfolio-summary-${index}`}>
                        {content.summary.length > 120 
                          ? `${content.summary.substring(0, 120)}...` 
                          : content.summary
                        }
                      </p>

                      {/* Metrics */}
                      {metrics && (metrics.roas || metrics.conversion || metrics.cpa) && (
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {metrics.roas && (
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600" data-testid={`text-portfolio-roas-${index}`}>
                                {metrics.roas}
                              </div>
                              <div className="text-xs text-gray-500">ROAS</div>
                            </div>
                          )}
                          {metrics.conversion && (
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600" data-testid={`text-portfolio-conversion-${index}`}>
                                {metrics.conversion}
                              </div>
                              <div className="text-xs text-gray-500">전환율</div>
                            </div>
                          )}
                          {metrics.cpa && !metrics.conversion && (
                            <div className="text-center">
                              <div className="text-lg font-bold text-orange-600" data-testid={`text-portfolio-cpa-${index}`}>
                                {metrics.cpa}
                              </div>
                              <div className="text-xs text-gray-500">CPA</div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <Link 
                          href={`/portfolio/${portfolio.slug}`}
                          className="text-primary-600 font-medium hover:text-primary-700 transition-colors inline-flex items-center"
                          data-testid={`link-portfolio-view-${index}`}
                        >
                          {t.portfolio.viewCase} <i className="fas fa-arrow-right ml-1 text-sm"></i>
                        </Link>
                        
                        <time className="text-sm text-gray-500" data-testid={`text-portfolio-date-${index}`}>
                          {portfolio.createdAt ? new Date(portfolio.createdAt).getFullYear() : ''}
                        </time>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* CTA Section */}
          {portfolios && portfolios.length > 0 && (
            <section className="mt-20 bg-primary-600 rounded-2xl p-8 lg:p-12 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                다음 성공사례의 주인공이 되세요
              </h2>
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                데이터 기반 퍼포먼스 마케팅으로 여러분의 비즈니스도 성장시켜보세요
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
                  href="/services"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                  data-testid="button-services-cta"
                >
                  서비스 알아보기
                </Link>
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
