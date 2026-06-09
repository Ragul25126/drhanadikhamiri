'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import BookingModal from '@/components/BookingModal';
import FloatingWidget from '@/components/FloatingWidget';

export default function BlogPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Guided Biofilm Therapy (GBT)",
      category: "Dental Hygiene",
      date: "June 8, 2026",
      excerpt: "Discover why the traditional scale and polish is a thing of the past. GBT offers a pain-free, spa-like experience that protects your enamel while delivering a flawless clean.",
      image: "/gbt_machine.webp"
    },
    {
      id: 2,
      title: "Veneers vs. Invisalign: Which is Right for You?",
      category: "Cosmetic Dentistry",
      date: "May 22, 2026",
      excerpt: "Both offer stunning results, but the journey and outcome differ. We break down the differences between immediate cosmetic enhancement and orthodontic correction.",
      image: "/after-new.png"
    },
    {
      id: 3,
      title: "How Digital 3D Scanners Are Changing Dentistry",
      category: "Advanced Technology",
      date: "April 15, 2026",
      excerpt: "Say goodbye to messy dental impressions. Learn how the iTero Lumina scanner provides exact 3D models of your teeth instantly and comfortably.",
      image: "/itero_scanner.webp"
    }
  ];

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <div className="noise-overlay"></div>
      
      <FloatingWidget onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <Navbar onBookClick={() => setIsBookingOpen(true)} />

      <main style={{ minHeight: '100vh', paddingTop: '150px', backgroundColor: 'var(--pearl)' }}>
        <div className="container">
          
          <div className="section-header reveal" style={{ textAlign: 'left', margin: '0 0 4rem 0', maxWidth: '800px' }}>
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1rem' }}>Journal & <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Insights</span></h1>
            <p style={{ fontSize: '1.2rem' }}>Expert perspectives on modern cosmetic dentistry, oral wellness, and the art of maintaining a perfect smile.</p>
          </div>

          <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem', paddingBottom: '6rem' }}>
            {blogPosts.map((post, index) => (
              <article key={post.id} className={`blog-card reveal delay-${(index % 3) + 1} group`} style={{ cursor: 'pointer' }}>
                <div className="blog-img-wrap" style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3', marginBottom: '1.5rem', backgroundColor: 'var(--ivory)' }}>
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="blog-img" />
                </div>
                <div className="blog-meta" style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: '600' }}>{post.category}</span>
                  <span style={{ color: '#888' }}>{post.date}</span>
                </div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', lineHeight: '1.3', fontFamily: 'var(--font-serif)' }}>{post.title}</h3>
                <p style={{ color: '#555', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                <div className="service-link">Read Article</div>
              </article>
            ))}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h2>Dr. Hanadi Khamiri<span>.</span></h2>
              <p>Redefining dental aesthetics with clinical precision, personalized care, and a touch of Dubai luxury.</p>
            </div>
            <div className="footer-links">
              <h4>Navigation</h4>
              <ul>
                <li><Link href="/#about">The Doctor</Link></li>
                <li><Link href="/#services">Treatments</Link></li>
                <li><Link href="/#transformations">Portfolio</Link></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setIsBookingOpen(true); }} style={{ color: 'var(--gold)' }}>Book Consultation</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>Concierge & Clinic</h4>
              <p><svg style={{ width: '20px', height: '20px', flexShrink: 0 }} viewBox="0 0 24 24"><path fill="currentColor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/></svg> Bin Arab Dental Centre, Al Safa<br/>Al Wasl Road, Dubai, UAE</p>
              <p><svg style={{ width: '20px', height: '20px', flexShrink: 0 }} viewBox="0 0 24 24"><path fill="currentColor" d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/></svg> +971 50 123 4567</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Dr. Hanadi Khamiri. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        .blog-card:hover .blog-img {
          transform: scale(1.05);
        }
      `}} />
    </>
  );
}
