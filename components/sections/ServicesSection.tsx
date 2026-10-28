'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Baby, 
  Activity, 
  Bone, 
  Sparkles, 
  Eye, 
  Smile, 
  Microscope,
  Stethoscope,
  Users,
  Check,
  Clock,
  ArrowRight,
  Building2
} from 'lucide-react';
import { MEDICAL_SERVICES } from '@/lib/clinic-data';

interface ServicesSectionProps {
  onOpenBooking: (serviceName?: string) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Heart,
  Baby,
  Bone,
  Eye,
  Stethoscope,
  Activity,
  Sparkles,
  Microscope,
  Users,
  Smile,
};

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 bg-[#F1F7FB] border-b border-[#DCE5ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white text-[#123B66] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#DCE5ED]">
              Clinical Disciplines & Specialties
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B66] tracking-tight">
              Comprehensive Medical Services Under One Roof
            </h2>
            <p className="mt-3 text-base text-[#334155] leading-relaxed">
              From routine family health checkups to advanced specialist consultations, our clinical departments provide evidence-based healthcare with modern equipment.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/departments"
              className="inline-flex items-center px-4 py-2.5 rounded-xl text-xs font-bold text-[#123B66] bg-white hover:bg-[#E4EEF5] border border-[#DCE5ED] transition group"
            >
              <Building2 className="w-3.5 h-3.5 mr-1.5 text-[#0D9488]" />
              <span>Explore All 8 Departments</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform text-[#0D9488]" />
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MEDICAL_SERVICES.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Stethoscope;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-[#DCE5ED] shadow-card-soft hover:shadow-card-hover hover:border-[#14B8A6] transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-5">
                  
                  {/* Top Bar with Icon & Department */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-[#F1F7FB] group-hover:bg-[#123B66] group-hover:text-white text-[#123B66] flex items-center justify-center transition-colors duration-200 border border-[#DCE5ED]">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-semibold text-[#334155] bg-[#F1F7FB] px-2 py-0.5 rounded border border-[#DCE5ED]/60">
                      {service.department}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-[#123B66] group-hover:text-[#0D9488] transition">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#334155] mt-1.5 leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Clinical Features List */}
                  <div className="mt-4 pt-3 border-t border-[#DCE5ED]/60 space-y-1.5">
                    <p className="text-[10px] font-bold text-[#123B66] uppercase tracking-wider">
                      Treatments Offered:
                    </p>
                    <ul className="space-y-1">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start text-[11px] text-[#334155]">
                          <Check className="w-3 h-3 text-[#0D9488] mr-1.5 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Footer with Pricing, Timings & Booking Action */}
                <div className="p-4 bg-[#F1F7FB] border-t border-[#DCE5ED] flex items-center justify-between">
                  <div>
                    <div className="flex items-center text-[10px] text-[#64748B]">
                      <Clock className="w-3 h-3 mr-1 text-[#0D9488]" />
                      <span>{service.timing.split('(')[0]}</span>
                    </div>
                    <p className="text-xs font-bold text-[#123B66] mt-0.5">
                      From <span className="text-[#0D9488]">{service.priceStarting}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenBooking(service.title)}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] transition group/btn shadow-sm"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Note on Lab Reports & Diagnostics */}
        <div className="mt-12 p-5 bg-white border border-[#DCE5ED] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-card-soft">
          <div className="flex items-center space-x-3 text-[#334155]">
            <span className="p-2.5 rounded-xl bg-[#F1F7FB] text-[#0D9488] border border-[#DCE5ED] flex-shrink-0">
              <Microscope className="w-5 h-5" />
            </span>
            <div>
              <p className="text-sm font-bold text-[#123B66]">Need diagnostic blood tests or ultrasound before consulting?</p>
              <p className="text-xs text-[#334155]">Our automated pathology lab is open 24/7 with zero waiting time. Reports delivered directly on WhatsApp.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenBooking('Diagnostic Pathology & Radiology')}
            className="flex-shrink-0 px-4 py-2.5 text-xs font-bold text-white bg-[#123B66] hover:bg-[#0B2545] rounded-xl transition shadow-sm"
          >
            Book Lab Test / Ultrasound
          </button>
        </div>

      </div>
    </section>
  );
}
