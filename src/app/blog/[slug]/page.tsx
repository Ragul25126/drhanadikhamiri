import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseAdmin } from '@/lib/supabase';
import BlogPostShell from '@/components/BlogPostShell';

/* ── Types ── */
type BlogPost = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  image: string;
  content: string;
  created_at: string;
};

/* ── Data fetching ── */
async function getPost(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) return null;
    return data as BlogPost;
  } catch {
    return null;
  }
}

/* ── generateMetadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Article Not Found | Dr. Hanadi Khamiri',
    };
  }

  const siteUrl = 'https://drhanadikhamiri.com';
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | Dr. Hanadi Khamiri`,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: post.title,
      description: post.excerpt,
      images: post.image ? [{ url: post.image.startsWith('http') ? post.image : `${siteUrl}${post.image}` }] : [],
      publishedTime: post.created_at,
      authors: ['Dr. Hanadi Khamiri'],
      siteName: 'Dr. Hanadi Khamiri | Luxury Cosmetic Dentist Dubai',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

/* ── Page ── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = 'https://drhanadikhamiri.com';
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
  const publishDate = new Date(post.created_at).toISOString();
  const readableDate = new Date(post.created_at).toLocaleDateString('en-AE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  /* JSON-LD: Article + LocalBusiness */
  const jsonLd: { '@context': string; '@graph': any[] } = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${canonicalUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        datePublished: publishDate,
        dateModified: publishDate,
        url: canonicalUrl,
        image: post.image
          ? post.image.startsWith('http')
            ? post.image
            : `${siteUrl}${post.image}`
          : `${siteUrl}/newhero_image.jpeg`,
        author: {
          '@type': 'Person',
          name: 'Dr. Hanadi Khamiri',
          jobTitle: 'Cosmetic & General Dentist',
          url: siteUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Dr. Hanadi Khamiri Dental Clinic',
          logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/icon.svg`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
      },
      {
        '@type': 'Dentist',
        '@id': `${siteUrl}#dentist`,
        name: 'Dr. Hanadi Khamiri — Bin Arab Dental Centre',
        description:
          'Dr. Hanadi Khamiri is a luxury cosmetic and general dentist based in Al Safa, Dubai, with over 11 years of experience in veneers, Invisalign, GBT cleaning, and smile design.',
        url: siteUrl,
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
          ratingValue: '5',
          bestRating: '5',
          ratingCount: '200',
        },
        medicalSpecialty: ['Cosmetic Dentistry', 'General Dentistry', 'Orthodontics'],
        availableService: [
          { '@type': 'MedicalProcedure', name: 'Porcelain Veneers' },
          { '@type': 'MedicalProcedure', name: 'Invisalign' },
          { '@type': 'MedicalProcedure', name: 'Guided Biofilm Therapy (GBT)' },
          { '@type': 'MedicalProcedure', name: 'Teeth Whitening' },
          { '@type': 'MedicalProcedure', name: 'Smile Design' },
          { '@type': 'MedicalProcedure', name: 'Dental Implants' },
        ],
      },
    ],
  };

  if (post.slug === 'best-dentists-al-safa-dubai-2026-ranked-guide') {
    jsonLd['@graph'].push({
      '@type': 'ItemList',
      '@id': `${canonicalUrl}#itemlist`,
      name: 'Best Dentists in Al Safa Dubai (2026 Ranked Doctors Guide)',
      description:
        'Comprehensive 2026 ranking and evaluation of top dental specialists in Al Safa, Dubai based on diagnostic 3D technology, Invisalign certification tiers, and patient ratings.',
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      numberOfItems: 7,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Person',
            name: 'Dr. Hanadi Khamiri',
            jobTitle: 'Top 1% Certified Invisalign Provider & Cosmetic Dentist',
            url: siteUrl,
            image: `${siteUrl}/newhero_image.jpeg`,
            telephone: ['+971567847844', '+971544432808'],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              bestRating: '5.0',
              ratingCount: '200',
            },
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'Person',
            name: 'Dr. Roshan Khan',
            jobTitle: 'General Dentist Al Safa',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'Person',
            name: 'Dr. Abdul Nasser Hachem',
            jobTitle: 'General Dentist Al Safa',
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'Person',
            name: 'Dr. Anila Virani',
            jobTitle: 'Dental Specialist Jumeirah / Al Safa',
          },
        },
        {
          '@type': 'ListItem',
          position: 5,
          item: {
            '@type': 'Person',
            name: 'Dr. Marwan Alobeidi',
            jobTitle: 'Dental Specialist Jumeirah / Al Safa',
          },
        },
        {
          '@type': 'ListItem',
          position: 6,
          item: {
            '@type': 'Person',
            name: 'Dr. Khashayar Ilbak',
            jobTitle: 'Dental Specialist Jumeirah / Al Safa',
          },
        },
        {
          '@type': 'ListItem',
          position: 7,
          item: {
            '@type': 'Person',
            name: 'Dr. Omar Said',
            jobTitle: 'Dental Specialist Jumeirah / Al Safa',
          },
        },
      ],
    });
  }

  /* Render content blocks from stored content string */
  const renderContent = (content: string) => {
    if (!content) return null;
    // Split into paragraphs and render — content uses \n\n as paragraph separator
    // Also detect ## headings and ### headings
    const blocks = content.split('\n\n');
    return blocks.map((block, i) => {
      const trimmed = block.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={i} style={{ fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--charcoal)' }}>
            {trimmed.replace(/^### /, '')}
          </h3>
        );
      }
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={i} style={{ fontSize: '2rem', marginTop: '3rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', color: 'var(--charcoal)' }}>
            {trimmed.replace(/^## /, '')}
          </h2>
        );
      }
      if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.split('**').length === 3) {
        return (
          <p key={i} style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--charcoal)' }}>
            {trimmed.replace(/\*\*/g, '')}
          </p>
        );
      }
      // Bullet list detection
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').filter(l => l.startsWith('- '));
        return (
          <ul key={i} style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--charcoal)' }}>
            {items.map((item, j) => (
              <li key={j} style={{ marginBottom: '0.5rem', lineHeight: '1.8' }}>
                {item.replace(/^- /, '')}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} style={{ marginBottom: '1.5rem', lineHeight: '1.9', color: '#444', fontSize: '1.05rem' }}>
          {trimmed}
        </p>
      );
    });
  };

  return (
    <BlogPostShell>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ minHeight: '100vh', backgroundColor: 'var(--pearl)', paddingBottom: '6rem' }}>

        {/* Back nav */}
        <div style={{ borderBottom: '1px solid #e8e0d4', backgroundColor: 'var(--ivory)', padding: '1rem 0' }}>
          <div className="container">
            <Link
              href="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                color: '#666',
                textDecoration: 'none',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.5px',
                transition: 'color 0.2s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20,11H7.83l5.59-5.59L12,4l-8,8l8,8l1.41-1.41L7.83,13H20V11Z"/>
              </svg>
              Back to Journal
            </Link>
          </div>
        </div>

        {/* Hero */}
        <div style={{ paddingTop: '4rem', paddingBottom: '3rem', backgroundColor: 'var(--bg-color)' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{
                backgroundColor: 'var(--gold)',
                color: '#fff',
                padding: '0.3rem 1rem',
                borderRadius: '100px',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-sans)',
              }}>
                {post.category}
              </span>
              <span style={{ color: '#888', fontSize: '0.85rem', fontFamily: 'var(--font-sans)' }}>{readableDate}</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              lineHeight: 1.25,
              fontFamily: 'var(--font-serif)',
              color: 'var(--charcoal)',
              marginBottom: '1.5rem',
              fontWeight: 600,
            }}>
              {post.title}
            </h1>

            <p style={{
              fontSize: '1.2rem',
              color: '#555',
              lineHeight: 1.8,
              marginBottom: '2rem',
              fontStyle: 'italic',
            }}>
              {post.excerpt}
            </p>

            {/* Author line */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e8e0d4',
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'var(--gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                fontFamily: 'var(--font-serif)',
                flexShrink: 0,
              }}>
                H
              </div>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--charcoal)', fontSize: '0.95rem', fontFamily: 'var(--font-sans)' }}>Dr. Hanadi Khamiri</div>
                <div style={{ color: '#888', fontSize: '0.8rem', fontFamily: 'var(--font-sans)' }}>BDS · Cosmetic & General Dentist · Al Safa, Dubai</div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured image */}
        {post.image && (
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              aspectRatio: '16/7',
              marginBottom: '3rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
            }}>
              <img
                src={post.image}
                alt={post.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        )}

        {/* Article body */}
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem' }}>
          <article style={{ fontFamily: 'var(--font-sans)' }}>
            {renderContent(post.content)}
          </article>

          {/* CTA */}
          <div style={{
            marginTop: '4rem',
            padding: '3rem',
            background: 'linear-gradient(135deg, var(--charcoal) 0%, #2a2a2a 100%)',
            borderRadius: '20px',
            textAlign: 'center',
            color: '#fff',
          }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>
              Ready for Your Consultation?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
              Dr. Hanadi Khamiri sees patients at Bin Arab Dental Centre, Al Safa, Dubai. Book your private consultation today.
            </p>
            <a
              href="/#booking-cta"
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--gold)',
                color: '#fff',
                padding: '0.9rem 2.5rem',
                borderRadius: '100px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                letterSpacing: '0.5px',
                fontFamily: 'var(--font-sans)',
                transition: 'opacity 0.2s',
              }}
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </main>
    </BlogPostShell>
  );
}
