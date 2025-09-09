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
    queryKey: ['/api/portfolios?published=true'],
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
    <div className="min-h-screen">
      <SEO 
        title={`${t.nav.portfolio} | 뷰리드AI`}
        description="뷰리드AI의 성공적인 퍼포먼스 마케팅 캠페인 사례들을 확인하세요"
        keywords="포트폴리오, 마케팅사례, 성공사례, ROAS, 퍼포먼스마케팅"
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
              {t.portfolio.title}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto" data-testid="text-page-subtitle">
              {t.portfolio.subtitle}
            </p>
          </div>

          {/* Stats Overview */}
          <section className="floating-card mb-16">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="stats-card">
                <div className="text-3xl font-bold text-white mb-2">200+</div>
                <div className="text-sm text-white/70">성공 프로젝트</div>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-white mb-2">487%</div>
                <div className="text-sm text-white/70">평균 ROAS</div>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-white mb-2">₩12.5B</div>
                <div className="text-sm text-white/70">누적 매출 기여</div>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-sm text-white/70">고객 만족도</div>
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
                  <article key={portfolio.id} className="service-card overflow-hidden hover:bg-white/10 transition-all duration-300">
                    {/* Thumbnail (항상 16:9) */}
                    <div className="relative">
                      <div className={`thumb-16x9 ${portfolio.thumbUrl ? '' : 'placeholder'}`}>
                        <img
                          src={/^https?:\/\//i.test(portfolio.thumbUrl||'') ? (portfolio.thumbUrl || "/og/placeholder-1200x675.jpg") : (portfolio.thumbUrl ? `${location.protocol}//${location.host}${portfolio.thumbUrl.startsWith('/')?portfolio.thumbUrl:'/'+portfolio.thumbUrl}` : "/og/placeholder-1200x675.jpg")}
                          alt={content.title || "portfolio thumbnail"}
                          loading="lazy"
                          onError={(e)=>{ (e.currentTarget as HTMLImageElement).src="/og/placeholder-1200x675.jpg"; }}
                          data-testid={`img-portfolio-thumb-${index}`}
                        />
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                          성공사례
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-3 hover:text-white/80 transition-colors" data-testid={`text-portfolio-title-${index}`}>
                        <Link href={`/portfolio/${portfolio.slug}`}>
                          {content.title}
                        </Link>
                      </h3>
                      
                      <p className="text-white/70 mb-6 leading-relaxed" data-testid={`text-portfolio-summary-${index}`}>
                        {content.summary.length > 120 
                          ? `${content.summary.substring(0, 120)}...` 
                          : content.summary
                        }
                      </p>

                      {/* Metrics */}
                      {metrics && (metrics.roas || metrics.conversion || metrics.cpa) && (
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {metrics.roas && (
                            <div className="text-center stats-card">
                              <div className="text-2xl font-bold text-white" data-testid={`text-portfolio-roas-${index}`}>
                                {metrics.roas}
                              </div>
                              <div className="text-xs text-white/70">ROAS</div>
                            </div>
                          )}
                          {metrics.conversion && (
                            <div className="text-center stats-card">
                              <div className="text-2xl font-bold text-white" data-testid={`text-portfolio-conversion-${index}`}>
                                {metrics.conversion}
                              </div>
                              <div className="text-xs text-white/70">전환율</div>
                            </div>
                          )}
                          {metrics.cpa && !metrics.conversion && (
                            <div className="text-center stats-card">
                              <div className="text-lg font-bold text-white" data-testid={`text-portfolio-cpa-${index}`}>
                                {metrics.cpa}
                              </div>
                              <div className="text-xs text-white/70">CPA</div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <Link 
                          href={`/portfolio/${portfolio.slug}`}
                          className="text-white font-medium hover:text-white/80 transition-colors inline-flex items-center"
                          data-testid={`link-portfolio-view-${index}`}
                        >
                          {t.portfolio.viewCase} 
                          <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </Link>
                        
                        <time className="text-sm text-white/70" data-testid={`text-portfolio-date-${index}`}>
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
            <section className="mt-20">
              <div className="floating-card text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  다음 성공사례의 주인공이 되세요
                </h2>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                  데이터 기반 퍼포먼스 마케팅으로 여러분의 비즈니스도 성장시켜보세요
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/inquiry"
                    className="modern-btn"
                    data-testid="button-contact-cta"
                  >
                    프로젝트 문의하기
                  </Link>
                  <Link 
                    href="/services"
                    className="modern-btn-outline"
                    data-testid="button-services-cta"
                  >
                    서비스 알아보기
                  </Link>
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
