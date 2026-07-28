'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import BookingModal from '@/components/BookingModal';
import FloatingWidget from '@/components/FloatingWidget';
import FAQ from '@/components/FAQ';
import Reviews from '@/components/Reviews';
import InsuranceModal from '@/components/InsuranceModal';
import InsuranceSection from '@/components/InsuranceSection';
import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { dict } = useLanguage();

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Dentist',
        '@id': 'https://drhanadikhamiri.com/#dentist',
        name: 'Dr. Hanadi Khamiri — Best Invisalign & Cosmetic Dentist Dubai',
        alternateName: 'Dr. Hanadi Khamiri Dental Clinic Al Safa',
        description:
          'Top 1% Certified Invisalign Provider & Luxury Cosmetic Dentist in Al Safa, Dubai. Over 11 years of clinical excellence specializing in clear aligners, porcelain veneers, digital smile design, and Guided Biofilm Therapy (GBT).',
        url: 'https://drhanadikhamiri.com',
        image: 'https://drhanadikhamiri.com/pic1.webp',
        telephone: ['+971567847844', '+971544432808'],
        priceRange: '$$$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Ferdous Building 4, Al Wasl Road',
          addressLocality: 'Al Safa',
          addressRegion: 'Dubai',
          addressCountry: 'AE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 25.1929,
          longitude: 55.2449,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '20:00',
          },
        ],
        hasMap: 'https://maps.google.com/?q=Bin+Arab+Dental+Centre+Al+Safa+Dubai',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          bestRating: '5',
          ratingCount: '250',
        },
        medicalSpecialty: ['Cosmetic Dentistry', 'Orthodontics', 'General Dentistry'],
        availableService: [
          {
            '@type': 'MedicalProcedure',
            name: 'Invisalign Clear Aligners',
            alternateName: 'Invisalign Braces',
            description:
              'Top 1% Certified Invisalign Provider in Dubai offering bespoke clear aligner therapy and teeth aligners utilizing iTero Lumina 3D digital impressions and instant smile simulation.',
            sameAs: 'https://en.wikipedia.org/wiki/Clear_aligners',
          },
          {
            '@type': 'MedicalProcedure',
            name: 'Porcelain Veneers & Lumineers',
            alternateName: 'Smile Makeover',
            description:
              'Custom-crafted, ultra-thin ceramic veneers and lumineers designed to elevate smile aesthetics with natural luster, facial harmony, and long-lasting durability.',
            sameAs: 'https://en.wikipedia.org/wiki/Veneer_(dentistry)',
          },
          {
            '@type': 'MedicalProcedure',
            name: 'Guided Biofilm Therapy (GBT)',
            description:
              'Swiss EMS warm-water spa hygiene protocol that removes biofilm, stains, and plaque gently without painful scraping.',
          },
          {
            '@type': 'MedicalProcedure',
            name: 'Digital Smile Design',
            description:
              '3D digital facial analysis and smile simulation allowing patients to preview their aesthetic transformation before treatment begins.',
            sameAs: 'https://en.wikipedia.org/wiki/Cosmetic_dentistry',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://drhanadikhamiri.com/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Who is considered the best Invisalign dentist in Dubai?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Dr. Hanadi Khamiri is widely celebrated as a top Invisalign dentist in Dubai, holding Top 1% Certified Invisalign Provider distinction. Practicing at Bin Arab Dental Centre in Al Safa, she has successfully crafted over 2,000 bespoke smiles utilizing high-precision iTero Lumina 3D scanning and digital simulation technology.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why choose Dr. Hanadi Khamiri for cosmetic dentistry and veneers in Dubai?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'With over 11 years of clinical excellence in luxury aesthetic dentistry, Dr. Hanadi Khamiri combines artistic mastery with digital precision. She designs custom, ultra-thin porcelain veneers that harmonize with individual facial features while prioritizing natural luster, tooth preservation, and total patient comfort.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are cosmetic veneers permanent?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'While not strictly permanent, high-quality porcelain veneers typically last 10 to 15 years—and often longer—with proper care, excellent oral hygiene, and regular professional check-ups.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does Invisalign treatment hurt?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Invisalign is engineered for maximum comfort. You may feel a slight, temporary pressure for the first day or two when switching to a new set of aligners. This is completely normal and a sign that the clear aligners are actively and gently guiding your teeth into perfect alignment.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does the iTero Lumina 3D scanner improve Invisalign outcomes?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The iTero Lumina 3D optical scanner captures ultra-accurate digital models of your teeth in minutes, eliminating uncomfortable traditional molds. It enables instant 3D smile simulations so you can preview your straightened teeth before treatment starts and ensures every custom aligner fits with microscopic accuracy.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <InsuranceModal onBookClick={() => setIsBookingOpen(true)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            <h1 className="reveal reveal-left">{dict.hero.title}<br/><span>{dict.hero.titleSpan}</span></h1>
            <p className="subtitle reveal reveal-left delay-1">{dict.hero.subtitle}</p>
            <div className="hero-ctas reveal reveal-left delay-2">
              <button className="btn btn-gold" onClick={() => setIsBookingOpen(true)}>{dict.hero.bookBtn}</button>
              <a href="#services" className="btn btn-ghost">{dict.hero.exploreBtn}</a>
            </div>
          </div>
          <div className="hero-image-wrapper reveal reveal-right delay-1">
            <div className="hero-img-mask">
              <img src="/pic1.webp" alt="Dr. Hanadi Khamiri" id="heroImage" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
            <div className="hero-accent">
              <div className="hero-accent-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></div>
              <div className="hero-accent-text">{dict.hero.badge}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Infinite Marquee */}
      <div className="marquee-section">
        <div className="marquee-content">
            {dict.marquee.map((text, i) => (
              <span key={i}>{text}</span>
            ))}
        </div>
      </div>

      {/* Trust Bar */}
      <section id="trust">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item reveal delay-1"><h3>{dict.trust.y11}</h3><p>{dict.trust.y11sub}</p></div>
            <div className="trust-item reveal delay-2"><h3>{dict.trust.s2k}</h3><p>{dict.trust.s2ksub}</p></div>
            <div className="trust-item reveal delay-3"><h3>{dict.trust.top1}</h3><p>{dict.trust.top1sub}</p></div>
            <div className="trust-item reveal delay-1"><h3>{dict.trust.star5}</h3><p>{dict.trust.star5sub}</p></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="container about-container">
          <div className="about-image reveal reveal-left">
            <div className="about-img-wrap"><img src="/pic2.webp" alt="Dr. Hanadi Clinic" onError={(e) => (e.currentTarget.style.display='none')} /></div>
            <div className="about-badge">
              <div className="badge-inner"><strong>BDS</strong><span style={{ fontSize: '0.75rem', letterSpacing: '1px', whiteSpace: 'pre-line', textAlign: 'center' }}>{dict.about.bds}</span></div>
            </div>
          </div>
          <div className="about-content reveal reveal-right delay-1">
            <h2>{dict.about.h2}<br/><span>{dict.about.h2span}</span></h2>
            <p>{dict.about.p1}</p>
            <p>{dict.about.p2}</p>
            <div className="about-signature">Dr. Hanadi Khamiri</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services">
        <div className="container">
          <div className="section-header reveal">
            <h2>{dict.services.h2}</h2>
            <p style={{ marginTop: '1rem' }}>{dict.services.sub}</p>
          </div>
          <div className="services-grid">
            <div className="service-card reveal delay-1"><div className="service-icon"><svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"/></svg></div><h3>{dict.services.c1title}</h3><p>{dict.services.c1desc}</p><div className="service-link" onClick={() => setIsBookingOpen(true)}>{dict.services.consult}</div></div>
            <div className="service-card reveal delay-2"><div className="service-icon"><svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M15 7H9V9H15V7Z"/></svg></div><h3>{dict.services.c2title}</h3><p>{dict.services.c2desc}</p><div className="service-link" onClick={() => setIsBookingOpen(true)}>{dict.services.consult}</div></div>
            <div className="service-card reveal delay-3"><div className="service-icon"><svg viewBox="0 0 24 24"><path d="M18 10V14H14V10H18M10 10V14H6V10H10Z"/></svg></div><h3>{dict.services.c3title}</h3><p>{dict.services.c3desc}</p><div className="service-link" onClick={() => setIsBookingOpen(true)}>{dict.services.consult}</div></div>
            <div className="service-card reveal delay-1"><div className="service-icon"><svg viewBox="0 0 24 24"><path d="M21 11H13V3C17.42 3 21 6.58 21 11M11 21V13H3Z"/></svg></div><h3>{dict.services.c4title}</h3><p>{dict.services.c4desc}</p><div className="service-link" onClick={() => setIsBookingOpen(true)}>{dict.services.consult}</div></div>
            <div className="service-card reveal delay-2"><div className="service-icon"><svg viewBox="0 0 24 24"><path d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22Z"/></svg></div><h3>{dict.services.c5title}</h3><p>{dict.services.c5desc}</p><div className="service-link" onClick={() => setIsBookingOpen(true)}>{dict.services.consult}</div></div>
            <div className="service-card reveal delay-3"><div className="service-icon"><svg viewBox="0 0 24 24"><path d="M16 11C17.66 11 18.9 9.66 18.9 8C18.9 6.34 17.66 5 16 5Z"/></svg></div><h3>{dict.services.c6title}</h3><p>{dict.services.c6desc}</p><div className="service-link" onClick={() => setIsBookingOpen(true)}>{dict.services.consult}</div></div>
          </div>
        </div>
      </section>

      {/* Insurance Showcase Section */}
      <InsuranceSection />

      {/* Advanced Technology Section */}
      <section id="technology" style={{ padding: 'var(--section-padding) 0', backgroundColor: 'var(--pearl)' }}>
        <div className="container">
          <div className="section-header reveal">
            <h2>{dict.tech.h2}</h2>
            <p style={{ marginTop: '1rem' }}>{dict.tech.sub}</p>
          </div>
          <div className="tech-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginTop: '3rem' }}>
            
            <div className="tech-card reveal delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '1/1', backgroundColor: 'var(--ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <img src="/gbt_machine.webp" alt="GBT Machine" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.8rem', color: 'var(--gold)', fontFamily: 'var(--font-serif)' }}>{dict.tech.t1title}</h3>
                <p>{dict.tech.t1desc}</p>
              </div>
            </div>

            <div className="tech-card reveal delay-2" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '1/1', backgroundColor: 'var(--ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <img src="/itero_scanner.webp" alt="iTero Lumina Scanner" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1.8rem', color: 'var(--gold)', fontFamily: 'var(--font-serif)' }}>{dict.tech.t2title}</h3>
                <p>{dict.tech.t2desc}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section id="instagram-feed" style={{ padding: 'var(--section-padding) 0', backgroundColor: 'var(--bg-color)' }}>
        <div className="container">
          <div className="section-header reveal">
            <h2>{dict.insta.h2}</h2>
            <p style={{ marginTop: '1rem' }}>{dict.insta.sub}</p>
          </div>
          <div className="insta-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem', justifyItems: 'center' }}>
            
            {/* Reel 2 */}
            <iframe 
              src="https://www.instagram.com/reel/DZkYdXEtK4_/embed" 
              width="320" 
              height="580" 
              frameBorder="0" 
              scrolling="no" 
              allowTransparency={true}
              style={{ borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', background: 'white' }}
            ></iframe>

            {/* Reel 3 */}
            <iframe 
              src="https://www.instagram.com/reel/DZGFb19NHFx/embed" 
              width="320" 
              height="580" 
              frameBorder="0" 
              scrolling="no" 
              allowTransparency={true}
              style={{ borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', background: 'white' }}
            ></iframe>
          </div>
          <div className="reveal" style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="https://www.instagram.com/dr.hanadikhamiri" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"/>
              </svg>
              {dict.insta.btn}
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
            <h2>{dict.why.h2}</h2>
          </div>
          <div className="why-grid">
            <div className="why-item reveal delay-1"><div className="why-icon"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7A3,3 0 0,1 15,10A3,3 0 0,1 12,13A3,3 0 0,1 9,10A3,3 0 0,1 12,7Z"/></svg></div><h3>{dict.why.w1title}</h3><p>{dict.why.w1desc}</p></div>
            <div className="why-item reveal delay-2"><div className="why-icon"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.28 2,8.5C2,5.42 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.09C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.42 22,8.5C22,12.28 18.6,15.36 13.45,20.04L12,21.35Z"/></svg></div><h3>{dict.why.w2title}</h3><p>{dict.why.w2desc}</p></div>
            <div className="why-item reveal delay-3"><div className="why-icon"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M21,16V4H3V16H21M21,2A2,2 0 0,1 23,4V16A2,2 0 0,1 21,18H14V20H16V22H8V20H10V18H3C1.89,18 1,17.1 1,16V4C1,2.89 1.89,2 3,2H21M5,6H19V14H5V6Z"/></svg></div><h3>{dict.why.w3title}</h3><p>{dict.why.w3desc}</p></div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section id="faq">
        <div className="container faq-container">
          <div className="section-header reveal">
            <h2>{dict.faqSection.h2}</h2>
          </div>
          <FAQ />
        </div>
      </section>

      {/* Booking CTA */}
      <section id="booking-cta">
        <div className="container reveal">
          <h2>{dict.bookingCta.h2}</h2>
          <p>{dict.bookingCta.sub}</p>
          <button className="btn btn-gold" onClick={() => setIsBookingOpen(true)}>{dict.bookingCta.btn}</button>
        </div>
      </section>

      {/* Footer */}
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
                <li><a href="#about">{dict.footer.aboutLink}</a></li>
                <li><a href="#services">{dict.footer.servicesLink}</a></li>
                <li><a href="https://www.instagram.com/dr.hanadikhamiri" target="_blank" rel="noopener noreferrer">{dict.footer.instaLink}</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); setIsBookingOpen(true); }} style={{ color: 'var(--gold)' }}>{dict.footer.bookLink}</a></li>
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
    </>
  );
}
