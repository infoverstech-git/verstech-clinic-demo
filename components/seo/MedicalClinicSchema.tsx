import React from 'react';
import { CLINIC_PRESETS, DEFAULT_PRESET_KEY, DEPARTMENTS } from '@/lib/clinic-data';

export default function MedicalClinicSchema() {
  const preset = CLINIC_PRESETS[DEFAULT_PRESET_KEY];

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: preset.name,
    description: preset.tagline,
    telephone: preset.receptionPhone,
    emergencyTelephone: preset.emergencyPhone,
    email: preset.email,
    url: 'https://apexcarehospital.demo',
    address: {
      '@type': 'PostalAddress',
      streetAddress: preset.address,
      addressLocality: preset.city,
      postalCode: preset.postalCode,
      addressCountry: preset.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: preset.geoLatitude,
      longitude: preset.geoLongitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:30',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '10:00',
        closes: '16:00',
      },
    ],
    medicalSpecialty: DEPARTMENTS.map((d) => d.name),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Clinical Consultations & Diagnostics',
      itemListElement: DEPARTMENTS.map((dept, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name: dept.name,
          description: dept.description,
        },
      })),
    },
    currenciesAccepted: 'PKR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, Mobile Pay',
    isAccessibleForFree: false,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
