'use client';

import { useState, useEffect } from 'react';

export default function InsuranceModal({ onBookClick }: { onBookClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal on each visit with a slight delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500); 
    return () => clearTimeout(timer);
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
    <>
      <style>{`
        .insurance-modal-box {
          max-width: 800px;
          width: 90%;
          padding: 2.5rem;
          border-radius: 16px;
          background-color: #fff;
          position: relative;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          max-height: 95vh;
          overflow-y: auto;
        }
        .insurance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 2rem;
          align-items: center;
          justify-content: center;
          margin-bottom: 2.5rem;
          padding: 0 1rem;
        }
        .insurance-logo-wrap {
          height: 75px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .insurance-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 40px;
          height: 40px;
          font-size: 1.8rem;
          background: #f0f0f0;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.2s;
        }
        .insurance-close-btn:hover {
          background: #e0e0e0;
          transform: scale(1.05);
        }
        .insurance-title {
          color: var(--charcoal);
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          font-family: var(--font-sans), sans-serif;
          letter-spacing: -0.5px;
        }
        .insurance-desc {
          font-size: 1rem;
          font-weight: 700;
          color: #444;
          max-width: 650px;
          margin: 0 auto 1.5rem;
          line-height: 1.4;
          text-transform: uppercase;
        }
        
        @media (max-width: 768px) {
          .insurance-modal-box {
            padding: 1.5rem 1rem;
            width: 95%;
          }
          .insurance-title {
            font-size: 1.6rem;
            margin-top: 1.5rem;
          }
          .insurance-desc {
            font-size: 0.85rem;
            margin-bottom: 1rem;
          }
          .insurance-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 0.75rem;
            padding: 0;
            margin-bottom: 1.5rem;
          }
          .insurance-logo-wrap {
            height: 45px;
          }
          .insurance-close-btn {
            top: 0.5rem;
            right: 0.5rem;
            width: 32px;
            height: 32px;
            font-size: 1.4rem;
          }
        }
        @media (max-width: 480px) {
          .insurance-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
          }
          .insurance-logo-wrap {
            height: 40px;
          }
        }
      `}</style>

      <div className="booking-overlay active" onClick={(e) => {
        if ((e.target as HTMLElement).classList.contains('booking-overlay')) {
          handleClose();
        }
      }} style={{ zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        <div className="insurance-modal-box">
          <button className="insurance-close-btn" onClick={handleClose} aria-label="Close modal">
            &times;
          </button>

          <h2 className="insurance-title">
            Insurance Accepted
          </h2>
          
          <p className="insurance-desc">
            We work with major insurance providers and networks.<br/>
            Contact our team to verify your coverage and eligibility.
          </p>

          <div className="insurance-grid">
            {insuranceLogos.map((logo, index) => (
              <div key={index} className="insurance-logo-wrap">
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

          <button
            onClick={() => {
              handleClose();
              onBookClick();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'var(--gold)',
              color: 'white',
              padding: '1rem 3.5rem',
              borderRadius: '50px',
              fontSize: '1.05rem',
              fontWeight: 800,
              border: 'none',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 10px 25px rgba(212, 175, 55, 0.3)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = '0.9';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            INQUIRE NOW
          </button>
          
          <p style={{ 
            fontSize: '0.65rem', 
            color: '#888', 
            marginTop: '1.5rem',
            textAlign: 'left',
            fontStyle: 'italic',
            paddingTop: '0.75rem',
            borderTop: '1px solid #eee'
          }}>
            *Coverage and benefits may vary depending on your insurance plan.
          </p>
        </div>
      </div>
    </>
  );
}
