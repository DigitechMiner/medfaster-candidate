import { ArrowRight } from "lucide-react";

// Types
export interface Job {
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

// Job Card Component
export function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Top Section: Title + Time */}
      <div className="mb-4 pb-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-semibold text-gray-900 text-base">{job.title}</h3>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {job.postedTime}
          </span>
        </div>

        <p className="text-sm text-gray-500">
          {job.company} • {job.location}
        </p>
      </div>

      {/* Middle Section: Type + Salary */}
      <div className="mb-4 pb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 bg-[#F5F5F5] rounded-4xl px-3 py-1.5 whitespace-nowrap">
              {job.type}
            </span>
            <span className="text-sm text-gray-600 bg-[#F5F5F5] rounded-4xl px-3 py-1.5 whitespace-nowrap">
              {job.experience}
            </span>
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
          Apply now <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}

