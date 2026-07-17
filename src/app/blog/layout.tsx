import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal & Insights | Dr. Hanadi Khamiri - Dental Blog Dubai',
  description: 'Explore expert perspectives on modern cosmetic dentistry, porcelain veneers, Invisalign, guided biofilm therapy, and oral wellness in Dubai from Dr. Hanadi Khamiri.',
  alternates: {
    canonical: 'https://drhanadikhamiri.com/blog',
  },
  openGraph: {
    type: 'website',
    url: 'https://drhanadikhamiri.com/blog',
    title: 'Journal & Insights | Dr. Hanadi Khamiri - Dental Blog Dubai',
    description: 'Explore expert perspectives on modern cosmetic dentistry, porcelain veneers, Invisalign, guided biofilm therapy, and oral wellness in Dubai from Dr. Hanadi Khamiri.',
    siteName: 'Dr. Hanadi Khamiri | Luxury Cosmetic Dentist Dubai',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
