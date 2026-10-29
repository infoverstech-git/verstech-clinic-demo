import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Staff Portal & Clinic Management Demo | CarePoint Medical Centre',
  description: 'Interactive demonstration portal for reception and clinic coordinators. Manage appointments, consultation queues, and department duty rosters.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
