import type { Metadata } from 'next';
import Script from 'next/script';
import { Cormorant_Garamond, DM_Sans, Tajawal } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal'],
  variable: '--font-sans',
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-arabic',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://drhanadikhamiri.com'),
  title: {
    default: 'Dr. Hanadi Khamiri | Best Invisalign & Cosmetic Dentist in Dubai',
    template: '%s | Dr. Hanadi Khamiri — Dubai Dental Clinic',
  },
  description:
    'Top 1% Certified Invisalign Provider & Best Cosmetic Dentist in Dubai. Specializing in clear aligners, Invisalign braces, porcelain veneers, and Lumineers in Al Safa, Dubai.',
  keywords: [
    'Clear Aligners Dubai',
    'Invisalign Aligners',
    'Invisalign Braces',
    'Best Invisalign Dubai',
    'Clear Teeth Aligners',
    'Dental Aligners',
    'Best Cosmetic Dentist in Dubai',
    'Cosmetic Dentist Dubai',
    'Best Lumineers in Dubai',
    'Porcelain Veneers Dubai',
    'Top Invisalign Doctor Dubai',
    'Smile Makeover Dubai',
    'Dr Hanadi Khamiri',
    'Bin Arab Dental Centre',
    'iTero Lumina Scanner Dubai',
    'Guided Biofilm Therapy GBT Dubai',
  ],
  authors: [{ name: 'Dr. Hanadi Khamiri', url: 'https://drhanadikhamiri.com' }],
  creator: 'Dr. Hanadi Khamiri',
  publisher: 'Bin Arab Dental Centre',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: 'https://drhanadikhamiri.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    alternateLocale: 'ar_AE',
    url: 'https://drhanadikhamiri.com',
    title: 'Dr. Hanadi Khamiri | Best Invisalign & Cosmetic Dentist Dubai',
    description:
      'Top 1% Certified Invisalign Provider & Luxury Cosmetic Dentist in Al Safa, Dubai. Crafting bespoke, natural smiles with digital iTero 3D precision and 11+ years of excellence.',
    siteName: 'Dr. Hanadi Khamiri | Luxury Dental Clinic Dubai',
    images: [
      {
        url: '/newhero_image.jpeg',
        width: 1200,
        height: 630,
        alt: 'Dr. Hanadi Khamiri — Best Invisalign & Cosmetic Dentist in Dubai',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Hanadi Khamiri | Best Invisalign & Cosmetic Dentist Dubai',
    description:
      'Top 1% Certified Invisalign Provider & Luxury Cosmetic Dentist in Al Safa, Dubai. Bespoke smile makeovers, porcelain veneers, and clear aligners.',
    images: ['/newhero_image.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-548Q3ZZX');
          `}
        </Script>
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable} ${tajawal.variable}`} suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-548Q3ZZX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

