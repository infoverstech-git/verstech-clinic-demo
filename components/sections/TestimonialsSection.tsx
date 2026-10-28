'use client';

import React from 'react';
import { Star, HeartHandshake, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS, ClinicPreset } from '@/lib/clinic-data';

interface TestimonialsSectionProps {
  preset: ClinicPreset;
}

export default function TestimonialsSection({ preset }: TestimonialsSectionProps) {
  return (
    <section id="reviews" className="py-20 bg-white border-b border-[#DCE5ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#F1F7FB] text-[#123B66] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#DCE5ED]">
            <HeartHandshake className="w-3.5 h-3.5 mr-1.5 text-[#0D9488]" />
            Patient Experience & Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#123B66] tracking-tight">
            Trusted by Families Across the Region
          </h2>
          <p className="mt-3 text-base text-[#334155] leading-relaxed">
            Real feedback from verified patients reflecting our dedication to gentle clinical care, punctual appointments, and patient dignity.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-[#F1F7FB] rounded-2xl p-6 border border-[#DCE5ED] shadow-card-soft flex flex-col justify-between hover:shadow-card-hover transition duration-200"
            >
              <div>
                
                {/* Rating & Treatment */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex space-x-1 text-amber-500">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                    Verified Visit
                  </span>
                </div>

                {/* Treatment Badge */}
                <p className="text-xs font-bold text-[#123B66] mb-2">
                  {testimonial.treatment}
                </p>

                {/* Comment */}
                <p className="text-xs text-[#334155] leading-relaxed italic">
                  "{testimonial.comment}"
                </p>

              </div>

              {/* Author & Doctor Consulted */}
              <div className="pt-4 mt-4 border-t border-[#DCE5ED] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#123B66]">
                    {testimonial.patientName}
                  </h4>
                  <p className="text-[11px] text-[#64748B]">
                    Consulted: <span className="font-semibold text-[#334155]">{testimonial.doctorConsulted}</span>
                  </p>
                </div>
                <span className="text-[10px] text-[#64748B] font-medium">
                  {testimonial.date}
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Trust summary banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#F1F7FB] border border-[#DCE5ED] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="w-10 h-10 rounded-xl bg-[#123B66] text-white flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-teal-300" />
            </span>
            <div>
              <p className="text-sm font-bold text-[#123B66]">Over 99% of patients would recommend {preset.name}</p>
              <p className="text-xs text-[#334155]">Based on regular post-consultation digital follow-up surveys.</p>
            </div>
          </div>

          <a
            href="#contact"
            className="text-xs font-bold text-[#0D9488] hover:text-[#0F766E] underline flex-shrink-0"
          >
            Leave feedback / Inquire with Patient Care
          </a>
        </div>

      </div>
    </section>
  );
}
