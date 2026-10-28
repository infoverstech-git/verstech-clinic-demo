'use client';

import React from 'react';
import { 
  Clock, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Mail, 
  Navigation, 
  Car, 
  Accessibility, 
  Calendar
} from 'lucide-react';
import { ClinicPreset } from '@/lib/clinic-data';

interface TimingsAndLocationProps {
  preset: ClinicPreset;
  onOpenBooking: () => void;
}

export default function TimingsAndLocation({ preset, onOpenBooking }: TimingsAndLocationProps) {
  const weeklySchedule = [
    { day: 'Monday', hours: '08:30 AM – 10:00 PM', status: 'Full OPD Active' },
    { day: 'Tuesday', hours: '08:30 AM – 10:00 PM', status: 'Full OPD Active' },
    { day: 'Wednesday', hours: '08:30 AM – 10:00 PM', status: 'Full OPD Active' },
    { day: 'Thursday', hours: '08:30 AM – 10:00 PM', status: 'Full OPD Active' },
    { day: 'Friday', hours: '08:30 AM – 10:00 PM', status: 'Full OPD Active (Jummah Break 1-2 PM)' },
    { day: 'Saturday', hours: '09:00 AM – 09:00 PM', status: 'Weekend Consultants' },
    { day: 'Sunday', hours: '10:00 AM – 04:00 PM', status: 'On-Call Consultants & 24/7 Triage' },
  ];

  return (
    <section id="timings" className="py-20 bg-[#F1F7FB] border-b border-[#DCE5ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white text-[#123B66] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#DCE5ED]">
            <Clock className="w-3.5 h-3.5 mr-1.5 text-[#0D9488]" />
            Clinic Schedule & Accessibility
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B66] tracking-tight">
            Clinic Hours & Easy Location
          </h2>
          <p className="mt-3 text-base text-[#334155] leading-relaxed">
            Conveniently located with dedicated on-site patient parking, step-free wheelchair access, and flexible morning, evening, and weekend consultation slots.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Weekly Schedule Table */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#DCE5ED] shadow-card-soft p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#DCE5ED]">
              <div className="flex items-center space-x-2.5">
                <span className="p-2 rounded-xl bg-[#F1F7FB] text-[#123B66] border border-[#DCE5ED]">
                  <Clock className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-[#123B66]">OPD Consultation Hours</h3>
                  <p className="text-xs text-[#64748B]">Walk-ins and scheduled appointments</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#0F766E] bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200/60">
                Open Today
              </span>
            </div>

            <div className="divide-y divide-[#DCE5ED]/60">
              {weeklySchedule.map((item, idx) => (
                <div key={idx} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#123B66] w-24">{item.day}</span>
                    <span className="text-[#94A3B8] hidden sm:inline">•</span>
                    <span className="text-[#334155] font-semibold">{item.hours}</span>
                  </div>
                  <span className="text-[11px] text-[#64748B] font-medium sm:text-right">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Emergency 24/7 Notice Banner */}
            <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-rose-950">Emergency & Pharmacy: 24/7</p>
                <p className="text-[11px] text-rose-800">Immediate trauma, fever, and acute stabilization anytime.</p>
              </div>
              <a
                href={`tel:${preset.emergencyPhone.replace(/[^0-9+]/g, '')}`}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition flex-shrink-0 shadow-sm"
              >
                Emergency Call
              </a>
            </div>

            <div className="mt-6 pt-4 border-t border-[#DCE5ED]">
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] transition shadow-sm"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Reserve Consultation Slot</span>
              </button>
            </div>
          </div>

          {/* Right Column: Location, Map & Contact Details */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Address & Quick Directions Card */}
            <div className="bg-white rounded-2xl border border-[#DCE5ED] shadow-card-soft p-6 sm:p-8">
              <div className="flex items-center space-x-2.5 mb-4">
                <span className="p-2 rounded-xl bg-[#F1F7FB] text-[#0D9488] border border-[#DCE5ED]">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-[#123B66]">Location & Accessibility</h3>
                  <p className="text-xs text-[#64748B]">{preset.city}</p>
                </div>
              </div>

              <div className="p-4 bg-[#F1F7FB] rounded-xl border border-[#DCE5ED] text-xs space-y-2">
                <p className="text-[#123B66] font-bold text-sm">
                  {preset.name}
                </p>
                <p className="text-[#334155]">
                  {preset.address}, {preset.city}
                </p>
                <p className="text-[#64748B] text-[11px] pt-1 border-t border-[#DCE5ED]/60">
                  Nearby Landmarks: Central Main Boulevard, Easy access from Ring Road & Metrobus.
                </p>
              </div>

              {/* Convenience Features */}
              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="p-3 bg-[#F1F7FB] rounded-xl border border-[#DCE5ED] flex items-center space-x-2">
                  <Car className="w-4 h-4 text-[#0D9488] flex-shrink-0" />
                  <span className="text-[#334155] font-medium">Free Valet & Patient Parking</span>
                </div>
                <div className="p-3 bg-[#F1F7FB] rounded-xl border border-[#DCE5ED] flex items-center space-x-2">
                  <Accessibility className="w-4 h-4 text-[#0D9488] flex-shrink-0" />
                  <span className="text-[#334155] font-medium">Wheelchair Ramps & Elevator</span>
                </div>
              </div>

              {/* Contact Links */}
              <div className="mt-6 pt-4 border-t border-[#DCE5ED] space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B] flex items-center">
                    <Phone className="w-3.5 h-3.5 mr-1.5 text-[#0D9488]" />
                    Reception / Appointments:
                  </span>
                  <a href={`tel:${preset.receptionPhone.replace(/[^0-9+]/g, '')}`} className="font-bold text-[#123B66] hover:text-[#0D9488]">
                    {preset.receptionPhone}
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#64748B] flex items-center">
                    <MessageCircle className="w-3.5 h-3.5 mr-1.5 text-[#0D9488]" />
                    Official WhatsApp Desk:
                  </span>
                  <a 
                    href={`https://wa.me/${preset.whatsappNumber.replace(/[^0-9]/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-bold text-[#0F766E] hover:underline"
                  >
                    {preset.whatsappNumber}
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#64748B] flex items-center">
                    <Mail className="w-3.5 h-3.5 mr-1.5 text-[#0D9488]" />
                    Official Inquiries:
                  </span>
                  <a href={`mailto:${preset.email}`} className="font-semibold text-[#334155] hover:text-[#123B66]">
                    {preset.email}
                  </a>
                </div>
              </div>

              {/* Map CTA */}
              <div className="mt-6 pt-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(preset.name + ' ' + preset.address + ' ' + preset.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-bold text-[#123B66] bg-[#F1F7FB] hover:bg-[#E4EEF5] border border-[#DCE5ED] transition"
                >
                  <Navigation className="w-3.5 h-3.5 mr-1.5 text-[#0D9488]" />
                  <span>Open Interactive Map & Get GPS Directions</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
