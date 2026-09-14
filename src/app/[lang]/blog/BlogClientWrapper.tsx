'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import BookingModal from '@/components/BookingModal';
import FloatingWidget from '@/components/FloatingWidget';
import Footer from '@/components/Footer';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  image: string;
  created_at: string;
};

import { useLanguage } from '@/lib/i18n/LanguageContext';

export default function BlogClientWrapper({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [posts] = useState<BlogPost[]>(initialPosts);
  const { language, dict } = useLanguage();

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
  }, [posts]);

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
            <p style={{ fontSize: '1.2rem' }}>Expert perspectives on modern aesthetic dentistry, oral wellness, and the art of maintaining a perfect smile.</p>
          </div>

          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: '#666', fontSize: '1.2rem' }}>
              No articles published yet. Check back soon for expert dental insights!
            </div>
          ) : (
            <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem', paddingBottom: '6rem' }}>
              {posts.map((post, index) => (
                <Link
                  key={post.id}
                  href={post.slug ? `/${language}/blog/${post.slug}` : '#'}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <article className={`blog-card reveal delay-${(index % 3) + 1} group`} style={{ cursor: 'pointer' }}>
                    <div className="blog-img-wrap" style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3', marginBottom: '1.5rem', backgroundColor: 'var(--ivory)' }}>
                      {post.image && <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="blog-img" />}
                    </div>
                    <div className="blog-meta" style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
                      <span style={{ color: 'var(--gold)', fontWeight: '600' }}>{post.category}</span>
                      <span style={{ color: '#888' }}>{new Date(post.created_at).toLocaleDateString('en-AE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem', lineHeight: '1.3', fontFamily: 'var(--font-serif)' }}>{post.title}</h3>
                    <p style={{ color: '#555', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                    <div className="service-link">Read Article</div>
                  </article>
                </Link>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer onBookClick={() => setIsBookingOpen(true)} />
      
      <style dangerouslySetInnerHTML={{__html: `
        .blog-card:hover .blog-img {
          transform: scale(1.05);
        }
      `}} />
    </>
  );
}
