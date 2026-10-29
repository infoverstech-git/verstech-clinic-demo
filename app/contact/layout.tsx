import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us & Clinic Support Desk | CarePoint Medical Centre & Hospital',
  description: 'Get in touch with CarePoint Medical Centre. Reception phone, 24/7 emergency hotline, WhatsApp support (+92 335 6123538), OPD hours, and location directions in Gulberg III, Lahore.',
  openGraph: {
    title: 'Contact & Patient Support | CarePoint Medical Centre',
    description: 'Find clinic contact numbers, reception hours, emergency triage desk, WhatsApp coordinator, and hospital directions.',
    url: 'https://verstech-clinic-demo.vercel.app/contact',
    siteName: 'CarePoint Medical Centre & Hospital',
    locale: 'en_PK',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
