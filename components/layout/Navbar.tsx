'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Cross, 
  Calendar, 
  PhoneCall, 
  Menu, 
  X, 
  Clock, 
  ShieldCheck, 
  ChevronRight,
  UserCog
} from 'lucide-react';
import { ClinicPreset } from '@/lib/clinic-data';

interface NavbarProps {
  preset: ClinicPreset;
  onOpenBooking: (doctorName?: string) => void;
}

export default function Navbar({ preset, onOpenBooking }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Doctors', href: '/doctors' },
    { label: 'Departments', href: '/departments' },
    { label: 'Services', href: '/#services' },
    { label: 'Facilities', href: '/#facilities' },
    { label: 'Timings', href: '/#timings' },
    { label: 'Reviews', href: '/#reviews' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DCE5ED] shadow-nav-fixed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center space-x-3.5 group">
            <div className="w-11 h-11 rounded-xl bg-[#123B66] flex items-center justify-center text-teal-400 shadow-sm group-hover:scale-105 transition duration-200">
              <Cross className="w-6 h-6 transform rotate-45" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl text-[#123B66] tracking-tight leading-none">
                  {preset.name}
                </span>
              </div>
              <p className="text-[11px] font-semibold text-[#0F766E] mt-0.5 tracking-wide flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1 inline text-teal-600" />
                {preset.typeLabel}
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-bold text-[#334155] hover:text-[#123B66] transition relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-[#14B8A6] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2.5">
            <Link
              href="/admin"
              className="inline-flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold text-[#334155] hover:text-[#123B66] hover:bg-[#F1F7FB] transition"
              title="Demo Clinic Admin Portal"
            >
              <UserCog className="w-3.5 h-3.5 mr-1 text-[#64748B]" />
              <span>Staff Portal</span>
            </Link>

            <a
              href={`tel:${preset.receptionPhone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center px-3 py-2.5 rounded-lg text-xs font-bold text-[#123B66] bg-[#F1F7FB] hover:bg-[#E4EEF5] border border-[#DCE5ED] transition"
              title="Call Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
              <span>Reception</span>
            </a>

            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="inline-flex items-center px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] active:scale-95 shadow-sm transition duration-150"
            >
              <Calendar className="w-4 h-4 mr-1.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden space-x-2">
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#0D9488] rounded-md"
            >
              Book
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#334155] hover:text-[#123B66] hover:bg-[#F1F7FB] transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#DCE5ED] px-4 pt-3 pb-6 space-y-4 shadow-lg animate-fadeIn">
          <div className="p-3 bg-[#F1F7FB] rounded-xl border border-[#DCE5ED] mb-3">
            <p className="text-xs font-bold text-[#123B66]">{preset.name}</p>
            <p className="text-[11px] text-[#334155] flex items-center mt-0.5">
              <Clock className="w-3 h-3 mr-1 inline text-teal-600" /> {preset.timingsWeekday}
            </p>
          </div>

          <nav className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#334155] hover:bg-[#F1F7FB] hover:text-[#123B66] rounded-lg transition"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            ))}

            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-xs font-bold text-[#334155] hover:bg-[#F1F7FB] hover:text-[#123B66] rounded-lg transition"
            >
              <span className="flex items-center">
                <UserCog className="w-3.5 h-3.5 mr-2 text-[#64748B]" />
                Staff Portal (Admin Demo)
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </nav>

          <div className="pt-2 border-t border-[#DCE5ED] flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center px-4 py-3 text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] rounded-xl shadow-sm transition"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Doctor Appointment
            </button>

            <a
              href={`tel:${preset.receptionPhone.replace(/[^0-9+]/g, '')}`}
              className="w-full flex items-center justify-center px-4 py-2.5 text-xs font-bold text-[#123B66] bg-[#F1F7FB] rounded-xl border border-[#DCE5ED]"
            >
              <PhoneCall className="w-3.5 h-3.5 mr-2 text-teal-600" />
              Direct Call: {preset.receptionPhone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
