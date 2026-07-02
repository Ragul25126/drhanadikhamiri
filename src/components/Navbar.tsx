'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Navbar({ onBookClick }: { onBookClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, toggleLanguage, dict } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    const nextState = !mobileMenuOpen;
    setMobileMenuOpen(nextState);
    document.body.style.overflow = nextState ? 'hidden' : 'auto';
  };

  const closeMenu = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
          <div className="container nav-container">
              <Link href="/" className="logo" style={{ fontWeight: 600 }} onClick={(e) => {
                  if (pathname === '/') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                  closeMenu();
              }}>
                Dr. Hanadi Khamiri<span>.</span>
              </Link>
              <div className="nav-links">
                  <Link href="/#about" className="nav-item">{dict.nav.about}</Link>
                  <Link href="/#services" className="nav-item">{dict.nav.treatments}</Link>
                  <Link href="/blog" className={`nav-item ${pathname === '/blog' ? 'active-link' : ''}`}>{dict.nav.blog}</Link>
                  <Link href="/#faq" className="nav-item">{dict.nav.faq}</Link>
                  <button
                    onClick={toggleLanguage}
                    className="lang-toggle-btn"
                    style={{
                      background: 'none',
                      border: '1px solid var(--border)',
                      color: 'var(--text)',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      marginRight: '0.5rem',
                      fontFamily: language === 'en' ? 'var(--font-arabic), sans-serif' : 'var(--font-sans), sans-serif',
                    }}
                    title="Switch Language / تغيير اللغة"
                  >
                    {language === 'en' ? 'العربية' : 'English'}
                  </button>
                  <button className="btn-nav-book" onClick={onBookClick}>{dict.nav.bookBtn}</button>
              </div>
              <div className={`menu-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
                <span></span><span></span><span></span>
              </div>
          </div>
      </nav>
      <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-close" onClick={closeMenu}>&times;</div>
          <Link href="/" className="mobile-nav-link" style={{ fontWeight: 600, fontSize: '2rem', marginBottom: '1rem', color: 'var(--gold)' }} onClick={(e) => {
              if (pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
              }
              closeMenu();
          }}>Dr. Hanadi Khamiri<span>.</span></Link>
          <Link href="/#about" className="mobile-nav-link" onClick={closeMenu}>{dict.nav.about}</Link>
          <Link href="/#services" className="mobile-nav-link" onClick={closeMenu}>{dict.nav.treatments}</Link>
          <Link href="/blog" className="mobile-nav-link" onClick={closeMenu}>{dict.nav.blog}</Link>
          <Link href="/#faq" className="mobile-nav-link" onClick={closeMenu}>{dict.nav.faq}</Link>
          <button
            onClick={() => { toggleLanguage(); closeMenu(); }}
            style={{
              background: 'none',
              border: '1px solid var(--gold)',
              color: 'var(--gold)',
              padding: '0.6rem 1.5rem',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: 'pointer',
              marginBottom: '1rem',
              fontFamily: language === 'en' ? 'var(--font-arabic), sans-serif' : 'var(--font-sans), sans-serif',
            }}
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
          <button className="btn-nav-book" style={{ background: 'var(--gold)', borderColor: 'var(--gold)' }} onClick={() => { closeMenu(); onBookClick(); }}>{dict.nav.bookBtn}</button>
      </div>
    </>
  );
}
