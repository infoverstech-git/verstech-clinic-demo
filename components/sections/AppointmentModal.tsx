'use client';

import React, { useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { ClinicPreset } from '@/lib/clinic-data';
import AppointmentForm from '@/components/booking/AppointmentForm';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preset: ClinicPreset;
  initialDoctorName?: string;
  initialServiceTitle?: string;
}

export default function AppointmentModal({
  isOpen,
  onClose,
  preset,
  initialDoctorName = '',
  initialServiceTitle = '',
}: AppointmentModalProps) {
  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-[#123B66] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#0B2545]">
          <div className="flex items-center space-x-2.5">
            <span className="p-2 rounded-xl bg-white/10 text-teal-300">
              <Calendar className="w-5 h-5" />
            </span>
            <div>
              <h3 id="booking-modal-title" className="font-bold text-base text-white">
                Book a Doctor Appointment
              </h3>
              <p className="text-xs text-slate-300">
                {preset.name} • Rapid OPD Booking
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          <AppointmentForm
            preset={preset}
            initialDoctorName={initialDoctorName}
            initialDepartmentName={initialServiceTitle}
            onSuccess={() => {
              // keep open to show receipt
            }}
          />
        </div>

      </div>
    </div>
  );
}
