import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Specialized Medical Departments & Centers | CarePoint Medical Centre',
  description: 'Explore 8 clinical excellence departments equipped with modern diagnostics, sterile operating suites, and senior consultant physicians.',
  openGraph: {
    title: 'Specialized Medical Departments | CarePoint Medical Centre',
    description: 'Explore clinical excellence departments across Cardiology, Pediatrics, Internal Medicine, Orthopedics, Dermatology, and 24/7 Diagnostics.',
    url: 'https://verstech-clinic-demo.vercel.app/departments',
    siteName: 'CarePoint Medical Centre & Hospital',
    locale: 'en_PK',
    type: 'website',
  },
};

export default function DepartmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
