"use client";

import {
  ProfileCardModal,
  JobDetailsModal,
  AppDownloadModal,
} from "@/components/modals/JobModals";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import InputIcon from "@/components/ui/input-icon";
import { Search, MapPin, LayoutGrid, Filter, ChevronRight } from "lucide-react";
import { ResponsiveParagraph } from "@/components/ui/paragraph";
import { JobCard, type Job } from "./job-card";
import { Section } from "@/components/ui/section";

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

// Main Component
export function NearbyJobs() {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs] = useState<Job[]>(sampleJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(sampleJobs);

  useEffect(() => {
    // TypeScript-safe Leaflet icon fix - only run on client
    if (typeof window !== "undefined") {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
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

      <Section className="mb-2 md:mb-4 lg:mb-6 xl:mb-8 py-2 md:py-4 lg:py-6 xl:py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          {/* Left: Map/Grid Toggle + Results Count */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button className="p-2 bg-[#F4781B] text-white rounded-full hover:opacity-90 transition">
                <MapPin size={20} />
              </button>
              <button className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition">
                <LayoutGrid size={20} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#F4781B] rounded-full flex items-center justify-center text-white text-xs font-bold">
                {filteredJobs.length}
              </div>
              <ResponsiveParagraph
                size="sm"
                className="text-gray-600 font-medium"
              >
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
              <Filter size={18} />
            </button>

            <select
              defaultValue="popular"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:border-gray-300 focus:outline-none cursor-pointer transition whitespace-nowrap"
            >
              <option value="popular">Sort by: Popular</option>
              <option value="recent">Sort by: Recent</option>
              <option value="salary">Sort by: Salary</option>
              <option value="distance">Sort by: Distance</option>
            </select>
          </div>
        </div>
      </Section>

      <Section>
        {/* Unified Layout: Column on mobile, Row on desktop (Map 2/3, Jobs 1/3) */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 items-stretch w-full">
          {/* MAP - 2/3 width on desktop, full width on mobile */}
          <div className="w-full md:w-2/3 flex-shrink-0 relative z-10">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[250px] sm:h-[350px] md:h-full">
              {mounted && (
                <div className="w-full h-full">
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
                      <Marker
                        key={job.id}
                        position={[job.latitude, job.longitude]}
                      >
                        <Popup>
                          <div className="p-2 min-w-[220px]">
                            <h3 className="font-semibold text-sm mb-1">
                              {job.title}
                            </h3>
                            <p className="text-xs text-gray-600 mb-2">
                              {job.company}
                            </p>
                            <div className="flex items-center gap-1 text-gray-500 mb-2">
                              <MapPin size={12} />
                              <span className="text-xs">{job.location}</span>
                            </div>
                            <p className="font-medium text-[#F4781B] text-sm mb-3">
                              {job.salary}
                            </p>
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

          {/* JOBS - 1/3 width on desktop, full width on mobile */}
          <div className="w-full md:w-1/3 flex flex-col gap-2 sm:gap-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}

            {/* See More */}
            <div className="bg-white border-2 border-[#F4781B] rounded-lg p-2 sm:p-3 flex items-center justify-center hover:bg-gray-50 transition flex-shrink-0">
              <button className="text-[#F4781B] font-semibold text-xs sm:text-sm hover:underline inline-flex items-center gap-1">
                See more <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </Section>
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
      <AppDownloadModal isOpen={showModal3} onClose={closeAllModals} />
    </>
  );
}
