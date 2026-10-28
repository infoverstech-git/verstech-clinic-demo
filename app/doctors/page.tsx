'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Filter, 
  Star, 
  Calendar, 
  Clock, 
  GraduationCap, 
  Award, 
  ChevronRight, 
  ArrowLeft,
  UserCheck,
  Stethoscope,
  Sparkles,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { DOCTORS, DEPARTMENTS, CLINIC_PRESETS, DEFAULT_PRESET_KEY, Doctor } from '@/lib/clinic-data';
import TopHeader from '@/components/layout/TopHeader';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileStickyBar from '@/components/layout/MobileStickyBar';
import DoctorProfileModal from '@/components/doctors/DoctorProfileModal';
import AppointmentModal from '@/components/sections/AppointmentModal';

export default function DoctorsPage() {
  const preset = CLINIC_PRESETS[DEFAULT_PRESET_KEY];

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [onlyAvailableToday, setOnlyAvailableToday] = useState(false);

  // Modals state
  const [selectedDoctorForProfile, setSelectedDoctorForProfile] = useState<Doctor | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDoctorName, setBookingDoctorName] = useState('');

  // Filter Doctors
  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      // Search query filter
      const matchesSearch = 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.qualification.toLowerCase().includes(searchQuery.toLowerCase());

      // Department filter
      const matchesDept = 
        selectedDepartment === 'All' || 
        doc.department.toLowerCase() === selectedDepartment.toLowerCase() ||
        doc.departmentId === selectedDepartment;

      // Available today filter
      const currentDayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()];
      const matchesToday = !onlyAvailableToday || doc.days.includes(currentDayShort);

      return matchesSearch && matchesDept && matchesToday;
    });
  }, [searchQuery, selectedDepartment, onlyAvailableToday]);

  const handleOpenBooking = (doctorName?: string) => {
    setBookingDoctorName(doctorName || '');
    setIsBookingOpen(true);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All');
    setOnlyAvailableToday(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F7FB]">
      
      {/* Top Header */}
      <TopHeader preset={preset} />

      {/* Main Navbar */}
      <Navbar preset={preset} onOpenBooking={handleOpenBooking} />

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
              <span className="text-[#14B8A6] font-semibold">Specialist Doctors Directory</span>
            </div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#123B66] text-[#14B8A6] text-xs font-semibold uppercase tracking-wider mb-3 border border-[#14B8A6]/30">
                <Stethoscope className="w-3.5 h-3.5 mr-1.5" />
                Medical Faculty & Specialists
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Find Your Consultant Doctor
              </h1>
              <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                Browse our panel of board-certified consultants across all clinical departments. Check OPD schedules, verified qualifications, consultation fees, and reserve your appointment slot online.
              </p>
            </div>

            {/* Search & Filter Bar */}
            <div className="mt-8 p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl max-w-4xl">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                
                {/* Search Input */}
                <div className="sm:col-span-7 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search doctor by name, specialty, or condition..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-[#334155] text-xs font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14B8A6] shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Department Dropdown on Mobile */}
                <div className="sm:col-span-5 flex items-center space-x-2">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white text-[#334155] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#14B8A6] shadow-sm"
                  >
                    <option value="All">All Specialties</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => setOnlyAvailableToday(!onlyAvailableToday)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center flex-shrink-0 ${
                      onlyAvailableToday
                        ? 'bg-[#0D9488] text-white shadow-sm'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                    title="Toggle doctors on duty today"
                  >
                    <span>Today</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Directory Main Body */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          {/* Department Quick Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            <span className="text-xs font-bold text-[#334155] flex items-center pr-2 flex-shrink-0">
              <Filter className="w-3.5 h-3.5 mr-1 text-[#123B66]" /> Department:
            </span>

            <button
              type="button"
              onClick={() => setSelectedDepartment('All')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex-shrink-0 ${
                selectedDepartment === 'All'
                  ? 'bg-[#123B66] text-white shadow-xs'
                  : 'bg-white text-[#334155] hover:bg-[#F1F7FB] border border-[#DCE5ED]'
              }`}
            >
              All Specialties ({DOCTORS.length})
            </button>

            {DEPARTMENTS.map((dept) => {
              const count = DOCTORS.filter((d) => d.department.toLowerCase() === dept.name.toLowerCase() || d.departmentId === dept.id).length;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setSelectedDepartment(dept.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex-shrink-0 ${
                    selectedDepartment === dept.name
                      ? 'bg-[#123B66] text-white shadow-xs'
                      : 'bg-white text-[#334155] hover:bg-[#F1F7FB] border border-[#DCE5ED]'
                  }`}
                >
                  {dept.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6 text-xs text-[#334155]">
            <p>
              Showing <strong className="text-[#123B66]">{filteredDoctors.length}</strong> consultant{filteredDoctors.length === 1 ? '' : 's'}
              {selectedDepartment !== 'All' && <span> in <strong className="text-[#123B66]">{selectedDepartment}</strong></span>}
              {onlyAvailableToday && <span> (Available Today)</span>}
            </p>

            {(searchQuery || selectedDepartment !== 'All' || onlyAvailableToday) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center text-[#123B66] hover:text-[#0B2545] font-bold transition"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Reset Filters
              </button>
            )}
          </div>

          {/* Doctors Grid */}
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-2xl border border-[#DCE5ED] shadow-sm hover:shadow-md hover:border-[#123B66]/40 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    
                    {/* Doctor Photo */}
                    <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                      
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-[11px] font-bold text-[#123B66] shadow">
                        {doctor.department}
                      </div>

                      <div className="absolute top-3 right-3 bg-[#0B2545]/90 text-amber-300 px-2 py-0.5 rounded-md text-xs font-bold flex items-center shadow">
                        <Star className="w-3 h-3 fill-amber-300 mr-1" />
                        <span>{doctor.rating}</span>
                        <span className="text-slate-300 text-[10px] ml-1">({doctor.reviewCount})</span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-xs text-[#14B8A6] font-semibold">{doctor.specialty}</p>
                        <h3 className="text-base font-extrabold text-white leading-snug">{doctor.name}</h3>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-4 space-y-3">
                      <div className="flex items-start text-xs text-[#334155]">
                        <GraduationCap className="w-3.5 h-3.5 text-[#123B66] mr-1.5 flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-[#334155] line-clamp-1">{doctor.qualification}</span>
                      </div>

                      <div className="flex items-center text-xs text-[#334155]">
                        <Award className="w-3.5 h-3.5 text-[#123B66] mr-1.5 flex-shrink-0" />
                        <span><strong className="text-[#123B66]">{doctor.experienceYears} Years</strong> Clinical Practice</span>
                      </div>

                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {doctor.about}
                      </p>

                      <div className="pt-2 border-t border-[#DCE5ED]">
                        <div className="flex items-center text-[11px] text-emerald-700 font-semibold">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{doctor.availability}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Actions: View Profile & Book Visit */}
                  <div className="p-4 bg-[#F1F7FB] border-t border-[#DCE5ED] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDoctorForProfile(doctor)}
                      className="px-3 py-2 rounded-lg text-xs font-bold text-[#123B66] bg-white hover:bg-slate-100 border border-[#DCE5ED] transition"
                    >
                      Profile
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenBooking(doctor.name)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0f766e] active:scale-95 shadow-sm transition"
                    >
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      <span>Book ({doctor.consultationFee})</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            
            /* Empty State */
            <div className="p-12 text-center bg-white rounded-2xl border border-[#DCE5ED] max-w-lg mx-auto space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#F1F7FB] text-[#123B66] flex items-center justify-center mx-auto">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#123B66]">No doctors match your search</h3>
              <p className="text-xs text-slate-500">
                We couldn't find any specialist matching "{searchQuery}" in {selectedDepartment}. Try adjusting your keywords or clearing the filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0f766e] rounded-xl transition"
              >
                Show All Doctors
              </button>
            </div>
          )}

        </section>

      </main>

      {/* Footer */}
      <Footer preset={preset} onOpenBooking={() => handleOpenBooking()} />

      {/* Mobile Sticky Bar */}
      <MobileStickyBar preset={preset} onOpenBooking={() => handleOpenBooking()} />

      {/* Doctor Profile Modal */}
      <DoctorProfileModal
        doctor={selectedDoctorForProfile}
        onClose={() => setSelectedDoctorForProfile(null)}
        onBookDoctor={(docName) => handleOpenBooking(docName)}
        preset={preset}
      />

      {/* Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preset={preset}
        initialDoctorName={bookingDoctorName}
      />

    </div>
  );
}
