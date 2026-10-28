'use client';

import React from 'react';
import { Phone, Clock, MapPin, MessageCircle, AlertCircle } from 'lucide-react';
import { ClinicPreset } from '@/lib/clinic-data';

interface TopHeaderProps {
  preset: ClinicPreset;
}

export default function TopHeader({ preset }: TopHeaderProps) {
  return (
    <div className="bg-[#0B2545] text-slate-200 text-xs border-b border-[#123B66]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          
          {/* Emergency & Quick Timings */}
          <div className="flex items-center space-x-6 flex-wrap gap-y-1">
            <div className="flex items-center text-rose-300 font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping mr-2 inline-block"></span>
              <AlertCircle className="w-3.5 h-3.5 mr-1" />
              <span>24/7 Emergency:</span>
              <a 
                href={`tel:${preset.emergencyPhone.replace(/[^0-9+]/g, '')}`} 
                className="ml-1 text-white hover:text-rose-200 font-bold underline-offset-2 hover:underline transition"
              >
                {preset.emergencyPhone}
              </a>
            </div>

            <div className="hidden md:flex items-center text-slate-300">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
              <span>{preset.timingsWeekday}</span>
            </div>

            <div className="hidden lg:flex items-center text-slate-300">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
              <span>{preset.address}, {preset.city}</span>
            </div>
          </div>

          {/* Quick Contact & WhatsApp */}
          <div className="flex items-center space-x-4 ml-auto">
            <a
              href={`https://wa.me/${preset.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20a%20doctor%20appointment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-teal-300 hover:text-teal-200 font-bold transition"
              title="Chat on WhatsApp (+92 335 6123538)"
            >
              <MessageCircle className="w-3.5 h-3.5 mr-1 text-teal-400" />
              <span>WhatsApp: +92 335 6123538</span>
            </a>

            <div className="h-3 w-px bg-slate-700 hidden sm:block"></div>

            <a
              href={`tel:${preset.receptionPhone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center text-slate-200 hover:text-teal-300 transition"
            >
              <Phone className="w-3.5 h-3.5 mr-1 text-teal-400" />
              <span>Reception: <strong className="text-white">{preset.receptionPhone}</strong></span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
