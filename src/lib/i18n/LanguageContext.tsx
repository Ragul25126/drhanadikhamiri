'use client';

import React, { createContext, useContext } from 'react';
import { type Language, dictionaries } from './dictionaries';
import { useRouter, usePathname } from 'next/navigation';

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
  dict: typeof dictionaries['en'];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children, 
  lang, 
  dict 
}: { 
  children: React.ReactNode; 
  lang: Language; 
  dict: typeof dictionaries['en'] 
}) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'ar' : 'en';
    
    // Handle root /en or /ar
    if (pathname === `/${lang}` || pathname === `/${lang}/`) {
      router.push(`/${nextLang}`);
      return;
    }

    // Handle deep paths
    if (pathname.startsWith(`/${lang}/`)) {
      const newPath = pathname.replace(`/${lang}/`, `/${nextLang}/`);
      router.push(newPath);
      return;
    }

    // Fallback
    router.push(`/${nextLang}`);
  };

  return (
    <LanguageContext.Provider value={{ language: lang, toggleLanguage, dict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
