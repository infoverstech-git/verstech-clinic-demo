import type { Metadata, Viewport } from 'next';
import './globals.css';
import MedicalClinicSchema from '@/components/seo/MedicalClinicSchema';

export const metadata: Metadata = {
  title: 'CarePoint Medical Centre & Hospital | Premium Healthcare Demo',
  description: 'CarePoint Medical Centre — Modern, high-trust healthcare demo website designed by VERSTECH Labs for private clinics, doctors, and multi-specialty hospitals in Pakistan.',
  keywords: 'CarePoint Medical Centre, clinic website, doctor appointment, hospital website design, healthcare web developer, Lahore clinics, online doctor booking',
  authors: [{ name: 'VERSTECH Labs' }],
  metadataBase: new URL('https://carepointmedical.demo'),
  openGraph: {
    title: 'CarePoint Medical Centre & Hospital',
    description: 'Book online appointments with board-certified consultants across Cardiology, Pediatrics, Internal Medicine, Orthopedics, Dermatology, and Obstetrics.',
    url: 'https://carepointmedical.demo',
    siteName: 'CarePoint Medical Centre',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CarePoint Medical Centre | Healthcare Website Demo',
    description: 'Experience instant online doctor booking, WhatsApp integration, and responsive clinic management.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <MedicalClinicSchema />
      </head>
      <body className="font-sans antialiased text-[#334155] bg-white selection:bg-teal-600 selection:text-white pb-14 sm:pb-0">
        {children}
      </body>
    </html>
  );
}
