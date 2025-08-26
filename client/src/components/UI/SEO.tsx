import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export default function SEO({
  title = '뷰리드AI | 퍼포먼스마케팅 · SEO · 자동화 솔루션',
  description = '구글 광고, 네이버 광고, 메타 광고, 카카오 광고 전문 에이전시. 데이터 기반 퍼포먼스 마케팅으로 매출을 극대화하세요.',
  keywords = '뷰리드AI, 퍼포먼스마케팅, SEO, 구글광고, 네이버광고, 메타광고, 카카오광고',
  ogImage = '/og-default.jpg'
}: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
  }, [title, description, keywords, ogImage]);

  return null;
}
