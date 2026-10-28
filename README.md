# VERSTECH Labs — Healthcare Clinic & Hospital Website Demo

A complete, production-grade healthcare web application engineered by **VERSTECH Labs** for pitching and winning paid website development projects with private clinics, consultant doctors, and hospital management.

---

## 🎯 Completed 5-Phase Architecture Overview

This project has been built across 5 comprehensive healthcare engineering stages:

1. **Stage 1 — Healthcare Visual Design & Responsive Foundation:**
   - Deep medical blue (`#0066CC`, `#002E5C`), clean clinical white/slate, and subtle cyan accents (`#06B6D4`).
   - Professional typography with `Plus Jakarta Sans`.
   - 100% mobile, tablet, laptop, and desktop responsive with floating mobile sticky actions.
   - Real-time **Demo Preset Switcher** for live client pitches (Multi-Specialty Hospital, Private Specialist Clinic, Specialty Heart Center).

2. **Stage 2 — Online Appointment Booking Experience:**
   - Multi-step booking flow: `Input Details` → `Review Summary` → `Instant Confirmation Receipt`.
   - Dynamic department-to-doctor filtering (selecting Cardiology shows cardiologists, etc.).
   - Date validation preventing past dates and dynamic available time slot selection.
   - One-click **WhatsApp Integration** generating a pre-filled, URL-encoded appointment booking request.
   - Unique demo reference token (`APT-2026-XXXX`) and clear post-booking instructions.

3. **Stage 3 — Doctors Directory, Medical Departments & Services:**
   - Dedicated **Doctors Directory** ([`/doctors`](http://localhost:3000/doctors)) with real-time keyword search and department filter pills.
   - Individual **Doctor Profile Modal** with verified qualifications, clinical focus areas, consultation schedule, and direct booking trigger.
   - Dedicated **Medical Departments Page** ([`/departments`](http://localhost:3000/departments)) showcasing 8 core clinical specialties (General Medicine, Cardiology, Pediatrics, Orthopedics, Dermatology, Gynecology, Dentistry, Diagnostic Lab).
   - Medical Services catalog with treatment lists and fee transparency.

4. **Stage 4 — Clinic Admin Dashboard & Appointment Management:**
   - Dedicated **Staff Portal Demo** ([`/admin`](http://localhost:3000/admin)) with live-computed summary metric cards (Total, Pending, Confirmed, Cancelled).
   - Reactive browser storage synchronization: appointments submitted on public pages immediately appear in the dashboard without reload.
   - Full appointment management table with search, status filters, date filters, detail view drawer, status updater, and cancellation confirmation.
   - Doctor Roster workload inspector and Department overview.
   - Clear architectural disclaimer distinguishing offline demo state from a production backend.

5. **Stage 5 — Technical SEO, Local SEO, Accessibility & Pitch Readiness:**
   - Complete JSON-LD Structured Data Schema (`schema.org/MedicalClinic`) in [`MedicalClinicSchema.tsx`](file:///C:/Users/abdul/.gemini/antigravity/scratch/clinic-demo/components/seo/MedicalClinicSchema.tsx).
   - Dynamic Next.js 14 XML Sitemap ([`/sitemap.xml`](http://localhost:3000/sitemap.xml)) and Robots configuration ([`/robots.txt`](http://localhost:3000/robots.txt)).
   - OpenGraph and Twitter card metadata.
   - Local SEO readiness with geographic coordinates (Lahore), opening hours specification, and Google Business Profile navigation links.
   - WCAG-compliant visible focus rings, ARIA dialog attributes, and keyboard Escape key dismissal.

---

## 📂 Project Directory Structure

```
clinic-demo/
├── app/
│   ├── admin/
│   │   └── page.tsx             # Staff Portal / Appointment Management Dashboard
│   ├── book/
│   │   └── page.tsx             # Dedicated full-page online appointment booking
│   ├── departments/
│   │   └── page.tsx             # Medical Departments & Clinical Specialties showcase
│   ├── doctors/
│   │   └── page.tsx             # Searchable & filterable Doctors Directory
│   ├── globals.css              # Healthcare styling, gradients, and pulse animations
│   ├── layout.tsx               # Root layout, metadata, viewport, JSON-LD Schema
│   ├── page.tsx                 # Public homepage composing all sections
│   ├── robots.ts                # Next.js 14 dynamic robots.txt
│   └── sitemap.ts               # Next.js 14 dynamic XML sitemap
├── components/
│   ├── booking/
│   │   └── AppointmentForm.tsx  # Shared multi-step booking form & WhatsApp generator
│   ├── demo/
│   │   └── DemoPresetSwitcher.tsx # Live client switcher (Hospital vs Clinic vs Specialty)
│   ├── doctors/
│   │   └── DoctorProfileModal.tsx # Doctor credentials, schedule, and bio modal
│   ├── layout/
│   │   ├── Footer.tsx           # Accreditation, departments, emergency numbers
│   │   ├── MobileStickyBar.tsx  # Floating bottom quick-action bar for mobile
│   │   ├── Navbar.tsx           # Sticky navigation with links to all subpages
│   │   └── TopHeader.tsx        # 24/7 Emergency line, timings, and direct dialers
│   ├── sections/
│   │   ├── AppointmentModal.tsx # Accessible modal wrapper for booking form
│   │   ├── DoctorsSection.tsx   # Homepage featured doctors grid
│   │   ├── FacilitiesSection.tsx# Infrastructure, ICU, Lab, 24/7 Pharmacy
│   │   ├── Hero.tsx             # Hero section with on-duty doctor spotlight
│   │   ├── QuickInfoCards.tsx   # Urgent care, daily schedule, and booking cards
│   │   ├── ServicesSection.tsx  # Clinical services grid with fee transparency
│   │   ├── TestimonialsSection.tsx # Verified patient reviews
│   │   ├── TimingsAndLocation.tsx# Weekly schedule table and GPS directions
│   │   └── WhyChooseUs.tsx      # Patient safety pillars & statistical metrics
│   └── seo/
│       └── MedicalClinicSchema.tsx # JSON-LD schema.org/MedicalClinic structured data
├── lib/
│   ├── appointments-store.ts    # Unified demo storage, reactive events, and metrics
│   └── clinic-data.ts           # Centralized configuration (presets, doctors, departments)
├── tailwind.config.ts           # Medical blues, cyans, and slate palette
└── package.json
```

---

## 💻 Running the Demo Locally

```bash
# 1. Open the project folder
cd C:\Users\abdul\.gemini\antigravity\scratch\clinic-demo

# 2. Start the development server
npm run dev

# 3. Open in your browser
http://localhost:3000
```

Available URL Routes:
- **Homepage:** `http://localhost:3000/`
- **Doctors Directory:** `http://localhost:3000/doctors`
- **Departments & Services:** `http://localhost:3000/departments`
- **Full-Page Booking:** `http://localhost:3000/book`
- **Staff Admin Dashboard:** `http://localhost:3000/admin`
- **XML Sitemap:** `http://localhost:3000/sitemap.xml`
- **Robots.txt:** `http://localhost:3000/robots.txt`

---

## 🏥 Client Customization Checklist (Pre-Pitch)

To customize this demo for any specific doctor or clinic lead from your spreadsheet in under 2 minutes:

1. Open [`lib/clinic-data.ts`](file:///C:/Users/abdul/.gemini/antigravity/scratch/clinic-demo/lib/clinic-data.ts).
2. Update the active clinic preset:
   - `name`: Clinic / Hospital Name
   - `emergencyPhone` and `receptionPhone`: Client's actual landline / mobile numbers
   - `whatsappNumber`: Client's official WhatsApp business number
   - `address` and `city`: Client's exact address (e.g. DHA Phase 5, Lahore)
   - `geoLatitude` and `geoLongitude`: Exact GPS coordinates
3. Update or replace doctor names and photos in the `DOCTORS` array.
4. Run `npm run build` to verify production compilation.
