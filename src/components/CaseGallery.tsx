'use client';
import { useState } from 'react';
import Image from 'next/image';

const cases = [
  {
    id: 'invisalign',
    title: 'Invisalign Treatment',
    description: 'A customized clear aligner treatment for correcting teeth alignment.',
    images: [
      '/cases/invisalign/img-4950.jpg', 
      '/cases/invisalign/img-4948.jpg', 
      '/cases/invisalign/upper.jpg'
    ]
  },
  {
    id: 'gaps-fixed',
    title: 'Gaps Fixed by Invisalign',
    description: 'Closing visible gaps seamlessly and restoring natural aesthetics with Invisalign.',
    images: [
      '/cases/gaps-fixed/img-0050.jpg', 
      '/cases/gaps-fixed/after-photo.jpg', 
      '/cases/gaps-fixed/img-3.jpg', 
      '/cases/gaps-fixed/img-2-copy.jpg'
    ]
  },
  {
    id: 'aesthetic-fillings',
    title: 'Invisalign & Aesthetic Fillings',
    description: 'A combined approach of precise alignment and tiny aesthetic fillings for a flawless finish.',
    images: [
      '/cases/aesthetic-fillings/img-6971.jpg', 
      '/cases/aesthetic-fillings/img-6962.jpg', 
      '/cases/aesthetic-fillings/img-2782.jpg', 
      '/cases/aesthetic-fillings/img-2768.jpg'
    ]
  }
];

export default function CaseGallery() {
  return (
    <div className="case-gallery-container reveal">
      <div className="cases-grid">
        {cases.map((c, idx) => (
          <div key={c.id} className={`case-card delay-${idx + 1}`}>
            <div className="case-carousel">
              <div className="carousel-track-wrapper">
                <div className="carousel-track">
                  {c.images.map((imgSrc, i) => (
                    <div key={i} className="carousel-slide">
                      <Image 
                        src={imgSrc} 
                        alt={`${c.title} - Image ${i + 1}`} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="slide-indicator">{i + 1} / {c.images.length}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="case-info">
              <h3>{c.title}</h3>
              <p>{c.description}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        .case-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease;
        }
        .case-card:hover {
          transform: translateY(-5px);
          border-color: var(--gold);
        }
        .case-carousel {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #111;
        }
        .carousel-track-wrapper {
          width: 100%;
          height: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scrollbar-width: none; /* Firefox */
        }
        .carousel-track-wrapper::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
        .carousel-track {
          display: flex;
          height: 100%;
        }
        .carousel-slide {
          flex: 0 0 100%;
          position: relative;
          scroll-snap-align: start;
        }
        .slide-indicator {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.6);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          backdrop-filter: blur(4px);
        }
        .case-info {
          padding: 1.5rem;
        }
        .case-info h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--gold);
        }
        .case-info p {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}
