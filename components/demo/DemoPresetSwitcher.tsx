'use client';

import React from 'react';
import { Sparkles, Building2, Stethoscope, HeartPulse } from 'lucide-react';

interface DemoPresetSwitcherProps {
  currentPresetId: string;
  onSelectPreset: (id: string) => void;
}

export default function DemoPresetSwitcher({ currentPresetId, onSelectPreset }: DemoPresetSwitcherProps) {
  return (
    <aside aria-label="Demo client switcher" className="bg-[#F1F7FB] text-[#334155] border-b border-[#DCE5ED] py-2 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        
        {/* Left: Pitch Context Badge */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white text-[#123B66] font-bold border border-[#DCE5ED]">
            <Sparkles className="w-3 h-3 mr-1 text-[#0D9488]" />
            CarePoint Demo
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="font-medium text-[#334155]">
            Client Showcase — Test with different clinic profiles:
          </span>
        </div>

        {/* Right: Interactive Switcher Buttons */}
        <div className="flex items-center space-x-1.5 flex-wrap justify-center">
          <button
            type="button"
            onClick={() => onSelectPreset('hospital')}
            className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold transition ${
              currentPresetId === 'hospital'
                ? 'bg-[#123B66] text-white shadow-sm'
                : 'bg-white text-[#334155] hover:bg-[#E4EEF5] border border-[#DCE5ED]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
            <span>CarePoint Hospital</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectPreset('privateClinic')}
            className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold transition ${
              currentPresetId === 'privateClinic'
                ? 'bg-[#123B66] text-white shadow-sm'
                : 'bg-white text-[#334155] hover:bg-[#E4EEF5] border border-[#DCE5ED]'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5 mr-1.5 text-teal-400" />
            <span>Private Consultant Clinic</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectPreset('specialtyCenter')}
            className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold transition ${
              currentPresetId === 'specialtyCenter'
                ? 'bg-[#123B66] text-white shadow-sm'
                : 'bg-white text-[#334155] hover:bg-[#E4EEF5] border border-[#DCE5ED]'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5 mr-1.5 text-rose-500" />
            <span>Specialty Heart Center</span>
          </button>
        </div>

      </div>
    </aside>
  );
}
