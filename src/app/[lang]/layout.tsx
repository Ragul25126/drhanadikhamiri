import type { Metadata } from 'next';
import Script from 'next/script';
import { Cormorant_Garamond, DM_Sans, Tajawal } from 'next/font/google';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import '../globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-arabic',
});

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const params = await props.params;
  const isAr = params.lang === 'ar';
  
  return {
    metadataBase: new URL('https://drhanadikhamiri.com'),
    title: {
      default: isAr 
        ? 'د. هنادي خميري | طبيبة تجميل أسنان وتقويم شفاف في دبي'
        : 'Dr. Hanadi Khamiri | Aesthetic Dentist & Clear Aligners in Dubai',
      template: isAr 
        ? '%s | د. هنادي خميري — عيادة أسنان في دبي'
        : '%s | Dr. Hanadi Khamiri — Dubai Dental Clinic',
    },
    description: isAr
      ? 'مقدم معتمد للتقويم الشفاف ودكتور تجميل أسنان في دبي. تخصص في التقويم الشفاف، ابتسامة هوليود، الفينيير واللومينير في الصفا، دبي.'
      : 'Certified Clear Aligner Provider & Aesthetic Dentist in Dubai. Specializing in clear aligners, porcelain veneers, digital smile design, and Lumineers in Al Safa, Dubai.',
    keywords: [
      'Aesthetic Dentist in Dubai',
      'Clear Aligner Doctor Dubai',
      'Clear Aligners Dubai',
      'Clear Aligner Braces Dubai',
      'Porcelain Veneers Dubai',
      'Smile Makeover Dubai',
      'Dental Clinic Al Safa',
      'Dr Hanadi Khamiri',
      'Bin Arab Dental Centre',
      'iTero Lumina Scanner Dubai',
      'Guided Biofilm Therapy GBT Dubai',
      'Lumineers in Dubai',
      'Teeth Whitening Dubai',
      'Aesthetic Dentistry Dubai',
      'دكتور تجميل أسنان في دبي',
      'طبيب تقويم شفاف في دبي',
      'عيادة أسنان في الصفا',
      'ابتسامة هوليود دبي'
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
      languages: {
        'en': 'https://drhanadikhamiri.com/en',
        'ar': 'https://drhanadikhamiri.com/ar',
      }
    },
    openGraph: {
      type: 'website',
      locale: isAr ? 'ar_AE' : 'en_AE',
      alternateLocale: isAr ? 'en_AE' : 'ar_AE',
      url: `https://drhanadikhamiri.com/${params.lang}`,
      title: isAr
        ? 'د. هنادي خميري | طبيبة تجميل أسنان وتقويم شفاف في دبي'
        : 'Dr. Hanadi Khamiri | Aesthetic Dentist & Clear Aligners Dubai',
      description: isAr
        ? 'مقدم معتمد للتقويم الشفاف ودكتور تجميل أسنان في دبي.'
        : 'Certified Clear Aligner Provider & Luxury Aesthetic Dentist in Al Safa, Dubai. Crafting bespoke, natural smiles with digital iTero 3D precision and 11+ years of excellence.',
      siteName: 'Dr. Hanadi Khamiri | Luxury Dental Clinic Dubai',
      images: [
        {
          url: '/newhero_image.jpeg',
          width: 1200,
          height: 630,
          alt: 'Dr. Hanadi Khamiri — Aesthetic Dentist & Clear Aligners in Dubai',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isAr
        ? 'د. هنادي خميري | طبيبة تجميل أسنان وتقويم شفاف في دبي'
        : 'Dr. Hanadi Khamiri | Aesthetic Dentist & Clear Aligners Dubai',
      description: isAr
        ? 'مقدم معتمد للتقويم الشفاف ودكتور تجميل أسنان في دبي.'
        : 'Certified Clear Aligner Provider & Luxury Aesthetic Dentist in Al Safa, Dubai. Bespoke smile makeovers, porcelain veneers, and clear aligners.',
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
}

import { dictionaries, type Language } from '@/lib/i18n/dictionaries';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const typedLang = (lang === 'ar' ? 'ar' : 'en') as Language;
  const dict = dictionaries[typedLang];
  
  return (
    <html lang={typedLang} dir={typedLang === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
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
        <LanguageProvider lang={typedLang} dict={dict}>
          <Preloader />
          <CustomCursor />
          <div className="noise-overlay"></div>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

