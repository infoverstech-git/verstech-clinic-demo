import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Specialist Doctors Directory | CarePoint Medical Centre & Hospital',
  description: 'Browse our panel of board-certified consultants across Cardiology, Pediatrics, Orthopedics, Dermatology, Gynecology, and Internal Medicine. Check OPD schedules and consultation fees.',
  openGraph: {
    title: 'Specialist Doctors Directory | CarePoint Medical Centre',
    description: 'Find board-certified specialist doctors, check OPD consultation timings, and reserve appointments online.',
    url: 'https://verstech-clinic-demo.vercel.app/doctors',
    siteName: 'CarePoint Medical Centre & Hospital',
    locale: 'en_PK',
    type: 'website',
  },
};

export default function DoctorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
