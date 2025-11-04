"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  latitude: number;
  longitude: number;
  postedTime: string;
}

// Modal 1: Profile Card Modal
export function ProfileCardModal({ 
  isOpen, 
  onClose, 
  onViewMore 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onViewMore: () => void 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-xl">
        <div className="text-center mb-6">
          <Image 
            src="/images/ui/medfaster-logo.png" 
            alt="MedFasterr" 
            width={120} 
            height={40}
            className="mx-auto mb-4"
          />
          
          {/* Phone mockup */}
          <div className="flex justify-center mb-6">
            <Image 
              src="/images/ui/mobile-screen.png" 
              alt="Mobile Screen" 
              width={140} 
              height={280}
              className="rounded-3xl"
            />
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mb-6">
          View more accurate vacancies with your Profile score matching
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Close
          </button>
          <button
            onClick={onViewMore}
            className="flex-1 px-4 py-2 bg-[#F4781B] text-white rounded-lg font-medium hover:bg-[#E86A0A] transition"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal 2: Job Details Modal
export function JobDetailsModal({ 
  isOpen, 
  onClose, 
  onApply,
  job
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onApply: () => void;
  job?: Job;
}) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{job.title}</h2>
            <p className="text-sm text-gray-500">{job.company}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">About The Job</h3>
          <p className="text-sm text-gray-600 mb-4">
            Professional healthcare position offering competitive compensation and growth opportunities in a dynamic team environment.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-xs text-gray-500">Location</span>
              <p className="text-sm font-semibold text-gray-900">{job.location}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500">Job Type</span>
              <p className="text-sm font-semibold text-gray-900">{job.type}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500">Experience</span>
              <p className="text-sm font-semibold text-gray-900">{job.experience}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500">Salary Range</span>
              <p className="text-sm font-semibold text-gray-900">{job.salary}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Close
          </button>
          <button
            onClick={onApply}
            className="flex-1 px-4 py-2 bg-[#F4781B] text-white rounded-lg font-medium hover:bg-[#E86A0A] transition"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal 3: App Download Modal
export function AppDownloadModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-xl">
        <div className="text-center mb-6">
          <Image 
            src="/images/ui/medfaster-logo.png" 
            alt="MedFasterr" 
            width={120} 
            height={40}
            className="mx-auto mb-4"
          />
          
          {/* Phone mockup */}
          <div className="flex justify-center mb-6">
            <Image 
              src="/images/ui/mobile-screen.png" 
              alt="Mobile Screen" 
              width={140} 
              height={280}
              className="rounded-3xl"
            />
          </div>
        </div>

        <p className="text-center text-sm text-gray-600 mb-2 font-semibold">Apply on the App</p>
        <p className="text-center text-xs text-gray-500 mb-6">
          To apply for this job and view the full description, please scan and download the MedFasterr app
        </p>

        {/* QR Codes */}
        <div className="flex justify-center gap-4 mb-6">
          <Image 
            src="/images/ui/qr-code-1.png" 
            alt="QR Code 1" 
            width={80} 
            height={80}
            className="border-2 border-gray-300 rounded"
          />
          <Image 
            src="/images/ui/qr-code-2.png" 
            alt="QR Code 2" 
            width={80} 
            height={80}
            className="border-2 border-gray-300 rounded"
          />
        </div>

        {/* App Store Buttons */}
        <div className="flex justify-center gap-3 mb-6">
          <button className="flex items-center gap-1 px-3 py-2 bg-black text-white rounded text-xs font-semibold hover:bg-gray-800 transition">
            📱 App Store
          </button>
          <button className="flex items-center gap-1 px-3 py-2 bg-black text-white rounded text-xs font-semibold hover:bg-gray-800 transition">
            📱 Google Play
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Not Now
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-[#F4781B] text-white rounded-lg font-medium hover:bg-[#E86A0A] transition"
          >
            Download the App
          </button>
        </div>
      </div>
    </div>
  );
}
