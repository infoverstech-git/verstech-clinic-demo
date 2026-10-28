export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  specialty: string;
  department: string;
  departmentId: string;
  experienceYears: number;
  consultationFee: string;
  availability: string;
  rating: number;
  reviewCount: number;
  image: string;
  about: string;
  education: string[];
  clinicalFocus: string[];
  days: string[];
  timeSlots: string[];
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  headOfDepartment: string;
  description: string;
  longDescription: string;
  iconName: string;
  consultationHours: string;
  servicesOffered: string[];
}

export interface MedicalService {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  department: string;
  departmentId: string;
  iconName: string;
  features: string[];
  timing: string;
  priceStarting: string;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  badge: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  treatment: string;
  rating: number;
  comment: string;
  date: string;
  doctorConsulted: string;
}

export interface ClinicPreset {
  id: string;
  name: string;
  tagline: string;
  typeLabel: string;
  heroBadge: string;
  emergencyPhone: string;
  receptionPhone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  geoLatitude: number;
  geoLongitude: number;
  googleMapsUrl: string;
  timingsWeekday: string;
  timingsSunday: string;
  opdNotice: string;
}

export const CLINIC_PRESETS: Record<string, ClinicPreset> = {
  hospital: {
    id: 'hospital',
    name: 'CarePoint Medical Centre & Hospital',
    tagline: 'Leading Multispecialty Healthcare with Compassionate Clinical Excellence',
    typeLabel: 'Multispecialty Hospital & Diagnostic Center',
    heroBadge: '24/7 Emergency & Inpatient Services Available',
    emergencyPhone: '+92 (042) 3587-0099',
    receptionPhone: '+92 (042) 3587-0011',
    whatsappNumber: '+923356123538',
    email: 'info@carepointmedical.demo',
    address: 'Plot 42-A, Main Boulevard, Gulberg III',
    city: 'Lahore',
    postalCode: '54660',
    country: 'Pakistan',
    geoLatitude: 31.5204,
    geoLongitude: 74.3587,
    googleMapsUrl: 'https://maps.google.com/?q=Gulberg+III+Lahore',
    timingsWeekday: 'Open 24 Hours (OPD: 8:30 AM - 10:00 PM)',
    timingsSunday: 'Emergency 24/7 (Specialist Clinics: 10 AM - 4 PM)',
    opdNotice: 'Walk-in patients welcomed; online appointment priority check-in active.',
  },
  privateClinic: {
    id: 'privateClinic',
    name: 'Al-Shifa Family Medicine & Specialist Clinic',
    tagline: 'Personalized Medical Consultations & Preventive Family Healthcare',
    typeLabel: 'Private Consultant Practice & Day Clinic',
    heroBadge: 'Same-Day Doctor Appointments Available',
    emergencyPhone: '+92 (042) 3571-4455',
    receptionPhone: '+92 (042) 3571-4400',
    whatsappNumber: '+923356123538',
    email: 'care@alshifaclinic.demo',
    address: 'Commercial Plaza, Phase 5 DHA',
    city: 'Lahore',
    postalCode: '54792',
    country: 'Pakistan',
    geoLatitude: 31.4697,
    geoLongitude: 74.4121,
    googleMapsUrl: 'https://maps.google.com/?q=DHA+Phase+5+Lahore',
    timingsWeekday: 'Monday - Saturday: 9:00 AM - 9:00 PM',
    timingsSunday: 'Sunday: 11:00 AM - 5:00 PM (On-Call Specialist)',
    opdNotice: 'Zero waiting time policy with pre-booked appointments.',
  },
  specialtyCenter: {
    id: 'specialtyCenter',
    name: 'MedVista Cardiology & Heart Care Institute',
    tagline: 'Advanced Diagnostic Cardiology, Vascular Health & Preventative Wellness',
    typeLabel: 'Cardiovascular Specialty Center',
    heroBadge: 'Comprehensive Heart Checkup Packages',
    emergencyPhone: '+92 (042) 3590-2211',
    receptionPhone: '+92 (042) 3590-2200',
    whatsappNumber: '+923356123538',
    email: 'consult@medvistacardio.demo',
    address: 'Shaukat Khanum Chowk, Johar Town',
    city: 'Lahore',
    postalCode: '54770',
    country: 'Pakistan',
    geoLatitude: 31.4682,
    geoLongitude: 74.2882,
    googleMapsUrl: 'https://maps.google.com/?q=Johar+Town+Lahore',
    timingsWeekday: 'Monday - Friday: 8:00 AM - 8:00 PM',
    timingsSunday: 'Emergency Cardiac Triage Available 24/7',
    opdNotice: 'State-of-the-art Echo, ECG, and stress test suites active.',
  },
};

export const DEFAULT_PRESET_KEY = 'hospital';

export const DEPARTMENTS: Department[] = [
  {
    id: 'general-medicine',
    name: 'General & Internal Medicine',
    slug: 'general-medicine',
    headOfDepartment: 'Dr. Kamran Masood',
    description: 'Primary and secondary health management for chronic disorders, diabetes, and executive wellness checkups.',
    longDescription: 'Our General & Internal Medicine department serves as the foundation for patient-centered diagnostic care. We specialize in managing complex multi-system disorders, adult chronic illnesses like diabetes and hypertension, lifestyle diseases, and acute infectious conditions.',
    iconName: 'Stethoscope',
    consultationHours: 'Monday – Sunday (08:30 AM – 10:00 PM)',
    servicesOffered: [
      'Comprehensive Diabetes Management & HbA1c Monitoring',
      'Hypertension & Cardiovascular Risk Assessment',
      'Infectious Disease Triage & Recovery',
      'Executive Annual Preventive Screenings',
      'Thyroid & Metabolic Hormonal Care',
    ],
  },
  {
    id: 'cardiology',
    name: 'Cardiology & Heart Care',
    slug: 'cardiology',
    headOfDepartment: 'Dr. Tariq Mansoor',
    description: 'Advanced cardiovascular diagnostics, 2D Color Doppler Echocardiography, and chest pain triage.',
    longDescription: 'Providing non-invasive and preventive cardiovascular evaluations. Equipped with 12-lead digital ECGs, stress echocardiography, and 24-hour ambulatory Holter monitoring to detect and manage arrhythmias and coronary artery conditions early.',
    iconName: 'HeartPulse',
    consultationHours: 'Monday – Saturday (09:00 AM – 08:00 PM)',
    servicesOffered: [
      '12-Lead Digital ECG & Interpretation',
      '2D Color Doppler Echocardiography',
      '24-Hour Ambulatory Holter Blood Pressure & Rhythm Monitoring',
      'Post-Myocardial Infarction Rehabilitation Guidance',
      'Dyslipidemia & Cholesterol Risk Modification',
    ],
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics & Child Wellness',
    slug: 'pediatrics',
    headOfDepartment: 'Dr. Ayesha Siddiqa',
    description: 'Compassionate care for infants, toddlers, and adolescents including WHO-standard immunization programs.',
    longDescription: 'Dedicated to child wellness, development monitoring, and treating acute childhood ailments in a gentle, warm clinic environment. From newborn jaundice reviews to developmental milestone tracking and WHO-compliant immunizations.',
    iconName: 'Baby',
    consultationHours: 'Monday – Saturday (10:00 AM – 08:00 PM)',
    servicesOffered: [
      'Newborn Health & Lactation Assessment',
      'WHO-Compliant Vaccination & Immunization Schedules',
      'Pediatric Respiratory & Asthma Management',
      'Growth & Milestone Development Tracking',
      'Childhood Nutrition & Allergy Evaluation',
    ],
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics & Joint Care',
    slug: 'orthopedics',
    headOfDepartment: 'Dr. Farhan Khalid',
    description: 'Specialized diagnosis and treatment for arthritis, back pain, fracture stabilization, and sports injuries.',
    longDescription: 'Focused on restoring pain-free movement. Our orthopedic specialists provide non-surgical and surgical solutions for musculoskeletal trauma, degenerative joint disease, disc problems, sports ligament tears, and post-injury physiotherapy coordination.',
    iconName: 'Activity',
    consultationHours: 'Monday – Saturday (02:00 PM – 09:00 PM)',
    servicesOffered: [
      'Osteoarthritis & Knee Pain Management',
      'Intra-articular Viscosupplementation & PRP',
      'Acute Sprain, Strain & Fracture Stabilization',
      'Spine, Sciatica & Posture Correction Clinic',
      'Sports Injury Rehabilitation',
    ],
  },
  {
    id: 'dermatology',
    name: 'Dermatology & Skin Aesthetics',
    slug: 'dermatology',
    headOfDepartment: 'Dr. Hina Zubair',
    description: 'Evidence-based clinical treatments for stubborn acne, eczema, hair loss, and medical aesthetic laser procedures.',
    longDescription: 'Dermatologist-led skin health management combining medical diagnostics with modern laser therapy. We treat complex skin diseases, auto-immune dermatoses, pigmentation disorders, and hair thinning with clinical precision.',
    iconName: 'Sparkles',
    consultationHours: 'Monday – Saturday (01:00 PM – 08:00 PM)',
    servicesOffered: [
      'Clinical Acne & Acne Scar Multi-Modality Protocols',
      'Hair Thinning & Platelet-Rich Plasma (PRP) Therapy',
      'Eczema, Psoriasis & Chronic Allergy Testing',
      'Cryotherapy for Benign Lesions',
      'Medical Hydration & Medical Aesthetic Peels',
    ],
  },
  {
    id: 'gynecology',
    name: 'Gynecology & Obstetrics',
    slug: 'gynecology',
    headOfDepartment: 'Dr. Zainab Rehman',
    description: 'Women’s health consultations, prenatal care, antenatal ultrasound reviews, and hormonal wellness.',
    longDescription: 'Providing comprehensive, confidential healthcare for women at every stage of life. Our services span antenatal monitoring, ultrasound guidance, fertility consultations, PCOS management, and post-natal maternal wellness.',
    iconName: 'Users',
    consultationHours: 'Monday – Friday (11:00 AM – 05:00 PM)',
    servicesOffered: [
      'Comprehensive Prenatal & Antenatal Checkups',
      'Polycystic Ovarian Syndrome (PCOS) & Hormonal Care',
      'High-Resolution Pelvic Ultrasound Evaluations',
      'Family Planning & Pre-Pregnancy Counseling',
      'Menopausal Healthcare & Bone Density Reviews',
    ],
  },
  {
    id: 'dentistry',
    name: 'Dentistry & Maxillofacial Care',
    slug: 'dentistry',
    headOfDepartment: 'Dr. Bilal Aslam',
    description: 'Preventive dental hygiene, root canals, painless tooth extractions, and cosmetic teeth alignment.',
    longDescription: 'State-of-the-art dental operatory adhering to 100% autoclave sterilization standards. From routine prophylactic scaling to complex root canal treatments, porcelain crowns, and orthodontic smile corrections.',
    iconName: 'Smile',
    consultationHours: 'Monday – Saturday (03:00 PM – 09:00 PM)',
    servicesOffered: [
      'Ultrasonic Scaling & Dental Prophylaxis',
      'Painless Single-Sitting Root Canal Treatments',
      'Aesthetic Composite Restorations & Veneers',
      'Orthodontic Aligners & Retainers',
      'Surgical Extractions & Wisdom Tooth Management',
    ],
  },
  {
    id: 'diagnostics',
    name: 'Diagnostic Pathology & Radiology',
    slug: 'diagnostics',
    headOfDepartment: 'Dr. Nida Tahir',
    description: '24/7 automated clinical laboratory, high-frequency digital X-Ray, and color ultrasound imaging.',
    longDescription: 'Equipped with calibrated digital analyzers and digital radiologic equipment. Delivers verified pathology results and imaging reports with same-day digital delivery directly to your WhatsApp and patient portal.',
    iconName: 'Microscope',
    consultationHours: 'Open 24 Hours / 7 Days a Week',
    servicesOffered: [
      'Automated Complete Blood Count & Blood Chemistry',
      'Thyroid, Lipid, Liver & Renal Function Profiles',
      'High-Resolution Abdominal & Obstetric Ultrasound',
      'Low-Dose Digital Radiography (X-Ray)',
      'Instant SMS & WhatsApp Report Dispatch',
    ],
  },
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-tariq-mansoor',
    name: 'Dr. Tariq Mansoor',
    qualification: 'MBBS, FCPS (Cardiology), FACC',
    specialty: 'Senior Consultant Cardiologist',
    department: 'Cardiology & Heart Care',
    departmentId: 'cardiology',
    experienceYears: 16,
    consultationFee: 'PKR 3,000',
    availability: 'Mon - Fri: 4:00 PM - 8:00 PM',
    rating: 4.9,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    about: 'Specializes in clinical cardiology, ischemic heart management, preventive risk factor modification, and non-invasive cardiovascular imaging.',
    education: [
      'MBBS — King Edward Medical University',
      'FCPS Cardiology — College of Physicians & Surgeons Pakistan',
      'Fellow of the American College of Cardiology (FACC)',
    ],
    clinicalFocus: [
      'Hypertension & Coronary Artery Disease',
      '2D Color Doppler Echocardiography',
      'Arrhythmia & Holter Evaluation',
      'Preventive Cardiovascular Wellness',
    ],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    timeSlots: ['04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'],
  },
  {
    id: 'dr-ayesha-siddiqa',
    name: 'Dr. Ayesha Siddiqa',
    qualification: 'MBBS, MRCPCH (UK), MCPS (Pediatrics)',
    specialty: 'Consultant Pediatrician & Neonatologist',
    department: 'Pediatrics & Child Wellness',
    departmentId: 'pediatrics',
    experienceYears: 12,
    consultationFee: 'PKR 2,500',
    availability: 'Mon - Sat: 11:00 AM - 3:00 PM',
    rating: 4.9,
    reviewCount: 418,
    image: 'https://images.unsplash.com/photo-1594824813626-d6e87f87f4c5?auto=format&fit=crop&w=600&q=80',
    about: 'Renowned for gentle pediatric care, infant nutrition counseling, vaccination roadmaps, and managing acute respiratory infections in toddlers.',
    education: [
      'MBBS — Fatima Jinnah Medical University',
      'MRCPCH — Royal College of Paediatrics and Child Health, UK',
      'MCPS Pediatrics — CPSP',
    ],
    clinicalFocus: [
      'Neonatal Jaundice & Infant Milestones',
      'WHO-Compliant Vaccination Programs',
      'Pediatric Asthma & Allergies',
      'Childhood Nutrition & Growth Disorders',
    ],
    days: ['Mon', 'Wed', 'Thu', 'Fri', 'Sat'],
    timeSlots: ['11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM'],
  },
  {
    id: 'dr-farhan-khalid',
    name: 'Dr. Farhan Khalid',
    qualification: 'MBBS, MS (Orthopedics), AO Spine Fellow',
    specialty: 'Consultant Orthopedic Surgeon',
    department: 'Orthopedics & Joint Care',
    departmentId: 'orthopedics',
    experienceYears: 14,
    consultationFee: 'PKR 2,800',
    availability: 'Mon - Sat: 5:00 PM - 9:00 PM',
    rating: 4.8,
    reviewCount: 289,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    about: 'Focused on knee & hip arthritis management, sports trauma rehabilitation, minimally invasive joint procedures, and posture correction.',
    education: [
      'MBBS — Allama Iqbal Medical College',
      'Master of Surgery (MS Orthopedics) — University of Health Sciences',
      'AO Spine Fellowship Certification',
    ],
    clinicalFocus: [
      'Knee & Hip Osteoarthritis',
      'Sports Injury & Ligament Tears',
      'Sciatica & Disc Management',
      'Joint Injections & PRP Therapy',
    ],
    days: ['Mon', 'Tue', 'Wed', 'Sat'],
    timeSlots: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM'],
  },
  {
    id: 'dr-hina-zubair',
    name: 'Dr. Hina Zubair',
    qualification: 'MBBS, FCPS (Dermatology)',
    specialty: 'Consultant Dermatologist & Aesthetician',
    department: 'Dermatology & Skin Aesthetics',
    departmentId: 'dermatology',
    experienceYears: 10,
    consultationFee: 'PKR 2,500',
    availability: 'Tue - Sat: 2:00 PM - 7:00 PM',
    rating: 4.9,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    about: 'Specializes in medical dermatology, stubborn acne treatments, hair thinning restoration, chronic eczema, and clinical aesthetic care.',
    education: [
      'MBBS — Services Institute of Medical Sciences',
      'FCPS Dermatology — College of Physicians & Surgeons Pakistan',
      'Clinical Aesthetic Fellowship — Dubai Aesthetic Academy',
    ],
    clinicalFocus: [
      'Severe Acne & Scar Remodeling',
      'Hair Thinning, Alopecia & PRP',
      'Eczema, Psoriasis & Skin Biopsy',
      'Medical Laser & Pigmentation Solutions',
    ],
    days: ['Tue', 'Wed', 'Fri', 'Sat'],
    timeSlots: ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM'],
  },
  {
    id: 'dr-kamran-masood',
    name: 'Dr. Kamran Masood',
    qualification: 'MBBS, FCPS (Internal Medicine), MACP',
    specialty: 'Senior Consultant Physician & Diabetologist',
    department: 'General & Internal Medicine',
    departmentId: 'general-medicine',
    experienceYears: 15,
    consultationFee: 'PKR 2,200',
    availability: 'Mon - Sun: 09:00 AM - 02:00 PM',
    rating: 4.8,
    reviewCount: 390,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80',
    about: 'Senior physician managing type-2 diabetes, hypertension, metabolic syndrome, thyroid disorders, and preventive adult healthcare.',
    education: [
      'MBBS — King Edward Medical University',
      'FCPS Internal Medicine — CPSP',
      'Member American College of Physicians (MACP)',
    ],
    clinicalFocus: [
      'Diabetes Mellitus & Insulin Management',
      'Endocrine & Thyroid Imbalance',
      'Hypertension & Metabolic Syndrome',
      'Infectious Disease & Geriatric Medicine',
    ],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    timeSlots: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM'],
  },
  {
    id: 'dr-zainab-rehman',
    name: 'Dr. Zainab Rehman',
    qualification: 'MBBS, FCPS (Obstetrics & Gynecology)',
    specialty: 'Consultant Gynecologist & Obstetrician',
    department: 'Gynecology & Obstetrics',
    departmentId: 'gynecology',
    experienceYears: 14,
    consultationFee: 'PKR 2,800',
    availability: 'Mon - Fri: 11:00 AM - 4:00 PM',
    rating: 4.9,
    reviewCount: 365,
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=600&q=80',
    about: 'Specializes in comprehensive prenatal care, high-risk pregnancy monitoring, PCOS management, and adolescent gynecological health.',
    education: [
      'MBBS — Rawalpindi Medical University',
      'FCPS Obstetrics & Gynecology — CPSP',
      'Certificate in Maternal-Fetal Ultrasound',
    ],
    clinicalFocus: [
      'Antenatal Care & Safe Motherhood',
      'PCOS & Infertility Workup',
      'Pelvic Ultrasound & Fetal Monitoring',
      'Menstrual Health & Menopause Support',
    ],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    timeSlots: ['11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM'],
  },
  {
    id: 'dr-bilal-aslam',
    name: 'Dr. Bilal Aslam',
    qualification: 'BDS, FCPS (Oral & Maxillofacial Surgery)',
    specialty: 'Consultant Dental Surgeon',
    department: 'Dentistry & Maxillofacial Care',
    departmentId: 'dentistry',
    experienceYears: 11,
    consultationFee: 'PKR 2,000',
    availability: 'Mon - Sat: 3:00 PM - 9:00 PM',
    rating: 4.9,
    reviewCount: 247,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
    about: 'Provides modern painless root canal treatments, aesthetic composite veneers, dental implants, and surgical wisdom tooth extractions.',
    education: [
      'BDS — De’Montmorency College of Dentistry',
      'FCPS Oral & Maxillofacial Surgery — CPSP',
      'Certified Implantology Fellow',
    ],
    clinicalFocus: [
      'Painless Single-Visit Root Canals',
      'Cosmetic Smile Makeover & Veneers',
      'Impacted Wisdom Tooth Surgery',
      'Dental Prophylaxis & Teeth Whitening',
    ],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    timeSlots: ['03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'],
  },
  {
    id: 'dr-nida-tahir',
    name: 'Dr. Nida Tahir',
    qualification: 'MBBS, MCPS (Radiology & Diagnostic Sonology)',
    specialty: 'Consultant Radiologist & Sonologist',
    department: 'Diagnostic Pathology & Radiology',
    departmentId: 'diagnostics',
    experienceYears: 9,
    consultationFee: 'PKR 1,800',
    availability: 'Mon - Sat: 09:00 AM - 05:00 PM',
    rating: 4.8,
    reviewCount: 198,
    image: 'https://images.unsplash.com/photo-1594824813716-e41c49b6b668?auto=format&fit=crop&w=600&q=80',
    about: 'Expert sonologist performing high-resolution abdominal, obstetric Doppler, thyroid, and musculoskeletal ultrasounds with instant digital reporting.',
    education: [
      'MBBS — Punjab Medical College',
      'MCPS Radiology — College of Physicians & Surgeons Pakistan',
      'Fellowship in Color Doppler Ultrasound',
    ],
    clinicalFocus: [
      'High-Resolution Abdominal & Pelvic Ultrasound',
      'Obstetric Color Doppler & Anomaly Scans',
      'Thyroid & Small Parts Sonology',
      'Digital Radiography Interpretation',
    ],
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'],
  },
];

export const MEDICAL_SERVICES: MedicalService[] = [
  {
    id: 'general-consultation',
    title: 'General Health & Executive OPD',
    shortDescription: 'Full clinical evaluations, routine screening, blood pressure monitoring, and chronic disease consultations.',
    fullDescription: 'Our general outpatient clinic provides unhurried, patient-centered consultations with senior physicians for general illnesses, fever triage, and routine checkups.',
    department: 'General & Internal Medicine',
    departmentId: 'general-medicine',
    iconName: 'Stethoscope',
    features: ['Blood Pressure & Glucose Screening', 'Infectious Fever Evaluation', 'Preventive Executive Packages', 'Same-day Medical Certificates'],
    timing: 'Mon - Sun (8:30 AM - 10:00 PM)',
    priceStarting: 'PKR 2,000',
  },
  {
    id: 'cardiology-echo',
    title: 'Cardiology & Color Doppler Echo',
    shortDescription: 'Complete cardiovascular evaluations, digital 12-lead ECG, 2D Echocardiography, and hypertension control.',
    fullDescription: 'Our cardiology department provides rapid diagnosis and evidence-based preventive care for cardiovascular conditions, rhythm disorders, and long-term lipid management.',
    department: 'Cardiology & Heart Care',
    departmentId: 'cardiology',
    iconName: 'HeartPulse',
    features: ['Digital 12-Lead ECG', '2D Color Doppler Echo', '24h Holter Monitoring', 'Chest Pain Protocol'],
    timing: 'Mon - Sat (9:00 AM - 8:00 PM)',
    priceStarting: 'PKR 2,500',
  },
  {
    id: 'pediatric-wellness',
    title: 'Pediatrics & WHO Immunization',
    shortDescription: 'Comprehensive pediatric care from newborn checkups to adolescent development, vaccinations, and nutrition.',
    fullDescription: 'Compassionate, kid-friendly clinical consultations ensuring your children achieve milestones with optimal immunity, growth monitoring, and gentle care.',
    department: 'Pediatrics & Child Wellness',
    departmentId: 'pediatrics',
    iconName: 'Baby',
    features: ['Newborn Assessments', 'WHO-Standard Immunization', 'Growth & Milestone Tracking', 'Pediatric Urgent Care'],
    timing: 'Mon - Sat (10:00 AM - 8:00 PM)',
    priceStarting: 'PKR 2,000',
  },
  {
    id: 'orthopedics-joint',
    title: 'Orthopedics & Joint Pain Clinic',
    shortDescription: 'Diagnosis and non-surgical/surgical treatment for arthritis, sports injuries, fractures, and back pain.',
    fullDescription: 'Restoring mobility and relieving pain through advanced musculoskeletal assessments, intra-articular therapies, and coordinated physiotherapy.',
    department: 'Orthopedics & Joint Care',
    departmentId: 'orthopedics',
    iconName: 'Activity',
    features: ['Joint Pain Management', 'Fracture & Sprain Care', 'Sports Injury Rehab', 'Spine & Posture Clinic'],
    timing: 'Mon - Sat (2:00 PM - 9:00 PM)',
    priceStarting: 'PKR 2,500',
  },
  {
    id: 'dermatology-laser',
    title: 'Dermatology & Skin Laser Care',
    shortDescription: 'Clinical treatment for acne, eczema, psoriasis, hair fall, and medical aesthetic laser procedures.',
    fullDescription: 'Evidence-backed dermatology delivering safe, dermatologist-led skin and hair treatments with the latest phototherapy and laser equipment.',
    department: 'Dermatology & Skin Aesthetics',
    departmentId: 'dermatology',
    iconName: 'Sparkles',
    features: ['Acne & Scar Protocols', 'Hair Loss & PRP Solutions', 'Skin Allergy Testing', 'Cryotherapy & Laser'],
    timing: 'Mon - Sat (1:00 PM - 8:00 PM)',
    priceStarting: 'PKR 2,200',
  },
  {
    id: 'gynecology-antenatal',
    title: 'Gynecology & Antenatal Care',
    shortDescription: 'Maternal health, safe prenatal checkups, PCOS balancing, and pelvic ultrasound examinations.',
    fullDescription: 'Confidential, supportive women’s health consultations focused on safe pregnancy, hormonal harmony, and adolescent-to-menopausal healthcare.',
    department: 'Gynecology & Obstetrics',
    departmentId: 'gynecology',
    iconName: 'Users',
    features: ['Antenatal Checkup Packages', 'PCOS & Hormone Balancing', 'Pelvic Ultrasound Guidance', 'Postpartum Follow-up'],
    timing: 'Mon - Fri (11:00 AM - 5:00 PM)',
    priceStarting: 'PKR 2,500',
  },
  {
    id: 'dental-clinic',
    title: 'Dental Care & Smile Restoration',
    shortDescription: 'Painless single-visit root canals, ultrasonic cleaning, composite veneers, and wisdom tooth extraction.',
    fullDescription: 'Modern, sterile dental operatory using digital imaging and gentle anesthesia techniques to ensure relaxing patient visits.',
    department: 'Dentistry & Maxillofacial Care',
    departmentId: 'dentistry',
    iconName: 'Smile',
    features: ['Ultrasonic Teeth Scaling', 'Painless Root Canals', 'Aesthetic Tooth Restorations', 'Wisdom Tooth Surgery'],
    timing: 'Mon - Sat (3:00 PM - 9:00 PM)',
    priceStarting: 'PKR 2,000',
  },
  {
    id: 'lab-diagnostics',
    title: 'Diagnostic Lab & Color Ultrasound',
    shortDescription: 'Fast, high-precision automated laboratory tests, digital X-Rays, high-resolution ultrasound, and online reports.',
    fullDescription: 'Equipped with calibrated digital analyzers providing same-day verified pathology results directly to your phone via SMS or WhatsApp portal.',
    department: 'Diagnostic Pathology & Radiology',
    departmentId: 'diagnostics',
    iconName: 'Microscope',
    features: ['Automated Blood Chemistry', 'High-Res Ultrasound', 'Digital Radiography', 'WhatsApp Report Delivery'],
    timing: 'Open 24 Hours / 7 Days',
    priceStarting: 'PKR 800',
  },
];

export const FACILITIES: Facility[] = [
  {
    id: 'emergency-247',
    title: '24/7 Emergency & Triage',
    description: 'Immediate medical stabilization with dedicated emergency medical officers, oxygen supply, and cardiac monitoring.',
    badge: 'Immediate Response',
    iconName: 'ShieldAlert',
  },
  {
    id: 'digital-lab',
    title: 'ISO-Standard Diagnostic Lab',
    description: 'Fully automated biochemistry, hematology, and hormonal testing with instant digital report dispatch.',
    badge: 'Rapid Results',
    iconName: 'FlaskConical',
  },
  {
    id: 'pharmacy',
    title: 'On-Site 24/7 Pharmacy',
    description: 'Authentic, temperature-monitored pharmaceutical stock, surgical supplies, and patient counseling.',
    badge: '100% Genuine Medicine',
    iconName: 'Pill',
  },
  {
    id: 'teleconsult',
    title: 'WhatsApp & Video Teleconsultation',
    description: 'Consult top specialists from home with digital e-prescriptions sent straight to your smartphone.',
    badge: 'Home Care',
    iconName: 'Video',
  },
  {
    id: 'day-surgery',
    title: 'Minor OT & Day Procedures',
    description: 'Hygienic, HEPA-filtered procedure rooms for endoscopy, wound dressings, biopsies, and minor suturing.',
    badge: 'Zero Infection Protocol',
    iconName: 'BedDouble',
  },
  {
    id: 'patient-comfort',
    title: 'Modern Accessible Waiting Lounge',
    description: 'Spacious climate-controlled waiting areas with wheelchair access, clean water, and priority seating for elderly.',
    badge: 'Family-Friendly',
    iconName: 'Smile',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    patientName: 'Mian Usman Farooq',
    treatment: 'Cardiology Consultation & Echo',
    rating: 5,
    comment: 'The booking process was effortless. Dr. Tariq took the time to explain my ECG and Echo results in plain words. Staff was courteous and the clinic was spotless.',
    date: 'October 2026',
    doctorConsulted: 'Dr. Tariq Mansoor',
  },
  {
    id: 't-2',
    patientName: 'Sadia Kamran',
    treatment: 'Pediatric Care & Vaccination',
    rating: 5,
    comment: 'Dr. Ayesha is wonderful with kids. My 3-year-old usually cries at doctors, but her gentle approach made vaccination easy. Received digital reminders on WhatsApp beforehand!',
    date: 'October 2026',
    doctorConsulted: 'Dr. Ayesha Siddiqa',
  },
  {
    id: 't-3',
    patientName: 'Chaudhry Bilal Ahmed',
    treatment: 'Orthopedic Knee Assessment',
    rating: 5,
    comment: 'Visited for severe knee pain. Got digital X-rays taken and reviewed within 30 minutes. The prescribed rehabilitation exercises have helped tremendously.',
    date: 'September 2026',
    doctorConsulted: 'Dr. Farhan Khalid',
  },
];

export const CLINIC_STATS = [
  { value: '18+', label: 'Specialist Doctors', sublabel: 'Board-certified consultants' },
  { value: '45,000+', label: 'Patients Treated', sublabel: 'Trusted by families' },
  { value: '15 Min', label: 'Average Wait Time', sublabel: 'With prior appointments' },
  { value: '99.4%', label: 'Patient Satisfaction', sublabel: 'Based on post-visit feedback' },
];
