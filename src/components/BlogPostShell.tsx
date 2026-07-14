'use client';

import { useState } from 'react';
import Link from 'next/link';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import BookingModal from '@/components/BookingModal';
import FloatingWidget from '@/components/FloatingWidget';

export default function BlogPostShell({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <div className="noise-overlay" />
      <FloatingWidget onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <Navbar onBookClick={() => setIsBookingOpen(true)} />
      <div style={{ paddingTop: '90px' }}>
        {children}
      </div>

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h2>Dr. Hanadi Khamiri<span>.</span></h2>
              <p>Redefining dental aesthetics with clinical precision, personalised care, and a touch of Dubai luxury.</p>
            </div>
            <div className="footer-links">
              <h4>Navigation</h4>
              <ul>
                <li><Link href="/#about">The Doctor</Link></li>
                <li><Link href="/#services">Treatments</Link></li>
                <li><Link href="/blog">Journal</Link></li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsBookingOpen(true); }} style={{ color: 'var(--gold)' }}>
                    Book Consultation
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>Concierge &amp; Clinic</h4>
              <p>
                <svg style={{ width: '20px', height: '20px', flexShrink: 0 }} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                </svg>
                Bin Arab Dental Centre<br/>Ferdous Building 4, Al Wasl Rd, Al Safa - Dubai
              </p>
              <p>
                <svg style={{ width: '20px', height: '20px', flexShrink: 0 }} viewBox="0 0 24 24">
                  <path fill="currentColor" d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
                </svg>
                +971 567847844
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Dr. Hanadi Khamiri. All Rights Reserved.</p>
            <p>Developed by <a href="https://valgrowlabs.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', transition: 'opacity 0.3s' }}>ValGrow Labs</a></p>
          </div>
        </div>
      </footer>
    </>
  );
}

