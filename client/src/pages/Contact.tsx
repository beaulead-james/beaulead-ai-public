import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/UI/SEO';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ContactForm from '../components/Forms/ContactForm';
import '../styles/hero.css';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background orbs */}
      <div className="bg-orb">
        <div className="orb orb-a"></div>
        <div className="orb orb-b"></div>
      </div>
      
      <SEO 
        title={`${t.contact.title} | 뷰리드AI`}
        description={t.contact.subtitle}
        keywords="프로젝트문의, 무료컨설팅, 마케팅문의, 뷰리드AI"
      />
      <Header />

      <main className="py-20 lg:py-32 relative z-10">
        <div className="container max-w-7xl mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h1 className="hero-title text-4xl lg:text-6xl font-black mb-6" data-testid="text-page-title">
                {t.contact.title}
              </h1>
              <p className="text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed" data-testid="text-page-subtitle">
                {t.contact.subtitle}
              </p>
            </div>

            <ContactForm />

            {/* Contact info */}
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              <div className="contact-card animate-fade-in-up">
                <div className="contact-icon">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-white text-xl mb-3" data-testid="text-contact-phone-title">
                  {t.contact.phone.title}
                </h4>
                <p className="text-white/90 text-lg mb-2" data-testid="text-contact-phone-value">
                  {t.contact.phone.value}
                </p>
                <p className="text-white/70" data-testid="text-contact-phone-hours">
                  {t.contact.phone.hours}
                </p>
              </div>
              
              <div className="contact-card animate-fade-in-up animate-delay-100">
                <div className="contact-icon">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-white text-xl mb-3" data-testid="text-contact-email-title">
                  {t.contact.email.title}
                </h4>
                <p className="text-white/90 text-lg mb-2" data-testid="text-contact-email-value">
                  {t.contact.email.value}
                </p>
                <p className="text-white/70" data-testid="text-contact-email-response">
                  {t.contact.email.response}
                </p>
              </div>
              
              <div className="contact-card animate-fade-in-up animate-delay-200">
                <div className="contact-icon">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <h4 className="font-bold text-white text-xl mb-3" data-testid="text-contact-location-title">
                  {t.contact.location.title}
                </h4>
                <p className="text-white/90 text-lg mb-3" data-testid="text-contact-location-value">
                  {t.contact.location.value.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < t.contact.location.value.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <a 
                  href="/about/location" 
                  className="inline-flex items-center text-white font-semibold hover:text-white/80 transition-colors"
                  data-testid="link-contact-location"
                >
                  <span>{t.contact.location.link}</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
