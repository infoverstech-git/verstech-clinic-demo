'use client';

import React from 'react';
import { PhoneCall, Clock, Calendar, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ClinicPreset } from '@/lib/clinic-data';

interface QuickInfoCardsProps {
  preset: ClinicPreset;
  onOpenBooking: () => void;
}

export default function QuickInfoCards({ preset, onOpenBooking }: QuickInfoCardsProps) {
  const cleanWaNumber = preset.whatsappNumber.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanWaNumber}?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment.`;

  return (
    <section className="relative z-20 -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: WhatsApp Support & Quick Chat */}
        <div className="bg-white rounded-2xl p-6 shadow-card-soft hover:shadow-card-hover border border-[#DCE5ED] flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <span className="p-2.5 rounded-xl bg-[#F1F7FB] text-[#0D9488] border border-[#DCE5ED]">
                <MessageCircle className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/60">
                Direct Helpdesk
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#123B66]">
              WhatsApp Consultation
            </h3>
            <p className="text-xs text-[#334155] mt-1.5 leading-relaxed">
              Message our clinical coordination team on WhatsApp for doctor availability, instant token booking, and report inquiries.
            </p>

            <div className="mt-3.5 p-2.5 rounded-xl bg-[#F1F7FB] border border-[#DCE5ED] flex items-center justify-between text-xs">
              <span className="font-medium text-[#334155]">WhatsApp Number:</span>
              <span className="font-bold text-[#123B66]">+92 335 6123538</span>
            </div>
          </div>

          <div className="pt-4 mt-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#123B66] hover:bg-[#0B2545] active:scale-98 transition shadow-sm"
            >
              <MessageCircle className="w-4 h-4 mr-1.5 text-teal-300" />
              <span>Chat on WhatsApp (+92 335 6123538)</span>
            </a>
          </div>
        </div>

        {/* Card 2: Online Appointment Booking */}
        <div className="bg-white rounded-2xl p-6 shadow-card-soft hover:shadow-card-hover border border-[#DCE5ED] flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <span className="p-2.5 rounded-xl bg-[#F1F7FB] text-[#123B66] border border-[#DCE5ED]">
                <Calendar className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#123B66] bg-[#F1F7FB] px-2.5 py-1 rounded-full border border-[#DCE5ED]">
                Online Priority
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#123B66]">
              Book Appointment
            </h3>
            <p className="text-xs text-[#334155] mt-1.5 leading-relaxed">
              Choose your doctor, pick an available date and time slot, and avoid waiting in clinic queues with fast priority check-in.
            </p>

            <div className="mt-3.5 space-y-1.5 text-xs text-[#334155]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] flex-shrink-0" />
                <span>12+ Board-certified consultants</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] flex-shrink-0" />
                <span>Instant SMS & WhatsApp confirmation</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-3">
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] active:scale-98 transition shadow-sm"
            >
              <Calendar className="w-4 h-4 mr-1.5" />
              <span>Book Appointment Online</span>
            </button>
          </div>
        </div>

        {/* Card 3: Clinic Timings & Schedule */}
        <div className="bg-white rounded-2xl p-6 shadow-card-soft hover:shadow-card-hover border border-[#DCE5ED] flex flex-col justify-between transition-all">
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <span className="p-2.5 rounded-xl bg-[#F1F7FB] text-[#123B66] border border-[#DCE5ED]">
                <Clock className="w-5 h-5" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#334155] bg-[#F1F7FB] px-2.5 py-1 rounded-full border border-[#DCE5ED]">
                OPD Schedule
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#123B66]">
              Consultation Hours
            </h3>
            
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between pb-1.5 border-b border-[#DCE5ED]/60">
                <span className="font-medium text-[#334155]">Monday – Saturday</span>
                <span className="font-bold text-[#123B66]">{preset.timingsWeekday.replace(/Open 24 Hours \(|\)/g, '')}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-[#DCE5ED]/60">
                <span className="font-medium text-[#334155]">Sunday</span>
                <span className="font-bold text-[#123B66]">{preset.timingsSunday}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-3 flex items-center justify-between text-xs">
            <a
              href={`tel:${preset.receptionPhone.replace(/[^0-9+]/g, '')}`}
              className="font-bold text-[#123B66] hover:text-[#0D9488] inline-flex items-center transition"
            >
              <PhoneCall className="w-3.5 h-3.5 mr-1 text-[#0D9488]" />
              <span>Call: {preset.receptionPhone}</span>
            </a>
            <a
              href="#timings"
              className="font-semibold text-[#0F766E] hover:text-[#0D9488] inline-flex items-center transition"
            >
              <span>Full Schedule</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
