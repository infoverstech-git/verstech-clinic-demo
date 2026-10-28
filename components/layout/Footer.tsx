'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Cross, 
  Phone, 
  MapPin, 
  Mail, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  UserCog
} from 'lucide-react';
import { ClinicPreset } from '@/lib/clinic-data';

interface FooterProps {
  preset: ClinicPreset;
  onOpenBooking: () => void;
}

export default function Footer({ preset, onOpenBooking }: FooterProps) {
  return (
    <footer id="contact" className="bg-[#0B2545] text-slate-300 pt-16 pb-12 border-t border-[#123B66]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Emergency & Booking Strip */}
        <div className="p-6 rounded-2xl bg-[#123B66] border border-[#14B8A6]/30 mb-14 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <span className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-400/40 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-rose-300">
                24/7 Medical Emergency Hotline
              </p>
              <h4 className="text-xl font-extrabold text-white">
                {preset.emergencyPhone}
              </h4>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button
              type="button"
              onClick={onOpenBooking}
              className="flex-1 md:flex-none px-5 py-3 rounded-xl text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] shadow-sm transition"
            >
              Book Doctor Appointment
            </button>

            <a
              href={`https://wa.me/${preset.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none px-4 py-3 rounded-xl text-xs font-bold text-white bg-[#0B2545] hover:bg-[#061628] border border-teal-400/40 transition text-center shadow-sm"
            >
              WhatsApp (+92 335 6123538)
            </a>
          </div>
        </div>

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: About & Identity */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#123B66] border border-teal-400/30 flex items-center justify-center text-teal-400 shadow">
                <Cross className="w-5 h-5 transform rotate-45" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                {preset.name}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Dedicated to delivering clinical excellence, patient-centered care, and modern healthcare services to our community.
            </p>

            <div className="flex items-center space-x-2 text-xs text-teal-300">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Accredited Healthcare Standards</span>
            </div>
          </div>

          {/* Col 2: Clinical Specialties */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#123B66] pb-2">
              Medical Specialties
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link href="/departments#cardiology" className="hover:text-teal-300 transition flex items-center"><ChevronRight className="w-3 h-3 mr-1 text-slate-500" /> Cardiology & Heart Care</Link></li>
              <li><Link href="/departments#pediatrics" className="hover:text-teal-300 transition flex items-center"><ChevronRight className="w-3 h-3 mr-1 text-slate-500" /> Pediatrics & Child Health</Link></li>
              <li><Link href="/departments#general-medicine" className="hover:text-teal-300 transition flex items-center"><ChevronRight className="w-3 h-3 mr-1 text-slate-500" /> Internal Medicine & Diabetes</Link></li>
              <li><Link href="/departments#orthopedics" className="hover:text-teal-300 transition flex items-center"><ChevronRight className="w-3 h-3 mr-1 text-slate-500" /> Orthopedics & Joint Care</Link></li>
              <li><Link href="/departments#dermatology" className="hover:text-teal-300 transition flex items-center"><ChevronRight className="w-3 h-3 mr-1 text-slate-500" /> Dermatology & Aesthetics</Link></li>
              <li><Link href="/departments#diagnostics" className="hover:text-teal-300 transition flex items-center"><ChevronRight className="w-3 h-3 mr-1 text-slate-500" /> 24/7 Diagnostic Pathology</Link></li>
            </ul>
          </div>

          {/* Col 3: Quick Patient Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#123B66] pb-2">
              Patient Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/book" className="hover:text-teal-300 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-slate-500" /> Book Consultation Online
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-teal-300 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-slate-500" /> Doctors Directory & OPD
                </Link>
              </li>
              <li>
                <Link href="/departments" className="hover:text-teal-300 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-slate-500" /> Medical Departments
                </Link>
              </li>
              <li>
                <Link href="/#timings" className="hover:text-teal-300 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-slate-500" /> Clinic Timings & Schedule
                </Link>
              </li>
              <li>
                <Link href="/#facilities" className="hover:text-teal-300 transition flex items-center">
                  <ChevronRight className="w-3 h-3 mr-1 text-slate-500" /> Diagnostic Facilities
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-teal-300 transition flex items-center text-slate-400 hover:text-white">
                  <UserCog className="w-3 h-3 mr-1 text-slate-500" /> Staff Portal (Admin Demo)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#123B66] pb-2">
              Contact & Hours
            </h4>

            <p className="flex items-start text-slate-300">
              <MapPin className="w-4 h-4 mr-2 text-teal-400 flex-shrink-0 mt-0.5" />
              <span>{preset.address}, {preset.city}</span>
            </p>

            <p className="flex items-center text-slate-300">
              <Phone className="w-4 h-4 mr-2 text-teal-400 flex-shrink-0" />
              <span>Reception: <strong className="text-white">{preset.receptionPhone}</strong></span>
            </p>

            <p className="flex items-center text-slate-300">
              <Mail className="w-4 h-4 mr-2 text-teal-400 flex-shrink-0" />
              <span>{preset.email}</span>
            </p>

            <div className="p-3 bg-[#123B66]/60 rounded-xl border border-[#123B66] mt-2">
              <p className="text-[11px] font-bold text-teal-300 flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-teal-400" /> Regular Timings:
              </p>
              <p className="text-[11px] text-slate-300 mt-0.5">{preset.timingsWeekday}</p>
              <p className="text-[10px] text-teal-400 font-semibold mt-1">● 24/7 Emergency & Triage</p>
            </div>
          </div>

        </div>

        {/* VERSTECH Labs Demo Attribution & Client Pitch Notice */}
        <div className="mt-8 pt-8 border-t border-[#123B66]">
          <div className="p-4 rounded-xl bg-[#123B66]/40 border border-[#123B66] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-2.5 text-slate-300">
              <span className="p-1.5 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <span className="font-bold text-white">Client Demonstration by VERSTECH Labs</span>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Modern healthcare web architecture, patient appointment scheduling & digital infrastructure tailored for clinics and hospitals.
                </p>
              </div>
            </div>

            <div className="text-slate-300 text-center md:text-right">
              <p className="text-[11px]">
                Ready to customize for your clinic or hospital?
              </p>
              <p className="font-bold text-teal-300">
                Contact VERSTECH Labs for Deployment
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <p>
              &copy; {new Date().getFullYear()} {preset.name}. All medical sample data shown is for client demonstration purposes.
            </p>
            <p>
              Engineered with Next.js, TypeScript & Tailwind CSS by VERSTECH Labs.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
