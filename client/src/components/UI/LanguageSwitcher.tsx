import { useLanguage } from '../../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2 text-sm">
      <button
        className={`px-2 py-1 rounded font-medium transition-colors ${
          language === 'ko'
            ? 'text-white bg-primary-600'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => setLanguage('ko')}
        data-testid="button-language-ko"
      >
        KO
      </button>
      <span className="text-gray-400">|</span>
      <button
        className={`px-2 py-1 rounded font-medium transition-colors ${
          language === 'en'
            ? 'text-white bg-primary-600'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => setLanguage('en')}
        data-testid="button-language-en"
      >
        EN
      </button>
    </div>
  );
}
