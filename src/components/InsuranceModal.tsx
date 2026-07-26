'use client';

import { useState, useEffect } from 'react';

export default function InsuranceModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal after a short delay on initial load
    const hasSeenModal = sessionStorage.getItem('insuranceModalSeen');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('insuranceModalSeen', 'true');
      }, 1500); // 1.5 seconds delay
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  const handleClose = () => setIsOpen(false);

  const insuranceLogos = [
    '/insurance/liva insurance.png',
    '/insurance/dewa insurance logo.png',
    '/insurance/PCFC  Customs New logo final.avif',
    '/insurance/dubai insurance logo.png',
    '/insurance/Almadallah-1.jpg',
    '/insurance/Enaya-Insurance-Co.-logo.jpg',
    '/insurance/RAK insurance logo.png',
    '/insurance/Cigna-square-logo.webp',
  ];

  return (
    <div className="booking-overlay active" onClick={(e) => {
      if ((e.target as HTMLElement).classList.contains('booking-overlay')) {
        handleClose();
      }
    }} style={{ zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="booking-modal" style={{ 
        maxWidth: '800px', 
        width: '90%', 
        padding: '2.5rem', 
        borderRadius: '16px', 
        backgroundColor: '#fff', 
        position: 'relative',
        textAlign: 'center',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <button className="close-modal" onClick={handleClose} style={{ 
          position: 'absolute', 
          top: '1rem', 
          right: '1rem', 
          fontSize: '1.5rem', 
          background: 'transparent', 
          border: 'none', 
          cursor: 'pointer',
          color: '#333' 
        }}>
          &times;
        </button>

        <h2 style={{ 
          color: '#1a8b27', 
          fontSize: '2.5rem', 
          fontWeight: 800, 
          marginBottom: '1rem', 
          textTransform: 'uppercase',
          fontFamily: 'var(--font-sans), sans-serif',
          letterSpacing: '-0.5px'
        }}>
          Insurance Accepted
        </h2>
        
        <p style={{ 
          fontSize: '1.1rem', 
          fontWeight: 700, 
          color: '#444', 
          maxWidth: '650px', 
          margin: '0 auto 2.5rem', 
          lineHeight: 1.4,
          textTransform: 'uppercase'
        }}>
          We work with major insurance providers and networks.<br/>
          Contact our team to verify your coverage and eligibility.
        </p>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
          gap: '2rem', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: '3rem',
          padding: '0 1rem'
        }}>
          {insuranceLogos.map((logo, index) => (
            <div key={index} style={{ 
              height: '75px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center'
            }}>
              <img 
                src={logo} 
                alt={`Insurance Provider ${index + 1}`} 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%', 
                  objectFit: 'contain' 
                }} 
              />
            </div>
          ))}
        </div>

        <a 
          href="https://wa.me/971544432808?text=Hello%2C%20I%20would%20like%20to%20verify%20my%20insurance%20coverage." 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a8b27',
            color: 'white',
            padding: '1.2rem 4rem',
            borderRadius: '50px',
            fontSize: '1.1rem',
            fontWeight: 800,
            textDecoration: 'none',
            transition: 'opacity 0.2s ease',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
        >
          WHATSAPP US
        </a>
        
        <p style={{ 
          fontSize: '0.7rem', 
          color: '#888', 
          marginTop: '2rem',
          textAlign: 'left',
          fontStyle: 'italic',
          paddingTop: '1rem',
          borderTop: '1px solid #eee'
        }}>
          *Coverage and benefits may vary depending on your insurance plan.
        </p>
      </div>
    </div>
  );
}
