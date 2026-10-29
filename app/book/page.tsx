'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Calendar, 
  ArrowLeft, 
  PhoneCall, 
  MessageCircle, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';
import { CLINIC_PRESETS, DEFAULT_PRESET_KEY } from '@/lib/clinic-data';
import TopHeader from '@/components/layout/TopHeader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileStickyBar from '@/components/layout/MobileStickyBar';
import AppointmentForm from '@/components/booking/AppointmentForm';

function BookingContent() {
  const searchParams = useSearchParams();
  const initialDoctor = searchParams.get('doctor') || '';
  const initialDept = searchParams.get('dept') || '';
  const preset = CLINIC_PRESETS[DEFAULT_PRESET_KEY];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F7FB]">
      <TopHeader preset={preset} />
      <Navbar preset={preset} onOpenBooking={() => {}} />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs text-[#334155] mb-6">
          <Link href="/" className="hover:text-[#14B8A6] transition flex items-center">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Home
          </Link>
          <span>/</span>
          <span className="text-[#123B66] font-semibold">Online Appointment Booking</span>
        </div>

        {/* Demo Architecture Notice (Phase 4 Compliance) */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">VERSTECH Labs Sales Demo Architecture:</span>
              <p className="text-[11px] text-amber-800 mt-0.5">
                This online booking system runs in client presentation demo mode using browser local storage. In a live production deployment, VERSTECH Labs connects this form to a HIPAA-compliant PostgreSQL database with SMS verification gateways and real-time clinic ERP synchronization.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-800 px-2 py-0.5 rounded flex-shrink-0">
            Local Demo Store
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: The Interactive Booking Form */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#DCE5ED] shadow-sm p-6 sm:p-10">
            <div className="mb-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#F1F7FB] text-[#123B66] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#DCE5ED]">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#14B8A6]" />
                Patient Registration & Slot Reservation
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#123B66] tracking-tight">
                Reserve Your Doctor Consultation
              </h1>
              <p className="text-xs text-[#334155] mt-1">
                Select your preferred doctor, time slot, and consultation mode. Confirmation tokens are sent via SMS and WhatsApp.
              </p>
            </div>

            <AppointmentForm
              preset={preset}
              initialDoctorName={initialDoctor}
              initialDepartmentName={initialDept}
              isStandalonePage={true}
            />
          </div>

          {/* Right Column: High-Trust Clinical Support Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Urgent Care Hotline */}
            <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200 text-rose-950 space-y-3">
              <div className="flex items-center space-x-2 text-rose-800 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span>Immediate Medical Emergency?</span>
              </div>
              <p className="text-xs text-rose-800 leading-relaxed">
                Do not wait for an online appointment if you have sudden chest pain, severe breathing difficulty, acute trauma, or high fever in infants.
              </p>
              <div className="pt-1">
                <a
                  href={`tel:${preset.emergencyPhone.replace(/[^0-9+]/g, '')}`}
                  className="w-full flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5 mr-2" />
                  <span>Call 24/7 Helpline: {preset.emergencyPhone}</span>
                </a>
              </div>
            </div>

            {/* WhatsApp Assistance */}
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 space-y-3">
              <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Prefer WhatsApp Booking?</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                You can chat directly with our front desk coordinator on WhatsApp at <strong>+92 335 6123538</strong> to inquire about doctor availability and fees.
              </p>
              <a
                href={`https://wa.me/${preset.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-2" />
                <span>Chat on WhatsApp (+92 335 6123538)</span>
              </a>
            </div>

            {/* Patient Check-in Guidelines */}
            <div className="bg-white rounded-2xl p-6 border border-[#DCE5ED] space-y-3 text-xs">
              <h3 className="font-bold text-[#123B66] uppercase tracking-wider flex items-center">
                <ShieldCheck className="w-4 h-4 text-[#123B66] mr-1.5" />
                Patient Check-In Policy
              </h3>
              <ul className="space-y-2 text-[#334155]">
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Arrive 10 minutes prior to your scheduled time slot for initial vital signs check-in.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Bring previous medical reports, discharge summaries, or recent laboratory tests.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] mr-2 flex-shrink-0 mt-0.5" />
                  <span>Free patient parking and wheelchair ramps available at the main entrance.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </main>

      <Footer preset={preset} onOpenBooking={() => {}} />
      <MobileStickyBar preset={preset} onOpenBooking={() => {}} />
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs font-bold text-slate-500">Loading booking form...</div>}>
      <BookingContent />
    </Suspense>
  );
}
