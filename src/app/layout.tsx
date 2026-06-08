import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'Dr. Hanadi Khamiri | Luxury Cosmetic Dentist Dubai',
  description: 'Dr. Hanadi Khamiri — Cosmetic & General Dentist in Dubai. Over 11 years of experience in luxury dental care, cosmetic veneers, and Invisalign.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${dmSans.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
