'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function InsuranceSection() {
  const { dict } = useLanguage();

  const insuranceLogos = [
    '/insurance/liva insurance.png',
    '/insurance/dewa-logo.gif',
    '/insurance/PCFC  Customs New logo final.avif',
    '/insurance/dubai insurance logo.png',
    '/insurance/Almadallah-1.jpg',
    '/insurance/Enaya-Insurance-Co.-logo.jpg',
    '/insurance/RAK insurance logo.png',
    '/insurance/Cigna-square-logo.webp',
  ];

  return (
    <section id="insurance-showcase" style={{ padding: 'var(--section-padding) 0', backgroundColor: 'var(--pearl)' }}>
      <div className="container">
        <div className="section-header reveal">
          <h2>{dict.insuranceSection.h2}</h2>
          <p style={{ marginTop: '1rem' }}>{dict.insuranceSection.sub}</p>
        </div>
        
        <div className="insurance-section-grid reveal delay-1">
          {insuranceLogos.map((logo, index) => (
            <div key={index} className="insurance-section-logo-wrap">
              <img 
                src={logo} 
                alt={`Insurance Provider ${index + 1}`} 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '100%', 
                  objectFit: 'contain',
                  mixBlendMode: 'multiply',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        .insurance-section-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 3rem 2rem;
          align-items: center;
          justify-items: center;
          margin-top: 3rem;
          background: white;
          padding: 4rem 3rem;
          border-radius: 24px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.03);
        }
        .insurance-section-logo-wrap {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 1rem;
        }
        @media (max-width: 992px) {
          .insurance-section-grid {
            grid-template-columns: repeat(3, 1fr);
            padding: 3rem 2rem;
          }
        }
        @media (max-width: 768px) {
          .insurance-section-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem 1.5rem;
            padding: 2rem 1.5rem;
          }
          .insurance-section-logo-wrap {
            height: 80px;
          }
        }
      `}</style>
    </section>
  );
}
