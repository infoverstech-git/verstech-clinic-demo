'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
  Stethoscope, 
  FileText, 
  MessageCircle,
  Building2,
  Video,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { DOCTORS, DEPARTMENTS, ClinicPreset } from '@/lib/clinic-data';
import { saveNewAppointment, Appointment } from '@/lib/appointments-store';

interface AppointmentFormProps {
  preset: ClinicPreset;
  initialDoctorName?: string;
  initialDepartmentName?: string;
  onSuccess?: (appointment: Appointment) => void;
  isStandalonePage?: boolean;
}

export default function AppointmentForm({
  preset,
  initialDoctorName = '',
  initialDepartmentName = '',
  onSuccess,
  isStandalonePage = false,
}: AppointmentFormProps) {
  // Stepped flow: 'form' -> 'summary' -> 'confirmed'
  const [currentStep, setCurrentStep] = useState<'form' | 'summary' | 'confirmed'>('form');

  // Form Fields
  const [patientName, setPatientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(initialDepartmentName);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [consultationType, setConsultationType] = useState<'in-clinic' | 'teleconsult'>('in-clinic');
  const [reasonForVisit, setReasonForVisit] = useState('');

  // Validation Errors & Submission State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);

  // Today's ISO date string to enforce min date
  const todayDateStr = new Date().toISOString().split('T')[0];

  // Set default appointment date to tomorrow if not set
  useEffect(() => {
    if (!appointmentDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setAppointmentDate(tomorrow.toISOString().split('T')[0]);
    }
  }, [appointmentDate]);

  // Synchronize initial selections
  useEffect(() => {
    if (initialDoctorName) {
      const foundDoctor = DOCTORS.find((d) => d.name.toLowerCase() === initialDoctorName.toLowerCase());
      if (foundDoctor) {
        setSelectedDoctorId(foundDoctor.id);
        setSelectedDepartment(foundDoctor.department);
      }
    } else if (initialDepartmentName) {
      setSelectedDepartment(initialDepartmentName);
    }
  }, [initialDoctorName, initialDepartmentName]);

  // Filter available doctors based on selected department
  const availableDoctors = selectedDepartment
    ? DOCTORS.filter((d) => d.department.toLowerCase() === selectedDepartment.toLowerCase() || d.departmentId === selectedDepartment)
    : DOCTORS;

  // Selected doctor object
  const activeDoctor = DOCTORS.find((d) => d.id === selectedDoctorId);

  // Available time slots: if a doctor is selected, use their schedule slots; otherwise use standard OPD slots
  const availableSlots = activeDoctor && activeDoctor.timeSlots.length > 0
    ? activeDoctor.timeSlots
    : [
        '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', 
        '11:30 AM', '12:00 PM', '04:00 PM', '04:30 PM', 
        '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM'
      ];

  // Auto-select first slot when slots change
  useEffect(() => {
    if (!timeSlot || !availableSlots.includes(timeSlot)) {
      setTimeSlot(availableSlots[0] || '10:00 AM');
    }
  }, [selectedDoctorId, selectedDepartment]);

  // Handle department change: reset doctor if current doctor does not belong to new department
  const handleDepartmentChange = (newDept: string) => {
    setSelectedDepartment(newDept);
    if (newDept) {
      const docsInDept = DOCTORS.filter((d) => d.department.toLowerCase() === newDept.toLowerCase());
      if (docsInDept.length > 0 && (!activeDoctor || activeDoctor.department.toLowerCase() !== newDept.toLowerCase())) {
        setSelectedDoctorId(docsInDept[0].id);
      }
    }
  };

  // Field validation
  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!patientName.trim()) {
      errs.patientName = 'Patient full name is required.';
    } else if (patientName.trim().length < 3) {
      errs.patientName = 'Name must be at least 3 characters.';
    }

    if (!phoneNumber.trim()) {
      errs.phoneNumber = 'Valid phone number is required.';
    } else {
      const cleanPhone = phoneNumber.replace(/[\s-]/g, '');
      if (!/^((\+92)|(0092)|(03))\d{9}$/.test(cleanPhone) && cleanPhone.length < 10) {
        errs.phoneNumber = 'Please enter a valid mobile number (e.g. 0300 1234567).';
      }
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!appointmentDate) {
      errs.appointmentDate = 'Please select an appointment date.';
    } else if (appointmentDate < todayDateStr) {
      errs.appointmentDate = 'Appointment date cannot be in the past.';
    }

    if (!timeSlot) {
      errs.timeSlot = 'Please pick a consultation time slot.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToSummary = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setCurrentStep('summary');
    }
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);

    const docName = activeDoctor ? activeDoctor.name : (selectedDepartment ? `On-Duty Consultant (${selectedDepartment})` : 'Senior Medical Officer');

    setTimeout(() => {
      const newBooking = saveNewAppointment({
        patientName: patientName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim() || undefined,
        department: selectedDepartment || (activeDoctor ? activeDoctor.department : 'General OPD'),
        doctorId: selectedDoctorId || undefined,
        doctorName: docName,
        appointmentDate,
        timeSlot,
        consultationType,
        reasonForVisit: reasonForVisit.trim() || undefined,
      });

      setConfirmedBooking(newBooking);
      setIsSubmitting(false);
      setCurrentStep('confirmed');

      if (onSuccess) {
        onSuccess(newBooking);
      }
    }, 400);
  };

  // Build pre-filled WhatsApp message URL
  const generateWhatsAppUrl = () => {
    const docName = activeDoctor ? activeDoctor.name : (selectedDepartment ? `Consultant (${selectedDepartment})` : 'Next Available Doctor');
    const msg = 
      `*Appointment Request — ${preset.name}*\n` +
      `• Patient: ${patientName.trim()}\n` +
      `• Contact: ${phoneNumber.trim()}\n` +
      `• Department: ${selectedDepartment || 'General OPD'}\n` +
      `• Consultant: ${docName}\n` +
      `• Date: ${appointmentDate}\n` +
      `• Preferred Slot: ${timeSlot}\n` +
      `• Mode: ${consultationType === 'in-clinic' ? 'In-Clinic Visit' : 'Video Tele-Consultation'}\n` +
      (reasonForVisit ? `• Reason: ${reasonForVisit.trim()}\n` : '') +
      `\nPlease verify availability and confirm my consultation token. Thank you!`;

    const cleanWaNum = preset.whatsappNumber.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanWaNum}?text=${encodeURIComponent(msg)}`;
  };

  const handleReset = () => {
    setCurrentStep('form');
    setPatientName('');
    setPhoneNumber('');
    setEmail('');
    setReasonForVisit('');
    setConfirmedBooking(null);
  };

  return (
    <div className={`w-full ${isStandalonePage ? 'max-w-2xl mx-auto' : ''}`}>
      
      {/* Step Indicator Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#DCE5ED]">
        <div className="flex items-center space-x-2">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
            currentStep === 'confirmed' ? 'bg-[#0D9488] text-white' : 'bg-[#123B66] text-white'
          }`}>
            {currentStep === 'confirmed' ? '✓' : currentStep === 'summary' ? '2' : '1'}
          </span>
          <span className="text-xs font-bold text-[#123B66]">
            {currentStep === 'form' && 'Step 1: Patient & Slot Details'}
            {currentStep === 'summary' && 'Step 2: Review Booking Summary'}
            {currentStep === 'confirmed' && 'Step 3: Appointment Request Received'}
          </span>
        </div>

        <span className="text-[11px] font-medium text-[#64748B]">
          {preset.typeLabel}
        </span>
      </div>

      {/* STEP 1: FORM INPUTS */}
      {currentStep === 'form' && (
        <form onSubmit={handleProceedToSummary} className="space-y-4">
          
          {/* Consultation Mode */}
          <div>
            <label className="block text-xs font-bold text-[#123B66] uppercase tracking-wider mb-1.5">
              Consultation Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConsultationType('in-clinic')}
                className={`flex items-center justify-center py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                  consultationType === 'in-clinic'
                    ? 'bg-[#F1F7FB] border-[#123B66] text-[#123B66] shadow-xs'
                    : 'bg-white border-[#DCE5ED] text-[#334155] hover:bg-[#F1F7FB]'
                }`}
              >
                <Building2 className="w-4 h-4 mr-2 text-[#0D9488]" />
                <span>In-Clinic Visit</span>
              </button>

              <button
                type="button"
                onClick={() => setConsultationType('teleconsult')}
                className={`flex items-center justify-center py-2.5 px-3 rounded-xl text-xs font-bold border transition ${
                  consultationType === 'teleconsult'
                    ? 'bg-[#F1F7FB] border-[#123B66] text-[#123B66] shadow-xs'
                    : 'bg-white border-[#DCE5ED] text-[#334155] hover:bg-[#F1F7FB]'
                }`}
              >
                <Video className="w-4 h-4 mr-2 text-[#0D9488]" />
                <span>Video Teleconsultation</span>
              </button>
            </div>
          </div>

          {/* Department Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Medical Department
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => handleDepartmentChange(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500 bg-white"
              >
                <option value="">General OPD / All Departments</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>

            {/* Doctor Selection (Filtered) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Preferred Doctor
              </label>
              <select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500 bg-white"
              >
                <option value="">Next Available Consultant</option>
                {availableDoctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} — {doc.specialty} ({doc.consultationFee})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Doctor Info Pill if Doctor Selected */}
          {activeDoctor && (
            <div className="p-3 bg-medical-50/70 border border-medical-200/80 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <img
                  src={activeDoctor.image}
                  alt={activeDoctor.name}
                  className="w-9 h-9 rounded-full object-cover border border-white"
                />
                <div>
                  <p className="font-bold text-slate-900">{activeDoctor.name}</p>
                  <p className="text-[11px] text-medical-700">{activeDoctor.availability}</p>
                </div>
              </div>
              <span className="font-extrabold text-medical-900 bg-white px-2.5 py-1 rounded-md border border-medical-100 shadow-xs">
                {activeDoctor.consultationFee}
              </span>
            </div>
          )}

          {/* Date & Time Slot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Appointment Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                min={todayDateStr}
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl border text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500 bg-white ${
                  errors.appointmentDate ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                }`}
              />
              {errors.appointmentDate && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1 inline" /> {errors.appointmentDate}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Available Time Slot <span className="text-rose-500">*</span>
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500 bg-white"
              >
                {availableSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Patient Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Patient Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Muhammad Usman"
                className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500 ${
                  errors.patientName ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                }`}
              />
            </div>
            {errors.patientName && (
              <p className="text-[11px] text-rose-600 mt-1 flex items-center">
                <AlertCircle className="w-3 h-3 mr-1 inline" /> {errors.patientName}
              </p>
            )}
          </div>

          {/* Contact Details (Phone & Email) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Mobile / WhatsApp <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="0300 1234567"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500 ${
                    errors.phoneNumber ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1 inline" /> {errors.phoneNumber}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500 ${
                    errors.email ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1 inline" /> {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Reason for Visit */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Symptoms / Reason for Consultation <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={2}
              value={reasonForVisit}
              onChange={(e) => setReasonForVisit(e.target.value)}
              placeholder="e.g. Chest discomfort after walking, routine diabetic follow-up, baby vaccination..."
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500"
            ></textarea>
          </div>

          {/* Submit Actions */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] active:scale-98 shadow-sm transition flex items-center justify-center space-x-1.5"
            >
              <span>Review Booking Summary</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Emergency reminder */}
          <p className="text-[11px] text-center text-slate-500">
            For critical emergency care, call 24/7 hotline directly:{' '}
            <a href={`tel:${preset.emergencyPhone.replace(/[^0-9+]/g, '')}`} className="font-bold text-rose-600 hover:underline">
              {preset.emergencyPhone}
            </a>
          </p>
        </form>
      )}

      {/* STEP 2: SUMMARY CONFIRMATION */}
      {currentStep === 'summary' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-slate-900">Appointment Review</span>
              <span className="text-[10px] uppercase font-bold text-medical-700 bg-medical-50 px-2 py-0.5 rounded border border-medical-100">
                {consultationType === 'in-clinic' ? 'In-Clinic Consultation' : 'Video Tele-Consultation'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-slate-500 text-[11px]">Patient Name</p>
                <p className="font-bold text-slate-900">{patientName}</p>
              </div>
              <div>
                <p className="text-slate-500 text-[11px]">Phone / WhatsApp</p>
                <p className="font-bold text-slate-900">{phoneNumber}</p>
              </div>
            </div>

            {email && (
              <div>
                <p className="text-slate-500 text-[11px]">Email</p>
                <p className="font-bold text-slate-900">{email}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
              <div>
                <p className="text-slate-500 text-[11px]">Department</p>
                <p className="font-bold text-slate-900">{selectedDepartment || 'General Medicine'}</p>
              </div>
              <div>
                <p className="text-slate-500 text-[11px]">Consultant</p>
                <p className="font-bold text-slate-900">{activeDoctor ? activeDoctor.name : 'Next Available Consultant'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
              <div>
                <p className="text-slate-500 text-[11px]">Preferred Date</p>
                <p className="font-bold text-slate-900">{appointmentDate}</p>
              </div>
              <div>
                <p className="text-slate-500 text-[11px]">Preferred Slot</p>
                <p className="font-bold text-slate-900">{timeSlot}</p>
              </div>
            </div>

            {reasonForVisit && (
              <div className="pt-2 border-t border-slate-200">
                <p className="text-slate-500 text-[11px]">Reason for Visit</p>
                <p className="text-slate-700 italic">"{reasonForVisit}"</p>
              </div>
            )}
          </div>

          <div className="p-3 bg-cyanHealth-50 border border-cyanHealth-200 rounded-xl text-xs text-cyanHealth-900 flex items-start space-x-2">
            <ShieldCheck className="w-4 h-4 text-cyanHealth-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Notice:</strong> Submitting reserves this slot provisionally in the clinic management dashboard. Our patient coordinator will contact you to verify your arrival token.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep('form')}
              className="w-1/3 py-2.5 px-3 rounded-xl text-xs font-bold text-[#123B66] bg-[#F1F7FB] hover:bg-[#E4EEF5] border border-[#DCE5ED] transition flex items-center justify-center"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Edit Details</span>
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleFinalSubmit}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0F766E] active:scale-98 shadow-sm transition disabled:opacity-50 flex items-center justify-center"
            >
              {isSubmitting ? (
                <span>Reserving Slot...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  <span>Confirm Demo Appointment</span>
                </>
              )}
            </button>
          </div>

        </div>
      )}

      {/* STEP 3: CONFIRMED STATE & WHATSAPP SYNC */}
      {currentStep === 'confirmed' && confirmedBooking && (
        <div className="text-center py-4 space-y-4 animate-fadeIn">
          
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div>
            <h4 className="text-xl font-extrabold text-slate-900">
              Demo Appointment Submitted!
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Thank you, <strong className="text-slate-900">{confirmedBooking.patientName}</strong>. Your provisional reference token is:
            </p>
            <div className="mt-2 inline-block px-4 py-1.5 rounded-lg bg-medical-50 border border-medical-200 font-mono font-bold text-medical-800 text-sm tracking-wider">
              {confirmedBooking.id}
            </div>
          </div>

          {/* Quick Details Card */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Consultant / Dept:</span>
              <span className="font-bold text-slate-900">{confirmedBooking.doctorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Scheduled Time:</span>
              <span className="font-bold text-slate-900">{confirmedBooking.appointmentDate} at {confirmedBooking.timeSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Consultation Type:</span>
              <span className="font-bold text-slate-900 capitalize">{confirmedBooking.consultationType.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Contact Number:</span>
              <span className="font-bold text-slate-900">{confirmedBooking.phoneNumber}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-200">
              <span className="text-slate-500">Status:</span>
              <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Pending Coordinator Verification
              </span>
            </div>
          </div>

          {/* WhatsApp Direct Push Option (Requirement 4) */}
          <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-left space-y-2">
            <div className="flex items-center space-x-2 text-emerald-900 font-bold text-xs">
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Speed up verification via WhatsApp</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Click below to send your prefilled booking request straight to the clinic's reception WhatsApp:
            </p>
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              <span>Send Prefilled Booking to WhatsApp (+92 335 6123538)</span>
            </a>
          </div>

          {/* Demo Architecture Notice (Requirement 5) */}
          <div className="p-3 bg-slate-100 rounded-xl text-[11px] text-slate-600 text-left">
            <p className="font-bold text-slate-700">Demo Portal Synchronization:</p>
            <p className="mt-0.5">
              This demo booking has been added to your local browser demo store and is instantly visible in the{' '}
              <a href="/admin" className="text-medical-600 font-bold hover:underline">Clinic Admin Dashboard</a>.
            </p>
          </div>

          {/* Reset / Book Another */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center py-2 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              <span>Book Another Appointment</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
