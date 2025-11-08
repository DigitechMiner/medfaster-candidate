"use client";

import Header from "@/components/global/header";
import { Footer } from "@/components/global/footer";
import { Screen } from "@/components/global/screen";
import dynamic from "next/dynamic";
import { Heading } from "@/components/ui/heading";
import { Paragraph, ResponsiveParagraph } from "@/components/ui/paragraph";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/section";

const NearbyJobs = dynamic(
  () =>
    import("./components/nearby-jobs").then((mod) => ({
      default: mod.NearbyJobs,
    })),
  {
    ssr: false,
  }
);

export default function NearbyJobsPage() {
  return (
    <Screen>
      <Header>
        <Section className="pt-2 md:pt-4 lg:pt-6 xl:pt-8">
          <div className="space-y-4">
            {/* Title */}
            <Heading
              as="h1"
              size="lg"
              weight="normal"
              className="text-[#252B37]"
            >
              Near By Jobs
            </Heading>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 ">
              <Link
                href="/about_us"
                className="text-[#252B37] hover:text-[#F4781B] transition-colors text-lg"
              >
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-[#717680]" />
              <Paragraph size="lg" className="text-[#717680]">
                Jobs
              </Paragraph>
            </div>
          </div>
        </Section>
      </Header>

      {/* Main Content */}
      <div className="flex-1">
        <NearbyJobs />
      </div>

      {/* Footer */}
      <Footer />
    </Screen>
  );
}
