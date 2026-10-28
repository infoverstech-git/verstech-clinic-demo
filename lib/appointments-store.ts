'use client';

export interface Appointment {
  id: string; // e.g. APT-2026-1042
  patientName: string;
  phoneNumber: string;
  email?: string;
  department: string;
  doctorId?: string;
  doctorName: string;
  appointmentDate: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "04:30 PM"
  consultationType: 'in-clinic' | 'teleconsult';
  reasonForVisit?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  notes?: string;
  isDemoOnly: true;
}

export interface AppointmentMetrics {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  completed: number;
}

const STORAGE_KEY = 'verstech_clinic_demo_appointments_v1';

// Seed initial realistic appointments so the demo dashboard looks active immediately
const INITIAL_DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-2026-9041',
    patientName: 'Khurram Shehzad',
    phoneNumber: '0300 4589123',
    email: 'khurram.s@example.com',
    department: 'Cardiology & Heart Care',
    doctorId: 'dr-tariq-mansoor',
    doctorName: 'Dr. Tariq Mansoor',
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    timeSlot: '04:30 PM',
    consultationType: 'in-clinic',
    reasonForVisit: 'Hypertension checkup and routine echocardiography follow-up.',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    isDemoOnly: true,
  },
  {
    id: 'APT-2026-8812',
    patientName: 'Fatima Naveed',
    phoneNumber: '0321 8765432',
    email: 'fatima.naveed@example.com',
    department: 'Pediatrics & Child Wellness',
    doctorId: 'dr-ayesha-siddiqa',
    doctorName: 'Dr. Ayesha Siddiqa',
    appointmentDate: new Date().toISOString().split('T')[0], // Today
    timeSlot: '11:30 AM',
    consultationType: 'in-clinic',
    reasonForVisit: '6-month infant vaccination & growth evaluation.',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    isDemoOnly: true,
  },
  {
    id: 'APT-2026-7539',
    patientName: 'Zubair Mahmood',
    phoneNumber: '0333 1122334',
    email: 'z.mahmood@example.com',
    department: 'Orthopedics & Joint Care',
    doctorId: 'dr-farhan-khalid',
    doctorName: 'Dr. Farhan Khalid',
    appointmentDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    timeSlot: '06:00 PM',
    consultationType: 'in-clinic',
    reasonForVisit: 'Severe right knee swelling following badminton game.',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 3600000 * 30).toISOString(),
    isDemoOnly: true,
  },
  {
    id: 'APT-2026-6410',
    patientName: 'Amna Zahid',
    phoneNumber: '0302 9988776',
    email: 'amna.z@example.com',
    department: 'Dermatology & Skin Aesthetics',
    doctorId: 'dr-hina-zubair',
    doctorName: 'Dr. Hina Zubair',
    appointmentDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    timeSlot: '03:30 PM',
    consultationType: 'teleconsult',
    reasonForVisit: 'Review of hormonal acne treatment prescription.',
    status: 'pending',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    isDemoOnly: true,
  },
  {
    id: 'APT-2026-5122',
    patientName: 'Hassan Raza',
    phoneNumber: '0315 5544332',
    department: 'General & Internal Medicine',
    doctorId: 'dr-kamran-masood',
    doctorName: 'Dr. Kamran Masood',
    appointmentDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
    timeSlot: '10:00 AM',
    consultationType: 'in-clinic',
    reasonForVisit: 'Fasting blood sugar review & HbA1c lab check.',
    status: 'completed',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    isDemoOnly: true,
  },
  {
    id: 'APT-2026-4890',
    patientName: 'Bilal Arshad',
    phoneNumber: '0345 6677889',
    department: 'Dentistry & Maxillofacial Care',
    doctorId: 'dr-bilal-aslam',
    doctorName: 'Dr. Bilal Aslam',
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '05:30 PM',
    consultationType: 'in-clinic',
    reasonForVisit: 'Patient requested rescheduling due to out-of-town travel.',
    status: 'cancelled',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    isDemoOnly: true,
  },
];

export function getStoredAppointments(): Appointment[] {
  if (typeof window === 'undefined') {
    return INITIAL_DEMO_APPOINTMENTS;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_APPOINTMENTS));
      return INITIAL_DEMO_APPOINTMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_DEMO_APPOINTMENTS;
  } catch (error) {
    console.warn('Failed to parse appointments from localStorage, using fallback.', error);
    return INITIAL_DEMO_APPOINTMENTS;
  }
}

export function saveNewAppointment(data: {
  patientName: string;
  phoneNumber: string;
  email?: string;
  department: string;
  doctorId?: string;
  doctorName: string;
  appointmentDate: string;
  timeSlot: string;
  consultationType: 'in-clinic' | 'teleconsult';
  reasonForVisit?: string;
}): Appointment {
  const current = getStoredAppointments();

  // Create unique reference code
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newAppointment: Appointment = {
    ...data,
    id: `APT-2026-${randomSuffix}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
    isDemoOnly: true,
  };

  const updated = [newAppointment, ...current];

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('appointments-updated', { detail: newAppointment }));
    } catch (e) {
      console.error('Failed to save appointment to localStorage', e);
    }
  }

  return newAppointment;
}

export function updateAppointmentStatus(
  id: string,
  newStatus: Appointment['status'],
  notes?: string
): boolean {
  const current = getStoredAppointments();
  const index = current.findIndex((a) => a.id === id);
  if (index === -1) return false;

  current[index].status = newStatus;
  if (notes) current[index].notes = notes;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      window.dispatchEvent(new CustomEvent('appointments-updated', { detail: current[index] }));
      return true;
    } catch (e) {
      console.error('Failed to update appointment status in localStorage', e);
      return false;
    }
  }
  return true;
}

export function deleteAppointment(id: string): boolean {
  const current = getStoredAppointments();
  const filtered = current.filter((a) => a.id !== id);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new CustomEvent('appointments-updated'));
      return true;
    } catch (e) {
      console.error('Failed to delete appointment from localStorage', e);
      return false;
    }
  }
  return true;
}

export function resetDemoAppointments(): Appointment[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_APPOINTMENTS));
    window.dispatchEvent(new CustomEvent('appointments-updated'));
  }
  return INITIAL_DEMO_APPOINTMENTS;
}

export function computeMetrics(appointments: Appointment[]): AppointmentMetrics {
  return {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === 'pending').length,
    confirmed: appointments.filter((a) => a.status === 'confirmed').length,
    cancelled: appointments.filter((a) => a.status === 'cancelled').length,
    completed: appointments.filter((a) => a.status === 'completed').length,
  };
}
