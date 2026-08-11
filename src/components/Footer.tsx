'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Footer({ onBookClick }: { onBookClick: () => void }) {
  const { language, dict } = useLanguage();

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2>Dr. Hanadi Khamiri<span>.</span></h2>
            <p>{dict.footer.brandSub}</p>
          </div>
          <div className="footer-links">
            <h4>{dict.footer.navTitle}</h4>
            <ul>
              <li><Link href={`/${language}/#about`}>{dict.footer.aboutLink}</Link></li>
              <li><Link href={`/${language}/#services`}>{dict.footer.servicesLink}</Link></li>
              <li><a href="https://www.instagram.com/dr.hanadikhamiri" target="_blank" rel="noopener noreferrer">{dict.footer.instaLink}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onBookClick(); }} style={{ color: 'var(--gold)' }}>{dict.footer.bookLink}</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>{dict.footer.contactTitle}</h4>
            <p><svg style={{ width: '20px', height: '20px', flexShrink: 0 }} viewBox="0 0 24 24"><path fill="currentColor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/></svg> Bin Arab dental centre<br/>Ferdous Building 4, Al wasl Rd, Al Safa - Dubai</p>
            <p><svg style={{ width: '20px', height: '20px', flexShrink: 0 }} viewBox="0 0 24 24"><path fill="currentColor" d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/></svg> <a href="tel:+971567847844" style={{ color: 'inherit', textDecoration: 'none' }}>+971 567847844</a> / <a href="tel:+971544432808" style={{ color: 'inherit', textDecoration: 'none' }}>+971 54 443 2808</a></p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{dict.footer.rights}</p>
          <p>{dict.footer.devBy}<a href="https://valgrowlabs.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', transition: 'opacity 0.3s' }}>ValGrow Labs</a></p>
        </div>
      </div>
    </footer>
  );
}
