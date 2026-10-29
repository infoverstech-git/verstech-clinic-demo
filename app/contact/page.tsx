'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Phone, 
  MapPin, 
  Mail, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  ArrowLeft,
  Calendar,
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Navigation,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { CLINIC_PRESETS, DEFAULT_PRESET_KEY } from '@/lib/clinic-data';
import TopHeader from '@/components/layout/TopHeader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileStickyBar from '@/components/layout/MobileStickyBar';
import AppointmentModal from '@/components/sections/AppointmentModal';

export default function ContactPage() {
  const preset = CLINIC_PRESETS[DEFAULT_PRESET_KEY];
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  
  // Validation & Submission State
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('Please complete all required fields (Name, Phone, and Message).');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleResetForm = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setDepartment('General Inquiry');
    setMessage('');
    setSubmitted(false);
  };

  const whatsappInquiryUrl = `https://wa.me/${preset.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    `*Patient Inquiry — ${preset.name}*\n• Name: ${fullName.trim() || 'Patient'}\n• Contact: ${phone.trim() || 'Not provided'}\n• Subject: ${department}\n• Query: ${message.trim() || 'I would like to inquire about clinic services.'}`
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F7FB]">
      {/* Top Contact Strip */}
      <TopHeader preset={preset} />

      {/* Main Navbar */}
      <Navbar preset={preset} onOpenBooking={() => setIsBookingOpen(true)} />

      <main className="flex-1">
        {/* Page Hero & Breadcrumbs */}
        <section className="bg-[#0B2545] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#123B66]">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-xs text-slate-300 mb-4">
              <Link href="/" className="hover:text-[#14B8A6] transition flex items-center">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Home
              </Link>
              <span>/</span>
              <span className="text-[#14B8A6] font-semibold">Contact & Patient Care Desk</span>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#123B66] text-[#14B8A6] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#14B8A6]/30">
                <Phone className="w-3.5 h-3.5 mr-1.5" />
                24/7 Patient Communication
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Get in Touch with Our Medical Team
              </h1>
              <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                We are here to assist with your medical inquiries, appointment scheduling, diagnostic laboratory reports, and urgent patient care coordination.
              </p>
            </div>
          </div>
        </section>

        {/* Fictional Demo Banner (Phase 6 Compliance) */}
        <section className="bg-amber-50 border-b border-amber-200 py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-amber-900">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>
                <strong>VERSTECH Labs Sales Demo:</strong> All contact numbers, addresses, and sample doctor schedules are fictional demonstration data for client pitching.
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-800 px-2 py-0.5 rounded">
              Interactive Demo
            </span>
          </div>
        </section>

        {/* Main Content Body */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
          {/* 4 Golden Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Reception Helpline */}
            <div className="bg-white rounded-2xl border border-[#DCE5ED] p-6 shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F1F7FB] text-[#123B66] flex items-center justify-center border border-[#DCE5ED]">
                <PhoneCall className="w-6 h-6 text-[#123B66]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">General Inquiries</span>
                <h3 className="text-base font-extrabold text-[#123B66]">Reception Desk</h3>
              </div>
              <p className="text-xs text-[#334155] leading-relaxed">
                Connect with our front desk officers for OPD consultant schedules and department timings.
              </p>
              <div className="pt-2 border-t border-[#DCE5ED]">
                <a
                  href={`tel:${preset.receptionPhone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center text-xs font-bold text-[#123B66] hover:text-[#0D9488] transition"
                >
                  <Phone className="w-3.5 h-3.5 mr-1 text-[#0D9488]" />
                  <span>{preset.receptionPhone}</span>
                </a>
              </div>
            </div>

            {/* 2. Emergency 24/7 Hotline */}
            <div className="bg-white rounded-2xl border border-[#DCE5ED] p-6 shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">24/7 Acute Triage</span>
                <h3 className="text-base font-extrabold text-rose-700">Emergency Hotline</h3>
              </div>
              <p className="text-xs text-[#334155] leading-relaxed">
                Immediate clinical response for cardiac emergencies, respiratory distress, and acute trauma cases.
              </p>
              <div className="pt-2 border-t border-[#DCE5ED]">
                <a
                  href={`tel:${preset.emergencyPhone.replace(/[^0-9+]/g, '')}`}
                  className="inline-flex items-center text-xs font-bold text-rose-700 hover:text-rose-900 transition"
                >
                  <Phone className="w-3.5 h-3.5 mr-1 text-rose-600" />
                  <span>{preset.emergencyPhone}</span>
                </a>
              </div>
            </div>

            {/* 3. Official WhatsApp Desk */}
            <div className="bg-white rounded-2xl border border-[#DCE5ED] p-6 shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Fast Digital Chat</span>
                <h3 className="text-base font-extrabold text-[#123B66]">WhatsApp Support</h3>
              </div>
              <p className="text-xs text-[#334155] leading-relaxed">
                Chat directly with our patient coordinator for slot reservation assistance and digital fee inquiries.
              </p>
              <div className="pt-2 border-t border-[#DCE5ED]">
                <a
                  href={`https://wa.me/${preset.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20clinic%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-900 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  <span>+92 335 6123538</span>
                </a>
              </div>
            </div>

            {/* 4. Patient Email & Laboratory Reports */}
            <div className="bg-white rounded-2xl border border-[#DCE5ED] p-6 shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#F1F7FB] text-[#123B66] flex items-center justify-center border border-[#DCE5ED]">
                <Mail className="w-6 h-6 text-[#123B66]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Reports & Admin</span>
                <h3 className="text-base font-extrabold text-[#123B66]">Email Desk</h3>
              </div>
              <p className="text-xs text-[#334155] leading-relaxed">
                Send formal medical records, corporate health inquiries, and laboratory feedback via email.
              </p>
              <div className="pt-2 border-t border-[#DCE5ED]">
                <a
                  href={`mailto:${preset.email}`}
                  className="inline-flex items-center text-xs font-bold text-[#123B66] hover:text-[#0D9488] transition"
                >
                  <Mail className="w-3.5 h-3.5 mr-1 text-[#0D9488]" />
                  <span>{preset.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form & Facility Location Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Interactive Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#DCE5ED] shadow-sm p-6 sm:p-10 space-y-6">
              <div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F1F7FB] text-[#123B66] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#DCE5ED]">
                  <Send className="w-3.5 h-3.5 mr-1.5 text-[#14B8A6]" />
                  Direct Patient Inquiry
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B66] tracking-tight">
                  Send Us a Message
                </h2>
                <p className="text-xs text-[#334155] mt-1 leading-relaxed">
                  Have a question regarding consultant availability, surgical packages, or diagnostic tests? Fill in your details below.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 bg-[#F1F7FB] rounded-2xl border border-[#DCE5ED] text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#123B66]">Inquiry Ticket Created!</h3>
                    <p className="text-xs text-[#334155] mt-1">
                      Thank you, <strong>{fullName}</strong>. Your inquiry has been routed to our patient services team.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      <span>Forward Query via WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold text-[#123B66] bg-white hover:bg-[#DCE5ED] border border-[#DCE5ED] transition"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#123B66] uppercase tracking-wider mb-1">
                        Patient / Visitor Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Muhammad Usman"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE5ED] text-xs text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#123B66] uppercase tracking-wider mb-1">
                        Contact Number / WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 0300 1234567"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE5ED] text-xs text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] bg-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#123B66] uppercase tracking-wider mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="patient@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE5ED] text-xs text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#123B66] uppercase tracking-wider mb-1">
                        Inquiry Department / Subject
                      </label>
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE5ED] text-xs text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] bg-white font-medium"
                      >
                        <option value="General Inquiry">General Clinic Inquiry</option>
                        <option value="Doctor Appointment Booking">Doctor Appointment Scheduling</option>
                        <option value="Cardiology & Heart Care">Cardiology & Diagnostics</option>
                        <option value="Pediatrics & Immunization">Pediatrics & Vaccination</option>
                        <option value="Orthopedics & Joint Care">Orthopedic Consultation</option>
                        <option value="Dermatology & Laser">Dermatology & Skin Care</option>
                        <option value="Diagnostic Pathology & Lab">Lab Reports & Radiology</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#123B66] uppercase tracking-wider mb-1">
                      Message / Question <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your health query, doctor preference, or report inquiry..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE5ED] text-xs text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] bg-white"
                      required
                    ></textarea>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[11px] text-slate-500">
                      🔒 Your medical inquiry is handled under strict patient privacy guidelines.
                    </p>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] shadow-sm transition active:scale-98"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      <span>Send Patient Inquiry</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Timings & Hospital Location Details */}
            <div className="lg:col-span-5 space-y-6">
              {/* Clinic Timings Table */}
              <div className="bg-white rounded-3xl border border-[#DCE5ED] p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 pb-3 border-b border-[#DCE5ED]">
                  <Clock className="w-4 h-4 text-[#123B66]" />
                  <h3 className="font-extrabold text-sm text-[#123B66] uppercase tracking-wider">
                    Consultation & OPD Timings
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-[#F1F7FB]">
                    <span className="font-semibold text-[#334155]">Monday – Saturday:</span>
                    <span className="font-bold text-[#123B66]">{preset.timingsWeekday}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-[#F1F7FB]">
                    <span className="font-semibold text-[#334155]">Sunday / Public Holidays:</span>
                    <span className="font-bold text-[#123B66]">{preset.timingsSunday}</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 text-rose-700">
                    <span className="font-bold flex items-center">
                      <span className="w-2 h-2 rounded-full bg-rose-500 mr-2 animate-pulse"></span>
                      Emergency & Trauma Desk:
                    </span>
                    <span className="font-black">24 Hours / 7 Days</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#123B66] hover:bg-[#0B2545] transition flex items-center justify-center space-x-1.5 shadow-sm"
                  >
                    <Calendar className="w-4 h-4 mr-1.5 text-[#14B8A6]" />
                    <span>Book OPD Doctor Appointment</span>
                  </button>
                </div>
              </div>

              {/* Physical Location & Directions Card */}
              <div className="bg-white rounded-3xl border border-[#DCE5ED] p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 pb-3 border-b border-[#DCE5ED]">
                  <MapPin className="w-4 h-4 text-[#123B66]" />
                  <h3 className="font-extrabold text-sm text-[#123B66] uppercase tracking-wider">
                    Hospital Campus Address
                  </h3>
                </div>

                <div className="space-y-2 text-xs text-[#334155]">
                  <p className="font-bold text-[#123B66] text-sm leading-snug">
                    {preset.name}
                  </p>
                  <p className="leading-relaxed">
                    {preset.address}, {preset.city}, Pakistan
                  </p>
                  <p className="text-[11px] text-slate-500">
                    <strong>Landmark:</strong> Near Main Gulberg Roundabout, accessible from MM Alam Road and Ferozepur Road.
                  </p>
                </div>

                {/* Campus Features & Accessibility */}
                <div className="pt-3 border-t border-[#DCE5ED] space-y-2 text-[11px] text-[#334155]">
                  <p className="font-bold text-[#123B66]">Patient Accessibility Features:</p>
                  <ul className="space-y-1.5">
                    <li className="flex items-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] mr-2 flex-shrink-0" />
                      <span>Dedicated free valet and patient parking lot.</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] mr-2 flex-shrink-0" />
                      <span>Step-free wheelchair ramps and wide passenger elevators.</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] mr-2 flex-shrink-0" />
                      <span>Dedicated ambulance bay and emergency triage entrance.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Quick WhatsApp Connect */}
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 text-xs text-emerald-950 space-y-2">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold">
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Instant Coordinator WhatsApp Desk</span>
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Send your inquiries or diagnostic prescription photos directly to our front desk coordinator on WhatsApp at <strong>+92 335 6123538</strong>.
                </p>
                <a
                  href={`https://wa.me/${preset.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%2C%20I%20would%20like%20to%20connect%20with%20the%20patient%20desk.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center py-2 px-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                  <span>Chat on WhatsApp (+92 335 6123538)</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer preset={preset} onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Mobile Sticky Bar */}
      <MobileStickyBar preset={preset} onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preset={preset}
      />
    </div>
  );
}
