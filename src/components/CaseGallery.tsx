'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const cases = [
  {
    id: 'invisalign',
    title: 'Invisalign',
    titleAr: 'إنفزلاين',
    description: 'Discreet smile alignment designed to improve tooth positioning and create a more balanced smile.',
    descriptionAr: 'محاذاة الأسنان بشكل غير ملحوظ لتحسين ترتيب الأسنان والحصول على ابتسامة أكثر تناسقاً.',
    images: [
      '/cases/invisalign/img-4950.webp', 
      '/cases/invisalign/img-4948.webp', 
      '/cases/invisalign/upper.webp'
    ]
  },
  {
    id: 'gaps-fixed',
    title: 'Gaps Fixed by Clear Aligners',
    description: 'Closing visible gaps seamlessly and restoring natural aesthetics with clear aligners.',
    images: [
      '/cases/gaps-fixed/img-0050.webp', 
      '/cases/gaps-fixed/after-photo.webp', 
      '/cases/gaps-fixed/img-3.webp', 
      '/cases/gaps-fixed/img-2-copy.webp'
    ]
  },
  {
    id: 'aesthetic-fillings',
    title: 'Clear Aligners & Aesthetic Fillings',
    description: 'A combined approach of precise alignment and tiny aesthetic fillings for a flawless finish.',
    images: [
      '/cases/aesthetic-fillings/img-6971.webp', 
      '/cases/aesthetic-fillings/img-6962.webp', 
      '/cases/aesthetic-fillings/img-2782.webp', 
      '/cases/aesthetic-fillings/img-2768.webp'
    ]
  }
];

function CaseCard({ c, delayIdx }: { c: any, delayIdx: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % c.images.length);
    }, 3500); // Change image every 3.5 seconds

    return () => clearInterval(interval);
  }, [c.images.length]);

  const displayTitle = language === 'ar' && c.titleAr ? c.titleAr : c.title;
  const displayDescription = language === 'ar' && c.descriptionAr ? c.descriptionAr : c.description;

  return (
    <div className={`case-card delay-${delayIdx + 1}`}>
      <div className="case-carousel">
        <div className="carousel-track-wrapper">
          <div 
            className="carousel-track" 
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {c.images.map((imgSrc: string, i: number) => (
              <div key={i} className="carousel-slide">
                <Image 
                  src={imgSrc} 
                  alt={`${displayTitle} - Image ${i + 1}`} 
                  fill 
                  style={{ objectFit: 'cover' }} 
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="slide-indicator">{currentIndex + 1} / {c.images.length}</div>
      </div>
      <div className="case-info">
        <h3>{displayTitle}</h3>
        <p>{displayDescription}</p>
      </div>

      <style jsx>{`
        .case-card {
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.05);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .case-card:hover {
          transform: translateY(-5px);
          border-color: rgba(201,169,110,0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.06);
        }
        .case-carousel {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #f8f8f8;
        }
        .carousel-track-wrapper {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .carousel-track {
          display: flex;
          height: 100%;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .carousel-slide {
          flex: 0 0 100%;
          position: relative;
        }
        .slide-indicator {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.65);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 1px;
          backdrop-filter: blur(4px);
          z-index: 2;
        }
        .case-info {
          padding: 1.8rem 1.5rem;
        }
        .case-info h3 {
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
          color: var(--gold);
          font-family: var(--font-serif);
          font-weight: 500;
        }
        .case-info p {
          font-size: 0.9rem;
          color: #555;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
}

export default function CaseGallery() {
  return (
    <div className="case-gallery-container reveal">
      <div className="cases-grid">
        {cases.map((c, idx) => (
          <CaseCard key={c.id} c={c} delayIdx={idx} />
        ))}
      </div>

      <style jsx>{`
        .cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2.5rem;
          margin-top: 3rem;
        }
      `}</style>
    </div>
  );
}
