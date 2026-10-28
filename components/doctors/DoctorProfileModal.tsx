'use client';

import React, { useEffect } from 'react';
import { 
  X, 
  GraduationCap, 
  Award, 
  Calendar, 
  Clock, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  Stethoscope,
  MapPin,
  Heart,
  MessageCircle
} from 'lucide-react';
import { Doctor, ClinicPreset } from '@/lib/clinic-data';

interface DoctorProfileModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookDoctor: (doctorName: string) => void;
  preset: ClinicPreset;
}

export default function DoctorProfileModal({
  doctor,
  onClose,
  onBookDoctor,
  preset,
}: DoctorProfileModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (doctor) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [doctor, onClose]);

  if (!doctor) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctor-modal-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-[#123B66] text-white p-5 flex items-center justify-between border-b border-[#0B2545]">
          <div className="flex items-center space-x-2">
            <Stethoscope className="w-5 h-5 text-teal-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-200">
              Doctor Profile & Credentials
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
            aria-label="Close profile modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Top Overview Grid */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-5 border-b border-slate-200">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-medical-500 shadow-md">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-[11px] font-bold text-cyanHealth-700 bg-cyanHealth-50 px-2.5 py-0.5 rounded-md border border-cyanHealth-200">
                  {doctor.department}
                </span>
                <span className="text-xs font-bold text-amber-500 flex items-center">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                  {doctor.rating} <span className="text-slate-400 text-[11px] ml-1">({doctor.reviewCount} reviews)</span>
                </span>
              </div>

              <h2 id="doctor-modal-title" className="text-xl font-extrabold text-slate-900">
                {doctor.name}
              </h2>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {doctor.specialty}
              </p>
              <p className="text-xs text-medical-600 font-semibold mt-1">
                {doctor.qualification}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-600">
                <span className="flex items-center">
                  <Award className="w-3.5 h-3.5 text-medical-600 mr-1.5" />
                  <strong>{doctor.experienceYears} Years</strong> Clinical Practice
                </span>
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                  <span className="text-emerald-700 font-semibold">{doctor.availability}</span>
                </span>
              </div>
            </div>
          </div>

          {/* About Doctor */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Clinical Background & Approach
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {doctor.about}
            </p>
          </div>

          {/* Clinical Focus Areas */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Areas of Specialization
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {doctor.clinicalFocus.map((focus, idx) => (
                <div key={idx} className="flex items-center text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyanHealth-600 mr-2 flex-shrink-0" />
                  <span>{focus}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Fellowships */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              Education & Verified Fellowships
            </h3>
            <ul className="space-y-1.5">
              {doctor.education.map((edu, idx) => (
                <li key={idx} className="flex items-start text-xs text-slate-600">
                  <GraduationCap className="w-4 h-4 text-medical-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Consultation Timings & Available Days */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Consultation Schedule at {preset.name}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                const isAvailable = doctor.days.includes(day);
                return (
                  <span
                    key={day}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      isAvailable
                        ? 'bg-medical-600 text-white shadow-xs'
                        : 'bg-slate-200/70 text-slate-400 line-through'
                    }`}
                  >
                    {day}
                  </span>
                );
              })}
            </div>

            <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-200">
              <span className="text-slate-500">Standard Consultation Fee:</span>
              <span className="font-extrabold text-sm text-slate-900">{doctor.consultationFee}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookDoctor(doctor.name);
              }}
              className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] active:scale-98 shadow-sm transition flex items-center justify-center space-x-1.5"
            >
              <Calendar className="w-4 h-4 mr-1.5" />
              <span>Book Appointment</span>
            </button>

            <a
              href={`https://wa.me/${preset.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello, I would like to consult with ${doctor.name} (${doctor.specialty}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#123B66] hover:bg-[#0B2545] active:scale-98 shadow-sm transition flex items-center justify-center space-x-1.5"
              title="Chat on WhatsApp (+92 335 6123538)"
            >
              <MessageCircle className="w-4 h-4 mr-1 text-teal-300" />
              <span>WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 rounded-xl text-xs font-bold text-[#123B66] bg-[#F1F7FB] hover:bg-[#E4EEF5] border border-[#DCE5ED] transition"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
