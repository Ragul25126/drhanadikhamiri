'use client';
import { useState } from 'react';

const faqs = [
  {
    q: 'Are cosmetic veneers permanent?',
    a: 'While not strictly permanent, high-quality porcelain veneers typically last 10 to 15 years—and often longer—with proper care, excellent oral hygiene, and regular professional check-ups.',
  },
  {
    q: 'Does Invisalign treatment hurt?',
    a: 'Invisalign is designed for maximum comfort. You may feel a slight, temporary pressure for the first day or two when switching to a new set of aligners. This is completely normal and a sign that the clear aligners are actively and gently moving your teeth.',
  },
  {
    q: 'How do I prepare for my first consultation?',
    a: 'Simply arrive relaxed. During your initial consultation, Dr. Hanadi will discuss your aesthetic goals, review your dental history, and perform a comprehensive examination (often utilizing 3D scanning) to design your bespoke treatment plan.',
  },
  {
    q: 'Do you offer emergency dental services?',
    a: 'Yes, we accommodate urgent dental needs as swiftly as possible. If you are experiencing severe pain, a broken tooth, or another dental emergency, please contact our clinic immediately via phone or our concierge widget.',
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <div className="faq-list reveal delay-1">
      {faqs.map((faq, idx) => (
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
