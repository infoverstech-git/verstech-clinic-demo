'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Stethoscope, 
  HeartPulse, 
  Baby, 
  Activity, 
  Sparkles, 
  Users, 
  Smile, 
  Microscope,
  Check, 
  ArrowRight, 
  Calendar, 
  Clock, 
  ArrowLeft,
  UserCheck,
  type LucideIcon
} from 'lucide-react';
import { DEPARTMENTS, DOCTORS, CLINIC_PRESETS, DEFAULT_PRESET_KEY, Department } from '@/lib/clinic-data';
import TopHeader from '@/components/layout/TopHeader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileStickyBar from '@/components/layout/MobileStickyBar';
import AppointmentModal from '@/components/sections/AppointmentModal';

const DEPT_ICONS: Record<string, LucideIcon> = {
  Stethoscope,
  HeartPulse,
  Baby,
  Activity,
  Sparkles,
  Users,
  Smile,
  Microscope,
};

export default function DepartmentsPage() {
  const preset = CLINIC_PRESETS[DEFAULT_PRESET_KEY];
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDeptForBooking, setSelectedDeptForBooking] = useState('');

  const handleOpenBooking = (deptTitle?: string) => {
    setSelectedDeptForBooking(deptTitle || '');
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F7FB]">
      
      {/* Top Header */}
      <TopHeader preset={preset} />

      {/* Main Navbar */}
      <Navbar preset={preset} onOpenBooking={handleOpenBooking} />

      <main className="flex-1">
        
        {/* Page Hero */}
        <section className="bg-[#0B2545] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#123B66]">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex items-center space-x-2 text-xs text-slate-300 mb-4">
              <Link href="/" className="hover:text-[#14B8A6] transition flex items-center">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Home
              </Link>
              <span>/</span>
              <span className="text-[#14B8A6] font-semibold">Medical Departments & Services</span>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#123B66] text-[#14B8A6] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#14B8A6]/30">
                <Building2 className="w-3.5 h-3.5 mr-1.5" />
                Clinical Excellence Centers
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Our Specialized Medical Departments
              </h1>
              <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                Explore our 8 specialized clinical departments. Each department is equipped with modern medical diagnostic infrastructure, sterile operating suites, and senior consultant physicians.
              </p>
            </div>

          </div>
        </section>

        {/* Departments Showcase Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {DEPARTMENTS.map((dept) => {
              const Icon = DEPT_ICONS[dept.iconName] || Building2;
              const assignedDoctors = DOCTORS.filter((d) => d.department.toLowerCase() === dept.name.toLowerCase() || d.departmentId === dept.id);

              return (
                <div
                  key={dept.id}
                  id={dept.slug}
                  className="bg-white rounded-2xl border border-[#DCE5ED] shadow-sm hover:shadow-md hover:border-[#123B66]/40 transition-all duration-200 flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-6 sm:p-8">
                    
                    {/* Top Row: Icon & Head of Department */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="w-13 h-13 rounded-2xl bg-[#F1F7FB] text-[#123B66] flex items-center justify-center p-3 border border-[#DCE5ED]">
                        <Icon className="w-7 h-7" />
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Department Head
                        </span>
                        <span className="text-xs font-bold text-[#123B66]">
                          {dept.headOfDepartment}
                        </span>
                      </div>
                    </div>

                    {/* Department Title & Descriptions */}
                    <h2 className="text-xl font-bold text-[#123B66]">
                      {dept.name}
                    </h2>
                    <p className="text-xs text-[#0D9488] font-semibold mt-1">
                      {dept.description}
                    </p>
                    <p className="text-xs text-[#334155] mt-2.5 leading-relaxed">
                      {dept.longDescription}
                    </p>

                    {/* Treatments & Conditions Treated */}
                    <div className="mt-5 pt-4 border-t border-[#DCE5ED]">
                      <h3 className="text-xs font-bold text-[#123B66] uppercase tracking-wider mb-2.5">
                        Clinical Treatments & Diagnostic Capabilities:
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {dept.servicesOffered.map((service, idx) => (
                          <li key={idx} className="flex items-start text-xs text-[#334155]">
                            <Check className="w-3.5 h-3.5 text-[#0D9488] mr-2 flex-shrink-0 mt-0.5" />
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* On-Duty Consultants Preview */}
                    {assignedDoctors.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-[#DCE5ED]">
                        <span className="text-[11px] font-bold text-[#123B66] block mb-2">
                          Consultants on Panel:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {assignedDoctors.map((doc) => (
                            <Link
                              key={doc.id}
                              href="/doctors"
                              className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-lg bg-[#F1F7FB] border border-[#DCE5ED] text-xs text-[#334155] hover:bg-[#DCE5ED] transition"
                            >
                              <img src={doc.image} alt={doc.name} className="w-4 h-4 rounded-full object-cover" />
                              <span className="font-semibold text-[#123B66]">{doc.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Footer with Consultation Hours & Booking Action */}
                  <div className="p-4 sm:px-8 bg-[#F1F7FB] border-t border-[#DCE5ED] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400 flex-shrink-0" />
                      <span>{dept.consultationHours}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenBooking(dept.name)}
                      className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0f766e] active:scale-95 shadow-sm transition"
                    >
                      <Calendar className="w-3.5 h-3.5 mr-1.5" />
                      <span>Book Department Specialist</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </section>

      </main>

      {/* Footer */}
      <Footer preset={preset} onOpenBooking={() => handleOpenBooking()} />

      {/* Mobile Sticky Bar */}
      <MobileStickyBar preset={preset} onOpenBooking={() => handleOpenBooking()} />

      {/* Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preset={preset}
        initialServiceTitle={selectedDeptForBooking}
      />

    </div>
  );
}
