'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Building2, 
  ArrowLeft, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle, 
  RotateCcw, 
  ShieldAlert, 
  Eye, 
  Phone, 
  Mail, 
  Plus, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  getStoredAppointments, 
  updateAppointmentStatus, 
  deleteAppointment, 
  resetDemoAppointments, 
  computeMetrics, 
  Appointment, 
  AppointmentMetrics 
} from '@/lib/appointments-store';
import { DOCTORS, DEPARTMENTS, CLINIC_PRESETS, DEFAULT_PRESET_KEY } from '@/lib/clinic-data';

export default function AdminPage() {
  const preset = CLINIC_PRESETS[DEFAULT_PRESET_KEY];

  // Navigation tab: 'overview' | 'appointments' | 'doctors' | 'departments'
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'doctors' | 'departments'>('overview');

  // Appointments State
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [metrics, setMetrics] = useState<AppointmentMetrics>({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
  });

  // Table Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'upcoming'>('all');

  // Selected appointment for detail drawer / modal
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Cancellation Confirmation Dialog
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Load appointments
  const refreshAppointments = () => {
    const list = getStoredAppointments();
    setAppointments(list);
    setMetrics(computeMetrics(list));
  };

  useEffect(() => {
    refreshAppointments();

    const handleUpdate = () => {
      refreshAppointments();
    };

    window.addEventListener('appointments-updated', handleUpdate);
    return () => {
      window.removeEventListener('appointments-updated', handleUpdate);
    };
  }, []);

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];

    return appointments.filter((app) => {
      // Search filter
      const matchesSearch = 
        app.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.phoneNumber.includes(searchQuery) ||
        app.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.department.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;

      // Date filter
      let matchesDate = true;
      if (dateFilter === 'today') {
        matchesDate = app.appointmentDate === todayStr;
      } else if (dateFilter === 'upcoming') {
        matchesDate = app.appointmentDate >= todayStr;
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [appointments, searchQuery, statusFilter, dateFilter]);

  // Status Change Handler
  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
    updateAppointmentStatus(id, newStatus);
    if (selectedAppointment && selectedAppointment.id === id) {
      setSelectedAppointment({ ...selectedAppointment, status: newStatus });
    }
  };

  // Cancellation Confirm Handler
  const confirmCancel = () => {
    if (cancellingId) {
      handleStatusChange(cancellingId, 'cancelled');
      setCancellingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F7FB] flex flex-col font-sans">
      
      {/* Top Admin Header */}
      <header className="bg-[#0B2545] text-white border-b border-[#123B66] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Left: Brand Identity & Portal Pill */}
            <div className="flex items-center space-x-3">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition text-xs font-semibold"
                title="Return to Public Website"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Back to Clinic Site</span>
              </Link>

              <span className="h-4 w-px bg-white/20 hidden sm:block"></span>

              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6] animate-pulse"></span>
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">
                  {preset.name}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#14B8A6] bg-[#123B66] px-2 py-0.5 rounded border border-[#14B8A6]/30">
                  Staff Portal Demo
                </span>
              </div>
            </div>

            {/* Right: Reset Demo Seed Button */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Reset demo bookings to initial sample records?')) {
                    resetDemoAppointments();
                  }
                }}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-white bg-[#123B66] hover:bg-[#123B66]/80 border border-white/10 transition"
                title="Restore default test appointments for client demonstration"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1 text-[#14B8A6]" />
                <span>Reset Demo Records</span>
              </button>

              <Link
                href="/book"
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0f766e] shadow-sm transition"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span className="hidden sm:inline">New Booking</span>
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <div className="bg-white border-b border-[#DCE5ED]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-6">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 text-xs font-bold border-b-2 flex items-center space-x-2 transition ${
                activeTab === 'overview'
                  ? 'border-[#123B66] text-[#123B66]'
                  : 'border-transparent text-[#334155] hover:text-[#123B66]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('appointments')}
              className={`py-3.5 text-xs font-bold border-b-2 flex items-center space-x-2 transition ${
                activeTab === 'appointments'
                  ? 'border-[#123B66] text-[#123B66]'
                  : 'border-transparent text-[#334155] hover:text-[#123B66]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Appointment Management ({metrics.total})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('doctors')}
              className={`py-3.5 text-xs font-bold border-b-2 flex items-center space-x-2 transition ${
                activeTab === 'doctors'
                  ? 'border-[#123B66] text-[#123B66]'
                  : 'border-transparent text-[#334155] hover:text-[#123B66]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Doctors & Schedules ({DOCTORS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('departments')}
              className={`py-3.5 text-xs font-bold border-b-2 flex items-center space-x-2 transition ${
                activeTab === 'departments'
                  ? 'border-[#123B66] text-[#123B66]'
                  : 'border-transparent text-[#334155] hover:text-[#123B66]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Departments ({DEPARTMENTS.length})</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        
        {/* Security & Production Architecture Notice (Prompt 4, Req 6) */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">VERSTECH Labs Client Pitch Demo Mode:</span>
              <p className="text-[11px] text-amber-800 mt-0.5">
                This dashboard stores demo appointments in the browser's local store for interactive client demonstration. In production deployment, VERSTECH Labs connects this interface to a HIPAA-compliant PostgreSQL database with role-based JWT authentication and audit trails.
              </p>
            </div>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 flex-shrink-0">
            Offline Demo State
          </span>
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* 4 Summary Cards (Calculated directly from actual demo appointments) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              {/* Total Appointments */}
              <div className="bg-white p-5 rounded-2xl border border-[#DCE5ED] shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500">Total Bookings</p>
                  <p className="text-2xl sm:text-3xl font-black text-[#123B66] mt-1">{metrics.total}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Demo appointment entries</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#F1F7FB] text-[#123B66] flex items-center justify-center border border-[#DCE5ED]">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>

              {/* Pending Requests */}
              <div className="bg-white p-5 rounded-2xl border border-[#DCE5ED] shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-amber-700">Pending Review</p>
                  <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">{metrics.pending}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Require staff confirmation</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
              </div>

              {/* Confirmed Appointments */}
              <div className="bg-white p-5 rounded-2xl border border-[#DCE5ED] shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-emerald-700">Confirmed Slots</p>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">{metrics.confirmed}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Tokens issued to patients</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>

              {/* Cancelled */}
              <div className="bg-white p-5 rounded-2xl border border-[#DCE5ED] shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-rose-700">Cancelled / No-show</p>
                  <p className="text-2xl sm:text-3xl font-black text-rose-600 mt-1">{metrics.cancelled}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Slots released to pool</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <XCircle className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Quick Action & Today's Schedule Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Recent Booking Activity Feed */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-[#DCE5ED] p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE5ED]">
                  <div>
                    <h3 className="font-bold text-sm text-[#123B66]">Recent Appointment Requests</h3>
                    <p className="text-xs text-slate-500">Live feed from website booking form</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('appointments')}
                    className="text-xs font-bold text-[#0D9488] hover:text-[#0f766e] hover:underline flex items-center"
                  >
                    <span>View all table</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                </div>

                <div className="divide-y divide-[#DCE5ED]">
                  {appointments.slice(0, 5).map((app) => (
                    <div key={app.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-[#123B66]">{app.id}</span>
                          <span className="font-bold text-[#334155]">{app.patientName}</span>
                          <span className="text-slate-400">•</span>
                          <span className="text-slate-600">{app.phoneNumber}</span>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          {app.doctorName} ({app.department}) — <span className="font-semibold text-[#123B66]">{app.appointmentDate} at {app.timeSlot}</span>
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          app.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                          app.status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {app.status}
                        </span>

                        <button
                          type="button"
                          onClick={() => setSelectedAppointment(app)}
                          className="p-1 rounded text-slate-400 hover:text-[#123B66] transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Clinic Summary Card */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-[#DCE5ED] p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#DCE5ED]">
                  <h3 className="font-bold text-sm text-[#123B66]">Clinic Status</h3>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Facility:</span>
                    <span className="font-bold text-[#123B66] text-right">{preset.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Type:</span>
                    <span className="font-semibold text-[#334155]">{preset.typeLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Emergency Desk:</span>
                    <span className="font-bold text-rose-600">{preset.emergencyPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">WhatsApp Desk:</span>
                    <span className="font-semibold text-emerald-600">{preset.whatsappNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">On-Call Consultants:</span>
                    <span className="font-bold text-[#123B66]">{DOCTORS.length} Specialists</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DCE5ED]">
                  <Link
                    href="/"
                    target="_blank"
                    className="w-full flex items-center justify-center py-2 px-3 rounded-xl text-xs font-bold text-[#123B66] bg-[#F1F7FB] hover:bg-[#DCE5ED] border border-[#DCE5ED] transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5 mr-1.5 text-[#0D9488]" />
                    <span>Open Public Website in New Tab</span>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. APPOINTMENTS MANAGEMENT TAB */}
        {activeTab === 'appointments' && (
          <div className="space-y-4 animate-fadeIn">
            
            {/* Search & Filter Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-[#DCE5ED] shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
              
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search patient, token, phone, doctor..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DCE5ED] text-xs text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
                />
              </div>

              {/* Status & Date Filters */}
              <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[#DCE5ED] text-xs font-semibold text-[#334155] bg-white"
                >
                  <option value="all">All Statuses ({metrics.total})</option>
                  <option value="pending">Pending ({metrics.pending})</option>
                  <option value="confirmed">Confirmed ({metrics.confirmed})</option>
                  <option value="completed">Completed ({metrics.completed})</option>
                  <option value="cancelled">Cancelled ({metrics.cancelled})</option>
                </select>

                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-[#DCE5ED] text-xs font-semibold text-[#334155] bg-white"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today's Visits</option>
                  <option value="upcoming">Upcoming Visits</option>
                </select>
              </div>

            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-2xl border border-[#DCE5ED] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F1F7FB] border-b border-[#DCE5ED] text-[#123B66] font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3.5 px-4">Booking Ref</th>
                      <th className="py-3.5 px-4">Patient Name</th>
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-4">Department & Doctor</th>
                      <th className="py-3.5 px-4">Date & Slot</th>
                      <th className="py-3.5 px-4">Type</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE5ED]">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((app) => (
                        <tr key={app.id} className="hover:bg-[#F1F7FB]/60 transition">
                          <td className="py-3.5 px-4 font-mono font-bold text-[#123B66]">
                            {app.id}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#334155]">
                            {app.patientName}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 font-medium">
                            {app.phoneNumber}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-[#123B66] block">{app.doctorName}</span>
                            <span className="text-[11px] text-slate-500">{app.department}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-[#334155] block">{app.appointmentDate}</span>
                            <span className="text-[11px] text-[#0D9488] font-semibold">{app.timeSlot}</span>
                          </td>
                          <td className="py-3.5 px-4 capitalize text-slate-600">
                            {app.consultationType.replace('-', ' ')}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              app.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                              app.status === 'pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                              app.status === 'cancelled' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1">
                            <button
                              type="button"
                              onClick={() => setSelectedAppointment(app)}
                              className="px-2 py-1 text-xs font-semibold text-[#123B66] bg-[#F1F7FB] hover:bg-[#DCE5ED] border border-[#DCE5ED] rounded transition"
                              title="View Patient Details"
                            >
                              View
                            </button>

                            {app.status === 'pending' && (
                              <button
                                type="button"
                                onClick={() => handleStatusChange(app.id, 'confirmed')}
                                className="px-2 py-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded transition"
                                title="Confirm Appointment"
                              >
                                Confirm
                              </button>
                            )}

                            {app.status !== 'cancelled' && (
                              <button
                                type="button"
                                onClick={() => setCancellingId(app.id)}
                                className="px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded transition"
                                title="Cancel Appointment"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-500 text-xs">
                          No demo appointments match your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* 3. DOCTORS ROSTER TAB */}
        {activeTab === 'doctors' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#123B66]">Doctor Faculty & Duty Roster</h3>
                <p className="text-xs text-slate-500">Active medical consultants on panel at {preset.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {DOCTORS.map((doc) => {
                const assignedCount = appointments.filter((a) => a.doctorId === doc.id || a.doctorName === doc.name).length;

                return (
                  <div key={doc.id} className="bg-white rounded-2xl border border-[#DCE5ED] p-5 shadow-sm space-y-4">
                    <div className="flex items-center space-x-3.5">
                      <img src={doc.image} alt={doc.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-sm text-[#123B66]">{doc.name}</h4>
                        <p className="text-[11px] text-[#0D9488] font-semibold">{doc.specialty}</p>
                        <p className="text-[11px] text-[#334155]">{doc.department}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#DCE5ED] text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Consultation Fee:</span>
                        <span className="font-bold text-[#123B66]">{doc.consultationFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">OPD Schedule:</span>
                        <span className="font-semibold text-emerald-700">{doc.availability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Active Bookings in System:</span>
                        <span className="font-bold text-[#123B66]">{assignedCount} appointments</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. DEPARTMENTS TAB */}
        {activeTab === 'departments' && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <h3 className="text-base font-bold text-[#123B66]">Clinical Departments</h3>
              <p className="text-xs text-slate-500">Configured medical service divisions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DEPARTMENTS.map((dept) => {
                const docCount = DOCTORS.filter((d) => d.department.toLowerCase() === dept.name.toLowerCase() || d.departmentId === dept.id).length;

                return (
                  <div key={dept.id} className="bg-white rounded-2xl border border-[#DCE5ED] p-5 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm text-[#123B66]">{dept.name}</h4>
                        <p className="text-xs text-[#0D9488] font-semibold mt-0.5">Head: {dept.headOfDepartment}</p>
                      </div>
                      <span className="text-xs font-bold text-[#123B66] bg-[#F1F7FB] px-2.5 py-1 rounded-lg border border-[#DCE5ED]">
                        {docCount} Doctors
                      </span>
                    </div>
                    <p className="text-xs text-[#334155] leading-relaxed">
                      {dept.description}
                    </p>
                    <div className="text-[11px] text-slate-500 pt-2 border-t border-[#DCE5ED]">
                      <strong>Hours:</strong> {dept.consultationHours}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* APPOINTMENT DETAIL MODAL */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#DCE5ED] w-full max-w-lg overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE5ED]">
              <div>
                <span className="font-mono text-xs font-bold text-[#123B66]">{selectedAppointment.id}</span>
                <h3 className="font-bold text-base text-[#123B66]">Appointment Record</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAppointment(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-[#123B66]">{selectedAppointment.patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Phone:</span>
                <span className="font-bold text-[#123B66]">{selectedAppointment.phoneNumber}</span>
              </div>
              {selectedAppointment.email && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Email Address:</span>
                  <span className="font-semibold text-[#334155]">{selectedAppointment.email}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Doctor:</span>
                <span className="font-bold text-[#123B66]">{selectedAppointment.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Department:</span>
                <span className="font-semibold text-[#334155]">{selectedAppointment.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Time:</span>
                <span className="font-bold text-[#123B66]">{selectedAppointment.appointmentDate} at {selectedAppointment.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Consultation Mode:</span>
                <span className="font-semibold text-[#334155] capitalize">{selectedAppointment.consultationType.replace('-', ' ')}</span>
              </div>
              {selectedAppointment.reasonForVisit && (
                <div className="pt-2 border-t border-[#DCE5ED]">
                  <span className="text-slate-500 block mb-0.5">Patient Notes / Reason:</span>
                  <p className="text-[#334155] italic bg-[#F1F7FB] p-2 rounded-lg border border-[#DCE5ED]">"{selectedAppointment.reasonForVisit}"</p>
                </div>
              )}
            </div>

            {/* Status Change Buttons */}
            <div className="pt-3 border-t border-[#DCE5ED] flex flex-wrap gap-2">
              <span className="text-xs font-bold text-[#334155] w-full mb-1">Update Status:</span>
              <button
                type="button"
                onClick={() => handleStatusChange(selectedAppointment.id, 'confirmed')}
                className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition"
              >
                Mark Confirmed
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange(selectedAppointment.id, 'completed')}
                className="px-3 py-1.5 text-xs font-bold text-white bg-[#123B66] hover:bg-[#0B2545] rounded-lg transition"
              >
                Mark Completed
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange(selectedAppointment.id, 'cancelled')}
                className="px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition"
              >
                Cancel Slot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANCELLATION CONFIRMATION MODAL */}
      {cancellingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl border border-[#DCE5ED] w-full max-w-sm p-6 space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#123B66]">Cancel this appointment?</h4>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to cancel appointment token <strong>{cancellingId}</strong>? This slot will be released.
              </p>
            </div>
            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setCancellingId(null)}
                className="w-1/2 py-2 px-3 rounded-xl text-xs font-bold text-[#334155] bg-[#F1F7FB] hover:bg-[#DCE5ED] border border-[#DCE5ED] transition"
              >
                Keep Active
              </button>
              <button
                type="button"
                onClick={confirmCancel}
                className="w-1/2 py-2 px-3 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
