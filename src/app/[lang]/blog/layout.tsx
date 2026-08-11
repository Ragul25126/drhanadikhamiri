import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: lang === 'ar' ? 'المدونة والمقالات | د. هنادي خميري' : 'Journal & Insights | Dr. Hanadi Khamiri - Dental Blog Dubai',
    description: lang === 'ar' ? 'استكشف رؤى الخبراء حول طب الأسنان التجميلي الحديث، قشور الفينيير، إنفزلاين في دبي.' : 'Explore expert perspectives on modern cosmetic dentistry, porcelain veneers, Invisalign, guided biofilm therapy, and oral wellness in Dubai from Dr. Hanadi Khamiri.',
    alternates: {
      canonical: `https://drhanadikhamiri.com/${lang}/blog`,
    },
    openGraph: {
      type: 'website',
      url: `https://drhanadikhamiri.com/${lang}/blog`,
      title: lang === 'ar' ? 'المدونة والمقالات | د. هنادي خميري' : 'Journal & Insights | Dr. Hanadi Khamiri - Dental Blog Dubai',
      description: lang === 'ar' ? 'استكشف رؤى الخبراء حول طب الأسنان التجميلي الحديث، قشور الفينيير، إنفزلاين في دبي.' : 'Explore expert perspectives on modern cosmetic dentistry, porcelain veneers, Invisalign, guided biofilm therapy, and oral wellness in Dubai from Dr. Hanadi Khamiri.',
      siteName: 'Dr. Hanadi Khamiri | Luxury Cosmetic Dentist Dubai',
    },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
