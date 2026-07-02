'use client';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { dict } = useLanguage();

  const toggle = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <div className="faq-list reveal delay-1">
      {dict.faqs.map((faq, idx) => (
        <div key={idx} className={`faq-item ${activeIndex === idx ? 'active' : ''}`} onClick={() => toggle(idx)}>
          <div className="faq-question">
            {faq.q} <div className="faq-icon"></div>
          </div>
          <div className="faq-answer">
            <p>{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

