import { Link } from 'wouter';
import { useLanguage } from '../../contexts/LanguageContext';
import { useEffect, useState } from "react";

export default function Footer() {
  const { t } = useLanguage();
  const [buildId, setBuildId] = useState<string>("");

  useEffect(() => {
    fetch("/api/version")
      .then((r) => r.json())
      .then((j) => setBuildId(j.buildId || ""))
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4" data-testid="text-footer-company-name">
              {t.footer.company.name}
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed" data-testid="text-footer-company-description">
              {t.footer.company.description}
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors" 
                data-testid="link-social-linkedin"
              >
                <i className="fab fa-linkedin text-lg"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors" 
                data-testid="link-social-youtube"
              >
                <i className="fab fa-youtube text-lg"></i>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors" 
                data-testid="link-social-blog"
              >
                <i className="fas fa-rss text-lg"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4" data-testid="text-footer-services-title">
              {t.footer.services.title}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/google-ads" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-google-ads">
                  {t.footer.services.googleAds}
                </Link>
              </li>
              <li>
                <Link href="/services/naver-ads" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-naver-ads">
                  {t.footer.services.naverAds}
                </Link>
              </li>
              <li>
                <Link href="/services/meta-ads" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-meta-ads">
                  {t.footer.services.metaAds}
                </Link>
              </li>
              <li>
                <Link href="/services/kakao-ads" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-kakao-ads">
                  {t.footer.services.kakaoAds}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" data-testid="text-footer-company-title">
              {t.footer.company.title}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-about">
                  {t.footer.company.about}
                </Link>
              </li>
              <li>
                <Link href="/about/philosophy" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-philosophy">
                  {t.footer.company.philosophy}
                </Link>
              </li>
              <li>
                <Link href="/about/leadership" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-leadership">
                  {t.footer.company.leadership}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-careers">
                  {t.footer.company.careers}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" data-testid="text-footer-resources-title">
              {t.footer.resources.title}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-blog">
                  {t.footer.resources.blog}
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-portfolio">
                  {t.footer.resources.portfolio}
                </Link>
              </li>
              <li>
                <Link href="/inquiry" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-contact">
                  {t.footer.resources.contact}
                </Link>
              </li>
              <li>
                <Link href="/about/location" className="text-gray-300 hover:text-white transition-colors" data-testid="link-footer-location">
                  {t.footer.resources.location}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0" data-testid="text-footer-copyright">
              {t.footer.copyright}
              {buildId && buildId !== "unknown" && (
                <span className="ml-2 opacity-70">Build: {buildId}</span>
              )}
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-privacy">
                {t.footer.legal.privacy}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors" data-testid="link-footer-terms">
                {t.footer.legal.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
