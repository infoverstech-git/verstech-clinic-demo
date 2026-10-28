'use client';

import React from 'react';
import { 
  Building2, 
  FlaskConical, 
  Activity, 
  Pill, 
  Video, 
  BedDouble, 
  Smile, 
  Check
} from 'lucide-react';
import { FACILITIES } from '@/lib/clinic-data';

const FACILITY_ICONS: Record<string, React.ElementType> = {
  Building2,
  FlaskConical,
  Activity,
  Pill,
  Video,
  BedDouble,
  Smile,
};

export default function FacilitiesSection() {
  return (
    <section id="facilities" className="py-20 bg-[#F1F7FB] border-y border-[#DCE5ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white text-[#123B66] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#DCE5ED]">
            <Building2 className="w-3.5 h-3.5 mr-1.5 text-[#0D9488]" />
            Infrastructure & Patient Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B66] tracking-tight">
            Equipped with Modern Healthcare Facilities
          </h2>
          <p className="mt-3 text-base text-[#334155] leading-relaxed">
            Our clinical facilities are designed for patient comfort, international hygiene protocols, fast diagnostics, and round-the-clock emergency readiness.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FACILITIES.map((facility) => {
            const Icon = FACILITY_ICONS[facility.iconName] || Building2;

            return (
              <div
                key={facility.id}
                className="bg-white rounded-2xl p-6 border border-[#DCE5ED] shadow-card-soft hover:shadow-card-hover hover:border-[#14B8A6] transition duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-12 h-12 rounded-xl bg-[#F1F7FB] group-hover:bg-[#123B66] text-[#123B66] group-hover:text-white flex items-center justify-center transition-colors border border-[#DCE5ED]">
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className="text-[11px] font-bold text-[#0F766E] bg-teal-50 border border-teal-200/60 px-2.5 py-1 rounded-full">
                      {facility.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#123B66] group-hover:text-[#0D9488] transition">
                    {facility.title}
                  </h3>

                  <p className="text-xs text-[#334155] mt-2.5 leading-relaxed">
                    {facility.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#DCE5ED]/60 flex items-center text-xs text-[#64748B] font-medium">
                  <Check className="w-3.5 h-3.5 text-[#0D9488] mr-1.5" />
                  <span>Certified standards & protocols</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
