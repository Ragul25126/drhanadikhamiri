'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ onBookClick }: { onBookClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
                  <Link href="/#about" className="nav-item">About</Link>
                  <Link href="/#services" className="nav-item">Treatments</Link>
                  <Link href="/#transformations" className="nav-item">Results</Link>
                  <Link href="/blog" className={`nav-item ${pathname === '/blog' ? 'active-link' : ''}`}>Blog</Link>
                  <Link href="/#faq" className="nav-item">FAQ</Link>
                  <button className="btn-nav-book" onClick={onBookClick}>Book Consultation</button>
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
          <Link href="/#about" className="mobile-nav-link" onClick={closeMenu}>About</Link>
          <Link href="/#services" className="mobile-nav-link" onClick={closeMenu}>Treatments</Link>
          <Link href="/#transformations" className="mobile-nav-link" onClick={closeMenu}>Results</Link>
          <Link href="/blog" className="mobile-nav-link" onClick={closeMenu}>Blog</Link>
          <Link href="/#faq" className="mobile-nav-link" onClick={closeMenu}>FAQ</Link>
          <button className="btn-nav-book" style={{ background: 'var(--gold)', borderColor: 'var(--gold)' }} onClick={() => { closeMenu(); onBookClick(); }}>Book Consultation</button>
      </div>
    </>
  );
}
