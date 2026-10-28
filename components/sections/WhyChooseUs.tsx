'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  FileText, 
  HeartHandshake, 
  Award, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { CLINIC_STATS, ClinicPreset } from '@/lib/clinic-data';

interface WhyChooseUsProps {
  preset: ClinicPreset;
  onOpenBooking: () => void;
}

export default function WhyChooseUs({ preset, onOpenBooking }: WhyChooseUsProps) {
  const pillars = [
    {
      icon: Clock,
      title: 'Zero Long Waiting Times',
      description: 'Our timed appointment scheduling system guarantees you are seen by your doctor within 15 minutes of scheduled check-in.',
    },
    {
      icon: FileText,
      title: 'Digital WhatsApp Reports',
      description: 'Never drive back just to collect a lab report. All ultrasound, blood tests, and prescriptions are delivered safely to your smartphone.',
    },
    {
      icon: ShieldCheck,
      title: 'Hospital-Grade Sterilization',
      description: 'Autoclaved surgical instruments, HEPA air filtration in procedure rooms, and strict WHO sanitation standards.',
    },
    {
      icon: HeartHandshake,
      title: 'Transparent & Ethical Care',
      description: 'Clear upfront consultation fees, no unnecessary tests or hidden pharmacy markups. Only patient-first medicine.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-[#DCE5ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#F1F7FB] text-[#123B66] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#DCE5ED]">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#0D9488]" />
              Patient-Centric Standards
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B66] tracking-tight">
              Why Patients & Families Trust {preset.name}
            </h2>
            <p className="mt-4 text-base text-[#334155] leading-relaxed">
              We understand that visiting a doctor can be stressful. That’s why we’ve re-engineered the clinic experience to prioritize punctuality, clear communication, and unhurried consultations.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#F1F7FB] p-6 rounded-2xl border border-[#DCE5ED]">
            <div className="flex items-center space-x-3 mb-3">
              <span className="p-2.5 rounded-xl bg-[#123B66] text-white">
                <Award className="w-5 h-5 text-teal-300" />
              </span>
              <div>
                <h4 className="font-bold text-sm text-[#123B66]">Clinical Assurance</h4>
                <p className="text-xs text-[#64748B]">Certified hygiene & clinical protocols</p>
              </div>
            </div>
            <p className="text-xs text-[#334155] leading-relaxed">
              "A medical consultation should be about the patient, not paperwork. We ensure every patient receives comprehensive evaluation time."
            </p>
            <div className="mt-4 pt-3 border-t border-[#DCE5ED] flex items-center justify-between">
              <span className="text-xs font-bold text-[#123B66]">Need a consultation today?</span>
              <button
                type="button"
                onClick={onOpenBooking}
                className="text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] px-3.5 py-1.5 rounded-lg transition shadow-sm"
              >
                Book Online
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-[#F1F7FB] rounded-2xl border border-[#DCE5ED] hover:border-[#14B8A6] transition duration-150"
              >
                <div className="w-11 h-11 rounded-xl bg-[#123B66] text-teal-300 flex items-center justify-center mb-4 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#123B66] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#334155] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Key Metrics Counters */}
        <div className="bg-[#F1F7FB] rounded-2xl p-8 border border-[#DCE5ED] shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#DCE5ED]">
            {CLINIC_STATS.map((stat, idx) => (
              <div key={idx} className={idx > 1 ? 'pt-6 lg:pt-0' : ''}>
                <p className="text-3xl sm:text-4xl font-black text-[#123B66]">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-[#123B66] mt-1">
                  {stat.label}
                </p>
                <p className="text-xs text-[#334155] mt-0.5">
                  {stat.sublabel}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
