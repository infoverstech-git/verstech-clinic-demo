'use client';

import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { ClinicPreset } from '@/lib/clinic-data';

interface MobileStickyBarProps {
  preset: ClinicPreset;
  onOpenBooking: () => void;
}

export default function MobileStickyBar({ preset, onOpenBooking }: MobileStickyBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#DCE5ED] shadow-lg p-2.5 sm:hidden">
      <div className="grid grid-cols-3 gap-2">
        
        {/* Direct Call */}
        <a
          href={`tel:${preset.receptionPhone.replace(/[^0-9+]/g, '')}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#F1F7FB] text-[#123B66] text-[11px] font-bold border border-[#DCE5ED] active:bg-[#E4EEF5] transition"
        >
          <Phone className="w-4 h-4 text-[#123B66] mb-0.5" />
          <span>Call Desk</span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${preset.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-teal-50 text-[#0F766E] text-[11px] font-bold border border-teal-200/60 active:bg-teal-100 transition"
        >
          <MessageCircle className="w-4 h-4 text-[#0D9488] mb-0.5" />
          <span>WhatsApp</span>
        </a>

        {/* Book Appointment CTA */}
        <button
          type="button"
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#0D9488] text-white text-[11px] font-bold active:bg-[#0F766E] shadow-sm transition"
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span>Book Slot</span>
        </button>

      </div>
    </div>
  );
}
