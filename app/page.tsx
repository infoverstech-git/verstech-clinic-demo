'use client';

import React, { useState } from 'react';
import { CLINIC_PRESETS, DEFAULT_PRESET_KEY, ClinicPreset } from '@/lib/clinic-data';
import DemoPresetSwitcher from '@/components/demo/DemoPresetSwitcher';
import TopHeader from '@/components/layout/TopHeader';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import QuickInfoCards from '@/components/sections/QuickInfoCards';
import ServicesSection from '@/components/sections/ServicesSection';
import DoctorsSection from '@/components/sections/DoctorsSection';
import FacilitiesSection from '@/components/sections/FacilitiesSection';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import TimingsAndLocation from '@/components/sections/TimingsAndLocation';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import Footer from '@/components/layout/Footer';
import MobileStickyBar from '@/components/layout/MobileStickyBar';
import AppointmentModal from '@/components/sections/AppointmentModal';

export default function HomePage() {
  const [activePresetKey, setActivePresetKey] = useState<string>(DEFAULT_PRESET_KEY);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<string>('');
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>('');

  const currentPreset: ClinicPreset = CLINIC_PRESETS[activePresetKey] || CLINIC_PRESETS[DEFAULT_PRESET_KEY];

  const handleOpenBooking = (doctorOrService?: string) => {
    if (doctorOrService) {
      if (doctorOrService.startsWith('Dr.')) {
        setSelectedDoctorForBooking(doctorOrService);
        setSelectedServiceForBooking('');
      } else {
        setSelectedServiceForBooking(doctorOrService);
        setSelectedDoctorForBooking('');
      }
    } else {
      setSelectedDoctorForBooking('');
      setSelectedServiceForBooking('');
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Client Demo Presets Bar (VERSTECH Labs Sales Showcase) */}
      <DemoPresetSwitcher
        currentPresetId={activePresetKey}
        onSelectPreset={(id) => setActivePresetKey(id)}
      />

      {/* 2. Top Emergency & Reception Contact Strip */}
      <TopHeader preset={currentPreset} />

      {/* 3. Medical Navigation Bar */}
      <Navbar
        preset={currentPreset}
        onOpenBooking={handleOpenBooking}
      />

      <main className="flex-1">
        {/* 4. High-Trust Hero Section */}
        <Hero
          preset={currentPreset}
          onOpenBooking={handleOpenBooking}
        />

        {/* 5. 3 Golden Quick-Action Cards */}
        <QuickInfoCards
          preset={currentPreset}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 6. Medical Services & Disciplines Grid */}
        <ServicesSection
          onOpenBooking={handleOpenBooking}
        />

        {/* 7. Senior Consultant Doctors & Specialists */}
        <DoctorsSection
          onOpenBooking={handleOpenBooking}
          preset={currentPreset}
        />

        {/* 8. Hospital & Clinic Facilities */}
        <FacilitiesSection />

        {/* 9. Why Patients Choose Us & Trust Pillars */}
        <WhyChooseUs
          preset={currentPreset}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 10. Timings Schedule Table & Location */}
        <TimingsAndLocation
          preset={currentPreset}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 11. Patient Testimonials & Experiences */}
        <TestimonialsSection
          preset={currentPreset}
        />
      </main>

      {/* 12. Full Healthcare Footer & Attribution */}
      <Footer
        preset={currentPreset}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 13. Mobile Floating Quick-Action Bar */}
      <MobileStickyBar
        preset={currentPreset}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 14. Interactive Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preset={currentPreset}
        initialDoctorName={selectedDoctorForBooking}
        initialServiceTitle={selectedServiceForBooking}
      />
    </div>
  );
}
