'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import BookingModal from '@/components/BookingModal';
import FloatingWidget from '@/components/FloatingWidget';
import FloatingWidget from '@/components/FloatingWidget';
import FAQ from '@/components/FAQ';
import Reviews from '@/components/Reviews';

export default function Home() {
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

  useEffect(() => {
    const isTouchDevice = () => ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const heroImg = document.getElementById('heroImage');
    
    const handleScroll = () => {
      if (!isTouchDevice() && window.scrollY < window.innerHeight && heroImg) {
        heroImg.style.transform = `translateY(${window.scrollY * 0.15 - 5}%)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <ScrollProgress />
      <Preloader />
      <CustomCursor />
      <div className="noise-overlay"></div>
      
      <FloatingWidget onBookClick={() => setIsBookingOpen(true)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <Navbar onBookClick={() => setIsBookingOpen(true)} />

      {/* Hero Section */}
      <header id="hero">
        <div className="container hero-container">
          <div className="hero-content">
            <h1 className="reveal reveal-left">Your Smile, <br/><span>Redefined.</span></h1>
            <p className="subtitle reveal reveal-left delay-1">Dr. Hanadi Khamiri — Certified Invisalign Provider, Cosmetic & General Dentist, Dubai. Crafting bespoke, natural smiles with over a decade of luxury dental expertise.</p>
            <div className="hero-ctas reveal reveal-left delay-2">
              <button className="btn btn-gold" onClick={() => setIsBookingOpen(true)}>Reserve Consultation</button>
              <a href="#services" className="btn btn-ghost">Explore Treatments</a>
            </div>
          </div>
          <div className="hero-image-wrapper reveal reveal-right delay-1">
            <div className="hero-img-mask">
              <img src="/newhero_image.jpeg" alt="Dr. Hanadi Khamiri" id="heroImage" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
            <div className="hero-accent">
              <div className="hero-accent-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></div>
              <div className="hero-accent-text">Jumeirah's Finest</div>
            </div>
          </div>
        </div>
      </header>

      {/* Infinite Marquee */}
      <div className="marquee-section">
        <div className="marquee-content">
            <span>Premium Dental Care</span><span>Cosmetic Veneers</span><span>Invisalign Aligners</span><span>Aesthetic Makeovers</span><span>Dubai, UAE</span><span>Premium Dental Care</span><span>Cosmetic Veneers</span><span>Invisalign Aligners</span><span>Aesthetic Makeovers</span><span>Dubai, UAE</span>
        </div>
      </div>

      {/* Trust Bar */}
      <section id="trust">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item reveal delay-1"><h3>11+</h3><p>Years Excellence</p></div>
            <div className="trust-item reveal delay-2"><h3>2,000+</h3><p>Smiles Designed</p></div>
            <div className="trust-item reveal delay-3"><h3>Top 1%</h3><p>Invisalign Provider</p></div>
            <div className="trust-item reveal delay-1"><h3>5-Star</h3><p>Patient Care</p></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container about-container">
          <div className="about-image reveal reveal-left">
            <div className="about-img-wrap"><img src="/image2.JPEG" alt="Dr. Hanadi Clinic" onError={(e) => (e.currentTarget.style.display='none')} /></div>
            <div className="about-badge">
              <div className="badge-inner"><strong>BDS</strong><span style={{ fontSize: '0.75rem', letterSpacing: '1.5px' }}>UNIVERSITY OF<br/>SHARJAH</span></div>
            </div>
          </div>
          <div className="about-content reveal reveal-right delay-1">
            <h2>The Art of <br/><span>Modern Dentistry</span></h2>
            <p>Welcome to a space where clinical precision meets unparalleled luxury. I am Dr. Hanadi Khamiri, dedicated to designing smiles that reflect your true confidence, utilizing the absolute latest advancements in cosmetic dentistry.</p>
            <p>Serving as the Senior Dentist and Clinic Manager at Bin Arab Dental Centre in Al Safa, I specialize in ultra-thin porcelain veneers, advanced Invisalign therapy, and comprehensive aesthetic restorations. My philosophy is rooted in highly personalized, gentle care—ensuring every patient enjoys a seamless, world-class experience from the moment they arrive.</p>
            <div className="about-signature">Dr. Hanadi Khamiri</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <div className="container">
          <div className="section-header reveal">
            <h2>Signature Treatments</h2>
            <p style={{ marginTop: '1rem' }}>Bespoke dental solutions designed to elevate your oral health and transform your aesthetic appeal with lasting, natural results.</p>
          </div>
          <div className="services-grid">
            <div className="service-card reveal delay-1"><div className="service-icon"><svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/></svg></div><h3>Cosmetic Veneers</h3><p>Custom-crafted, ultra-thin porcelain veneers that correct imperfections and deliver a flawless, natural-looking celebrity smile.</p><div className="service-link" onClick={() => setIsBookingOpen(true)}>Consult Now</div></div>
            <div className="service-card reveal delay-2"><div className="service-icon"><svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M15 7H9V9H15V7Z"/></svg></div><h3>Invisalign Aligners</h3><p>Discreetly and comfortably straighten your teeth with customized, virtually invisible aligners. Top-tier certified provider.</p><div className="service-link" onClick={() => setIsBookingOpen(true)}>Consult Now</div></div>
            <div className="service-card reveal delay-3"><div className="service-icon"><svg viewBox="0 0 24 24"><path d="M18 10V14H14V10H18M10 10V14H6V10H10Z"/></svg></div><h3>Ceramic Crowns</h3><p>Restore the strength, function, and aesthetics of damaged teeth with premium, highly durable ceramic restorations.</p><div className="service-link" onClick={() => setIsBookingOpen(true)}>Consult Now</div></div>
            <div className="service-card reveal delay-1"><div className="service-icon"><svg viewBox="0 0 24 24"><path d="M21 11H13V3C17.42 3 21 6.58 21 11M11 21V13H3Z"/></svg></div><h3>Aesthetic Fillings</h3><p>Advanced tooth-colored composite restorations that blend seamlessly with your natural enamel to repair decay invisibly.</p><div className="service-link" onClick={() => setIsBookingOpen(true)}>Consult Now</div></div>
            <div className="service-card reveal delay-2"><div className="service-icon"><svg viewBox="0 0 24 24"><path d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22Z"/></svg></div><h3>Tooth Spa by using GBT</h3><p>Experience the ultimate clean with Guided Biofilm Therapy (GBT). A gentle, warm-water spa-like treatment for flawless oral hygiene without the pain.</p><div className="service-link" onClick={() => setIsBookingOpen(true)}>Consult Now</div></div>
            <div className="service-card reveal delay-3"><div className="service-icon"><svg viewBox="0 0 24 24"><path d="M16 11C17.66 11 18.9 9.66 18.9 8C18.9 6.34 17.66 5 16 5Z"/></svg></div><h3>Family Care</h3><p>Specialized, empathetic dentistry tailored to the unique physiological oral health needs and absolute comfort of your family.</p><div className="service-link" onClick={() => setIsBookingOpen(true)}>Consult Now</div></div>
          </div>
        </div>
      </section>

      {/* Advanced Technology Section */}
      <section id="technology" style={{ padding: 'var(--section-padding) 0', backgroundColor: 'var(--pearl)' }}>
        <div className="container">
          <div className="section-header reveal">
            <h2>The Future of Comfort</h2>
            <p style={{ marginTop: '1rem' }}>We combine our clinical expertise with state-of-the-art technology to ensure your visits are not only highly effective, but profoundly comfortable and fast.</p>
          </div>
          <div className="tech-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginTop: '3rem' }}>
            
            <div className="tech-card reveal delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '1/1', backgroundColor: 'var(--ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <img src="/gbt_machine.webp" alt="GBT Machine" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.8rem', color: 'var(--gold)', fontFamily: 'var(--font-serif)' }}>EMS Guided Biofilm Therapy</h3>
                <p>Gone are the days of painful scraping. Our authentic Swiss EMS GBT machine uses a gentle stream of warm water, air, and ultra-fine powder to remove stains and plaque. It feels like a soothing spa day for your teeth, leaving you with a brilliantly clean and polished smile in absolute comfort.</p>
              </div>
            </div>

            <div className="tech-card reveal delay-2" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '1/1', backgroundColor: 'var(--ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <img src="/itero_scanner.webp" alt="iTero Lumina Scanner" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.8rem', color: 'var(--gold)', fontFamily: 'var(--font-serif)' }}>iTero Lumina™ 3D Scanner</h3>
                <p>Say goodbye to gooey, uncomfortable dental impressions. With the revolutionary iTero scanner, we capture a highly accurate, full 3D model of your teeth in just minutes. See your future Invisalign smile instantly on screen and experience digital precision like never before.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section id="instagram-feed" style={{ padding: 'var(--section-padding) 0', backgroundColor: 'var(--bg-color)' }}>
        <div className="container">
          <div className="section-header reveal">
            <h2>Follow The Journey</h2>
            <p style={{ marginTop: '1rem' }}>Join our community on Instagram for daily dental tips, behind-the-scenes, and our latest smile transformations.</p>
          </div>
          <div className="insta-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
            {[
              '/cases/invisalign/img-4950.webp',
              '/cases/gaps-fixed/img-0050.webp',
              '/cases/aesthetic-fillings/img-6971.webp',
              '/cases/invisalign/upper.webp'
            ].map((img, idx) => (
              <a 
                key={idx}
                href="https://www.instagram.com/dr.hanadikhamiri" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="insta-post reveal delay-1"
                style={{ 
                  display: 'block', 
                  position: 'relative', 
                  aspectRatio: '1/1', 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}
              >
                <img src={img} alt="Instagram Post" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="insta-img" />
                <div className="insta-overlay" style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                    <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/>
                  </svg>
                </div>
              </a>
            ))}
          </div>
          <div className="reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="https://www.instagram.com/dr.hanadikhamiri" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/>
              </svg>
              @dr.hanadikhamiri
            </a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <Reviews />

      {/* Why Choose */}
      <section id="why">
        <div className="container">
          <div className="section-header reveal">
            <h2>The Standard of Excellence</h2>
          </div>
          <div className="why-grid">
            <div className="why-item reveal delay-1"><div className="why-icon"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7A3,3 0 0,1 15,10A3,3 0 0,1 12,13A3,3 0 0,1 9,10A3,3 0 0,1 12,7Z"/></svg></div><h3>Mastery & Precision</h3><p>Over a decade of clinical excellence combined with continuous international training in modern aesthetic dentistry.</p></div>
            <div className="why-item reveal delay-2"><div className="why-icon"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.28 2,8.5C2,5.42 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.09C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.42 22,8.5C22,12.28 18.6,15.36 13.45,20.04L12,21.35Z"/></svg></div><h3>White-Glove Care</h3><p>Every treatment plan is meticulously tailored. We prioritize your ultimate comfort, privacy, and personal aesthetic aspirations.</p></div>
            <div className="why-item reveal delay-3"><div className="why-icon"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M21,16V4H3V16H21M21,2A2,2 0 0,1 23,4V16A2,2 0 0,1 21,18H14V20H16V22H8V20H10V18H3C1.89,18 1,17.1 1,16V4C1,2.89 1.89,2 3,2H21M5,6H19V14H5V6Z"/></svg></div><h3>Advanced Technology</h3><p>Utilizing the forefront of digital dentistry—from 3D intraoral scanning to premium biomaterials—ensuring perfect, lasting results.</p></div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq">
        <div className="container faq-container">
          <div className="section-header reveal">
            <h2>Patient Inquiries</h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* Booking CTA */}
      <section id="booking-cta">
        <div className="container reveal">
          <h2>Ready for Your Best Smile?</h2>
          <p>Schedule your private consultation with Dr. Hanadi Khamiri today. Experience world-class dental care in the heart of Dubai.</p>
          <button className="btn btn-gold" onClick={() => setIsBookingOpen(true)}>Reserve Appointment</button>
        </div>
      </section>

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
                <li><a href="#about">The Doctor</a></li>
                <li><a href="#services">Treatments</a></li>
                <li><a href="https://www.instagram.com/dr.hanadikhamiri" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setIsBookingOpen(true); }} style={{ color: 'var(--gold)' }}>Book Consultation</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>Concierge & Clinic</h4>
              <p><svg style={{ width: '20px', height: '20px', flexShrink: 0 }} viewBox="0 0 24 24"><path fill="currentColor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/></svg> Bin Arab dental centre<br/>Ferdous Building 4, Al wasl Rd, Al Safa - Dubai</p>
              <p><svg style={{ width: '20px', height: '20px', flexShrink: 0 }} viewBox="0 0 24 24"><path fill="currentColor" d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/></svg> +971 567847844</p>
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
