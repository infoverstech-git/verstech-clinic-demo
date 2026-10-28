'use client';

import React from 'react';
import { 
  Calendar, 
  PhoneCall, 
  MessageCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  MapPin
} from 'lucide-react';
import { ClinicPreset, DOCTORS } from '@/lib/clinic-data';

interface HeroProps {
  preset: ClinicPreset;
  onOpenBooking: (doctorName?: string) => void;
}

export default function Hero({ preset, onOpenBooking }: HeroProps) {
  const primaryDoctor = DOCTORS[0];

  return (
    <section className="relative overflow-hidden bg-white pt-10 pb-16 lg:pt-16 lg:pb-20 border-b border-[#DCE5ED]">
      
      {/* Background Subtle Medical Tone */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#F1F7FB] blur-3xl"></div>
        <div className="absolute top-1/2 -left-32 w-96 h-96 rounded-full bg-[#F1F7FB] blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Pill / Eyebrow */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F1F7FB] border border-[#DCE5ED] text-[#123B66] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#14B8A6] badge-pulse"></span>
              <span>{preset.heroBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#123B66] tracking-tight leading-[1.15]">
              Compassionate Healthcare,{' '}
              <span className="text-[#0D9488]">
                Board-Certified
              </span>{' '}
              Specialists.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-2xl">
              {preset.tagline}. We combine senior clinical expertise, modern diagnostic infrastructure, and zero unnecessary waiting times to provide your family with accessible, reliable care.
            </p>

            {/* Healthcare Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center space-x-2.5 text-xs text-[#334155] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] flex-shrink-0" />
                <span>Verified Senior Consultants (FCPS / MRCP)</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-[#334155] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] flex-shrink-0" />
                <span>Same-Day Ultrasound & Digital Lab Reports</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-[#334155] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] flex-shrink-0" />
                <span>Transparent Consultations & Clear OPD Fees</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs text-[#334155] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] flex-shrink-0" />
                <span>24/7 Emergency Triage & Pharmacy On-Site</span>
              </div>
            </div>

            {/* Prominent CTAs */}
            <div className="pt-3 flex flex-wrap gap-3 sm:items-center">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] active:scale-98 shadow-sm transition duration-150 group"
              >
                <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                <span>Book Doctor Appointment</span>
              </button>

              <a
                href={`https://wa.me/${preset.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%2C%20I%20would%20like%20to%20consult%20a%20doctor.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl text-sm font-bold text-white bg-[#123B66] hover:bg-[#0B2545] active:scale-98 shadow-sm transition duration-150"
              >
                <MessageCircle className="w-4 h-4 mr-2 text-teal-300" />
                <span>WhatsApp: +92 335 6123538</span>
              </a>

              <a
                href={`tel:${preset.receptionPhone.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center justify-center px-4 py-3.5 rounded-xl text-sm font-medium text-[#123B66] bg-[#F1F7FB] hover:bg-[#E4EEF5] border border-[#DCE5ED] shadow-sm transition duration-150"
              >
                <PhoneCall className="w-4 h-4 mr-2 text-[#0D9488]" />
                <span>Call Helpline</span>
              </a>
            </div>

            {/* Location & OPD Notice */}
            <div className="flex items-center space-x-2 text-xs text-[#64748B] pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#0D9488] flex-shrink-0" />
              <span>{preset.address}, {preset.city}</span>
            </div>

          </div>

          {/* Right Column: High-Trust Clinical Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-[#DCE5ED] shadow-sm overflow-hidden">
              
              {/* Card Header with Live Status */}
              <div className="bg-[#F1F7FB] p-5 border-b border-[#DCE5ED]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] animate-pulse"></span>
                    <span className="text-xs font-bold text-[#0F766E] tracking-wide uppercase">
                      Clinic Active Now
                    </span>
                  </div>
                  <span className="text-[11px] text-[#64748B] font-medium">
                    Today: {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#123B66] mt-2">
                  Rapid Doctor Consultation
                </h3>
                <p className="text-xs text-[#334155] mt-0.5">
                  Pre-book online to skip the front desk queue and reserve your time slot.
                </p>
              </div>

              {/* Doctor on Duty Spotlight */}
              <div className="p-5 space-y-4">
                <div className="p-3.5 bg-[#F1F7FB] rounded-xl border border-[#DCE5ED] flex items-center space-x-3.5">
                  <img
                    src={primaryDoctor.image}
                    alt={primaryDoctor.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60">
                        {primaryDoctor.department}
                      </span>
                      <span className="text-xs font-semibold text-[#0D9488]">
                        Available Today
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-[#123B66] truncate mt-1">
                      {primaryDoctor.name}
                    </h4>
                    <p className="text-[11px] text-[#64748B] truncate">
                      {primaryDoctor.qualification}
                    </p>
                    <p className="text-[11px] text-[#123B66] font-semibold mt-0.5 flex items-center">
                      <Clock className="w-3 h-3 mr-1 inline text-[#0D9488]" />
                      {primaryDoctor.availability}
                    </p>
                  </div>
                </div>

                {/* Quick Consultation Info */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-[#F1F7FB] rounded-xl border border-[#DCE5ED]">
                    <p className="text-[11px] text-[#64748B] font-medium">Consultation Fee</p>
                    <p className="text-base font-extrabold text-[#123B66] mt-0.5">{primaryDoctor.consultationFee}</p>
                    <p className="text-[10px] text-[#0D9488] font-medium">Standard OPD</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#DCE5ED]">
                    <p className="text-[11px] text-[#64748B] font-medium">Avg Check-In Time</p>
                    <p className="text-base font-extrabold text-[#123B66] mt-0.5">15 Minutes</p>
                    <p className="text-[10px] text-[#64748B]">With Prior Booking</p>
                  </div>
                </div>

                {/* Quick Action in Card */}
                <button
                  type="button"
                  onClick={() => onOpenBooking(primaryDoctor.name)}
                  className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] active:scale-98 shadow-sm transition"
                >
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  <span>Reserve Slot with {primaryDoctor.name}</span>
                </button>

                {/* Emergency note */}
                <p className="text-[11px] text-center text-[#64748B]">
                  Need immediate care? Call reception at{' '}
                  <a href={`tel:${preset.receptionPhone.replace(/[^0-9+]/g, '')}`} className="font-bold text-[#123B66] hover:text-[#0D9488] underline">
                    {preset.receptionPhone}
                  </a>
                </p>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
