"use client";

import { ProfileCardModal, JobDetailsModal, AppDownloadModal } from "@/components/modals/JobModals";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import InputIcon from "@/components/ui/input-icon";
import { Search, MapPin } from "lucide-react";
import { ResponsiveParagraph } from "@/components/ui/paragraph";

// Types
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

// Sample job data
const sampleJobs: Job[] = [
  {
    id: 1,
    title: "Accountant",
    company: "Hospital Name",
    location: "Herrang",
    salary: "$80k - $95k CAD",
    type: "Fulltime",
    experience: "5-6 Years",
    latitude: 12.9716,
    longitude: 77.5946,
    postedTime: "2 hours ago",
  },
  {
    id: 2,
    title: "Staff Manager",
    company: "Medical Center",
    location: "Folkets Hus - Herrang",
    salary: "$60k - $85k CAD",
    type: "Fulltime",
    experience: "3-5 Years",
    latitude: 12.9816,
    longitude: 77.6046,
    postedTime: "5 hours ago",
  },
  {
    id: 3,
    title: "Staff Manager",
    company: "Healthcare Clinic",
    location: "Malmensås",
    salary: "$70k - $90k CAD",
    type: "Parttime",
    experience: "1-3 Years",
    latitude: 12.9616,
    longitude: 77.5846,
    postedTime: "1 day ago",
  },
];

// Updated Job Card Component
function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Top Section: Title + Time */}
      <div className="mb-4 pb-4 ">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-semibold text-gray-900 text-base">
            {job.title}
          </h3>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {job.postedTime}
          </span>
        </div>
        
        <p className="text-sm text-gray-500">
          {job.company} • {job.location}
        </p>
      </div>

      {/* Middle Section: Type + Salary */}
      <div className="mb-4 pb-4 ">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 bg-[#F5F5F5] rounded-4xl px-3 py-1.5 whitespace-nowrap">{job.type}</span>
            <span className="text-sm text-gray-600 bg-[#F5F5F5] rounded-4xl px-3 py-1.5 whitespace-nowrap">{job.experience}</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {job.salary}
          </span>
        </div>
      </div>

      {/* Bottom Section: Experience + Apply */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#F4781B] font-medium">
          {job.experience}
        </span>
        <a
          href="#"
          className="text-[#F4781B] hover:underline font-medium text-sm inline-flex items-center gap-1"
        >
          Apply now →
        </a>
      </div>
    </div>
  );
}

// Main Component
export function NearbyJobs() {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [jobs] = useState<Job[]>(sampleJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(sampleJobs);

  useEffect(() => {
    // TypeScript-safe Leaflet icon fix - only run on client
    if (typeof window !== 'undefined') {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    }
    setMounted(true);
  }, []);

  // Auto-open first modal after 3 seconds
useEffect(() => {
  const timer = setTimeout(() => {
    setShowModal1(true);
  }, 3000); // 3 seconds

  return () => clearTimeout(timer);
}, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [searchQuery, jobs]);

  const mapCenter: [number, number] = [
    jobs.reduce((sum, job) => sum + job.latitude, 0) / jobs.length,
    jobs.reduce((sum, job) => sum + job.longitude, 0) / jobs.length,
  ];

  const handleViewMore = () => {
  setShowModal1(false);
  setShowModal2(true);
};

const handleApply = () => {
  setShowModal2(false);
  setShowModal3(true);
};

const closeAllModals = () => {
  setShowModal1(false);
  setShowModal2(false);
  setShowModal3(false);
};


  return (
    <>
      {/* SEARCH SECTION */}
      <div className="container mx-auto px-4">
        <div className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            
            {/* Left: Map/Grid Toggle + Results Count */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="p-2 bg-[#F4781B] text-white rounded-full hover:opacity-90 transition">
                  <MapPin size={20} />
                </button>
                <button className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="3" y="3" width="8" height="8" />
                    <rect x="13" y="3" width="8" height="8" />
                    <rect x="3" y="13" width="8" height="8" />
                    <rect x="13" y="13" width="8" height="8" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#F4781B] rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {filteredJobs.length}
                </div>
                <ResponsiveParagraph size="sm" className="text-gray-600 font-medium">
                  Showing 1-8 of 1,240 results
                </ResponsiveParagraph>
              </div>
            </div>

            {/* Center: Search Input */}
            <div className="flex-1 min-w-0">
              <InputIcon
                type="text"
                placeholder="Search Nearby Jobs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
                iconPosition="left"
                className="w-full"
              />
            </div>

            {/* Right: Buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button className="p-2 bg-[#F4781B] text-white rounded-full hover:opacity-90 transition">
                <Search size={20} />
              </button>

              <button className="flex items-center gap-2 px-5 py-2 bg-[#F4781B] text-white rounded-full font-medium hover:opacity-90 transition whitespace-nowrap">
                Filter
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </svg>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:border-gray-300 focus:outline-none cursor-pointer transition whitespace-nowrap"
              >
                <option value="popular">Sort by: Popular</option>
                <option value="recent">Sort by: Recent</option>
                <option value="salary">Sort by: Salary</option>
                <option value="distance">Sort by: Distance</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5"></div>
<section className="bg-white py-8 px-4 rounded-2xl space-y-2 md:space-y-4 lg:space-y-6 xl:space-y-8">
  {/* DESKTOP (2XL and above): Full width map + jobs below */}
  <div className="hidden 2xl:block">
    <div className="container mx-auto">
      {/* MAP */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        {mounted && (
          <div className="w-full h-[400px] md:h-[500px] lg:h-[550px]">
            <MapContainer
              center={mapCenter}
              zoom={13}
              scrollWheelZoom={true}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {jobs.map((job) => (
                <Marker key={job.id} position={[job.latitude, job.longitude]}>
                  <Popup>
                    <div className="p-2 min-w-[220px]">
                      <h3 className="font-semibold text-sm mb-1">{job.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">{job.company}</p>
                      <div className="flex items-center gap-1 text-gray-500 mb-2">
                        <MapPin size={12} />
                        <span className="text-xs">{job.location}</span>
                      </div>
                      <p className="font-medium text-[#F4781B] text-sm mb-3">{job.salary}</p>
                      <button className="w-full bg-[#F4781B] text-white px-3 py-2 rounded-full text-xs font-medium hover:opacity-90">
                        Apply now
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        )}
      </div>

      {/* DESKTOP: Job cards in 4-column flex */}
      <div className="mt-8 flex gap-6 items-stretch">
        {filteredJobs.slice(0, 3).map((job) => (
          <div key={job.id} className="flex-1">
            <JobCard job={job} />
          </div>
        ))}
        <div className="flex-[0.65]">
          <div className="bg-white border-2 border-[#F4781B] rounded-lg p-6 flex items-center justify-center h-full hover:bg-gray-50 transition">
            <button className="text-[#F4781B] font-semibold hover:underline inline-flex items-center gap-1">
              See more <span className="text-lg">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

 {/* RESPONSIVE (Mobile + All up to 2XL): Map + jobs side by side */}
<div className="2xl:hidden flex flex-row gap-4 sm:gap-6 items-start px-2 sm:px-3 w-full">
  
  {/* MAP - LARGER */}
  <div className="w-3/5 flex-shrink-0 relative z-10">
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {mounted && (
        <div className="w-full h-[250px] sm:h-[350px] md:h-[450px]">
          <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {jobs.map((job) => (
              <Marker key={job.id} position={[job.latitude, job.longitude]}>
                <Popup>
                  <div className="p-2 min-w-[220px]">
                    <h3 className="font-semibold text-sm mb-1">{job.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{job.company}</p>
                    <div className="flex items-center gap-1 text-gray-500 mb-2">
                      <MapPin size={12} />
                      <span className="text-xs">{job.location}</span>
                    </div>
                    <p className="font-medium text-[#F4781B] text-sm mb-3">{job.salary}</p>
                    <button className="w-full bg-[#F4781B] text-white px-3 py-2 rounded-full text-xs font-medium hover:opacity-90">
                      Apply now
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  </div>

  {/* JOBS - COMPACT */}
  <div className="w-2/5 flex flex-col gap-2 sm:gap-3 overflow-y-auto max-h-[250px] sm:max-h-[350px] md:max-h-[450px]">
    {filteredJobs.map((job) => (
      <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3 hover:shadow-md transition-shadow text-xs sm:text-sm flex-shrink-0">
        <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 line-clamp-1">{job.title}</h3>
        <p className="text-gray-500 mb-1 sm:mb-2 text-xs line-clamp-1">{job.company} • {job.location}</p>
        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
          <span className="text-xs text-gray-600 bg-[#F5F5F5] rounded-full px-1.5 sm:px-2 py-0.5 whitespace-nowrap">{job.type}</span>
          <span className="font-semibold text-gray-900 text-xs whitespace-nowrap">{job.salary}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#F4781B] font-medium">{job.experience}</span>
          <a href="#" className="text-[#F4781B] hover:underline text-xs">Apply →</a>
        </div>
      </div>
    ))}
    
    {/* See More */}
    <div className="bg-white border-2 border-[#F4781B] rounded-lg p-2 sm:p-3 flex items-center justify-center hover:bg-gray-50 transition flex-shrink-0">
      <button className="text-[#F4781B] font-semibold text-xs sm:text-sm hover:underline">
        See more <span>›</span>
      </button>
    </div>
  </div>
</div>

</section>
      {/* MODALS */}
      <ProfileCardModal 
        isOpen={showModal1} 
        onClose={closeAllModals} 
        onViewMore={handleViewMore}
      />
      <JobDetailsModal 
        isOpen={showModal2} 
        onClose={closeAllModals} 
        onApply={handleApply}
        job={filteredJobs[0]}
      />
      <AppDownloadModal 
        isOpen={showModal3} 
        onClose={closeAllModals}
      />
    </>
  );
}
