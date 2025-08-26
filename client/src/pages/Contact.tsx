import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/UI/SEO';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ContactForm from '../components/Forms/ContactForm';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${t.contact.title} | 뷰리드AI`}
        description={t.contact.subtitle}
        keywords="프로젝트문의, 무료컨설팅, 마케팅문의, 뷰리드AI"
      />
      <Header />

      <main className="py-16 lg:py-24">
        <div className="container max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4" data-testid="text-page-title">
                {t.contact.title}
              </h1>
              <p className="text-xl text-gray-600" data-testid="text-page-subtitle">
                {t.contact.subtitle}
              </p>
            </div>

            <ContactForm />

            {/* Contact info */}
            <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-phone text-primary-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2" data-testid="text-contact-phone-title">
                  {t.contact.phone.title}
                </h4>
                <p className="text-gray-600" data-testid="text-contact-phone-value">
                  {t.contact.phone.value}
                </p>
                <p className="text-sm text-gray-500 mt-1" data-testid="text-contact-phone-hours">
                  {t.contact.phone.hours}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-envelope text-primary-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2" data-testid="text-contact-email-title">
                  {t.contact.email.title}
                </h4>
                <p className="text-gray-600" data-testid="text-contact-email-value">
                  {t.contact.email.value}
                </p>
                <p className="text-sm text-gray-500 mt-1" data-testid="text-contact-email-response">
                  {t.contact.email.response}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fas fa-map-marker-alt text-primary-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2" data-testid="text-contact-location-title">
                  {t.contact.location.title}
                </h4>
                <p className="text-gray-600" data-testid="text-contact-location-value">
                  {t.contact.location.value.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < t.contact.location.value.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <a 
                  href="/about/location" 
                  className="text-sm text-primary-600 hover:text-primary-700 mt-1"
                  data-testid="link-contact-location"
                >
                  {t.contact.location.link}
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
