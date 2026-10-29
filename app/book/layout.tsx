import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Doctor Appointment Online | CarePoint Medical Centre & Hospital',
  description: 'Reserve in-person or video consultations with verified doctors at CarePoint Medical Centre. Instant token generation and WhatsApp confirmation.',
  openGraph: {
    title: 'Book Doctor Appointment Online | CarePoint Medical Centre',
    description: 'Fast, secure online doctor appointment scheduling. Select department, consultant, and preferred time slot with WhatsApp integration.',
    url: 'https://verstech-clinic-demo.vercel.app/book',
    siteName: 'CarePoint Medical Centre & Hospital',
    locale: 'en_PK',
    type: 'website',
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
