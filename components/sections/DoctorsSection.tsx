'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Stethoscope, 
  Star, 
  Calendar, 
  Clock, 
  GraduationCap, 
  Award, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { DOCTORS, Doctor, ClinicPreset } from '@/lib/clinic-data';
import DoctorProfileModal from '@/components/doctors/DoctorProfileModal';

interface DoctorsSectionProps {
  onOpenBooking: (doctorName?: string) => void;
  preset: ClinicPreset;
}

export default function DoctorsSection({ onOpenBooking, preset }: DoctorsSectionProps) {
  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState<Doctor | null>(null);

  // Take the first 4 doctors for the homepage spotlight
  const featuredDoctors = DOCTORS.slice(0, 4);

  return (
    <section id="doctors" className="py-20 bg-white border-b border-[#DCE5ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#F1F7FB] text-[#123B66] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#DCE5ED]">
              <Stethoscope className="w-3.5 h-3.5 mr-1.5 text-[#0D9488]" />
              Senior Medical Faculty
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B66] tracking-tight">
              Consult Board-Certified Doctors & Specialists
            </h2>
            <p className="mt-3 text-base text-[#334155] leading-relaxed">
              Every consultant on our panel brings over a decade of clinical experience, postgraduate fellowship credentials, and a patient-first focus.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/doctors"
              className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-bold text-[#123B66] bg-[#F1F7FB] hover:bg-[#E4EEF5] border border-[#DCE5ED] transition group"
            >
              <span>Explore All {DOCTORS.length} Specialists</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform text-[#0D9488]" />
            </Link>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl border border-[#DCE5ED] shadow-card-soft hover:shadow-card-hover hover:border-[#14B8A6] transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                
                {/* Doctor Photo & Badges */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/80 via-transparent to-transparent"></div>
                  
                  {/* Department Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-[#123B66] shadow-sm">
                    {doctor.department}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-[#0B2545]/90 text-amber-300 px-2 py-0.5 rounded-md text-xs font-bold flex items-center shadow-sm">
                    <Star className="w-3 h-3 fill-amber-300 mr-1" />
                    <span>{doctor.rating}</span>
                    <span className="text-slate-300 text-[10px] ml-1">({doctor.reviewCount})</span>
                  </div>

                  {/* Bottom overlay info */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs text-teal-300 font-semibold">{doctor.specialty}</p>
                    <h3 className="text-base font-extrabold text-white leading-snug">{doctor.name}</h3>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start text-xs text-[#334155]">
                    <GraduationCap className="w-3.5 h-3.5 text-[#0D9488] mr-1.5 flex-shrink-0 mt-0.5" />
                    <span className="font-medium text-[#334155] line-clamp-1">{doctor.qualification}</span>
                  </div>

                  <div className="flex items-center text-xs text-[#334155]">
                    <Award className="w-3.5 h-3.5 text-[#0D9488] mr-1.5 flex-shrink-0" />
                    <span><strong className="text-[#123B66]">{doctor.experienceYears} Years</strong> Clinical Practice</span>
                  </div>

                  <p className="text-[11px] text-[#64748B] line-clamp-2 leading-relaxed">
                    {doctor.about}
                  </p>

                  <div className="pt-2 border-t border-[#DCE5ED]">
                    <div className="flex items-center text-[11px] text-[#0F766E] font-semibold">
                      <Clock className="w-3 h-3 mr-1 text-[#0D9488]" />
                      <span>{doctor.availability}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Card Footer: Fee & Booking */}
              <div className="p-4 bg-[#F1F7FB] border-t border-[#DCE5ED] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDoctorForModal(doctor)}
                  className="px-2.5 py-2 rounded-lg text-xs font-bold text-[#123B66] bg-white hover:bg-[#E4EEF5] border border-[#DCE5ED] transition"
                  title="View Doctor Background"
                >
                  Profile
                </button>

                <button
                  type="button"
                  onClick={() => onOpenBooking(doctor.name)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] active:scale-95 shadow-sm transition"
                >
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  <span>Book ({doctor.consultationFee})</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Doctor Profile Modal */}
        <DoctorProfileModal
          doctor={selectedDoctorForModal}
          onClose={() => setSelectedDoctorForModal(null)}
          onBookDoctor={(name) => onOpenBooking(name)}
          preset={preset}
        />

        {/* Demo Customization Callout */}
        <div className="mt-10 text-center text-xs text-[#64748B]">
          <p>
            * All doctor profiles above are realistic fictional placeholders for demonstration. When building for your clinic or hospital, VERSTECH Labs customizes all doctor bios, real photos, OPD days, and fees.
          </p>
        </div>

      </div>
    </section>
  );
}
