"use client";

import  Header  from "@/components/global/header";
import { Footer } from "@/components/global/footer";
import dynamic from "next/dynamic";
import { Heading } from "@/components/ui/heading";
import { ResponsiveParagraph } from "@/components/ui/paragraph";
import Link from "next/link";

const NearbyJobs = dynamic(() => import("../sections/nearby-jobs").then(mod => ({ default: mod.NearbyJobs })), {
  ssr: false,
});

export default function NearbyJobsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-neutral-100">
      {/* Header */}
      <div className="p-5">

  <div className="bg-white rounded-lg md:rounded-xl lg:rounded-2xl overflow-hidden shadow-sm">

    <div className="px-4 md:px-6 lg:px-8 pt-4 md:pt-6">
      <Header />
    </div>



    <div className="px-4 ml-6 md:px-6 my-12 lg:px-8 pb-6 md:pb-4">
      <Heading as="h1" size="md" weight="normal" className="mb-4">
        Near By Jobs
      </Heading>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="hover:text-[#F4781B] transition-colors"
        >
          <ResponsiveParagraph size="sm" className="text-gray-600">
            Home
          </ResponsiveParagraph>
        </Link>
        <span className="text-gray-400">
          <ResponsiveParagraph size="sm">/</ResponsiveParagraph>
        </span>
        <ResponsiveParagraph size="sm" className="text-gray-400">
          Jobs
        </ResponsiveParagraph>
      </div>
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="flex-1 bg-neutral-100 p-5">
        {/* Nearby Jobs Section */}
        <NearbyJobs />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
