
import { Language, translations } from '@/lib/i18n';
import { useState } from 'react';

interface Props {
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageSelector({ onLanguageChange }: Props) {
  const [currentLang, setCurrentLang] = useState<Language>('en');

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    onLanguageChange(lang);
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-2 flex gap-2">
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-3 py-1 rounded ${currentLang === 'en' ? 'bg-[#FF9933] text-white' : 'hover:bg-gray-100'}`}
      >
        English
      </button>
      <button
        onClick={() => handleLanguageChange('hi')}
        className={`px-3 py-1 rounded ${currentLang === 'hi' ? 'bg-[#FF9933] text-white' : 'hover:bg-gray-100'}`}
      >
        हिंदी
      </button>
      <button
        onClick={() => handleLanguageChange('mr')}
        className={`px-3 py-1 rounded ${currentLang === 'mr' ? 'bg-[#FF9933] text-white' : 'hover:bg-gray-100'}`}
      >
        मराठी
      </button>
    </div>
  );
}
